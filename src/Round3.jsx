import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import './Round3.css';

const Round3 = () => <main className="round3-container round3-not-started">
  <header className="round3-header"><div><p className="eyebrow">BMSIT&amp;M · INTERNAL HACKATHON</p><h1 className="round3-title">Round 3 <span>Team queue</span></h1></div></header>
  <section className="round3-status-card"><p className="round3-status-kicker">ROUND 3 STATUS</p><h2>Round isn’t started yet</h2><p>The live panel queue will appear here when Round 3 begins.</p><div className="round3-status-actions"><Link className="round3-schedule-link" to="/">HOME</Link><a className="round3-schedule-link" href="https://docs.google.com/spreadsheets/d/1iQBTWr-k-abS8Mn8fATrdQo-6q_CanlarsunFUntYEs/edit?usp=sharing" target="_blank" rel="noopener noreferrer">CHECK FULL SCHEDULE <ExternalLink size={18} /></a></div></section>
</main>;

export default Round3;
