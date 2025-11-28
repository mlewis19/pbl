import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // ✅ Added useNavigate
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useTheme } from "../../context/ThemeContext";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); // ✅ FIXED

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${productId}`
      );
      setProduct(res.data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  const productName = product.name || product.title || "Unnamed Product";

  const getImageUrl = (img) => {
    if (!img) return null;
    return img.startsWith("http")
      ? img
      : `http://localhost:5000${img}`;
  };

  return (
    <div className="product-details-page">
      <header className="consumer-header">
      
      <div className="header-left">
    <div className="header-logo-icon">🌾</div>
    <div className="header-logo-text">
      <h1>Kisan Cart</h1>
      <p>Farm to Table, Direct</p>
    </div>
  </div>

      <div className="header-actions">

    {/* THEME TOGGLE BUTTON */}
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

      <div className="container">
        <div className="product-details">

          {/* LEFT SIDE = GALLERY */}
          <div className="product-gallery">
            <div className="product-main-image">
              <img
                src={getImageUrl(product.images?.[selectedImage])}
                alt={productName}
              />
            </div>

            <div className="product-thumbnails">
              {product.images?.map((img, i) => (
                <div
                  key={i}
                  className={`product-thumbnail ${
                    i === selectedImage ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={getImageUrl(img)} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE = DETAILS */}
          <div className="product-info-section">
            <div className="product-breadcrumb">
              Home / Products / {productName}
            </div>

            <h1 className="product-title">{productName}</h1>

            <div className="product-price-section">
              <div className="product-price-large">₹{product.price}</div>
              <div className="product-price-unit">per {product.unit}</div>
              <div className="product-stock">
                {product.quantity > 0
                  ? `${product.quantity} ${product.unit} available`
                  : "Out of stock"}
              </div>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-producer-info">
              <div className="producer-avatar">👨‍🌾</div>
              <div className="producer-details">
                <h4>Producer</h4>
                <p>{product.producerName || "Local Farmer"}</p>
              </div>
            </div>

            {/* BUY NOW BUTTON FIXED */}
            <button
              className="buy-btn"
              onClick={() => navigate(`/consumer/order/${product._id}`)}
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
