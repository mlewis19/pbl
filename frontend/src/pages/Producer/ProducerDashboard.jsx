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
  if (!user?._id) return; // prevents crash

  (async () => {
    try {
      setLoadingOrders(true);

      const res = await axios.get(
        `${API_URL}/orders/producer/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(res.data);
    } catch (e) {
      console.log("Order fetch error:", e);
    } finally {
      setLoadingOrders(false);
    }
  })();
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
            <p><strong>Buyer:</strong> {order.consumer?.name}</p>
            <p><strong>Address:</strong> {order.consumer?.address}</p>
            <p><strong>Delivery:</strong> {order.deliveryType}</p>
            <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
            <p><strong>Status:</strong> {order.paymentStatus}</p>
          </div>

          <div className="order-actions">
            <button className="order-approve-btn">Approve Order</button>
            <button className="order-cancel-btn">Cancel Order</button>
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
