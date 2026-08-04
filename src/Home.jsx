import React from 'react';
import { ArrowRight } from 'lucide-react';

function Home() {
  return (
    <main className="content hero-section">
      <div className="hero-text-block">
        <div className="hero-line offset-1">
          SMART INDIA <ArrowRight size={72} strokeWidth={3} className="pixel-arrow" />
        </div>
        <div className="hero-line offset-2">
          HACKATHON '26
        </div>
        <div className="hero-line offset-3">
          - BMSIT&M <ArrowRight size={72} strokeWidth={3} className="pixel-arrow" />
        </div>
      </div>
    </main>
  );
}

export default Home;
