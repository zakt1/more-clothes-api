const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: {type: Array},
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

