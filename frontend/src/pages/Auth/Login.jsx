import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);

    if (!res.success) {
      setError(res.message || "Invalid credentials");
      setLoading(false);
      return;
    }

    navigate(role === 'producer' ? '/producer/dashboard' : '/consumer/dashboard');
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🌾</div>
            <h2>Welcome Back!</h2>
            <p>Sign in to continue to Kisan Cart</p>
          </div>

          <div className="role-selector">
            <div 
              className={`role-option ${role === 'consumer' ? 'active' : ''}`}
              onClick={() => setRole('consumer')}
            >
              <div className="role-icon">🛒</div>
              <div className="role-name">Consumer</div>
            </div>
            <div 
              className={`role-option ${role === 'producer' ? 'active' : ''}`}
              onClick={() => setRole('producer')}
            >
              <div className="role-icon">👨‍🌾</div>
              <div className="role-name">Producer</div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{width: '100%'}}
              disabled={loading}
            >
              {loading ? <span className="loading"></span> : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            Don’t have an account? <Link to="/register">Register here</Link>
          </div>

          <div className="back-home">
            <Link to="/">← Back to Home</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
