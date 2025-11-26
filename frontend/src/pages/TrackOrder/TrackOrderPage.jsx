import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { useNavigate } from "react-router-dom";
import "./TrackOrderPage.css";

const API_URL = "http://localhost:5000/api";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const { token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const navigate = useNavigate();

  // Fetch the order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrder(res.data.order);
        setHasReviewed(res.data.order?.hasReviewed || false);
      } catch (err) {
        console.log("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="track-container">

      <h2>Live Tracking</h2>
      <p>Order ID: {orderId}</p>

      <img src="/dummy-map.png" alt="Map" className="map-img" />

      {/* -------- Review Button -------- */}
      <div style={{ marginTop: "20px" }}>
        <button
          className="review-btn"
          onClick={() => setShowReview(true)}
          disabled={hasReviewed}
        >
          {hasReviewed ? "Review Submitted" : "Write a Review"}
        </button>
      </div>

      {/* -------- Review Modal -------- */}
      {showReview && (
        <ReviewForm
          productId={order.productId._id}
          token={token}
          onClose={() => setShowReview(false)}
          onSuccess={() => {
            setHasReviewed(true);
            alert("Review submitted successfully!");
          }}
        />
      )}

      <button
  className="back-home-btn"
  onClick={() => navigate("/consumer/dashboard")}
>
  ⬅ Back to Home
</button>

    </div>

    
  );
};

export default TrackOrderPage;
