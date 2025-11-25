const express = require("express");
const Review = require("../models/Review.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// GET reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("consumerId", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a review
router.post("/", auth, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = new Review({
      productId,
      consumerId: req.user.id,
      rating,
      comment,
    });

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
