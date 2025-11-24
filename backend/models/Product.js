const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Vegetables' },
  quantity: { type: Number, default: 0 },
  unit: { type: String, default: 'kg' },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }], // URLs (served from /uploads)
  location: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
