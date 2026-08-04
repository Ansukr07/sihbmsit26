import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Themes from './Themes';
import Timeline from './Timeline';
import ProblemStatements from './ProblemStatements';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/problem-statements" element={<ProblemStatements />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
