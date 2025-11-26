const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },

  deliveryMethod: { 
    type: String, 
    enum: ["delivery", "pickup"], 
    default: "delivery" 
  },

  paymentMethod: { 
    type: String, 
    enum: ["cod", "upi"], 
    default: "cod" 
  },

  paymentStatus: { 
    type: String, 
    enum: ["pending", "success", "failed"], 
    default: "pending" 
  },

  status: { 
    type: String, 
    enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"], 
    default: "placed" 
  },

  // ⭐ NEW FIELD — Needed for enabling "Proceed to Payment"
  isApproved: { 
    type: Boolean, 
    default: false 
  },

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
