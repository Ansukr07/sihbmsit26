import React, { useState, useEffect } from 'react';
import { X, FileText, Download } from 'lucide-react';
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
        <h2>IMPORTANT DOCUMENTS</h2>
        <p>Please review the evaluation rubrics and official guidelines for the SIH 2026 Internal Hackathon.</p>
        
        <div className="popup-links">
          <a href="/evaluation_rubrics.pdf" target="_blank" rel="noopener noreferrer" className="popup-btn">
            <FileText size={18} />
            <span>Evaluation Rubrics</span>
            <Download size={16} />
          </a>
          <a href="/sih_guidelines.pdf" target="_blank" rel="noopener noreferrer" className="popup-btn primary">
            <FileText size={18} />
            <span>SIH 2026 Guidelines</span>
            <Download size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Popup;
