const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  images: { type: [String], default: [] },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5
  }
});

module.exports = mongoose.model('Product', productSchema);