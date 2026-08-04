import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      try {
        const currentScrollY = window.scrollY;
        
        // 1. Visibility Logic
        if (currentScrollY > 100) {
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }
        
        lastScrollY = currentScrollY;

        // 2. Theme Detection
        const darkSections = document.querySelectorAll('.dark-section');
        let currentlyOverDark = false;
        
        const navMidpoint = 45;
        
        darkSections.forEach(section => {
          if (!section) return;
          const rect = section.getBoundingClientRect();
          if (rect.top <= navMidpoint && rect.bottom >= navMidpoint) {
            currentlyOverDark = true;
          }
        });

        setIsDark(currentlyOverDark);
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'PROBLEM STATEMENTS', path: '/problem-statements' },
    { label: 'TIMELINE', path: '/timeline' },
    { label: 'PPT FORMAT', isExternal: true, url: 'https://sih.gov.in/letters/2026/SIH2026-IDEA-Presentation-Format.pptx' }
  ];

  return (
    <nav className={`navbar ${!isVisible ? 'navbar-hidden' : ''} ${isDark ? 'navbar-dark' : ''}`}>
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
