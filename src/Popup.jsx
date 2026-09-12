import React, { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        <h2>ROUND 3 RESULTS ANNOUNCED</h2>
        <p>The SIH 2026 Internal Hackathon Round 3 results have been announced.</p>
        <div className="popup-links">
          <Link to="/results" className="popup-btn primary" onClick={handleClose}>
            <FileText size={18} />
            <span>View Results</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Popup;
