import React from 'react';
import Home from './homev2';  // EFC: Nuevo Home
import RankingPage from './ranking/RankingPage';  // EFC: Nuevo Ranking
import './App.css';
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom';
import RegistroPublicoPage from './registropublico/RegistroPublicoPage';
import NuevasCaracteristicas from './nuevascaracteristicas/NuevasCaracteristicasPage';
import QueEsSistemaPage from './queessistema/QueEsSistemaPage';
import Modal from './components/homeui/Modal';

function App() {

  /* EFC: Para levantar modal */
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        {/* EFC: Ruta raíz muestra el Home por defecto */}
        <Route path="/" element={<Home />} />
        {/* EFC: Ruta para el componente ranking */}
        <Route path="/ranking" element={<RankingPage />} />
        {/* EFC: Ruta para el componente RegistroPublicoPage */}
        <Route path="/registropublico" element={<RegistroPublicoPage />} />
        {/* EFC: Ruta para el componente NuevasCaracteristicas */}
        <Route path="/nuevascaracteristicas" element={<NuevasCaracteristicas />} />       
        {/* EFC: Ruta para el componente QueEsSistema */}
        <Route path="/queessistema" element={<QueEsSistemaPage />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/queessistema"
            element={
              <Modal>
                <QueEsSistemaPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
export default App;
