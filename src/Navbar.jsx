import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <div className="logo-icon">
             <div className="logo-block"></div>
             <div className="logo-block empty"></div>
             <div className="logo-block"></div>
             <div className="logo-block"></div>
          </div>
          CANTOR8
        </div>
      </div>

      <div className="nav-middle">
        <div className="nav-item active" data-text="Home">Home</div>
        <div className="nav-item" data-text="Products">Products</div>
        <div className="nav-item" data-text="Partners">Partners</div>
        <div className="nav-item" data-text="News">News</div>
        <div className="nav-item" data-text="Blog">Blog</div>
      </div>

      <div className="nav-right">
        <div className="nav-item" data-text="Career">Career</div>
        <div className="nav-item" data-text="Company">Company</div>
        <div className="get-in-touch-btn">
          Get in Touch
          <div className="arrow-icon-container">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
