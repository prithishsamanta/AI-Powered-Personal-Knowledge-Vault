import { useState } from 'react';
import AddVaultModal from '../components/AddVaultModal';
import '../styles/Home.css';

function Home() {
  const [userName] = useState("John Doe"); // This would come from user data
  const [vaults, setVaults] = useState([
    { id: 1, title: "Personal Notes", description: "Daily thoughts and ideas", lastModified: "2 days ago" },
    { id: 2, title: "Work Projects", description: "Project documentation", lastModified: "1 week ago" },
    { id: 3, title: "Learning Resources", description: "Study materials and courses", lastModified: "3 days ago" },
    { id: 4, title: "Recipes", description: "Favorite cooking recipes", lastModified: "5 days ago" },
    { id: 5, title: "Travel Plans", description: "Trip itineraries and memories", lastModified: "1 day ago" },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCardClick = (vaultId) => {
    // Open vault in new tab/window
    window.open(`/vault/${vaultId}`, '_blank');
  };

  const handleDeleteVault = (vaultId) => {
    setVaults(vaults.filter(vault => vault.id !== vaultId));
    setDropdownOpen(null);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCreateVault = (vaultData) => {
    const newVault = {
      id: Date.now(),
      title: vaultData.title,
      description: vaultData.description,
      lastModified: "Just now"
    };
    setVaults([...vaults, newVault]);
  };

  const toggleDropdown = (vaultId, e) => {
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === vaultId ? null : vaultId);
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <header className="home-header">
          <h1 className="welcome-message">Hi {userName}!</h1>
          <p className="intro-text">Welcome back to your Personal Knowledge Vault. Organize and access all your important information in one secure place.</p>
        </header>

        <div className="vaults-grid">
          {vaults.map((vault) => (
            <div
              key={vault.id}
              className="vault-card"
              onClick={() => handleCardClick(vault.id)}
            >
              <div className="card-header">
                <h3 className="vault-title">{vault.title}</h3>
                <div className="card-menu">
                  <button
                    className="menu-button"
                    onClick={(e) => toggleDropdown(vault.id, e)}
                  >
                    ⋯
                  </button>
                  {dropdownOpen === vault.id && (
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item delete-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVault(vault.id);
                        }}
                      >
                        Delete Vault
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="vault-description">{vault.description}</p>
              <span className="last-modified">Last modified: {vault.lastModified}</span>
            </div>
          ))}
          
          
        </div>

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