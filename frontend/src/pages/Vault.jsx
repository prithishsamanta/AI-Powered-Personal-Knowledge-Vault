import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Vault.css';

function Vault() {
  const { vaultId } = useParams();
  const navigate = useNavigate();
  
  const [vaultData, setVaultData] = useState(null);
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Mock vault data - in real app this would come from API
  const mockVaults = {
    "1": { title: "Personal Notes", description: "Daily thoughts and ideas" },
    "2": { title: "Work Projects", description: "Project documentation" },
    "3": { title: "Learning Resources", description: "Study materials and courses" },
    "4": { title: "Recipes", description: "Favorite cooking recipes" },
    "5": { title: "Travel Plans", description: "Trip itineraries and memories" },
  };

  useEffect(() => {
    // Simulate loading vault data
    const vault = mockVaults[vaultId];
    if (vault) {
      setVaultData(vault);
      // Load saved notes from localStorage (in real app, this would be from database)
      const savedNotes = localStorage.getItem(`vault-${vaultId}-notes`) || '';
      const savedSummary = localStorage.getItem(`vault-${vaultId}-summary`) || '';
      setNotes(savedNotes);
      setSummary(savedSummary);
    }
  }, [vaultId]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    // Auto-save notes
    localStorage.setItem(`vault-${vaultId}-notes`, newNotes);
  };

  const handleGenerateSummary = async () => {
    if (!notes.trim()) {
      alert('Please write some notes first before generating a summary.');
      return;
    }

    setIsGeneratingSummary(true);
    
    // Simulate AI summary generation (replace with actual API call)
    setTimeout(() => {
      const generatedSummary = generateMockSummary(notes);
      setSummary(generatedSummary);
      localStorage.setItem(`vault-${vaultId}-summary`, generatedSummary);
      setIsGeneratingSummary(false);
    }, 2000);
  };

  const generateMockSummary = (text) => {
    // Simple mock summary generation
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordCount = text.split(/\s+/).length;
    
    return `Summary (${wordCount} words, ${sentences.length} sentences):

Key Points:
• This content covers ${sentences.length} main topics
• Contains approximately ${wordCount} words
• ${sentences.length > 3 ? 'Multiple ideas discussed' : 'Focused discussion'}

Main themes identified from your notes. This is a simplified summary - in a real application, this would use AI to generate meaningful summaries.`;
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  if (!vaultData) {
    return (
      <div className="vault-page">
        <div className="vault-loading">
          <h2>Vault not found</h2>
          <button className="back-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vault-page">
      <div className="vault-container">
        <header className="vault-header">
          <div className="vault-header-content">
            <button className="back-button" onClick={handleBackToHome}>
              ← Back to Home
            </button>
            <div className="vault-info">
              <h1 className="vault-title">{vaultData.title}</h1>
              <p className="vault-description">{vaultData.description}</p>
            </div>
          </div>
        </header>

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
                <p>Analyzing your notes and generating summary...</p>
              </div>
            ) : summary ? (
              <div className="summary-content">
                <pre className="summary-text">{summary}</pre>
              </div>
            ) : (
              <div className="summary-placeholder">
                <p>No summary generated yet. Write some notes and click "Generate Summary" to get an AI-powered summary of your content.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vault; 