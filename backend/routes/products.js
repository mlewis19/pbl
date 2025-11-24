const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const fs = require('fs');

const router = express.Router();

// Multer storage - store in /uploads with timestamped filenames
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage });


// ============================
// GET ALL PRODUCTS
// ============================
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ============================
// GET PRODUCTS BY PRODUCER
// ============================
router.get('/producer/:producerId', async (req, res) => {
  try {
    const products = await Product.find({
      producerId: req.params.producerId
    }).sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this producer' });
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching products by producer:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ============================
// GET SINGLE PRODUCT BY ID  ⭐ (Missing route added)
// ============================
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ============================
// CREATE PRODUCT (with images)
// ============================
router.post('/', auth, upload.array('images', 6), async (req, res) => {
  try {
    const {
      title,
      category,
      quantity,
      unit,
      price,
      description,
      location,
      lat,
      lng
    } = req.body;

    const imageFiles = req.files || [];
    const images = imageFiles.map(f => `/uploads/${f.filename}`);

    const product = new Product({
      title,
      category,
      quantity: quantity ? Number(quantity) : 0,
      unit: unit || 'kg',
      price: price ? Number(price) : 0,
      description,
      images,
      location,
      lat: lat ? Number(lat) : undefined,
      lng: lng ? Number(lng) : undefined,
      producerId: req.user._id
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
