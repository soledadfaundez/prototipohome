// src/homev2/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <section id="inicio">
      <div className="cu-landing" style={{ position: 'relative' }}>
        <div className="landing-content">
          <div className="titulo-inicio">
            <span className="fuente-inicio" style={{ color: 'rgb(61, 184, 246)', display: 'inline-block', backgroundColor: '#004677' }}>
              Entidades Técnicas
            </span>
            <span className="fuente-inicio">
              <span style={{ color: 'rgb(61, 184, 246)', display: 'inline-block', backgroundColor: '#004677' }}>
                de <span style={{ color: '#fff', display: 'inline-block', backgroundColor: '#004677' }}>Fiscalización</span>
              </span>
            </span>
            <span className="fuente-inicio" style={{ color: '#fff', display: 'inline-block', backgroundColor: '#004677' }}>
              Ambiental
            </span>

            {/* EFC: boton ir registro publico */}            
              <div className="botones-inicio">   
                           
                  <button className="custom-button" data-testid="clave-unica-landing">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAwCAYAAACMuVOlAAAACXBIWXMAAAsTAAALEwEAmpwYAAADiElEQVRYhe2Z0XHbMAyG/+TyXm4QZoJqg2qDeoNqBHeCuBNEmSDpBPEGdieQPYHUCaROgD5QSmAUIClVeekVd7qTrB/gJ1IESBlEhJUOT0Qtxa0lomJu7GusZ1sAPqHxAHZzA68J6TJ13dzAN3MdMm0A8Gj8Xs8N9p6Qu7WCrTnc72b/IdeyfxKyRF4+1MyNvtVsz8ysXxLRgVWORtE8i8qSul/lVpwc0YNR4uZCdkqMJwrldDGko8ve47ZbAFmRXtvbFOjcxcIxEjAFOcWtlbg9RRYeVg9KwJ7S71AOZKwTeqsDtAAvwrm1nP8CcgJtlLZcCvJ+IeASyGnUJOhLDNILcZ8B6MYHO4x6bg2F9y8nRit8NxbksxBuM+AkmGVPCdhC6FsNUvZiEwmovfQ51lJ861ALfSUhZS+WMwH7sZHteNREdDJ0Fqijy5E5SEje8DHytBKwp3hqKg0fa+h3QltOkKW4YTVaCV0baUz2kBypl8hDcdtNkJLearhdAMhBG9GO9Up1THMgClvaT2xRdIK+m9vgcnn2aOgsGwB8Fb+VhvbIzgsgrCcd+/Gn4bgR1/sklt44B/hs6E7s3AFw1xhpR+sMx1t2/sPQeQAHAI2Iye3Mzi3NIK6dXJlLwWR37Lw1NFuEISwAPBiaTlz7HM2ae5yBnV8t8DHtZhS68doZuhPehrwwNDWLURsa7jtAh/TiursB8IvBScGrUDTklAYGpL9a8ExyNjSSYbjG5Wz6aDjuxfV9AkazSgA8G7qCnXcABlCotTnJPDcZ59b8nKKxJ6Ms7gxnqesp74OoBpjbRjVBgi5XH22kQVmDiey1oiN9zTknvueQsn5vjCBaDZ6sobBweBrPJdwEaA2zF9rjdI83zoO2pGyImLY2QGPWRAC1XnztKC6SvfkQCQiyN/vSeopvRaZY8oFe718R0TTdHULJcyJtfE+klhJhAVKMvg4hZx4RUtcJ8criEeo9b/cOPDeLJ9oovZAzg5ceWTNfc9Tet9RwLTkKBbDRtLkvMVFIJ2sBbklPTerEigXSQFua8V1ROUrSv9SZgClI0J8zngfdxgKzw41aDY4o5EMXi8Fnt2UVwoLCG/e78TizWewAfECY+ZbfAOAbcv58yhwmT/rwL7Vj5ihk9yQ3j9CzXyI9ZNmAkHP3uNyQJW0uJLcSIYGXCMC3eEvIA8Ji+oTwKuyRTuqm/QZvAOpks25higAAAABJRU5ErkJggg=="
                      alt="icon"
                      className="button-icon"
                      style={{ height: '24px', width: '20px' }}
                    />
                    Clave Única
                  </button>

                  <Link to="/registropublico">
                    <button className="boton-rojo">Registro Público</button>  
                  </Link>            
              </div>
            
           
            <div className="botones-container">
              {/* EFC: boton ir acceso funcionarios */}
              <button className="boton-funcionario" data-testid="funcionario-interno-landing">                
                <img src={`${process.env.PUBLIC_URL}/homeui/favicon.ico`} alt="icon" className="button-icon" style={{ height: '20px', width: '20px', marginRight: '8px' }} />
                Acceso Funcionarios
              </button>

              {/* EFC: boton ir Ranking */}
              <div className="tooltip-container">
                <Link to="/ranking">
                  <button className="boton-ranking-verde" data-testid="ranking-etfa-landing">
                  <i className="fa-solid fa-chart-line"></i> Ranking ETFA
                  </button>
                  <span className="tooltip-text">
                  Ranking ETFA – Departamento de Entidades Técnicas y Laboratorio – SMA
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
