// src/homev2/InfoPanels.jsx
import React from 'react';

export default function InfoPanels() {
  function showMoreInfo(section) {
    alert(`Mostrando más información sobre: ${section}`);
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-1 gap-8 mb-12">
        <div className="wrapp banner_transparencia">
          <div className="noticia-nueva">
            <div>
              <a href="https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=AJ001" target="_blank" rel="noopener noreferrer">
                <div className="contenido-novedad">
                  <span className="icono-novedad">
                    <i className="fa-solid fa-wheat-awn-circle-exclamation"></i>
                  </span>
                  <div className="texto-novedad">
                    <strong>Nuevas características disponibles</strong>
                    <br />
                    Conoce los últimos cambios normativos aplicados al sistema de entidades técnicas.
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div
          className="info-panel overflow-hidden px-4 md:px-12 py-8 space-y-6 cursor-pointer"
          onClick={() => showMoreInfo('sistema')}
        >
          <div className="w-full text-center">
            <h3 className="text-2xl font-bold text-gray-800">¿Qué es el sistema de entidades técnicas?</h3>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/2 text-justify text-gray-600 leading-relaxed">
              El Sistema de Entidades Técnicas de Fiscalización Ambiental es una plataforma integral que permite la gestión y supervisión de las actividades de fiscalización ambiental, facilitando el cumplimiento normativo y la protección del medio ambiente.
            </div>
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="relative">
                <img src="static/media/queessistema.png" alt="Ilustración sistema" className="illustration-small" />
                <div className="gradient-overlay"></div>
              </div>
            </div>
          </div>
          <div className="w-full text-left">
            <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 flex items-center space-x-2">
              <span>Más información</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className="info-panel overflow-hidden px-4 md:px-12 py-8 space-y-6 cursor-pointer"
          onClick={() => showMoreInfo('asistencias')}
        >
          <div className="w-full text-center">
            <h3 className="text-2xl font-bold text-gray-800">Asistencias de cumplimiento</h3>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/2 text-justify text-gray-600 leading-relaxed">
              Servicios especializados de apoyo y orientación para garantizar el cumplimiento de las normativas ambientales, proporcionando herramientas y recursos necesarios para una gestión ambiental efectiva y responsable.
            </div>
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="relative">
                <img src="static/media/asistenciadeCumpli.png" alt="Ilustración asistencias" className="illustration-small" />
                <div className="gradient-overlay"></div>
              </div>
            </div>
          </div>
          <div className="w-full text-left">
            <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 flex items-center space-x-2">
              <span>Más información</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="info-panel-minor cursor-pointer" onClick={() => showMoreInfo('consultas')}>
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="floating-animation mb-6 md:mb-0 md:mr-8">
            <div className="relative">
              <img src="static/media/consultasOIRS.png" alt="Ilustración asistencias" style={{ width: 100, height: 'auto' }} />
              <div className="gradient-overlay"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Consultas OIR</h3>
            <p className="text-gray-600 text-justify leading-relaxed">
              Oficina de Información y Respuesta para consultas relacionadas con el sistema de entidades técnicas de fiscalización ambiental.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
