import React, { useEffect, useState } from 'react';
import './Round3.css';

const Round3 = () => {
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const response = await fetch('/api/panels');
        if (response.ok) setPanels(await response.json());
      } catch (error) { console.error('Error fetching panels:', error); }
      finally { setLoading(false); }
    };
    fetchPanels();
    const interval = setInterval(fetchPanels, 5000);
    return () => clearInterval(interval);
  }, []);

  return <main className="round3-container">
    <header className="round3-header"><div><p className="eyebrow">BMSIT&amp;M · INTERNAL HACKATHON</p><h1 className="round3-title">Round 3 <span>Team queue</span></h1></div></header>
    {loading && !panels.length ? <div className="loading-state">Loading team queues...</div> : <div className="panels-grid">
      {panels.slice(0, 5).map((panel) => {
        const teams = panel.teamsList || [];
        const current = Math.max(0, Math.min(panel.currentTeamIndex ?? 0, teams.length - 1));
        const visibleTeams = [0, 1, 2].map((offset) => ({ team: teams[(current + offset) % teams.length], index: (current + offset) % teams.length, label: offset === 0 ? 'ONGOING' : 'NEXT' })).filter((item) => item.team);
        return <section className="panel-card" key={panel._id || panel.panelNumber}>
          <div className="panel-card-head"><span className="panel-kicker">PANEL</span><h2>{String(panel.panelNumber).padStart(2, '0')}</h2><span className="queue-count">3 IN QUEUE</span></div>
          <div className="team-list">{visibleTeams.map(({ team, index, label }) => <div className={`team-row ${label === 'ONGOING' ? 'is-current' : ''}`} key={`${team}-${index}`}><span className="team-number">{String(index + 1).padStart(2, '0')}</span><span className="team-name">{team}</span><span className="presenting-pill">{label}</span></div>)}</div>
        </section>;
      })}
    </div>}
  </main>;
};

export default Round3;
