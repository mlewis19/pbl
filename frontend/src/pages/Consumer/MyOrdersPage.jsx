import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./MyOrdersPage.css";

const API_URL = "http://localhost:5000/api";

const MyOrdersPage = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);


  useEffect(() => {
  console.log("React user:", user);
  console.log("React token:", token);

  if (!user?._id || !token) {
    console.log("⛔ Missing user or token, fetch blocked");
    return;
  }

  fetchOrders();
}, [user, token]);




  const fetchOrders = async () => {
  if (!user || !user._id) {
    console.error("❌ No logged-in user found in localStorage");
    return;
  }

  try {
    

    const res = await axios.get(`${API_URL}/orders/consumer/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    setOrders(res.data);
  } catch (error) {
    console.error("Error fetching consumer orders:", error);
  }
};

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const img = order?.productId?.images?.[0]
              ? `http://localhost:5000${order.productId.images[0]}`
              : "/no-image.jpg";

            return (
              <div className="order-card" key={order._id}>
                <img src={img} alt="Product" className="order-img" />

                <div className="order-info">
                  <h3>{order.productId?.title}</h3>
                  <p>Quantity: {order.quantity}</p>
                  <p>Total Price: ₹{order.totalPrice}</p>

                  <p>
                    <strong>Order Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.paymentStatus}
                  </p>

                  <div className="order-actions">
                    {/* WAITING FOR APPROVAL */}
                    {order.status === "placed" && (
                      <button className="btn disabled-btn">
                        Waiting for Approval
                      </button>
                    )}

                    {/* PRODUCER APPROVED → PROCEED TO PAYMENT */}
                    {order.status === "confirmed" &&
                      order.paymentStatus === "pending" && (
                        <button
                          className="btn pay-btn"
                          onClick={() => navigate(`/payment/${order._id}`)}
                        >
                          Proceed to Payment
                        </button>
                      )}

                    {/* PAYMENT COMPLETED → SHOW TRACK + REVIEW */}
                    {order.paymentStatus === "success" && (
                      <>
                        <button
                          className="btn track-btn"
                          onClick={() => navigate(`/track-order/${order._id}`)}
                        >
                          Track My Order
                        </button>

                        <button
                          className="btn review-btn"
                          onClick={() =>
                            navigate(
                              `/consumer/review/${order.productId._id}`
                            )
                          }
                        >
                          View My Review
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
