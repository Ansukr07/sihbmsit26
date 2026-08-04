import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      try {
        const currentScrollY = window.scrollY;
        
        // 1. Visibility Logic
        if (currentScrollY > 100) {
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
            setMenuOpen(false); // close drawer if open while hiding
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

  const handleNav = (item) => {
    setMenuOpen(false);
    if (item.isExternal) {
      window.open(item.url, '_blank');
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <img src="/bmsit.png" alt="BMSIT Logo" className="logo-img bmsit-logo" />
            <img src="/banner.png" alt="Logo" className="logo-img" />
          </div>
        </div>

        {/* Desktop nav pills */}
        <div className={`nav-middle ${!isVisible ? 'hidden' : ''} ${isDark ? 'dark' : ''}`}>
          {navItems.map(item => (
            <div
              key={item.label}
              className={`nav-item ${!item.isExternal && location.pathname === item.path ? 'active' : ''}`}
              data-text={item.label}
              onClick={() => handleNav(item)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Desktop register button */}
        <div className="nav-right">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdEHOL10ezcq18ope3fUbBe3tWrWX947nSbOzlA4_pQBHznlw/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="register-btn">
              REGISTER NOW
              <div className="arrow-icon-container">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            </div>
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={`nav-hamburger ${!isVisible ? 'hidden' : ''} ${isDark ? 'dark' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <Menu size={22} strokeWidth={2} />
        </button>
      </nav>

      {/* Dimmed overlay */}
      <div
        className={`nav-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-in drawer */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
        {/* Drawer header */}
        <div className="nav-drawer-header">
          <div className="nav-drawer-logo">
            <img src="/bmsit.png" alt="BMSIT Logo" />
            <img src="/banner.png" alt="Logo" />
          </div>
          <button
            className="nav-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Drawer nav items */}
        <div className="nav-drawer-items">
          {navItems.map(item => (
            <div
              key={item.label}
              className={`nav-drawer-item ${!item.isExternal && location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNav(item)}
            >
              {item.label}
              <ChevronRight size={16} strokeWidth={2} />
            </div>
          ))}
        </div>

        {/* Register button at bottom */}
        <div className="nav-drawer-register">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdEHOL10ezcq18ope3fUbBe3tWrWX947nSbOzlA4_pQBHznlw/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="register-btn">
              REGISTER NOW
              <div className="arrow-icon-container">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
