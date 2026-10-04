const path = require("path");
const crypto = require("crypto");
const { promisify } = require("util");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { HoldingModel } = require("./schemas/Holdingschema");
const { UserModel } = require("./schemas/User");

const port = Number(process.env.PORT) || 3002;
const uri = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
const app = express();
const scrypt = promisify(crypto.scrypt);
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed"));
    },
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  })
);
app.use(express.json({ limit: "16kb" }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

function issueToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    jwtSecret,
    { expiresIn: "8h" }
  );
}

function requireAuth(req, res, next) {
  const authorization = req.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Please log in to continue" });
  }

  try {
    req.auth = jwt.verify(token, jwtSecret);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Your session has expired. Please log in again." });
    }
    return next(error);
  }
}

function validateCredentials({ email, mobile, password }) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedMobile = typeof mobile === "string" ? mobile.replace(/\D/g, "") : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { error: "Enter a valid email address" };
  }
  if (!/^\d{10}$/.test(normalizedMobile)) {
    return { error: "Enter a valid 10-digit mobile number" };
  }
  if (typeof password !== "string" || password.length < 8 || password.length > 128) {
    return { error: "Password must be between 8 and 128 characters" };
  }

  return { email: normalizedEmail, mobile: normalizedMobile, password };
}

function authResponse(user) {
  return {
    token: issueToken(user),
    user: { id: user._id.toString(), email: user.email, mobile: user.mobile },
  };
}

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "unavailable",
    database: connected ? "connected" : "disconnected",
  });
});

app.post("/api/auth/signup", authLimiter, async (req, res, next) => {
  try {
    const credentials = validateCredentials(req.body || {});
    if (credentials.error) {
      return res.status(400).json({ error: credentials.error });
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = await scrypt(credentials.password, salt, 64);
    const user = await UserModel.create({
      email: credentials.email,
      mobile: credentials.mobile,
      passwordSalt: salt,
      passwordHash: passwordHash.toString("hex"),
    });

    return res.status(201).json(authResponse(user));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "An account with these details already exists" });
    }
    return next(error);
  }
});

app.post("/api/auth/login", authLimiter, async (req, res, next) => {
  try {
    const email =
      typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = req.body?.password;

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== "string" ||
      password.length > 128
    ) {
      return res.status(400).json({ error: "Enter your email address and password" });
    }

    const user = await UserModel.findOne({ email }).select("+passwordHash +passwordSalt");
    if (!user) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const actualHash = await scrypt(password, user.passwordSalt, 64);
    const expectedHash = Buffer.from(user.passwordHash, "hex");
    if (
      actualHash.length !== expectedHash.length ||
      !crypto.timingSafeEqual(actualHash, expectedHash)
    ) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    return res.json(authResponse(user));
  } catch (error) {
    return next(error);
  }
});

app.get("/api/auth/me", requireAuth, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.auth.sub).select("email mobile");
    if (!user) {
      return res.status(401).json({ error: "Account not found. Please log in again." });
    }
    return res.json({
      user: { id: user._id.toString(), email: user.email, mobile: user.mobile },
    });
  } catch (error) {
    return next(error);
  }
});

async function getHoldings(req, res, next) {
  try {
    const holdings = await HoldingModel.find({ user: req.auth.sub })
      .sort({ createdAt: -1 })
      .lean();
    return res.json(holdings);
  } catch (error) {
    return next(error);
  }
}

async function createHolding(req, res, next) {
  try {
    const { name, qty, price, avg } = req.body || {};
    const isNumberInput = (value) =>
      (typeof value === "number" || (typeof value === "string" && value.trim() !== "")) &&
      Number.isFinite(Number(value));
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.trim().length > 20 ||
      !isNumberInput(qty) ||
      Number(qty) <= 0 ||
      !isNumberInput(price) ||
      Number(price) < 0 ||
      !isNumberInput(avg) ||
      Number(avg) < 0
    ) {
      return res.status(400).json({ error: "Enter a symbol, quantity, current price, and average price" });
    }

    const holding = await HoldingModel.create({
      user: req.auth.sub,
      name: name.trim().toUpperCase(),
      qty: Number(qty),
      price: Number(price),
      avg: Number(avg),
      net: Number(avg) === 0 ? 0 : ((Number(price) - Number(avg)) / Number(avg)) * 100,
    });
    return res.status(201).json(holding);
  } catch (error) {
    return next(error);
  }
}

app.get("/api/holdings", requireAuth, getHoldings);
app.post("/api/holdings", requireAuth, createHolding);
app.delete("/api/holdings/:id", requireAuth, async (req, res, next) => {
  try {
    const result = await HoldingModel.deleteOne({
      _id: req.params.id,
      user: req.auth.sub,
    });
    if (!result.deletedCount) {
      return res.status(404).json({ error: "Holding not found" });
    }
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

app.get("/allHolding", requireAuth, getHoldings);
app.post("/addHoldings", requireAuth, createHolding);

app.use((error, req, res, next) => {
  if (error.message === "Origin not allowed") {
    return res.status(403).json({ error: "This website is not allowed to access the API" });
  }
  console.error("Request failed:", error.message);
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ error: "Invalid request data" });
  }
  return res.status(500).json({ error: "Internal server error" });
});

async function start() {
  if (!uri) {
    throw new Error("MONGO_URL is not configured");
  }
  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters");
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log("Database connected!");

  return app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error(`Startup failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { app, start };
