// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css";
import ScopeMain from './ScopeMain/components/ScopeMain';
import InfluencerRanking from './InfluencerRanking/components/InfluencerRanking';
import ProfileDetailAnalysis from './ProfileDetailAnalysis/components/ProfileDetailAnalysis';
import SNSDetailAnalysis from './SNSDetailAnalysis/components/SNSDetailAnalysis';
import Analysis from './Analysis/components/Analysis';
import Recommendation from './Recommendation/components/Recommendation';

// 전체 App 컴포넌트
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ScopeMain />} />

        {/* Protected Routes */}
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/InfluencerRanking" element={<InfluencerRanking />} />
        <Route path="/ProfileDetailAnalysis" element={<ProfileDetailAnalysis />} />
        <Route path="/SNSDetailAnalysis" element={<SNSDetailAnalysis />} />
        <Route path="/Recommendation" element={<Recommendation />} />
      </Routes>
    </Router>
  );
};

export default App;
