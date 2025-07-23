// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { authAPI } from '../services/api';

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for handling loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // For navigation after successful signup
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if(error) setError('');
  };

  // Form validation
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;
    setIsLoading(true);
    setError('');

    try {
      const data = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess('Login successful! Redirecting to home...');
      setTimeout(() => {
        navigate('/home');
      }, 2000);

    } catch (error) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-content">
        <h1 className="main-heading">Welcome to your Personal Knowledge Vault</h1>
        
        <p className="app-description">
          A secure and private space to store, organize, and manage your personal knowledge and information.
        </p>
        
        <div className="login-card">
          <h1 className="login-card-title">Login</h1>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
            
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <p className="signup-prompt">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Create a new account
            </Link>
          </p>

          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}

          {/* Success message display */}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
