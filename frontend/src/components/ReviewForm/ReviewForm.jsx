import { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

const API_URL = "http://localhost:5000/api";

const ReviewForm = ({ productId, onClose, token, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/reviews`,
        { productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.log("Review submit error:", err);
    }
  };

  return (
  <div className="review-form-overlay">
    <div className="review-form-container">

      {/* Close button */}
      <button className="close-btn" onClick={onClose}>✖</button>

      <h3>Write a Review</h3>

      {/* Rating */}
      <label className="review-label">Rating:</label>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            className={num <= rating ? "star filled" : "star"}
            onClick={() => setRating(num)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <label className="review-label">Comment:</label>
      <textarea
        className="review-input"
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit Button */}
      <button className="review-submit-btn" onClick={submitReview}>
        Submit Review
      </button>

      {/* Cancel Button */}
      <button className="review-cancel-btn" onClick={onClose}>
        Cancel
      </button>

    </div>
  </div>
);


};

export default ReviewForm;
