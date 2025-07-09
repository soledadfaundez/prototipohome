// src/homev2/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <section id="seccion-manual" className="py-16" style={{ backgroundColor: '#001C41' }}>
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-[80%] mx-auto text-white">
          
          {/* Columna 1: Logo izquierda */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <img 
              src="static/media/logo_footer-600x137.png" 
              alt="Logo Footer" 
              className="w-auto max-w-xs min-w-[150px] h-auto"
            />
          </div>

          {/* Columna 2: Dirección y horario */}
          <div className="w-full md:w-1/3 text-center space-y-4">
            {/* Dirección */}
            <div className="flex items-start gap-3 text-white w-full max-w-4xl">
              {/* Ícono alineado arriba */}
              <div className="flex-shrink-0 pt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                </svg>
              </div>
              {/* Texto alineado a la izquierda */}
              <div className="text-sm md:text-base text-left leading-relaxed w-full">
                Oficina de partes Región Metropolitana: Teatinos 280, piso 8.
              </div>
            </div>

            {/* Horario */}
            <div className="flex items-start gap-3 text-white w-full max-w-4xl mt-3">
              <div className="flex-shrink-0 pt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 20a9 9 0 119-9 9 9 0 01-9 9zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <div className="text-sm md:text-base text-left leading-relaxed w-full">
                Horario de atención: Lunes a viernes de 9:00 a 13:00 horas, piso 8.
              </div>
            </div>
          </div>

          {/* Columna 3: Imagen derecha */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <img src="static/media/gob.png" alt="Gobierno de Chile" className="w-32 h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
