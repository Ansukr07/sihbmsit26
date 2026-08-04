import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import './ProblemStatements.css';
import { SlidersHorizontal, Plus, Minus, Search, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const THEMES = [
  "Agriculture, FoodTech & Rural Development",
  "Blockchain & Cybersecurity",
  "Clean & Green Technology",
  "Disaster Management",
  "Fitness & Sports",
  "Heritage & Culture",
  "MedTech / BioTech / HealthTech",
  "Miscellaneous",
  "Renewable / Sustainable Energy",
  "Robotics and Drones",
  "Robotics & Drones",
  "Smart Automation",
  "Smart Education",
  "Smart Vehicles",
  "Space Technology",
  "Transportation & Logistics",
  "Travel & Tourism",
  "Smart Resource Conservation",
  "Toys & Games",
];

// Normalize themes: collapse variants into one canonical name
function normalizeTheme(t) {
  if (!t) return 'Miscellaneous';
  const s = t.trim();
  if (s === 'Robotics & Drones' || s === 'Robotics and Drones') return 'Robotics & Drones';
  return s;
}

const PAGE_SIZE = 15;

function ProblemStatements() {
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [selectedThemes, setSelectedThemes] = useState(
    location.state?.filterTheme ? [location.state.filterTheme] : []
  );
  const [selectedType, setSelectedType] = useState('All'); // All | Software | Hardware
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load all CSVs
  useEffect(() => {
    const files = [
      { url: '/ps_2025.csv', year: 2025 },
      { url: '/ps_2024.csv', year: 2024 },
      { url: '/ps_2023.csv', year: 2023 },
    ];

    const mainLoader = files.map(f =>
      fetch(f.url)
        .then(r => r.text())
        .then(text => {
          const result = Papa.parse(text, { header: true, skipEmptyLines: true });
          return result.data.map((row, i) => {
            const id = row.Statement_id || row.ID || `${f.year}-${i}`;
            const category = row.Category || '';
            const theme = normalizeTheme(row.Technology_Bucket || row['Technology Bucket'] || '');
            const org = row.Organisation || row['Problem Creater\'s Organization'] || row.Organization || '';
            const title = row.Title || '';
            const desc = row.Description || '';
            return { id, category, theme, org, title, desc, year: f.year };
          }).filter(r => r.title && r.title !== 'Student Innovation');
        })
    );

    // Sheet5: only has Category (theme) and Title
    const sheet5Loader = fetch('/ps_sheet5.csv')
      .then(r => r.text())
      .then(text => {
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        return result.data.map((row, i) => ({
          id: `SIH26-S5-${String(i + 1).padStart(3, '0')}`,
          category: '',
          theme: normalizeTheme(row.Category || ''),
          org: '',
          title: row.Title || '',
          desc: '',
          year: 2026,
        })).filter(r => r.title);
      });

    Promise.all([...mainLoader, sheet5Loader]).then(results => {
      const combined = results.flat();
      
      // Add Open Innovation if not present
      if (!combined.some(p => p.id === 'SIH260001' || p.title.toLowerCase() === 'open innovation')) {
        combined.unshift({
          id: 'SIH260001',
          category: 'Software/Hardware',
          theme: 'Miscellaneous',
          org: 'Smart India Hackathon',
          title: 'Open Innovation',
          desc: 'Participants are free to build innovative solutions for any problem statement of their choice. You can pitch your own unique ideas and build a working prototype.',
          year: 2026
        });
      }

      setAllProblems(combined);
      setLoading(false);
    });
  }, []);

  // Unique themes from data
  const availableThemes = useMemo(() => {
    const set = new Set(allProblems.map(p => p.theme).filter(Boolean));
    return [...set].sort();
  }, [allProblems]);

  const toggleTheme = (theme) => {
    setSelectedThemes(prev =>
      prev.includes(theme) ? prev.filter(t => t !== theme) : [...prev, theme]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedThemes([]);
    setSelectedType('All');
    setSearch('');
    setPage(1);
  };

  const filtered = useMemo(() => {
    return allProblems.filter(p => {
      if (selectedThemes.length > 0 && !selectedThemes.includes(p.theme)) return false;
      if (selectedType !== 'All' && p.category !== selectedType) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) && 
          !p.org.toLowerCase().includes(q) && 
          !p.theme.toLowerCase().includes(q) &&
          !p.id.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [allProblems, selectedThemes, selectedType, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="ps-page">
      <h1 className="ps-title">PROBLEM STATEMENTS</h1>

      <div className="ps-toolbar">
        <div className="ps-search-wrap">
          <Search size={16} className="ps-search-icon" />
          <input
            className="ps-search"
            placeholder="Search by ID, title, organisation, or theme..."
            value={search}
            onChange={handleSearch}
          />
          {search && <button className="ps-clear-btn" onClick={() => { setSearch(''); setPage(1); }}><X size={14} /></button>}
        </div>
        <div className="ps-type-toggle">
          {['All', 'Software', 'Hardware'].map(t => (
            <button
              key={t}
              className={`type-btn ${selectedType === t ? 'active' : ''}`}
              onClick={() => { setSelectedType(t); setPage(1); }}
            >{t}</button>
          ))}
        </div>
        <span className="ps-count">{filtered.length} problem{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="ps-content">
        {/* Sidebar */}
        <aside className="ps-sidebar">
          <div className="ps-filter-header">
            <SlidersHorizontal size={16} /> FILTER BY THEME
          </div>
          {selectedThemes.length > 0 && (
            <button className="ps-clear-filters" onClick={clearFilters}>
              <X size={12} /> Clear all
            </button>
          )}
          <div className="ps-categories">
            {(isMobile && !showAllThemes ? availableThemes.slice(0, 5) : availableThemes).map(theme => (
              <label key={theme} className={`ps-checkbox-label ${selectedThemes.includes(theme) ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedThemes.includes(theme)}
                  onChange={() => toggleTheme(theme)}
                  className="ps-checkbox"
                />
                <span className="ps-checkbox-custom"></span>
                <span className="ps-checkbox-text">{theme}</span>
              </label>
            ))}
            {isMobile && availableThemes.length > 5 && (
              <button className="ps-show-more-btn" onClick={() => setShowAllThemes(prev => !prev)}>
                {showAllThemes ? <><ChevronUp size={14} /> Show Less</> : <><ChevronDown size={14} /> Show More ({availableThemes.length - 5}))</>}
              </button>
            )}
          </div>
        </aside>

        {/* Main Table */}
        <main className="ps-main">
          {loading ? (
            <div className="ps-loading">
              <div className="ps-spinner"></div>
              <p>Loading problem statements...</p>
            </div>
          ) : (
            <>
              <div className="ps-table-header">
                <div className="col-id">ID</div>
                <div className="col-itch">TITLE</div>
                <div className="col-org">ORGANISATION</div>
                <div className="col-theme">THEME</div>
                <div className="col-type">TYPE</div>
              </div>
              <div className="ps-table-body">
                {paginated.length === 0 ? (
                  <div className="ps-empty">No problems found. Try adjusting your filters.</div>
                ) : paginated.map((prob) => (
                  <div key={prob.id} className={`ps-table-row ${expandedId === prob.id ? 'expanded' : ''}`}>
                    <div className={`ps-row-main ${prob.desc ? 'has-desc' : ''}`}>
                      <div className="col-id ps-id-badge">{prob.id}</div>
                      <div 
                        className={`col-itch ps-title-text ${prob.desc ? 'clickable-title' : ''}`}
                        onClick={() => prob.desc && setExpandedId(expandedId === prob.id ? null : prob.id)}
                      >
                        {prob.title}
                        {prob.desc && (
                          <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '8px', color: '#888' }}>
                            {expandedId === prob.id ? <Minus size={15} /> : <Plus size={15} />}
                          </span>
                        )}
                      </div>
                      <div className="col-org">{prob.org}</div>
                      <div className="col-theme">
                        <span className="ps-theme-tag">{prob.theme}</span>
                      </div>
                      <div className="col-type">
                        <span className={`ps-type-badge ${prob.category?.toLowerCase()}`}>{prob.category}</span>
                      </div>
                      {expandedId === prob.id && prob.desc && (
                        <div className="ps-row-desc" onClick={e => e.stopPropagation()}>
                          <p>{prob.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="ps-pagination">
                  <button
                    className="ps-page-btn"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  ><ChevronLeft size={16} /></button>
                  <span className="ps-page-info">Page {page} of {totalPages}</span>
                  <button
                    className="ps-page-btn"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  ><ChevronRight size={16} /></button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProblemStatements;
