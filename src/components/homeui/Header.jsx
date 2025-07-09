// src/homev2/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <header className="fixed-header">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="logo-wrapper">
              <img className="logo-img" src={`${process.env.PUBLIC_URL}/static/media/LogoSite.png`} alt="Logo-Sisrep" />
            </div>
          </div>

          <div className="nav-desktop items-start space-x-8">
            <Link to="/">
            <a href="#inicio" className="text-white hover:text-blue-200 transition-colors duration-300 flex items-start space-x-2">
              <span><i className="fa-solid fa-house"></i> Inicio</span>
            </a>
            </Link>
            <a href="#registro" className="text-white hover:text-blue-200 transition-colors duration-300 flex items-start space-x-2">
              <span><i className="fa-solid fa-user-plus"></i> Proceso de Registro</span>
            </a>
            <a href="#administracion" className="text-white hover:text-blue-200 transition-colors duration-300 flex items-start space-x-2">
              <span><i className="fa-solid fa-check-to-slot"></i> Administración de regulados (SAR)</span>
            </a>
          </div>

          <button className="md:hidden text-white hover:text-blue-200" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </nav>

        <div id="mobileMenu" className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden mt-4 pb-4 border-t border-blue-400 pt-4`}>
          <a href="#inicio" className="block py-2 text-white hover:text-blue-200 transition-colors duration-300 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <span><i className="fa-solid fa-house"></i> Inicio</span>
          </a>
          <a href="#registro" className="block py-2 text-white hover:text-blue-200 transition-colors duration-300 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <span><i className="fa-solid fa-user-plus"></i> Proceso de Registro</span>
          </a>
          <a href="#administracion" className="block py-2 text-white hover:text-blue-200 transition-colors duration-300 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
            <span><i className="fa-solid fa-check-to-slot"></i> Administración de regulados (SAR)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
