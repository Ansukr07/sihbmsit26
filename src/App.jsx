import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />

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
