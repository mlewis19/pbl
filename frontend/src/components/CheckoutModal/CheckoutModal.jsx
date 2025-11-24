import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./CheckoutModal.css";

const API_URL = "http://localhost:5000/api";

const CheckoutModal = ({ product, onClose }) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOrder = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_URL}/orders`, {
        productId: product._id,
        consumerId: user._id,
        producerId: product.producerId,
        quantity,
        totalPrice: product.price * quantity,
      });

      alert("Order placed successfully!");
      onClose();
    } catch (e) {
      console.log(e);
      setError("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="checkout-body">
          <h3>{product.name}</h3>
          <p>Price per {product.unit}: ₹{product.price}</p>

          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <h3>Total: ₹{product.price * quantity}</h3>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="checkout-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleOrder}>
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
