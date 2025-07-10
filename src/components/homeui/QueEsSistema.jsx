import React, { useEffect,useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import CustomTabs from './CustomTabs/CustomTabs';

export default function QueEsSistema() {

    /* EFC: Data para el TAB */
    const tabsData = [
        {
        id: 'tab1',
        title: 'Definición',
        content: (            
            <div>
                <div className="flex w-full items-start text-left gap-6">
                {/* Columna izquierda: Texto */}
                <div className="flex-1">
                    <div class="parrafos-con-lineas">
                        <p className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-800">
                            Entidades Técnicas
                            </h3>
                            <br />
                            Las Entidades Técnicas de la Superintendencia del Medio Ambiente (SMA) son personas jurídicas, públicas o privadas, autorizadas por la SMA para colaborar en sus funciones fiscalizadoras mediante la realización de actividades técnicas específicas. Estas actividades incluyen principalmente muestreo, mediciones, análisis de laboratorio y otras tareas especializadas, relacionadas con la verificación del cumplimiento de normas ambientales.
                            <br />                          
                        </p>
                        <p className="mt-4">
                            <h1 className="text-2xl font-bold text-gray-800">
                            Tipos de Entidades Técnicas reconocidas por la SMA
                            </h1>
                            <br />
                            <div style={{
                            borderRadius: '12px',
                            border: '1px solid rgba(200, 200, 200, 0.3)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '1.5rem',
                            backgroundColor: 'white'
                            }}>
                                <h4 className="text-1xl font-bold text-gray-800">
                                Entidad Técnica de Fiscalización Ambiental (ETFA):
                                </h4>
                                <br />
                                Realiza actividades específicas como mediciones, monitoreos o inspecciones técnicas.
                            </div>
                            <br />
                            <div style={{
                            borderRadius: '12px',
                            border: '1px solid rgba(200, 200, 200, 0.3)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '1.5rem',
                            backgroundColor: 'white'
                            }}>
                                <h4 className="text-1xl font-bold text-gray-800">
                                Entidad Técnica de Apoyo al Cumplimiento (ETAC):
                                </h4>
                                <br />
                                Entrega servicios voluntarios para ayudar a los regulados a cumplir sus obligaciones ambientales.
                            </div>
                            <br />
                            <div style={{
                            borderRadius: '12px',
                            border: '1px solid rgba(200, 200, 200, 0.3)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '1.5rem',
                            backgroundColor: 'white'
                            }}>
                                <h4 className="text-1xl font-bold text-gray-800">
                                Entidad Técnica de Verificación Ambiental (ETVA):
                                </h4>
                                <br />
                                Evalúa y verifica el cumplimiento de compromisos o medidas establecidas por la SMA u otros organismos.
                            </div>
                        </p>
                    </div>
                     
                </div>
                </div>
            </div>
        )
        },
        {
        id: 'tab2',
        title: '¿Cuál es su finalidad?',
        content: (            
            <div>
                <div className="flex w-full items-start text-left gap-6">
                {/* Columna izquierda: Texto */}
                <div className="flex-1">
                    <div class="parrafos-con-lineas">
                        <p className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-800">
                            La finalidad principal de las Entidades Técnicas es:
                            </h3>
                            <br />
                            <ul style={{ marginLeft: '1.2rem' }}>
                            <li>
                                <i class="fas fa-square" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                                Apoyar a la SMA en el cumplimiento de su labor fiscalizadora, mediante tareas que requieren conocimientos, equipamiento y metodologías especializadas.
                            <br />                            
                            </li>
                            <br />
                            <li>
                                <i class="fas fa-square" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                                Garantizar la objetividad, calidad y confiabilidad de los datos obtenidos en procesos de fiscalización ambiental.
                            <br />
                            </li>
                            <br />
                            <li>
                               <i class="fas fa-square" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                                Fortalecer la fiscalización ambiental, descentralizando parte del trabajo técnico a entidades acreditadas y supervisadas.
                            <br />
                            </li>                            
                            </ul>
                        </p>
                    </div>
                </div>
                </div>
            </div>
        )
        },
        {
        id: 'tab3',
        title: 'Normativa asociada',
        content: (            
            <div>
                <div className="flex w-full items-start text-left gap-6">
                {/* Columna izquierda: Texto */}
                <div className="flex-1">
                    <div class="parrafos-con-lineas">
                        <p className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-800">
                            Normativa asociada
                            </h3>
                            <br />
                            <ul style={{ marginLeft: '1.2rem' }}>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°574/2022</strong>: Dicta instrucción de carácter general para la operatividad general de las entidades técnicas de fiscalización ambiental e inspectores ambientales y revoca resolución que indica. (18-04-2022)
                            <br />
                            <a href="https://transparencia.sma.gob.cl/doc/resoluciones/RESOL_EXENTA_SMA_2022/RESOL%20EXENTA%20N%20574%20SMA.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°2051/2021</strong>: Dicta instrucción de carácter general para la operatividad específica de las entidades técnicas de fiscalización ambiental en el componente ambiental aire y revoca resolución que indica. (14-09-2021)
                            <br />
                            <a href="https://transparencia.sma.gob.cl/doc/resoluciones/RESOL_EXENTA_SMA_2021/RESOL%20EXENTA%20N%202051%20SMA.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°2542/2021</strong>: Revoca resoluciones dictadas por la SMA, en el contexto de brote de coronavirus (COVID-19). (30-11-2021)
                            <br />
                            <a href="https://transparencia.sma.gob.cl/doc/resoluciones/RESOL_EXENTA_SMA_2021/RESOL%20EXENTA%20N%202542%20SMA.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°789/2022</strong>: Aclara de oficio el ámbito de aplicación del procedimiento de corrección temprana para inconsistencias técnicas en solicitudes de autorización, ampliación de alcances y renovación como entidad técnica. (25-05-2022)
                            <br />
                            <a href="https://transparencia.sma.gob.cl/doc/resoluciones/RESOL_EXENTA_SMA_2022/RESOL%20EXENTA%20N%20789%20SMA.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Aclaración Resoluciones N°575/2022, 574/2022 y 573/2022</strong>: Aclara el contenido y aplicación de resoluciones anteriores. (01-06-2022)
                            <br />
                            <a href="/Files/documentos/tabla11/ACLARACION RESPECTO DE LAS RESOLUCIONES EXENTAS N° 575-574-573.pdf" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°1790/2023</strong>: Dispone extensión de la vigencia de certificados de verificación y calibración de equipos de muestreo y medición. (24-10-2023)
                            <br />
                            <a href="https://transparencia.sma.gob.cl/doc/resoluciones/RESOL_EXENTA_SMA_2023/RESOL%20EXENTA%20N%201790%20SMA.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°1920/2023</strong>: Pone término a la extensión de vigencia de certificados de verificación y calibración de equipos. (27-11-2023)
                            <br />
                            <a href="https://transparencia.sma.gob.cl/doc/resoluciones/RESOL_EXENTA_SMA_2023/RESOL%20EXENTA%20N%201920%20SMA.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°2133/2023</strong>: Dicta instrucción general sobre adecuación a la edición N°24 de "Standard Methods for Water and Wastewater". (21-10-2024)
                            <br />
                            <a href="/Files/documentos/tabla11/RESOL 2133 SMA 2023_INSTRUCCIONES ADECUACION SMA 24.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
                            <br />
                            </li>
                            <li>
                            <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                            <strong>Resolución Exenta N°2179/2024</strong>: Dicta instrucción general sobre adecuación a la tercera versión 2024 del "Manual de Métodos de Ensayo para Agua Potable". (05-12-2024)
                            <br />
                            <a href="https://transparencia.sma.gob.cl/doc/resoluciones/RESOL_EXENTA_SMA_2024/RESOL%20EXENTA%20N%202179%20SMA.PDF" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver resolución
                            </a>
                            <br />
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
        {/* EFC: Titulo */}
        <div className="titulo-pantalla">
            <h2>
                ¿Qué es el sistema de entidades técnicas?
            </h2>  
        </div>      
        <div className="contenido-pantalla">
            {/* EFC: Contenido */}                                 
            <CustomTabs tabs={tabsData} />
        </div>              
        </>
    );
}