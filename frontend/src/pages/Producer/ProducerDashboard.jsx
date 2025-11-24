import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import { useTheme } from "../../context/ThemeContext";

import "./ProducerDashboard.css";

const API_URL = "http://localhost:5000/api";

const ProducerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  
const token = user?.token;

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
    fetchProducts();
  }, [user]);

  // FETCH ORDERS
  useEffect(() => {
    (async () => {
      try {
        setLoadingOrders(true);
        const res = await axios.get(
  `${API_URL}/orders/producer/${user._id}`,
  {
    headers: { Authorization: `Bearer ${token}` }
  }
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

  const onAddEditSuccess = () => {
    setShowModal(false);
    setEditProduct(null);
    fetchProducts();
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
          <img className="product-img" src={p.images?.[0] || "/placeholder.png"} alt={p.title} />

          <div className="product-info">
            <h3>{p.title}</h3>
            <p>Category: {p.category}</p>
            <p>Price: ₹{p.price}</p>
            <p>Quantity: {p.quantity}</p>
            <p>{p.description}</p>
          </div>

          <div className="tile-actions">
            <button className="btn btn-outline" onClick={() => { setEditProduct(p); setShowModal(true); }}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )}
</section>


      {/* ORDERS SECTION */}
      <section className="orders-section">
        <h2>Recent Orders</h2>

        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders received yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-item">
                <h4>{order.productName}</h4>
                <p>Quantity: {order.quantity}</p>
                <p>Total: ₹{order.totalPrice}</p>
                <p>Buyer: {order.consumerName}</p>
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
    </div>
  );
};

export default ProducerDashboard;
