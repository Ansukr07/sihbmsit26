import React from 'react';
import { ArrowRight } from 'lucide-react';
import PixelDivider from './PixelDivider';

function Home() {
  return (
    <>
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
      
      {/* Animated Pixel Art Divider */}
      <PixelDivider />

      {/* About SIH Section */}
      <section className="about-sih">
        <div className="about-container">
          <h2 className="about-title">About SIH 2026</h2>
          <div className="about-content">
            <p>
              Smart India Hackathon (SIH) is a premier nationwide initiative designed to engage students in solving some of the most pressing challenges faced in everyday life. Launched to foster a culture of innovation and practical problem-solving, SIH provides a dynamic platform for students to develop and showcase their creative solutions to real-world problems. By encouraging participants to think critically and innovatively, the hackathon aims to bridge the gap between academic knowledge and practical application.
            </p>
            <p>
              Since its inception, SIH has garnered significant success in promoting out-of-the-box thinking among young minds, particularly engineering students from across India. Each edition has built on the previous one, refining its approach and expanding its impact. The hackathon not only offers students an opportunity to showcase their skills but also encourages collaboration with industry experts, government agencies, and other stakeholders.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
