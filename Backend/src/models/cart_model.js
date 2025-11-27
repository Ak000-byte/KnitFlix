const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variant",
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"]
  },
  priceAtAdd: {
    type: Number,
    required: true
  }
}, { _id: false }); // Don't create separate _id for each sub-document


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true  // fast lookup
  },
  items: {
    type: [cartItemSchema],
    default: []
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } // TTL index (auto delete when time comes)
  }
}, {
  timestamps: { createdAt: false, updatedAt: "updatedAt" } 
  // updatedAt auto-maintain hoga MongoDB ke through
});

// Prevent duplicate product entries inside cart
cartSchema.index({ userId: 1, "items.productId": 1, "items.variantId": 1 });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
