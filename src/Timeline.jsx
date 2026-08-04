import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css';
import { Globe, Megaphone } from 'lucide-react';

function Timeline() {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nodes = [
    // ROW 1 (Left to Right)
    {
      id: 1, row: 1, col: 2, zIndex: 3,
      direction: 'right', type: 'flat-left',
      title: '5 AUG 2026',
      desc: 'SIH 2026 Launch',
      color: '#062E6F'
    },
    {
      id: 2, row: 1, col: 3, zIndex: 2,
      direction: 'right', type: 'normal',
      title: '5 - 6 AUG 2026',
      desc: 'Internal Team Registration',
      color: '#094CB8'
    },
    {
      id: 3, row: 1, col: 4, zIndex: 1,
      direction: 'right', type: 'flat-right',
      title: '17 AUG 2026',
      desc: 'Idea/Prototype Presentation',
      color: '#2870E8'
    },
    
    // ROW 2 (Right to Left)
    {
      id: 4, row: 2, col: 4, zIndex: 3,
      direction: 'left', type: 'flat-right',
      title: '21 - 22 AUG 2026',
      desc: 'College Level Selection',
      color: '#2870E8'
    },
    {
      id: 5, row: 2, col: 3, zIndex: 2,
      direction: 'left', type: 'normal',
      title: '1ST WEEK OF SEP',
      desc: 'SIH Portal Submission',
      color: '#094CB8'
    },
    {
      id: 6, row: 2, col: 2, zIndex: 1,
      direction: 'left', type: 'flat-left',
      title: 'OCT-NOV 2026',
      desc: 'AICTE shortlisting for Grand Finale',
      color: '#062E6F'
    },

    // ROW 3 (Left to Right)
    {
      id: 7, row: 3, col: 2, zIndex: 3,
      direction: 'right', type: 'flat-left',
      title: 'DEC 2026',
      desc: 'SIH Grand Finals',
      color: '#062E6F'
    },
    {
      id: 8, row: 3, col: 3, zIndex: 2,
      direction: 'right', type: 'normal',
      title: 'DEC 2026',
      desc: 'Winners Felicitation and Recognition',
      color: '#094CB8'
    }
  ];

  return (
    <div className="timeline-page" ref={timelineRef}>
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
                className={`arrow-wrapper wrapper-chevron-${node.direction} wrapper-${node.type} animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
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
          <div className={`curve-container right-curve-container animate-on-scroll ${isVisible ? 'is-visible' : ''}`} style={{ gridColumn: 5, gridRow: '1 / span 2', zIndex: 0, animationDelay: '0.6s' }}>
            <div className="curve right-curve"></div>
          </div>

          {/* Left Curve (Spans Row 2 to 3) */}
          <div className={`curve-container left-curve-container animate-on-scroll ${isVisible ? 'is-visible' : ''}`} style={{ gridColumn: 1, gridRow: '2 / span 2', zIndex: 0, animationDelay: '1.2s' }}>
            <div className="curve left-curve"></div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Timeline;
