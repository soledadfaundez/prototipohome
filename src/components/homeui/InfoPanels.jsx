// src/homev2/InfoPanels.jsx
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useLocation  } from 'react-router-dom';

export default function InfoPanels() {

  const location = useLocation();

  function showMoreInfo(section) {
    alert(`Mostrando más información sobre: ${section}`);
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-1 gap-8 mb-12">
        <div className="wrapp banner_transparencia">

          {/* EFC: Sección de noticias */}
          <div className="noticia-nueva">
            <div>
              <Link to="/nuevascaracteristicas" className="block">             
                <div className="contenido-novedad cursor-pointer">
                  <span className="icono-novedad">
                    <i className="fa-solid fa-wheat-awn-circle-exclamation"></i>
                  </span>

                  {/* EFC: boton ir nuevas caracteristicas */}
                  <div className="texto-novedad">
                    <strong>Nuevas características disponibles</strong>
                    <br/>
                    Conoce los últimos cambios normativos aplicados al sistema de entidades técnicas.
                  </div>
                </div>              
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* EFC: DIV de entidades tecnicas */}
        <Link to="/queessistema" state={{ backgroundLocation: location }} className="block">  
          <div  className="info-panel overflow-hidden px-4 md:px-12 py-8 space-y-6 cursor-pointer">
            <div className="w-full text-center">
              <h3 className="text-2xl font-bold text-gray-800">¿Qué es el sistema de entidades técnicas?</h3>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-1/2 text-justify text-gray-600 leading-relaxed">
                El Sistema de Entidades Técnicas de Fiscalización Ambiental es una plataforma integral que permite la gestión y supervisión de las actividades de fiscalización ambiental, facilitando el cumplimiento normativo y la protección del medio ambiente.
              </div>
              <div className="w-full md:w-1/2 flex justify-center relative">
                <div className="relative">
                  <img src={`${process.env.PUBLIC_URL}/static/media/queessistema.png`} alt="Ilustración sistema" className="illustration-small" />
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
        </Link>

        {/* EFC: DIV de asistencia de cumplimiento */}
        <a 
          href="https://portal.sma.gob.cl/index.php/asistencia-al-cumplimiento/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block"
        >
          <div className="info-panel overflow-hidden px-4 md:px-12 py-8 space-y-6 cursor-pointer">
            <div className="w-full text-center">
              <h3 className="text-2xl font-bold text-gray-800">Asistencia al cumplimiento</h3>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-1/2 text-justify text-gray-600 leading-relaxed">
                Servicios especializados de apoyo y orientación para garantizar el cumplimiento de las normativas ambientales, proporcionando herramientas y recursos necesarios para una gestión ambiental efectiva y responsable.
              </div>
              <div className="w-full md:w-1/2 flex justify-center relative">
                <div className="relative">
                  <img src={`${process.env.PUBLIC_URL}/static/media/asistenciadeCumpli.png`} alt="Ilustración asistencias" className="illustration-small" />
                  <div className="gradient-overlay"></div>
                </div>
              </div>
            </div>
            <div className="w-full text-left">
              <button 
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 flex items-center space-x-2"
                type="button"
              >
                <span>Más información</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </a>

      </div>

      {/* EFC: DIV de Consultas OIR */}
      <a 
          href="https://oac.sma.gob.cl/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block">
          <div className="info-panel-minor cursor-pointer" >
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <div className="floating-animation mb-6 md:mb-0 md:mr-8">
                <div className="relative">
                  <img src={`${process.env.PUBLIC_URL}/static/media/consultasOIRS.png`}  alt="Ilustración asistencias" style={{ width: 100, height: 'auto' }} />
                  <div className="gradient-overlay"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Consultas OIRS</h3>
                <p className="text-gray-600 text-justify leading-relaxed">
                  Oficina de Información y Respuesta para consultas relacionadas con el sistema de entidades técnicas de fiscalización ambiental.
                </p>
              </div>
            </div>
          </div>
      </a>
      
    </div>
  );
}
