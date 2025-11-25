import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { categories, formatCurrency } from "../../utils/helpers";
import { useTheme } from "../../context/ThemeContext";

import "./ConsumerDashboard.css";

const ConsumerDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
  fetchProducts();
}, []);
 
useEffect(() => {
  console.log("Products from backend =", products);
}, [products]);


  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search
    if (searchQuery) {
      filtered = filtered.filter((p) => {
        const productName = p.name || p.title || "";
        return (
          productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sorting
    filtered.sort((a, b) => {
      const aName = a.name || a.title || "";
      const bName = b.name || b.title || "";

      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return aName.localeCompare(bName);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId) => {
    navigate(`/consumer/product/${productId}`);
  };

  return (
    <div className="consumer-dashboard">
      <header className="consumer-header">
      
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

      <section className="search-section">
        <div className="container">
          <div className="search-header">
            <h1>Find Fresh Produce</h1>
            <p>Browse products from local farmers in Mangalore</p>
          </div>

          <div className="search-controls">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search for fruits, vegetables, grains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">🔍 Search</button>
            </div>

            <div className="filter-chips">
              <button
                className={`filter-chip ${
                  selectedCategory === "All" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                All Products
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <div className="products-count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </div>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center p-5">
              <div className="loading" style={{ width: "40px", height: "40px" }}></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const productName = product.name || product.title || "Unnamed";

                const imageSrc =
                  product.images?.length > 0
                  ? `http://localhost:5000${product.images[0]}`
                  : null;


                return (
                  <div
  key={product._id}
  className="product-item"
  onClick={() => handleProductClick(product._id)}
>

                    <div className="product-item-image">
                      {imageSrc ? (
                        <img src={imageSrc} alt={productName} />
                      ) : (
                        <span>🥬</span>
                      )}
                    </div>

                    <div className="product-item-content">
                      <span className="product-item-badge">{product.category}</span>

                      <h3 className="product-item-name">{productName}</h3>

                      <p className="product-item-producer">
                        <span>👨‍🌾</span>{" "}
                        {product.producerName || "Local Farmer"}
                      </p>

                      <div className="product-item-footer">
                        <div>
                          <div className="product-item-price">
                            {formatCurrency(product.price)}
                          </div>
                          <div className="product-item-unit">
                            per {product.unit}
                          </div>
                        </div>

                        <div className="product-item-stock">
                          {product.quantity > 0
                            ? `${product.quantity} ${product.unit} available`
                            : "Out of stock"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsumerDashboard;
