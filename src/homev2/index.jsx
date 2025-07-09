// src/homev2/index.jsx
import React from 'react';
import Header from '../components/homeui/Header';
import Landing from '../components/homeui/Landing';
import InfoPanels from '../components/homeui/InfoPanels';
import Footer from '../components/homeui/Footer';
import Accessibility from '../components/homeui/Accessibility';

const Home = () => {
  return (
    <>
      <Header />
      <Landing />
      <InfoPanels />
      <Footer />
      <Accessibility />
    </>
  );
};

export default Home;  // <- Esto es clave
