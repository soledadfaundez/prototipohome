import React, { useEffect,useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import CustomTabs from './CustomTabs/CustomTabs';
import Breadcrumbs from './Breadcrumbs'

export default function NuevasCaracteristicas() {

/* EFC: Data para el TAB */
    const tabsData = [
        {
        id: 'tab1',
        title: 'Nuevas Características',
        content: (            
            <div>
                <div className="flex w-full items-start text-left gap-6">
                {/* Columna izquierda: Texto */}
                <div className="flex-1">
                    <div class="parrafos-con-lineas">
                        <p className="mt-4">
                            <br />
                            La nueva versión del sistema implementa las siguientes características :
                            <br />                          
                        </p>
                        <p className="mt-4">
                            <ul style={{ marginLeft: '1.2rem' }}>
                            <li>
                                <i class="fas fa-square" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                                Nueva Característica.
                            <br />                            
                            </li>
                            <br />
                            <li>
                                <i class="fas fa-square" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                                Nueva Característica.
                            <br />
                            </li>
                            <br />
                            <li>
                               <i class="fas fa-square" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                               Nueva Característica.
                            <br />
                            </li>                            
                            </ul>
                        </p>
                    </div>
                     
                </div>
                </div>
            </div>
        )
        }
    ];

    return (
        <>
        {/* EFC: Estructura standard pantalla */}
        <div>                                                                   
            <div className="mx-auto px-6 custom-container">  
                <Breadcrumbs /> 
                <div className="contenido-pantalla">
                    {/* EFC: Contenido */}                                 
                    <CustomTabs tabs={tabsData} />
                </div>  
            </div> 
        </div>
        </>
    );
}