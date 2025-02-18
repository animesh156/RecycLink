const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seller", "buyer"],
      default: "buyer"
    },
    totalEarnings: { type: Number, default: 0 },

    
      earningsByMonth: [
        {
          month: { type: Number, required: true }, // 1 for Jan, 2 for Feb...
          year: { type: Number, required: true }, // 2025, 2026, etc.
          amount: { type: Number, default: 0 }, // Earnings for that month
        }
      ],

      purchasedItems: [
        {
          itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Waste" },
          itemName: { type: String },
          price: { type: Number },
          imageUrl: {type: String},
          datePurchased: { type: Date, default: Date.now },
        }
      ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
