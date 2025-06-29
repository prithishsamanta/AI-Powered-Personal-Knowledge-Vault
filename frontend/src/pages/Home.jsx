// src/pages/Home.jsx
import { useState } from 'react';
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

  const handleCardClick = (vaultId) => {
    // Open vault in new tab/window
    window.open(`/vault/${vaultId}`, '_blank');
  };

  const handleDeleteVault = (vaultId) => {
    setVaults(vaults.filter(vault => vault.id !== vaultId));
    setDropdownOpen(null);
  };

  const handleCreateVault = () => {
    const newVault = {
      id: Date.now(),
      title: "New Vault",
      description: "Click to add description",
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
          
          {/* Empty placeholder cards to fill the grid */}
          {/* {Array.from({ length: Math.max(0, 8 - vaults.length) }).map((_, index) => (
            <div key={`empty-${index}`} className="vault-card empty-card">
              <div className="empty-content">
                <span className="empty-text">Empty Slot</span>
              </div>
            </div>
          ))} */}
        </div>

        <button className="floating-add-button" onClick={handleCreateVault}>
          +
        </button>
      </div>
    </div>
  );
}

export default Home;
