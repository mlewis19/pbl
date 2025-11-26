import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./OrderPage.css";
import { useTheme } from "../../context/ThemeContext";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [showPopup, setShowPopup] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const consumer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  // PLACE ORDER → SHOW POPUP (NO PAYMENT)
  const placeOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          consumerId: consumer._id,
          producerId: product.producerId,
          quantity,
          totalPrice: product.price * quantity,
          deliveryMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Order failed");

      setShowPopup(true); // show success popup
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      {/* HEADER */}
      <header className="consumer-header">
        <div className="header-left">
          <div className="header-logo-icon">🌾</div>
          <div className="header-logo-text">
            <h1>Kisan Kart</h1>
            <p>Farm to Table, Direct</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {isDark ? "☀️" : "🌙"}
          </button>

          <button
            className="btn logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CHECKOUT */}
      <div className="checkout-wrapper">
        <div className="checkout-left">
          <h2>Checkout</h2>

          {/* DELIVERY METHOD */}
          <div className="checkout-box">
            <h3 className="section-title">Delivery Method</h3>

            <label className="delivery-option">
              <input
                type="radio"
                value="delivery"
                checked={deliveryMethod === "delivery"}
                onChange={() => setDeliveryMethod("delivery")}
              />
              <div>
                <strong>Delivery</strong>
                <p className="small-text">Free delivery in 2–4 days</p>
              </div>
            </label>

            <label className="delivery-option">
              <input
                type="radio"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={() => setDeliveryMethod("pickup")}
              />
              <div>
                <strong>Pickup</strong>
                <p className="small-text">Collect from nearest center</p>
              </div>
            </label>
          </div>

          {/* ORDER ITEM */}
          <div className="checkout-box">
            <h3 className="section-title">Order Item</h3>

            <div className="order-item">
              <img src={product.image} className="order-item-img" alt="" />

              <div className="order-item-details">
                <p className="item-name">{product.name}</p>
                <p className="item-price">{formatCurrency(product.price)}</p>

                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  max={product.stock}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="qty-input"
                />
              </div>
            </div>
          </div>

          {/* SHIPPING ADDRESS */}
          {deliveryMethod === "delivery" && (
            <div className="checkout-box">
              <h3 className="section-title">Shipping Address</h3>

              <p className="address-text">
                {consumer.name} <br />
                {consumer.address || "No address added"}
              </p>

              <button className="add-address-btn">Add / Change Address</button>
            </div>
          )}
        </div>

        {/* SUMMARY */}
        <div className="checkout-right">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(product.price * quantity)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryMethod === "delivery" ? "Free" : "₹0"}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>₹0</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatCurrency(product.price * quantity)}</strong>
          </div>

          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h2>Order Placed Successfully ✔</h2>
      <p>Your order is waiting for the producer's approval.</p>

      <button className="popup-btn" onClick={() => setShowPopup(false)}>
        Close
      </button>

      <a className="popup-link" href="/consumer/my-orders">
        Go to My Orders →
      </a>
    </div>
  </div>
)}


      <Footer />
    </>
  );
};

export default OrderPage;
