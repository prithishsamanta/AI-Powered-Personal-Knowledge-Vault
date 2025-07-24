import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/');
  };

  // Get user name for display
  const userData = localStorage.getItem('user');
  const userName = userData ? JSON.parse(userData).name : 'User';

  return (
    <div className="logout-container">
      <span className="user-greeting">Hello, {userName}</span>
      <button 
        className="logout-button" 
        onClick={handleLogout}
        title="Logout"
      >
        <svg 
          className="logout-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Logout
      </button>
    </div>
  );
}

export default LogoutButton; 