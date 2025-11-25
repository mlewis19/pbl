import "./ReviewModal.css";

const ReviewModal = ({ reviews, onClose }) => {
  return (
    <div className="review-modal-backdrop">
      <div className="review-modal">

        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Product Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews for this product.</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index} className="review-box">
              <p><strong>{r.consumerId?.name}</strong></p>
              <p>⭐ {r.rating} / 5</p>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
