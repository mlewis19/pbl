import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { currentUser, userRole, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <div className="header-logo-icon">🌾</div>
            <div className="header-logo-text">
              <h1>Kisan Kart</h1>
              <p>Farm to Table, Direct</p>
            </div>
          </Link>

          <div className="header-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {currentUser ? (
              <>
                <Link 
                  to={userRole === 'producer' ? '/producer/dashboard' : '/consumer/dashboard'} 
                  className="btn btn-outline btn-sm"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary btn-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}

            <button className="mobile-menu-btn">☰</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;