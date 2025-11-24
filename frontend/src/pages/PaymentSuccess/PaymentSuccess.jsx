import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      {/* HEADER (same as consumer dashboard) */}
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

      {/* SUCCESS CONTENT */}
      <div className="success-container">
        <h2>Payment Successful 🎉</h2>
        <p>Your order has been placed successfully!</p>

        <button
          className="track-btn"
          onClick={() => navigate(`/track/${orderId}`)}
        >
          Track My Order
        </button>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
