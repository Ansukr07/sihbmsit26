import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Themes from './Themes';
import Timeline from './Timeline';
import ProblemStatements from './ProblemStatements';
import Popup from './Popup';
import Results from './Results';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Popup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/problem-statements" element={<ProblemStatements />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer />
      </div>
      <Analytics />
    </Router>
  );
}

export default App;
