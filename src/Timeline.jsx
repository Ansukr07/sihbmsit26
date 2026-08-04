import React from 'react';
import './Timeline.css';
import { Globe, Megaphone } from 'lucide-react';

function Timeline() {
  const nodes = [
    // ROW 1
    {
      id: 1, row: 1, col: 2, zIndex: 3,
      direction: 'right', type: 'flat-left',
      title: 'Jun-Aug 2026',
      desc: 'Registration of SPOCs',
      color: '#062E6F' // Darkest Blue
    },
    {
      id: 2, row: 1, col: 3, zIndex: 2,
      direction: 'right', type: 'normal',
      title: 'Jun-Aug 2026',
      desc: 'Internal Hackathon',
      color: '#094CB8' // Primary Blue
    },
    {
      id: 3, row: 1, col: 4, zIndex: 1,
      direction: 'right', type: 'flat-right',
      title: 'Jul-Aug 2026',
      desc: 'SIH Problem Statement Launch',
      color: '#2870E8' // Lighter Blue
    },
    
    // ROW 2 (Right to Left)
    {
      id: 4, row: 2, col: 4, zIndex: 3,
      direction: 'left', type: 'flat-right',
      title: 'Aug-Sept 2026',
      desc: 'Nomination of Top Teams & Submission of Ideas on Portal',
      color: '#2870E8'
    },
    {
      id: 5, row: 2, col: 3, zIndex: 2,
      direction: 'left', type: 'normal',
      title: 'Sep-Oct 2026',
      desc: 'Screening of Ideas',
      color: '#094CB8'
    },
    {
      id: 6, row: 2, col: 2, zIndex: 1,
      direction: 'left', type: 'flat-left',
      title: 'Oct 2026',
      desc: 'Result Publication',
      color: '#062E6F'
    },

    // ROW 3 (Left to Right)
    {
      id: 7, row: 3, col: 2, zIndex: 3,
      direction: 'right', type: 'flat-left',
      title: 'Nov 2026',
      desc: 'Mentoring & Training Sessions',
      color: '#062E6F'
    },
    {
      id: 8, row: 3, col: 3, zIndex: 2,
      direction: 'right', type: 'normal',
      title: 'Nov 2026',
      desc: 'Announcement of Shortlist Students for SIH Grand Finale',
      color: '#094CB8'
    },
    {
      id: 9, row: 3, col: 4, zIndex: 1,
      direction: 'right', type: 'normal',
      title: 'Dec 2026',
      desc: 'SIH Grand Finale',
      color: '#2870E8'
    }
  ];

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1>SIH'26 TIMELINE</h1>
      </div>

      <div className="timeline-container">
        <div className="timeline-grid">
          {nodes.map((node, index) => {
            let delay = (index + 1) * 0.15;
            if (index >= 3) delay += 0.15;
            if (index >= 6) delay += 0.15;

            return (
              <div 
                key={node.id}
                className={`arrow-wrapper wrapper-chevron-${node.direction} wrapper-${node.type}`}
                style={{
                  gridRow: node.row,
                  gridColumn: node.col,
                  zIndex: node.zIndex,
                  animationDelay: `${delay}s`
                }}
              >
                <div 
                  className={`timeline-arrow chevron-${node.direction} ${node.type}`}
                  style={{
                    backgroundColor: node.color,
                  }}
                >
                  <div className="arrow-content">
                    {node.title}
                  </div>
                </div>
                <div className="arrow-desc" style={{ color: node.color }}>
                  {node.desc}
                </div>
              </div>
            );
          })}

          {/* Right Curve (Spans Row 1 to 2) */}
          <div className="curve-container right-curve-container" style={{ gridColumn: 5, gridRow: '1 / span 2', zIndex: 0, animationDelay: '0.6s' }}>
            <div className="curve right-curve"></div>
            <div className="curve-badge right-badge">
              <div className="icon-circle">
                <Globe size={24} color="#fff" />
              </div>
              <div className="curve-date" style={{ color: '#fff' }}>Jul-Aug<br/>2026</div>
            </div>
            <div className="curve-side-text right-text" style={{ color: '#2870E8' }}>
              Internal Hackathon Report Compilation & Uploading on Portal
            </div>
          </div>

          {/* Left Curve (Spans Row 2 to 3) */}
          <div className="curve-container left-curve-container" style={{ gridColumn: 1, gridRow: '2 / span 2', zIndex: 0, animationDelay: '1.2s' }}>
            <div className="curve left-curve"></div>
            <div className="curve-badge left-badge">
              <div className="icon-circle">
                <Megaphone size={24} color="#fff" />
              </div>
              <div className="curve-date" style={{ color: '#fff' }}>Nov<br/>2026</div>
            </div>
            <div className="curve-side-text left-text" style={{ color: '#062E6F' }}>
              Communication of Result to Finalist Teams
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Timeline;
