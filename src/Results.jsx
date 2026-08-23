import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Papa from 'papaparse';
import './ProblemStatements.css';
import './Results.css';

function Results() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/results.csv')
      .then(r => r.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: false, skipEmptyLines: true });
        const rows = parsed.data
          .filter(row => {
            const slNo = row[0]?.trim();
            return slNo && /^\d+$/.test(slNo); // only numbered rows
          })
          .map(row => ({
            teamName: row[1]?.trim() || '',
            psId: row[2]?.trim() || '',
            leaderName: row[3]?.trim() || '',
          }));
        setTeams(rows);
      });
  }, []);

  const filtered = teams.filter(r =>
    r.teamName.toLowerCase().includes(search.toLowerCase()) ||
    r.psId.toLowerCase().includes(search.toLowerCase()) ||
    r.leaderName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="ps-page">
      <h1 className="ps-title">RESULTS</h1>

      <div className="ps-content" style={{ alignItems: 'flex-start' }}>
        {/* Sidebar for Search */}
        <aside className="ps-sidebar results-sidebar" style={{ paddingTop: '0px', marginTop: '0px' }}>
          <div className="ps-filter-header" style={{ color: '#000', fontWeight: '700', fontSize: '24px' }}>
            <Search size={22} /> SEARCH
          </div>
          <div className="ps-search-wrap" style={{ marginTop: '16px', marginBottom: '16px' }}>
            <input
              className="ps-search results-search-input"
              placeholder="Search by team, PS ID, or leader..."
              value={search}
              onChange={handleSearch}
            />
            {search && <button className="ps-clear-btn" onClick={() => setSearch('')}><X size={14} /></button>}
          </div>
        </aside>

        <main className="ps-main" style={{ margin: '0', maxWidth: '1100px' }}>
          <div className="results-table-container">
            <div className="ps-table-header results-header">
              <div className="col-team">TEAM NAME</div>
              <div className="col-psid">PS ID</div>
              <div className="col-leader">LEADER NAME</div>
            </div>

            <div className="ps-table-body">
              {filtered.length === 0 ? (
                <div className="ps-empty">No results found.</div>
              ) : filtered.map((row, i) => (
                <div key={i} className="ps-table-row results-table-row">
                  <div className="ps-row-main results-row-main">
                    <div className="col-team ps-title-text">{row.teamName}</div>
                    <div className="col-psid">{row.psId}</div>
                    <div className="col-leader">{row.leaderName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Results;
