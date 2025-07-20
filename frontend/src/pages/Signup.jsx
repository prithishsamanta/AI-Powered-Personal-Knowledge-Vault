import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { authAPI } from '../services/api';

function Signup() {
  // State management for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // State for handling loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // For navigation after successful signup
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // API call to backend
      const data = await authAPI.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Success! Show success message and redirect
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/'); // Redirect to login page
      }, 2000);

    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1 className="main-heading">Welcome to your Personal Knowledge Vault</h1>
        
        <p className="app-description">
          Create your account to start organizing and managing your personal knowledge securely.
        </p>
        
        <div className="signup-card">
          <h1 className="signup-card-title">Sign Up</h1>
          
          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}
          
          {/* Success message display */}
          {success && <div className="success-message">{success}</div>}
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="form-input"
              disabled={isLoading}
            />
            
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
              disabled={isLoading}
            />
            
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-input"
              disabled={isLoading}
            />
            
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="form-input"
              disabled={isLoading}
            />

            <button 
              type="submit" 
              className="signup-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="login-prompt">
            Already have an account?{' '}
            <Link to="/" className="login-link">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
