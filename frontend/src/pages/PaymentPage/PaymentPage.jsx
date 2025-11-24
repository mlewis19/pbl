import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");
  const [upiId, setUpiId] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data));
  }, [orderId]);

  const confirmPayment = async () => {
    if (method === "upi" && !upiId.trim()) {
      alert("Please enter a valid UPI ID");
      return;
    }

    if (method === "upi") {
      alert("Redirecting to UPI app…");
      setTimeout(() => {
        navigate(`/payment/success/${orderId}`);
      }, 1500);
    } else {
      navigate(`/payment/success/${orderId}`);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="payment-container">
      <h2>Payment Method</h2>

      <div className="payment-box">
        <label className="payment-option">
          <input
            type="radio"
            value="cod"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          <strong>Cash on Delivery</strong>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            value="upi"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          <strong>UPI</strong>
        </label>

        {method === "upi" && (
          <div className="upi-box">
            <label>Enter UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
            />
          </div>
        )}

        <button className="confirm-payment-btn" onClick={confirmPayment}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
