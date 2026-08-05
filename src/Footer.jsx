import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';
import './Footer.css';
import ecellLogo from './assets/ecell-p.webp';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logos">
            <img src="/bmsit.png" alt="BMSIT Logo" className="footer-logo bmsit-logo" />
            <img src={ecellLogo} alt="E-Cell Logo" className="footer-logo ecell-logo" />
            <div className="footer-banner-wrapper">
              <img src="/banner.png" alt="SIH Banner" className="footer-logo banner-original" />
              <img src="/banner.png" alt="SIH Banner" className="footer-logo banner-tinted" />
            </div>
            <h2 className="footer-mobile-title">SIH 2026</h2>
          </div>
          <p className="footer-description">
            Empowering students to solve the most pressing challenges of our time through innovation, collaboration, and technology.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/problem-statements">Problem Statements</Link></li>
              <li><Link to="/timeline">Timeline</Link></li>
              <li><a href="https://sih.gov.in/letters/2026/SIH2026-IDEA-Presentation-Format.pptx" target="_blank" rel="noopener noreferrer">PPT Format</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={16} className="pin-icon" />
                <span>
                  BMS Institute of Technology and Management<br />
                  Yelahanka, Bengaluru, Karnataka 560064
                </span>
              </li>
              <li>
                <Mail size={16} className="pin-icon" />
                <a href="mailto:ecell@bmsit.in">ecell@bmsit.in</a>
              </li>
              <li className="footer-person">
                <strong>SIH SPOC:</strong> Prof. S. Mahalakshmi (+91 9060393410)
              </li>
              <li className="footer-person">
                <strong>Faculty Coordinator:</strong> Prof. Shama S H (+91 9743939846)
              </li>
              <li className="footer-person">
                <strong>Student Coordinator:</strong>
                <span className="student-names">
                  Vaibhav B (+91 9141194259)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Smart India Hackathon '26 - BMSIT&M. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
