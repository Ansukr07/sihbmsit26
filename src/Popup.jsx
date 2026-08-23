import React, { useState, useEffect } from 'react';
import { X, FileText, ExternalLink } from 'lucide-react';
import './Popup.css';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenSihPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenSihPopup', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>
        <h2>🎉 RESULTS ANNOUNCED</h2>
        <p>The SIH 2026 Internal Hackathon results are now live! Check if your team has made it to the top 100.</p>
        
        <div className="popup-links">
          <a href="/results" className="popup-btn highlight" onClick={handleClose}>
            <FileText size={18} />
            <span>View Results</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Popup;
