const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    mode: { type: String, required: true, enum: ["BUY", "SELL"] },
  },
  { timestamps: true }
);

const OrderModel = model("Order", orderSchema);

module.exports = { orderSchema, OrderModel };
