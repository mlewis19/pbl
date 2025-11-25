const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String }, // <-- ADDED
  role: { type: String, enum: ['consumer','producer'], default: 'consumer' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
