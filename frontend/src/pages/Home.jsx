import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddVaultModal from '../components/AddVaultModal';
import { vaultAPI } from '../services/api';  // ← Import vaultAPI
import '../styles/Home.css';

function Home() {
  const [userName, setUserName] = useState('');
  const [vaults, setVaults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  // ← Load user data and vaults on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
          setUserName(user.name);
        } else {
          // Redirect to login if no user data
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        navigate('/');
      }
    };

    const loadVaults = async () => {
      try {
        setIsLoading(true);
        const vaultsData = await vaultAPI.getVaults();
        setVaults(vaultsData);
      } catch (error) {
        console.error('Error loading vaults:', error);
        setError(error.message || 'Failed to load vaults');
        
        // If authentication error, redirect to login
        if (error.message.includes('authentication') || error.message.includes('token')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
    loadVaults();
  }, [navigate]);

  const handleCardClick = async (vaultId) => {
    try{
      navigate(`/vault/${vaultId}`);
    }
    catch(error){
      console.error('Error loading vault:', error);
      setError(error.message || 'Failed to load vault');
    }
  };

  // ← Updated to call API
  const handleDeleteVault = async (vaultId) => {
    try {
      await vaultAPI.deleteVault(vaultId);
      setVaults(vaults.filter(vault => vault._id !== vaultId));  // ← Use _id (MongoDB field)
      setDropdownOpen(null);
      setSuccess('Vault deleted successfully');
    } catch (error) {
      setError(error.message || 'Failed to delete vault');
    }
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setError(''); // Clear any errors
    setSuccess(''); // Clear any success messages
  };

  const handleCreateVault = async (vaultData) => {
    try {
      setError(''); // Clear any previous errors
      const response = await vaultAPI.createVault(vaultData);
      setVaults([response.vault, ...vaults]);
      setSuccess('Vault created successfully');
      setShowAddModal(false);
    } catch (error) {
      console.error('Create vault error:', error);
      setError(error.message || 'Failed to create vault');
      
      // If authentication error, redirect to login
      if (error.message.includes('authentication') || error.message.includes('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      }
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/');
  };

  const toggleDropdown = (vaultId, e) => {
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === vaultId ? null : vaultId);
  };

  // ← Clear messages after timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="home-page">
      <div className="home-content">
        <header className="home-header">
          <div className="home-header-top">
            <div className="home-welcome">
              <h1 className="welcome-message">Hi {userName}!</h1>
              <p className="intro-text">Welcome back to your Personal Knowledge Vault. Organize and access all your important information in one secure place.</p>
            </div>
            <button className="home-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        

        {/* ← Error/Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* ← Loading State */}
        {isLoading ? (
          <div className="loading-message">Loading your vaults...</div>
        ) : (
          <div className="vaults-grid">
            {vaults.length === 0 ? (
              <div className="no-vaults-message">
                <p>No vaults yet. Create your first vault to get started!</p>
              </div>
            ) : (
              vaults.map((vault) => (
                <div
                  key={vault._id}  
                  className="vault-card"
                  onClick={() => handleCardClick(vault._id)}
                >
                  <div className="card-header">
                    <h3 className="vault-title">{vault.title}</h3>
                    <div className="card-menu">
                      <button
                        className="menu-button"
                        onClick={(e) => toggleDropdown(vault._id, e)}
                      >
                        ⋯
                      </button>
                      {dropdownOpen === vault._id && (
                        <div className="dropdown-menu">
                          <button
                            className="dropdown-item delete-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteVault(vault._id);
                            }}
                          >
                            Delete Vault
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="vault-description">{vault.description}</p>
                  <span className="last-modified">
                    Last modified: {new Date(vault.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        <button className="floating-add-button" onClick={handleShowAddModal}>
          +
        </button>

        <AddVaultModal
          isOpen={showAddModal}
          onClose={handleCloseAddModal}
          onCreateVault={handleCreateVault}
        />
      </div>
    </div>
  );
}

export default Home;