import React from 'react';
import { ExternalLink } from 'lucide-react';
import './Round3.css';

const scheduleUrl = 'https://docs.google.com/spreadsheets/d/1lyb71mVJRJLZ1gDkzmXoivYntlzBayD4XlrvgJTeD8g/edit?gid=395225848#gid=395225848';

const Round3 = () => <main className="round3-container round3-not-started">
  <header className="round3-header"><div><p className="eyebrow">BMSIT&amp;M · INTERNAL HACKATHON</p><h1 className="round3-title">Round 3 <span>Team queue</span></h1></div></header>
  <section className="round3-status-card"><p className="round3-status-kicker">ROUND 3 STATUS</p><h2>Round isn’t started yet</h2><p>The live panel queue will appear here when Round 3 begins.</p><a className="round3-schedule-link" href={scheduleUrl} target="_blank" rel="noopener noreferrer">VIEW ROUND 3 SCHEDULE <ExternalLink size={18} /></a></section>
</main>;

export default Round3;
