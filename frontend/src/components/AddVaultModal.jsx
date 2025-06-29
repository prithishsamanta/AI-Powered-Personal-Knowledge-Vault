import { useState } from 'react';
import '../styles/AddVaultModal.css';

function AddVaultModal({ isOpen, onClose, onCreateVault }) {
  const [vaultName, setVaultName] = useState('');
  const [vaultDescription, setVaultDescription] = useState('');

  const handleCancel = () => {
    setVaultName('');
    setVaultDescription('');
    onClose();
  };

  const handleGenerate = () => {
    if (vaultName.trim()) {
      onCreateVault({
        title: vaultName.trim(),
        description: vaultDescription.trim() || "Click to add description"
      });
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="add-modal">
        <div className="modal-header">
          <h2 className="modal-title">Create New Vault</h2>
          <button className="close-button" onClick={handleCancel}>
            ×
          </button>
        </div>
        
        <div className="modal-content">
          <div className="input-group">
            <label className="input-label">Vault Name</label>
            <input
              type="text"
              className="modal-input"
              placeholder="Enter vault name"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              className="modal-textarea"
              placeholder="Enter vault description"
              value={vaultDescription}
              onChange={(e) => setVaultDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            className="generate-button" 
            onClick={handleGenerate}
            disabled={!vaultName.trim()}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVaultModal; 