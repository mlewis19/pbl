import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>🌾 Kisan Cart</h3>
              <p>
                Connecting farmers directly with consumers in Mangalore. 
                Fresh produce, fair prices, no middlemen.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="WhatsApp">💬</a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/consumer/products">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>For Farmers</h3>
              <ul className="footer-links">
                <li><Link to="/register?role=producer">Become a Producer</Link></li>
                <li><Link to="/producer/dashboard">Producer Dashboard</Link></li>
                <li><Link to="/help">Help Center</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact Us</h3>
              <ul className="footer-links">
                <li>📍 Mangalore, Karnataka</li>
                <li>📧 support@kisankart.com</li>
                <li>📞 +91 12345 67890</li>
                <li>⏰ Mon - Sat: 6 AM - 8 PM</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Kisan Cart. All rights reserved. | Made with ❤️ for farmers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;