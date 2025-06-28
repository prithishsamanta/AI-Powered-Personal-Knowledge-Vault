import { Link } from 'react-router-dom';
import '../styles/Signup.css';

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Your Knowledge Vault Account</h1>
        
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
            placeholder="Enter email"
            className="form-input"
          />
          
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-input"
          />
          
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="form-input confirm-password-input"
          />

          <button
            type="submit"
            className="signup-button"
          >
            Sign Up
          </button>
        </form>

        <p className="login-link-container">
          Already have an account?{' '}
          <Link to="/" className="login-link">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
