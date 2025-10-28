import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import './index.css';

const App: React.FC = () => {
  // Use Vite's base (from vite.config.ts) so routes work on GitHub Pages
  const basename = (import.meta as any).env.BASE_URL as string;
  return (
    // Use Vite base as router basename for GitHub Pages
    <Router basename={basename}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/sale" element={<CategoryPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;