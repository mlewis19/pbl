import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../utils/helpers';
import './AddProductModal.css';

const API_URL = "http://localhost:5000/api";


const AddProductModal = ({ onClose, product, onSuccess }) => {
  const { token, user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "Vegetables",
    quantity: "",
    price: "",
    description: "",
    images: []
  });

  const [unit, setUnit] = useState("kg");
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        category: product.category || "Vegetables",
        quantity: product.quantity || "",
        price: product.price || "",
        description: product.description || "",
        images: product.images || []
      });
      setUnit(product.unit || "kg");
      setImageFiles([]);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImageFiles(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (i) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== i),
    }));
    setImageFiles(prev => prev.filter((_, index) => index !== i));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const authToken = token || localStorage.getItem("token");

  if (!authToken) {
    setError("No authorization token found, please login");
    setLoading(false);
    return;
  }

  try {
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("category", formData.category);
    newFormData.append("quantity", formData.quantity);
    newFormData.append("price", formData.price);
    newFormData.append("description", formData.description);

    // Send new images ONLY if user selected some
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        newFormData.append("images", file);
      });
    }

    let res;

    if (product && product._id) {
      // =====================================
      // UPDATE (PUT) — EDIT mode
      // =====================================
      res = await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } else {
      // =====================================
      // CREATE (POST) — Add new product
      // =====================================
      res = await axios.post(
        "http://localhost:5000/api/products",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    }

    if (onSuccess) onSuccess(res.data);

  } catch (err) {
    console.error(err);
    setError("Failed to save product");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>{product ? "Edit Product" : "Add Product"}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {error && <div className="error-message">{error}</div>}

            {/* Title */}
            <div className="form-group">
              <label>Product Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} required />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label>Quantity *</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>

            {/* Price */}
            <div className="form-group">
              <label>Price (₹) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>

            {/* Images */}
            <div className="form-group">
              <label>Images</label>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="image-preview">
              {formData.images.map((img, i) => (
                <div key={i} className="image-preview-item">
                  <img src={img} alt={`Preview ${i}`} />
                  <button type="button" onClick={() => removeImage(i)}>×</button>
                </div>
              ))}
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{loading ? "Saving..." : "Save"}</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddProductModal;
