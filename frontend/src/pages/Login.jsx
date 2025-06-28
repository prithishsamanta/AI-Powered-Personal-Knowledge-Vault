// src/pages/Login.jsx
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-content">
        <h1 className="main-heading">Welcome to your Personal Knowledge Vault</h1>
        
        <p className="app-description">
          A secure and private space to store, organize, and manage your personal knowledge and information.
        </p>
        
        <div className="login-card">
          <h1 className="login-card-title">Login</h1>
          
          <form className="login-form">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
            />
            
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input"
            />

            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

          <p className="signup-prompt">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
