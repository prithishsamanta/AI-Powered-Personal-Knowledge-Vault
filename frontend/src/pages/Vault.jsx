import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vaultAPI } from '../services/api';
import LogoutButton from '../components/LogoutButton';
import '../styles/Vault.css';

function Vault() {
  const { vaultId } = useParams();
  const navigate = useNavigate();
  
  const [vaultData, setVaultData] = useState(null);
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

  // Load vault data from API
  useEffect(() => {
    const loadVault = async () => {
      if (!vaultId) {
        setError('No vault ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const vault = await vaultAPI.getVaultById(vaultId);
        setVaultData(vault);
        setNotes(vault.notes || '');
        setSummary(vault.summary || '');
      } catch (error) {
        console.error('Error loading vault:', error);
        setError(error.message || 'Failed to load vault');
        
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

    loadVault();
  }, [vaultId, navigate]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

  const handleNotesChange = async (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    
    // Auto-save notes to API (with debouncing)
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    setAutoSaveTimeout(setTimeout(async () => {
      try {
        setIsSaving(true);
        await vaultAPI.updateVault(vaultId, { notes: newNotes });
        console.log('Notes saved successfully');
      } catch (error) {
        console.error('Error saving notes:', error);
        setError('Failed to save notes');
      } finally {
        setIsSaving(false);
      }
    }, 1000)); // Save after 1 second of no typing
  };

  const handleGenerateSummary = async () => {
    if (!notes.trim()) {
      alert('Please write some notes first before generating a summary.');
      return;
    }

    setIsGeneratingSummary(true);
    setError('');
    
    try {
      // Call the OpenAI API to generate summary
      const response = await vaultAPI.generateSummary(vaultId);
      const generatedSummary = response.summary;
      
      setSummary(generatedSummary);
      console.log('AI Summary generated and saved successfully');
      
    } catch (error) {
      console.error('Error generating summary:', error);
      setError(error.message || 'Failed to generate summary. Please try again.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };



  const handleBackToHome = () => {
    navigate('/home');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="vault-page">
        <div className="vault-container">
          <header className="vault-header">
            <div className="vault-header-content">
              <div className="vault-header-left">
                <button className="back-button" onClick={handleBackToHome}>
                  ← Back to Home
                </button>
                <div className="vault-info">
                  <h1 className="vault-title">Loading...</h1>
                  <p className="vault-description">Please wait while we load your vault</p>
                </div>
              </div>
              <div className="vault-header-right">
                <LogoutButton />
              </div>
            </div>
          </header>
          
          <div className="vault-loading">
            <h2>Loading vault...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !vaultData) {
    return (
      <div className="vault-page">
        <div className="vault-container">
          <header className="vault-header">
            <div className="vault-header-content">
              <div className="vault-header-left">
                <button className="back-button" onClick={handleBackToHome}>
                  ← Back to Home
                </button>
                <div className="vault-info">
                  <h1 className="vault-title">Error Loading Vault</h1>
                  <p className="vault-description">Unable to load vault data</p>
                </div>
              </div>
              <div className="vault-header-right">
                <LogoutButton />
              </div>
            </div>
          </header>
          
          <div className="vault-loading">
            <h2>Error Loading Vault</h2>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Vault not found state
  if (!vaultData) {
    return (
      <div className="vault-page">
        <div className="vault-container">
          <header className="vault-header">
            <div className="vault-header-content">
              <div className="vault-header-left">
                <button className="back-button" onClick={handleBackToHome}>
                  ← Back to Home
                </button>
                <div className="vault-info">
                  <h1 className="vault-title">Vault Not Found</h1>
                  <p className="vault-description">The requested vault does not exist</p>
                </div>
              </div>
              <div className="vault-header-right">
                <LogoutButton />
              </div>
            </div>
          </header>
          
          <div className="vault-loading">
            <h2>Vault not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vault-page">
      <div className="vault-container">
        <header className="vault-header">
          <div className="vault-header-content">
            <div className="vault-header-left">
              <button className="back-button" onClick={handleBackToHome}>
                ← Back to Home
              </button>
              <div className="vault-info">
                <h1 className="vault-title">{vaultData.title}</h1>
                <p className="vault-description">{vaultData.description}</p>
              </div>
            </div>
            <div className="vault-header-right">
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Error/Status Messages */}
        {error && <div className="error-message">{error}</div>}
        {isSaving && <div className="saving-status">Saving...</div>}

        <div className="vault-content">
          <div className="notes-section">
            <div className="section-header">
              <h2 className="section-title">Your Notes</h2>
              <span className="notes-count">
                {notes.split(/\s+/).filter(word => word.length > 0).length} words
              </span>
            </div>
            <textarea
              className="notes-textarea"
              placeholder="Start writing your notes here..."
              value={notes}
              onChange={handleNotesChange}
              rows={15}
            />
          </div>

          <div className="summary-section">
            <div className="section-header">
              <h2 className="section-title">AI Summary</h2>
              <button
                className="generate-summary-button"
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary || !notes.trim()}
              >
                {isGeneratingSummary ? 'Generating...' : 'Generate Summary'}
              </button>
            </div>
            
            {isGeneratingSummary ? (
              <div className="summary-loading">
                <div className="loading-spinner"></div>
                <p>🤖 AI is analyzing your notes and generating summary...</p>
              </div>
            ) : summary ? (
              <div className="summary-content">
                <pre className="summary-text">{summary}</pre>
              </div>
            ) : (
              <div className="summary-placeholder">
                <p>💡 No summary generated yet. Write some notes and click "Generate Summary" to get an AI-powered summary using OpenAI GPT-3.5 Turbo!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vault; 