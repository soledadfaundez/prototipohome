import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const nameMap = {
  ranking: 'Ranking ETFA',
  detalle: 'Detalle',
  contacto: 'Contacto',
  registropublico: 'Registro Público',
  nuevascaracteristicas: 'Nuevas Características'
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
    <ol>
    <li><Link to="/"><i className="fa-solid fa-house"></i> Inicio</Link></li>
    {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
        <li key={to}>
            {!isLast ? (
            <Link to={to}>{nameMap[value] || decodeURIComponent(value)}</Link>
            ) : (
            <span>{nameMap[value] || decodeURIComponent(value)}</span>
            )}
        </li>
        );
    })}
    </ol>
    </nav>
  );
};

export default Breadcrumbs;