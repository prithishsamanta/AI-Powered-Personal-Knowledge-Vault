// src/pages/Login.jsx
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to your Personal Knowledge Vault</h1>
        
        <form className="login-form">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-input"
          />
          
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-input password-input"
          />

          <button
            type="submit"
            className="login-button"
          >
            Log In
          </button>
        </form>

        <p className="signup-link-container">
          Not signed up yet?{' '}
          <Link to="/signup" className="signup-link">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
