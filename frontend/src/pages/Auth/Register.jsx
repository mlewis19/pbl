import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'consumer';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: initialRole,
    phone: '',
    about: '',
    address: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const res = await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
        formData.phone,
        formData.about,
        formData.address
      );

      if (!res.success) {
        setError(res.message);
        return;
      }

      navigate(formData.role === 'producer' ? '/producer/dashboard' : '/consumer/dashboard');

    } catch (err) {
      setError('Failed to create account.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🌾</div>
            <h2>Create Account</h2>
            <p>Join Kisan Kart today</p>
          </div>

          {/* Role Selection */}
          <div className="role-selector">
            <div 
              className={`role-option ${formData.role === 'consumer' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, role: 'consumer'})}
            >
              <div className="role-icon">🛒</div>
              <div className="role-name">Consumer</div>
            </div>

            <div 
              className={`role-option ${formData.role === 'producer' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, role: 'producer'})}
            >
              <div className="role-icon">👨‍🌾</div>
              <div className="role-name">Producer</div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="auth-form">

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
            </div>


            {formData.role === 'producer' && (
              <div className="form-group">
                <label className="form-label">About Me</label>
                <textarea
                  name="about"
                  className="form-textarea"
                  placeholder="Tell us about your farm..."
                  value={formData.about}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{width: '100%'}}
              disabled={loading}
            >
              {loading ? <span className="loading"></span> : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>

          <div className="back-home">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
