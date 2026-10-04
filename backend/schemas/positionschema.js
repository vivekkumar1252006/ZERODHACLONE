const { Schema, model } = require("mongoose");

const positionSchema = new Schema({
  product: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  qty: { type: Number, required: true, min: 0 },
  avg: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  net: { type: Number, default: 0 },
  day: { type: Number, default: 0 },
  isloss: { type: Boolean, default: false },
});

const PositionModel = model("Position", positionSchema);

module.exports = { positionSchema, PositionModel };
