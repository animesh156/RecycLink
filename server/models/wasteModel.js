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
    bids: [{ buyer: String, amount: Number, timestamp: Date }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Waste", WasteSchema);
