import React, { useState } from 'react';
import './CustomTabs.css';

export default function CustomTabs({ tabs }) {
  // Estado que guarda ids de tabs abiertos en móvil
  const [openTabs, setOpenTabs] = useState([]);
  // Estado para desktop sigue igual
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '');

  const toggleTab = (id) => {
    setOpenTabs((prev) => (prev.includes(id) ? [] : [id]));
  };


  return (
    <>
      {/* Desktop / tablets */}
      <div className="tabs-container">
        <div className="tabs-left">
          {tabs.map(({ id, title, image }) => (
            <button
              key={id}
              className={`tab-button ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {image && (
                <span className="tab-icon">
                  {typeof image === 'string' ? (
                    <img src={image} alt={`${title} icon`} />
                  ) : (
                    image
                  )}
                </span>
              )}
              <span className="tab-title">{title}</span>
            </button>
          ))}
        </div>
        <div className="tabs-content">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>

      {/* Mobile: acordeón interactivo */}
      <div className="tabs-mobile">
        {tabs.map(({ id, title, image, content }) => {
          const isOpen = openTabs.includes(id);
          return (
            <div className="tab-block" key={id}>
              <button
                className="mobile-tab-button"
                onClick={() => toggleTab(id)}
                aria-expanded={isOpen}
                aria-controls={`content-${id}`}
              >
                {image && (
                  <span className="tab-icon">
                    {typeof image === 'string' ? (
                      <img src={image} alt={`${title} icon`} />
                    ) : (
                      image
                    )}
                  </span>
                )}
                <span className="tab-title">{title}</span>
                <span
                  className={`tab-arrow ${isOpen ? 'open' : ''}`}
                  aria-hidden="true"
                  style={{ marginLeft: 'auto' }}
                >
                  ▼
                </span>
              </button>
              {isOpen && (
                <div
                  id={`content-${id}`}
                  className="tab-content"
                  role="region"
                  aria-labelledby={id}
                >
                  {content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}