const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { after, before, test } = require("node:test");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET ||= crypto.randomBytes(32).toString("hex");

const { app } = require("../index");
let server;
let apiUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  apiUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("health reports when MongoDB is not connected", async () => {
  const response = await fetch(`${apiUrl}/health`);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    status: "unavailable",
    database: "disconnected",
  });
});

test("signup rejects invalid credentials before accessing the database", async () => {
  const response = await fetch(`${apiUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "not-an-email", mobile: "123", password: "short" }),
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, "Enter a valid email address");
});

test("holdings are unavailable without a valid login token", async () => {
  const response = await fetch(`${apiUrl}/api/holdings`);
  assert.equal(response.status, 401);
  assert.equal((await response.json()).error, "Please log in to continue");
});

test("holding creation rejects missing prices before accessing the database", async () => {
  const token = jwt.sign({ sub: "507f1f77bcf86cd799439011" }, process.env.JWT_SECRET);
  const response = await fetch(`${apiUrl}/api/holdings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "INFY", qty: 1, price: "", avg: 100 }),
  });
  assert.equal(response.status, 400);
});

test("API rejects browser requests from unapproved origins", async () => {
  const response = await fetch(`${apiUrl}/health`, {
    headers: { Origin: "https://untrusted.example" },
  });
  assert.equal(response.status, 403);
});
