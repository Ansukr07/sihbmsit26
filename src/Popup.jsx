import React, { useState, useEffect } from 'react';
import { X, FileText, ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Popup.css';

function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') return undefined;
    // Check if the user has already dismissed the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenSihPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

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
        <h2>ROUND 3 SCHEDULE</h2>
        <p>The SIH 2026 Internal Hackathon Round 3 schedule is now available. Check your panel and time slot.</p>
        
        <div className="popup-links">
          <a href="https://docs.google.com/spreadsheets/d/1iQBTWr-k-abS8Mn8fATrdQo-6q_CanlarsunFUntYEs/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="popup-btn primary" onClick={handleClose}>
            <FileText size={18} />
            <span>Check Full Schedule</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Popup;
