import React from 'react';
import Home from './homev2';  // EFC: Nuevo Home
import RankingPage from './ranking/RankingPage';  // EFC: Nuevo Ranking
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        {/* Ruta raíz muestra el Home por defecto */}
        <Route path="/" element={<Home />} />
        {/* Ruta para el componente ranking */}
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
  );
}
export default App;
