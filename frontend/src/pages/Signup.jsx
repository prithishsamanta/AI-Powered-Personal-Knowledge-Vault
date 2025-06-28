import { Link } from 'react-router-dom';
import '../styles/Signup.css';

function Signup() {
  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1 className="main-heading">Welcome to your Personal Knowledge Vault</h1>
        
        <p className="app-description">
          Create your account to start organizing and managing your personal knowledge securely.
        </p>
        
        <div className="signup-card">
          <h1 className="signup-card-title">Sign Up</h1>
          
          <form className="signup-form">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="form-input"
            />
            
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
            
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="form-input"
            />

            <button type="submit" className="signup-button">
              Sign Up
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
