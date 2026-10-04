const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    passwordSalt: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

module.exports = { userSchema, UserModel };
