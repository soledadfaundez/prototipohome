import CustomTabs from './CustomTabs/CustomTabs';
import Breadcrumbs from './Breadcrumbs'

export default function RegistroPublico() {

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
                            Registro Nacional de Entidades Técnicas de Fiscalización Ambiental
                            </h3>
                            <br />
                            El RETFA es un registro público gestionado por la SMA que reúne a todas las Entidades Técnicas de Fiscalización Ambiental (ETFA) y Inspectores Ambientales (IA) autorizados para realizar actividades de muestreo, medición, análisis, inspección y verificación técnica en el país. 
                            <br />
                            Este registro proporciona transparencia y permite al público y a los regulados identificar qué entidades están autorizadas y válidamente operativas
                            <br />
                            <div style={{ textAlign: 'center' }}>
                                <a
                                href="https://entidadestecnicas.sma.gob.cl/Home/RegistroPublico"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="boton-verde"
                                >
                                <i className="fas fa-leaf" style={{ marginRight: '8px' }}></i>
                                    Ir al Registro Público
                                </a>
                            </div>
                        </p>
                        <p className="mt-4"> 
                            <h3 className="text-2xl font-bold text-gray-800">
                            Normativa que lo establece
                            </h3>
                            <br />
                            El <strong>Registro Nacional de Entidades Técnicas de Fiscalización Ambiental</strong> (RETFA) fue creado como parte del sistema de fiscalización ambiental de la <strong>Superintendencia del Medio Ambiente (SMA)</strong>), permitiendo acreditar entidades que colaboran en tareas fiscalizadoras mediante servicios técnicos especializados.
                            <br />
                            Este registro se encuentra regulado principalmente por los siguientes instrumentos legales:
                            <br />
                            <br />
                            <ul style={{ marginLeft: '1.2rem' }}>
                            <li>
                                <i className="fas fa-gavel" aria-hidden="true"  style={{ marginRight: '0.5rem' }}></i>
                                <strong>Ley N° 20.417</strong>: Crea la <strong>Superintendencia del Medio Ambiente</strong> (SMA) y establece sus facultades, incluyendo la creación de registros como el de entidades técnicas.
                            <br />
                            <a href="https://www.bcn.cl/leychile/navegar?idNorma=1012723" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver texto de la Ley N° 20.417
                            </a>
                            </li>
                            <br />
                            <li>
                                <i className="fas fa-gavel" aria-hidden="true" style={{ marginRight: '0.5rem' }}></i>
                                <strong>Decreto Supremo N° 38/2013 del Ministerio del Medio Ambiente</strong>: Establece el <strong>Reglamento del Registro de Entidades Técnicas</strong>, sus requisitos, categorías, procesos de postulación, evaluación, permanencia y sanciones.
                            <br />
                            <a href="https://www.bcn.cl/leychile/navegar?idNorma=1056277" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver Reglamento D.S. N° 38/2013
                            </a>
                            </li>
                            <br />
                            <li>
                                <i className="fas fa-gavel" aria-hidden="true"  style={{ marginRight: '0.5rem' }}></i>
                                <strong>Ley N° 19.300 sobre Bases Generales del Medio Ambiente</strong>: Marco general para la institucionalidad ambiental en Chile, que establece principios y normas sobre evaluación y fiscalización ambiental.
                            <br />
                            <a href="https://www.bcn.cl/leychile/navegar?idNorma=30667" target="_blank" rel="noopener noreferrer" className="link-azul">
                                Ver Ley N° 19.300
                            </a>
                            </li>
                            <br />
                            Estas normativas permiten a la SMA contar con apoyo técnico acreditado para garantizar el cumplimiento de la normativa ambiental vigente, fortaleciendo así la fiscalización descentralizada y objetiva.
                        </ul>
                        </p>
                    </div>
    
                </div>

                {/* Columna derecha: Imagen */}
                <div className="w-[20%]">
                <img
                src={`${process.env.PUBLIC_URL}/static/media/queessistema.png`}
                alt="Qué es sistema"
                className="w-full h-auto"
                />
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
                    {/* EFC: Titulo */}
                    <div className="titulo-pantalla">
                        <h2>
                            ¿Qué es el Registro Público?
                        </h2>  
                    </div>      
                    <div className="contenido-pantalla">
                        {/* EFC: Contenido */}                 
                        <CustomTabs tabs={tabsData} />
                    </div>  
                </div> 
            </div>
        </>
    );
}