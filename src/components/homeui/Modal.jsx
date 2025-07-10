import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Modal({ children }) {
  const navigate = useNavigate();

  // EFC: Evitar scroll en el fondo mientras el modal está abierto
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden'; // bloquea scroll
    return () => {
      document.body.style.overflow = originalStyle; // restaura scroll
    };
  }, []);

  // EFC: Click fuera del contenido cierra el modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center"
      style={{ backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl p-6 w-[80%] h-[80%] overflow-auto"
      >
        {/* Botón de cierre */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  );
}
