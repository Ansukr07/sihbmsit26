import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PixelDivider from './PixelDivider';
import Themes from './Themes';
import Timeline from './Timeline';

function Home() {
  return (
    <>
      <main className="content hero-section">
        <div className="hero-text-block">
          <div className="hero-subtitle" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img src="/bmsit-text-logo.png" alt="BMS Institute of Technology & Management" style={{ maxWidth: '90vw', maxHeight: '50px', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'Aux Mono', fontSize: 'clamp(16px, 3vw, 28px)', color: 'var(--black-text)', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>presents</span>
          </div>
          <div className="hero-line offset-1">
            SMART INDIA HACKATHON
          </div>
          <div className="hero-line offset-2" style={{ flexWrap: 'nowrap' }}>
            <ArrowRight size={72} strokeWidth={3} className="pixel-arrow" style={{ opacity: 0, pointerEvents: 'none' }} />
            (INTERNAL) 
            <ArrowRight size={72} strokeWidth={3} className="pixel-arrow" />
          </div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdEHOL10ezcq18ope3fUbBe3tWrWX947nSbOzlA4_pQBHznlw/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="home-register-wrapper" style={{ textDecoration: 'none' }}>
            <div className="register-btn hero-register-btn">
              REGISTER NOW
              <div className="arrow-icon-container">
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </div>
            </div>
          </a>
        </div>
      </main>

      <section className="schedule-announcement" aria-label="Round 3 schedule announcement">
        <div>
          <p className="schedule-kicker">ANNOUNCEMENT · ROUND 3</p>
          <h2>Internal Hackathon schedule is live.</h2>
          <p>Check your assigned panel, time slot, and team order in the official Round 3 schedule.</p>
        </div>
        <a href="https://docs.google.com/spreadsheets/d/1lyb71mVJRJLZ1gDkzmXoivYntlzBayD4XlrvgJTeD8g/edit?gid=395225848#gid=395225848" target="_blank" rel="noopener noreferrer" className="schedule-announcement-link">VIEW SCHEDULE <ArrowUpRight size={22} strokeWidth={2.5} /></a>
      </section>
      
      {/* Animated Pixel Art Divider (White to Blue) */}
      <PixelDivider />

      {/* About SIH Section */}
      <section className="about-sih dark-section">
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

      {/* Blue to Black Divider */}
      <PixelDivider topColor="#094CB8" bottomColor="#151515" accentColor="#5CE1E6" />

      {/* Themes Intro Section */}
      <div className="themes-intro-header dark-section">
        <h1 className="themes-intro-title">
          THEMES
        </h1>
        <Link to="/problem-statements" className="themes-intro-btn">
          View Problem Statements
          <ArrowRight size={20} strokeWidth={2.5} />
        </Link>
      </div>

      {/* Wired Themes Page */}
      <Themes />

      {/* Black to White Divider */}
      <PixelDivider topColor="#151515" bottomColor="#ffffff" accentColor="#5CE1E6" />

      {/* Wired Timeline Page */}
      <Timeline />
    </>
  );
}

export default Home;
