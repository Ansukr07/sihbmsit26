import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [panelData, setPanelData] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState(user?.assignedPanel || 1);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token') || !user) { navigate('/login-bicep'); return; }
    setLoading(true);
    fetch('/api/panels').then((response) => response.json()).then((panels) => {
      const panel = panels.find((item) => item.panelNumber === Number(selectedPanel));
      setPanelData(panel); setCurrentTeamIndex(panel?.currentTeamIndex || 0);
    }).catch(() => setMessage('Unable to load your panel.')).finally(() => setLoading(false));
  }, [navigate, selectedPanel]);

  const save = async () => {
    setSaving(true); setMessage('');
    try {
      const response = await fetch('/api/panel', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ panelNumber: Number(selectedPanel), currentTeamIndex }) });
      if (!response.ok) throw new Error();
      setPanelData({ ...panelData, currentTeamIndex }); setMessage('Queue position updated.');
    } catch { setMessage('Could not update the queue.'); } finally { setSaving(false); }
  };

  if (loading) return <div className="dashboard-loading">Loading panel queue...</div>;
  if (!panelData) return <div className="dashboard-loading">Panel not found.</div>;
  return <main className="dashboard-container"><header className="dashboard-header"><div><p className="eyebrow">{user.role === 'admin' ? 'ADMIN CONTROL' : 'VOLUNTEER CONTROL'}</p><h1>Panel {String(panelData.panelNumber).padStart(2, '0')}</h1>{user.role === 'admin' && <select className="admin-panel-select" value={selectedPanel} onChange={(event) => setSelectedPanel(event.target.value)}>{[1, 2, 3, 4, 5].map((panel) => <option value={panel} key={panel}>Manage Panel {panel}</option>)}</select>}<span className="volunteer-badge">Live queue manager</span></div><button onClick={() => { localStorage.clear(); navigate('/login-bicep'); }} className="logout-btn">Log out</button></header><section className="dashboard-card"><div className="dashboard-card-title"><div><p className="eyebrow">PRESENTATION ORDER</p><h2>Select the team currently presenting</h2></div><span className="team-total">{panelData.teamsList.length} TEAMS</span></div><div className="admin-team-list">{panelData.teamsList.map((team, index) => <button type="button" className={`admin-team-row ${index === currentTeamIndex ? 'is-current' : ''}`} onClick={() => setCurrentTeamIndex(index)} key={`${team}-${index}`}><span className="team-number">{String(index + 1).padStart(2, '0')}</span><span>{team}</span>{index === currentTeamIndex && <span className="presenting-pill">ON STAGE</span>}</button>)}</div>{message && <p className="dashboard-msg">{message}</p>}<button className="save-btn" disabled={saving} onClick={save}>{saving ? 'Saving...' : 'Publish current team'}</button></section></main>;
};
export default Dashboard;
