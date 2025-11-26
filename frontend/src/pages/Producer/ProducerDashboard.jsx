import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import { useTheme } from "../../context/ThemeContext";
import ReviewModal from "../../components/ReviewModal/ReviewModal";

import "./ProducerDashboard.css";

const API_URL = "http://localhost:5000/api";

const ProducerDashboard = () => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
const [reviewList, setReviewList] = useState([]);



const { isDark, toggleTheme } = useTheme();


  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(
  `${API_URL}/products/producer/${user._id}`,
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);

      setProducts(res.data);
    } catch (e) {
      console.log("Fetch error:", e);
    } finally {
      setLoadingProducts(false);
    }
  };

useEffect(() => {
  if (!user?._id) return; // prevents crash
  fetchProducts();
}, [user]);

useEffect(() => {
  if (!user?._id) return;
  fetchOrders();
}, [user]);



  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
  `${API_URL}/products/${id}`,
  {
    headers: { Authorization: `Bearer ${token}` }
  }
);

      setProducts(products.filter((p) => p._id !== id));
    } catch (e) {
      console.log("Delete error:", e);
    }
  };

  const onAddEditSuccess = (updatedProduct) => {
  setShowModal(false);
  setEditProduct(null);

  setProducts(prev =>
    prev.some(p => p._id === updatedProduct._id)
      ? prev.map(p => p._id === updatedProduct._id ? updatedProduct : p)
      : [updatedProduct, ...prev]
  );
};

const openReviews = async (productId) => {
  try {
    const res = await axios.get(`${API_URL}/reviews/${productId}`);
    setReviewList(res.data);
    setShowReviewModal(true);
  } catch (error) {
    console.log("Review fetch error:", error);
  }
};

const fetchOrders = async () => {
  try {
    setLoadingOrders(true);

    const res = await axios.get(
      `${API_URL}/orders/producer/${user._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setOrders(res.data);
  } catch (error) {
    console.log("Order fetch error:", error);
  } finally {
    setLoadingOrders(false);
  }
};

const approveOrder = async (id) => {
  try {
    const res = await axios.patch(`http://localhost:5000/api/orders/${id}/approve`);

    alert("Order Approved ✔");

    // Update local UI
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status: "confirmed", isApproved: true } : o
      )
    );
  } catch (err) {
    console.error(err);
  }
};


const cancelOrder = async (id) => {
  try {
    const res = await axios.patch(`http://localhost:5000/api/orders/${id}/cancel`);

    alert("Order Cancelled ❌");

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status: "cancelled", isApproved: false } : o
      )
    );
  } catch (err) {
    console.error(err);
  }
};




  return (
    <div className="producer-dashboard">
    <header className="producer-dashboard-header">

  <div className="header-left">
    <div className="header-logo-icon">🌾</div>
    <div className="header-logo-text">
      <h1>Kisan Kart</h1>
      <p>Farm to Table, Direct</p>
    </div>
  </div>

  <div className="header-actions">

    {/* THEME TOGGLE BUTTON */}
    <button className="theme-toggle-btn" onClick={toggleTheme}>
  {isDark ? "☀️" : "🌙"}
</button>


    <button
      className="btn add-product-btn"
      onClick={() => {
        setEditProduct(null);
        setShowModal(true);
      }}
    >
      + Add Product
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


      
<h1 style={{ textAlign: "center", width: "100%" }}>My Products</h1>

      {/* PRODUCT LIST */}
      <section className="products-section">
  {loadingProducts ? (
    <p>Loading products...</p>
  ) : products.length === 0 ? (
    <p>No products added yet.</p>
  ) : (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p._id} className="product-tile">
          <img
  className="product-img"
  src={
    p.images?.[0]
      ? `http://localhost:5000${p.images[0]}`
      : "/placeholder.png"
  }
  alt={p.title}
/>


          <div className="product-info">
            <h3>{p.title}</h3>
            <p>Category: {p.category}</p>
            <p>Price: ₹{p.price}</p>
            <p>Quantity: {p.quantity}</p>
            <p>{p.description}</p>
          </div>

          <div className="tile-actions">
            
  <button
    className="btn btn-outline"
    onClick={() => {
      setEditProduct(p);
      setShowModal(true);
    }}
  >
    Edit
  </button>

  <button
    className="btn btn-danger"
    onClick={() => handleDelete(p._id)}
  >
    Delete
  </button>
  

  {/* VIEW REVIEWS — BELOW */}
  <button
    className="btn btn-secondary"
    style={{ marginTop: "10px", width: "100%" }}
    onClick={() => openReviews(p._id)}
  >
    View Reviews
  </button>
</div>


        </div>
      ))}
    </div>
  )}
</section>


      {/* ORDERS SECTION */}
      <section className="orders-section">
  <h1 style={{ textAlign: "center", width: "100%" }}>Recent Orders</h1>


  {loadingOrders ? (
    <p>Loading orders...</p>
  ) : orders.length === 0 ? (
    <p>No orders received yet.</p>
  ) : (
    <div className="orders-grid">
  {orders.map((order) => (
    <div key={order._id} className="order-card">
      <img
        className="order-img"
        src={
          order.productId?.images?.[0]
            ? `http://localhost:5000${order.productId.images[0]}`
            : "/placeholder.png"
        }
        alt={order.productId?.title}
      />

      <h3 className="order-title">{order.productId?.title}</h3>

      <div className="order-info">
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
        <p><strong>Buyer:</strong> {order.consumerId?.name}</p>
<p><strong>Address:</strong> {order.consumerId?.address}</p>
        <p><strong>Delivery:</strong> {order.deliveryType}</p>
        

        {/* ✔ SHOW LIVE ORDER STATUS */}
        <p>
          <strong>Status:</strong>{" "}
          {order.status === "confirmed" ? (
            <span style={{ color: "green", fontWeight: "bold" }}>Approved ✔</span>
          ) : order.status === "cancelled" ? (
            <span style={{ color: "red", fontWeight: "bold" }}>Cancelled ❌</span>
          ) : (
            <span style={{ color: "orange", fontWeight: "bold" }}>Pending ⏳</span>
          )}
        </p>
      </div>

      <div className="order-actions">

        {/* 🔥 SHOW BUTTONS ONLY IF PENDING */}
        {order.status === "placed" && (
          <>
            <button
              className="btn approve-btn"
              onClick={async () => {
                await approveOrder(order._id);
                alert("Order Approved Successfully!");
              }}
            >
              Approve Order
            </button>

            <button
              className="order-cancel-btn"
              onClick={async () => {
                await cancelOrder(order._id);
                alert("Order Cancelled");
              }}
            >
              Cancel Order
            </button>
          </>
        )}

        {/* ❗ If already approved / cancelled → hide buttons */}
        {order.status !== "placed" && (
          <p style={{ fontWeight: "bold", marginTop: "10px", opacity: 0.6 }}>
            {order.status === "confirmed" ? "This order is approved." : "This order is cancelled."}
          </p>
        )}
      </div>
    </div>
  ))}
</div>

  )}
</section>




      {showModal && (
        <AddProductModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSuccess={onAddEditSuccess}
        />
      )}

      {showReviewModal && (
  <ReviewModal
    reviews={reviewList}
    onClose={() => setShowReviewModal(false)}
  />
)}

    </div>
  );
};

export default ProducerDashboard;
