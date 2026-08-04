import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import './Footer.css';

// Inline SVGs for brand icons (since lucide removed them)
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logos">
            <img src="/bmsit.png" alt="BMSIT Logo" className="footer-logo bmsit-logo" />
            <img src="/banner.png" alt="SIH Banner" className="footer-logo" />
          </div>
          <p className="footer-description">
            Empowering students to solve the most pressing challenges of our time through innovation, collaboration, and technology.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
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
              <li className="footer-person">
                <strong>SIH SPOC:</strong> Prof. S. Mahalakshmi (+91 9060393410)
              </li>
              <li className="footer-person">
                <strong>Faculty Coordinator:</strong> Prof. Shama S H (+91 9743939846)
              </li>
              <li className="footer-person">
                <strong>Student Coordinators:</strong>
                <span className="student-names">
                  Vaibhav B (+91 9141194259)<br />
                  Vaibhav (+91 9141194259)
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
