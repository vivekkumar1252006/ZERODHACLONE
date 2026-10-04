const { Schema, model } = require("mongoose");

const holdingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    qty: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    avg: { type: Number, required: true, min: 0 },
    net: { type: Number, default: 0 },
    day: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const HoldingModel = model("Holding", holdingSchema);

module.exports = { holdingSchema, HoldingModel };
