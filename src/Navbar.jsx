import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <img src="/bmsit.png" alt="BMSIT Logo" className="logo-img bmsit-logo" />
          <img src="/banner.png" alt="Logo" className="logo-img" />
        </div>
      </div>

      <div className="nav-middle">
        <div className="nav-item active" data-text="HOME">HOME</div>
        <div className="nav-item" data-text="PROBLEM STATEMENTS">PROBLEM STATEMENTS</div>
        <div className="nav-item" data-text="FAQS">FAQS</div>
        <div className="nav-item" data-text="PPT">PPT</div>
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
