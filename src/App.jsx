import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="app-container">
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
          <div className="nav-item active">Home</div>
          <div className="nav-item">Products</div>
          <div className="nav-item">Partners</div>
          <div className="nav-item">News</div>
          <div className="nav-item">Blog</div>
        </div>

        <div className="nav-right">
          <div className="nav-item">Career</div>
          <div className="nav-item">Company</div>
          <div className="get-in-touch-btn">
            Get in Touch
            <div className="arrow-icon-container">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </nav>

      <main className="content">
        <h1 className="hero-text">
          Enterprise-Grade<br />
          Infrastructure on Canton
        </h1>
        <div className="hero-get-in-touch">
          Get in Touch
          <div className="arrow-icon-container">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </main>

      <div className="scroll-down">SCROLL DOWN</div>
    </div>
  );
}

export default App;
