const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    buyers: [
      {
        // buyerName: { type: String, required: true }, // Name of the buyer
        buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the buyer
        amount: { type: Number, required: true }, // The amount offered by the buyer
        timestamp: { type: Date, default: Date.now }, // Time when the buyer showed interest
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Waste", WasteSchema);
