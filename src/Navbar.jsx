import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'PROBLEM STATEMENTS', path: '/problem-statements' },
    { label: 'TIMELINE', path: '/timeline' },
    { label: 'PPT FORMAT', isExternal: true, url: 'https://sih.gov.in/letters/2026/SIH2026-IDEA-Presentation-Format.pptx' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <img src="/bmsit.png" alt="BMSIT Logo" className="logo-img bmsit-logo" />
          <img src="/banner.png" alt="Logo" className="logo-img" />
        </div>
      </div>

      <div className="nav-middle">
        {navItems.map(item => (
          <div 
            key={item.label}
            className={`nav-item ${!item.isExternal && location.pathname === item.path ? 'active' : ''}`} 
            data-text={item.label}
            onClick={() => {
              if (item.isExternal) {
                window.open(item.url, '_blank');
                navigate('/');
              } else {
                navigate(item.path);
              }
            }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="nav-right">
        <div className="register-btn">
          REGISTER NOW
          <div className="arrow-icon-container">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
