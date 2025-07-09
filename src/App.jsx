// src/App.jsx
import React from 'react';
import Home from './homev2'; // Importa automáticamente src/homev2/index.jsx

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Agrega más rutas si las necesitas */}
    </Routes>
  );
}

export default App;