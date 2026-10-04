const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { HoldingModel } = require("./schemas/Holdingschema");

const port = Number(process.env.PORT) || 3002;
const uri = process.env.MONGO_URL;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.get("/allHolding", async (req, res, next) => {
  try {
    const holdings = await HoldingModel.find({}).sort({ createdAt: -1 }).lean();
    res.json(holdings);
  } catch (error) {
    next(error);
  }
});

async function createHolding(req, res, next) {
  try {
    const holding = await HoldingModel.create(req.body);
    res.status(201).json(holding);
  } catch (error) {
    next(error);
  }
}

app.post("/holdings", createHolding);
app.post("/addHoldings", createHolding);

app.use((error, req, res, next) => {
  console.error("Request failed:", error.message);
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: "Invalid holding data", details: error.message });
  }
  res.status(500).json({ error: "Internal server error" });
});

async function start() {
  if (!uri) {
    throw new Error("MONGO_URL is not configured in backend/.env");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log("Database connected!");

  app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error(`Startup failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { app, start };
