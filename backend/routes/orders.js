const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const {
      productId,
      consumerId,
      producerId,
      quantity,
      totalPrice,
      deliveryMethod,
      paymentMethod
    } = req.body;

    const order = await Order.create({
      productId,
      consumerId,
      producerId,
      quantity,
      totalPrice,
      deliveryMethod,        // added
      paymentMethod,         // added
      paymentStatus: "pending",
      status: "placed"
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE PAYMENT STATUS
router.put("/:orderId/payment-success", async (req, res) => {
  try {
    const { orderId } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "success", status: "confirmed" },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (err) {
    console.error("Payment Update Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET ALL ORDERS FOR PRODUCER DASHBOARD
router.get("/producer/:producerId", async (req, res) => {
  try {
    const { producerId } = req.params;

    const orders = await Order.find({ producerId })
      .populate("productId")
      .populate("consumerId");

    res.json(orders);
  } catch (err) {
    console.error("Fetch Producer Orders Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET SINGLE ORDER (required for PaymentPage)
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("productId")
      .populate("consumerId")
      .populate("producerId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Get Order Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
