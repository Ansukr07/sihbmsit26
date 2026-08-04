import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowBlue from './assets/arrow-blue.svg';
import './Themes.css';

import img1 from './assets/69e8e7c60a6abb7aa2a22804_1.avif';
import img2 from './assets/69e8e7e111ff24e3c98f554f_2.avif';
import img3 from './assets/69e8e7fa4812ec414dd4259a_3.avif';
import img4 from './assets/69e8e81fe098f5b0efd912cb_4.avif';
import img5 from './assets/69e8e836bfb42beb22debfda_5.avif';
import img6 from './assets/69e8e850581a392f2a2ade3b_6.avif';
import img7 from './assets/69e8e8712b289d1273ca9a19_7.avif';

const themeImages = [img1, img2, img3, img4, img5, img6, img7];

const themesList = [
  {
    title: "Medtech/Biotech/Healthtech",
    description: "Innovations in healthcare technology, medical devices, and biotechnological research to improve patient care."
  },
  {
    title: "Agriculture, Foodtech & Rural Development",
    description: "Solutions for smart farming, food supply chain efficiency, and sustainable rural economic growth."
  },
  {
    title: "Smart Vehicles",
    description: "Advancements in autonomous driving, electric mobility, and connected vehicle ecosystems."
  },
  {
    title: "Transportation & Logistics",
    description: "Optimizing supply chain routes, fleet management, and next-generation transit infrastructure."
  },
  {
    title: "Robotics & Drones",
    description: "Development of autonomous aerial vehicles, industrial automation, and smart robotic systems."
  },
  {
    title: "Clean & Green Technology",
    description: "Sustainable engineering solutions focused on waste management, carbon reduction, and environmental protection."
  },
  {
    title: "Tourism",
    description: "Digital platforms and technologies enhancing travel experiences, hospitality, and local tourism economies."
  },
  {
    title: "Renewable/Sustainable Energy",
    description: "Innovations in solar, wind, and alternative energy generation, storage, and distribution grids."
  },
  {
    title: "Blockchain & Cybersecurity",
    description: "Securing digital assets, developing decentralized applications, and protecting critical data infrastructure."
  },
  {
    title: "Smart Education",
    description: "EdTech platforms, immersive learning tools, and accessible education solutions for the future."
  },
  {
    title: "Disaster Management",
    description: "Early warning systems, emergency response coordination, and tech-driven disaster relief."
  },
  {
    title: "Games & Toys",
    description: "Interactive entertainment, educational gaming, and physical-digital play experiences."
  },
  {
    title: "Fintech",
    description: "Transforming financial services through digital payments, smart banking, and inclusive economic tools."
  },
  {
    title: "Smart Automation",
    description: "Intelligent systems, IoT integration, and AI-driven automation for homes and industries."
  },
  {
    title: "Fitness & Sports",
    description: "Wearable technologies, performance tracking, and digital health platforms for active lifestyles."
  },
  {
    title: "Space Technology",
    description: "Innovations in satellite data, aerospace engineering, and space exploration technologies."
  },
  {
    title: "Heritage & Culture",
    description: "Preserving and promoting cultural history through digital archiving, AR/VR, and interactive media."
  }
];

function Themes() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  
  // Refs for smooth inertia scrolling
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    // Reset scroll when entering the page
    window.scrollTo(0, 0);

    const smoothScroll = () => {
      // Lerp (Linear Interpolation) for buttery smooth inertia
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.07;
      
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${currentScroll.current}px, 0, 0)`;

        // Apply progressive scale using the smoothed position
        const wrappers = track.querySelectorAll('.theme-card-wrapper');
        wrappers.forEach(wrapper => {
          const cardScreenX = wrapper.offsetLeft + currentScroll.current;
          const p = Math.max(0, Math.min(1, cardScreenX / window.innerWidth));
          // Scales from 0.75 (right edge) to 1.15 (left edge)
          const scale = 1.15 - (p * 0.40); 
          wrapper.style.setProperty('--scroll-scale', scale.toFixed(3));
        });
      }

      // Run continuously to ensure absolute smoothness and prevent HMR freezes
      rafId.current = requestAnimationFrame(smoothScroll);
    };

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled down the container (0 to 1)
      const scrollProgress = -top / (height - windowHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      const track = trackRef.current;
      const maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      
      // Update target position
      targetScroll.current = -clampedProgress * maxScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calls
    handleScroll();
    rafId.current = requestAnimationFrame(smoothScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    // Increased height to 800vh to significantly slow down the scroll speed
    <main className="themes-page" ref={containerRef} style={{ height: '800vh' }}>
      <div className="themes-sticky-wrapper">
        <div className="themes-track" ref={trackRef}>
          {themesList.map((theme, index) => (
            <div key={index} className="theme-card-wrapper">
              <div 
                className="theme-card" 
                onClick={() => navigate('/problem-statements')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-top">
                  <div className="card-arrow">
                    <img src={arrowBlue} alt="Arrow" style={{ width: 20, height: 20 }} />
                  </div>
                </div>
                
                <div className="card-illustration">
                   <img 
                     src={themeImages[index % themeImages.length]} 
                     alt={`${theme.title} illustration`} 
                     className="theme-image" 
                   />
                </div>

                <div className="card-bottom">
                  <h3 className="card-title">{theme.title}</h3>
                  <p className="card-desc">
                    {theme.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Themes;
