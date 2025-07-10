import React, { useEffect,useState,useRef} from 'react';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Breadcrumbs from './Breadcrumbs'

if (typeof Highcharts !== 'undefined' && typeof drilldown === 'function') {
  drilldown(Highcharts);
}
export default function Ranking() {
    const [activeTab, setActiveTab] = useState('aguas-residuales');
    const [modalOpen, setModalOpen] = useState(false);  /* Control del Modal */

    const tabs = [
        { id: 'aguas-residuales', label: 'Aguas Residuales' },
        { id: 'aguas-superficiales', label: 'Aguas Superficiales' },
        { id: 'filtros-mp', label: 'Filtros MP' },
        { id: 'informacion', label: 'Información' }
    ];

    const getColorByPercentage = (percentage) => {
        if (percentage >= 85) return '#8AC926';
        if (percentage >= 70) return '#B0D639';
        if (percentage >= 55) return '#D2E249';
        if (percentage >= 30) return '#EFE657';
        return '#DCA253';
    };

    /* Función para exportar a XLS */
    function exportExcel(tabName = '', data = []) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Cumplimiento');

      // Título
      worksheet.mergeCells('A1', 'E1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = `Cumplimiento por entidad - ${tabName.replace('-', ' ')}`;
      titleCell.font = { size: 16, bold: true };
      titleCell.alignment = { horizontal: 'left' };

      // Fecha y hora
      const now = new Date();
      const dateStr = now.toLocaleDateString("es-CL");
      const timeStr = now.toLocaleTimeString("es-CL");
      worksheet.mergeCells('A2', 'E2');
      const dateCell = worksheet.getCell('A2');
      dateCell.value = `Generado el ${dateStr} a las ${timeStr}`;
      dateCell.font = { size: 10, color: { argb: '666666' } };

      // Cabecera
      worksheet.addRow([
        'Código ETFA',
        'Persona Jurídica',
        'Nombre Sucursal',
        'Total Evaluaciones',
        '% Satisfactorio'
      ]);

      // Estilo de cabecera
      const headerRow = worksheet.getRow(3);
      headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0070C0' }
      };

      // Agrega datos
      data
        .sort((a, b) => b.percentage - a.percentage)
        .forEach(item => {
          const row = worksheet.addRow([
            item.etfa,
            item.entitylegal,
            item.entity,
            item.evaluations,
            item.percentage
          ]);

          // Color de fondo dinámico en la columna %
          const colorHex = getColorByPercentage(item.percentage);
          const hex = colorHex.replace('#', '').toUpperCase();
          row.getCell(5).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: hex }
          };
        });

      // Ancho automático
      worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
          const len = (cell.value || '').toString().length;
          if (len > maxLength) maxLength = len;
        });
        column.width = maxLength + 4;
      });

      // Guardar archivo
      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `cumplimiento-${tabName}.xlsx`);
      });
    }

    /* Función para exportar a PDF */
    function exportPDF(tabName = '', data = []) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("es-CL");
      const timeStr = now.toLocaleTimeString("es-CL");
      const datetimeStr = `Generado el ${dateStr} a las ${timeStr}`;

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("landscape");

      // Título
      doc.setFontSize(16);
      doc.text(`Ranking ETFA Cumplimiento por entidad - ${tabName.replace('-', ' ')}`, 14, 20);

      // Fecha
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(datetimeStr, 14, 28);

      const headers = [["Código ETFA", "Persona Jurídica", "Nombre Sucursal", "Total Evaluaciones", "% Satisfactorio"]];
      const rows = data
        .sort((a, b) => b.percentage - a.percentage)
        .map(item => [item.etfa, item.entitylegal, item.entity, item.evaluations, item.percentage]);

      doc.autoTable({
        head: headers,
        body: rows,
        startY: 30,
        styles: {
          fontSize: 10,
          cellPadding: 4
        },
        headStyles: {
          fillColor: [0, 112, 192],
          textColor: 255,
          fontStyle: 'bold'
        },
        didParseCell: function (data) {
        if (data.section === 'body' && data.column.index === 4) {
          const porcentaje = data.row.raw[4]; // Columna del porcentaje
          const colorHex = getColorByPercentage(porcentaje);
          const rgb = hexToRgb(colorHex);
          if (rgb) {
            data.cell.styles.fillColor = rgb;
          }
        }
        }
      });

      doc.save(`cumplimiento-${tabName}.pdf`);
    }

    // Función para convertir hex a array RGB
    function hexToRgb(hex) {
        // Elimina el símbolo #
        hex = hex.replace(/^#/, '');
        if(hex.length === 3){
            hex = hex.split('').map(h => h + h).join('');
        }
        const bigint = parseInt(hex, 16);
        if(isNaN(bigint)) return null;
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }

    const chartRefs = {
    'aguas-residuales': useRef(null),
    'aguas-superficiales': useRef(null),
    'filtros-mp': useRef(null)
    };

    /* EFC: Cargar los datos, cambiar a service */
    const chartData = {
      'aguas-residuales': [
        { code: '021-15', entitylegal: 'Empresa Tratamiento Avanzado S.A.', entity: 'Sucursal Norte', percentage: 98, etfa: 'ETFA-021-15', evaluations: 45 },
        { code: '018-12', entitylegal: 'Corporación Ambiental Norte', entity: 'Planta Central', percentage: 95, etfa: 'ETFA-018-12', evaluations: 38 },
        { code: '015-09', entitylegal: 'Servicios Ecológicos Ltda.', entity: 'División Sur', percentage: 92, etfa: 'ETFA-015-09', evaluations: 42 },
        { code: '012-06', entitylegal: 'Industrias Verdes S.A.', entity: 'Complejo Industrial', percentage: 89, etfa: 'ETFA-012-06', evaluations: 35 },
        { code: '019-13', entitylegal: 'Planta Tratamiento Central', entity: 'Sede Principal', percentage: 87, etfa: 'ETFA-019-13', evaluations: 40 },
        { code: '016-10', entitylegal: 'Aguas Limpias del Sur', entity: 'Filial Regional', percentage: 84, etfa: 'ETFA-016-10', evaluations: 33 },
        { code: '013-07', entitylegal: 'Procesadora Industrial', entity: 'Unidad Operativa', percentage: 81, etfa: 'ETFA-013-07', evaluations: 37 },
        { code: '020-14', entitylegal: 'Complejo Ambiental Este', entity: 'Zona Metropolitana', percentage: 78, etfa: 'ETFA-020-14', evaluations: 41 },
        { code: '017-11', entitylegal: 'Tratamientos Modernos', entity: 'Sucursal Oeste', percentage: 75, etfa: 'ETFA-017-11', evaluations: 36 },
        { code: '014-08', entitylegal: 'Soluciones Hídricas', entity: 'Centro de Operaciones', percentage: 72, etfa: 'ETFA-014-08', evaluations: 39 },
        { code: '011-05', entitylegal: 'Empresa Municipal Aguas', entity: 'Distrito Central', percentage: 69, etfa: 'ETFA-011-05', evaluations: 34 },
        { code: '008-02', entitylegal: 'Servicios Públicos Unidos', entity: 'Regional Norte', percentage: 66, etfa: 'ETFA-008-02', evaluations: 32 },
        { code: '005-19', entitylegal: 'Corporación Agua Limpia', entity: 'Planta Procesadora', percentage: 63, etfa: 'ETFA-005-19', evaluations: 38 },
        { code: '002-16', entitylegal: 'Industrias del Pacífico', entity: 'Complejo Costero', percentage: 60, etfa: 'ETFA-002-16', evaluations: 31 },
        { code: '009-03', entitylegal: 'Planta Regional Norte', entity: 'Unidad de Tratamiento', percentage: 57, etfa: 'ETFA-009-03', evaluations: 35 },
        { code: '006-20', entitylegal: 'Tratamiento Integral S.A.', entity: 'Sede Administrativa', percentage: 54, etfa: 'ETFA-006-20', evaluations: 29 },
        { code: '003-17', entitylegal: 'Servicios Ambientales', entity: 'División Especializada', percentage: 51, etfa: 'ETFA-003-17', evaluations: 33 },
        { code: '010-04', entitylegal: 'Complejo Industrial Sur', entity: 'Planta Principal', percentage: 48, etfa: 'ETFA-010-04', evaluations: 27 },
        { code: '007-21', entitylegal: 'Empresa Tratamientos', entity: 'Sucursal Regional', percentage: 45, etfa: 'ETFA-007-21', evaluations: 30 },
        { code: '004-18', entitylegal: 'Procesadora Central', entity: 'Unidad Operativa', percentage: 42, etfa: 'ETFA-004-18', evaluations: 26 },
        { code: '001-15', entitylegal: 'Industrias Básicas', entity: 'Complejo Manufacturero', percentage: 20, etfa: 'ETFA-001-15', evaluations: 28 }
      ],
      'aguas-superficiales': [
        { code: '021-15', entitylegal: 'Empresa Tratamiento Avanzado S.A.', entity: 'Sucursal Norte', percentage: 98, etfa: 'ETFA-021-15', evaluations: 45 },
        { code: '018-12', entitylegal: 'Corporación Ambiental Norte', entity: 'Planta Central', percentage: 95, etfa: 'ETFA-018-12', evaluations: 38 },
        { code: '015-09', entitylegal: 'Servicios Ecológicos Ltda.', entity: 'División Sur', percentage: 92, etfa: 'ETFA-015-09', evaluations: 42 },
        { code: '012-06', entitylegal: 'Industrias Verdes S.A.', entity: 'Complejo Industrial', percentage: 89, etfa: 'ETFA-012-06', evaluations: 35 },
        { code: '019-13', entitylegal: 'Planta Tratamiento Central', entity: 'Sede Principal', percentage: 87, etfa: 'ETFA-019-13', evaluations: 40 },
        { code: '016-10', entitylegal: 'Aguas Limpias del Sur', entity: 'Filial Regional', percentage: 84, etfa: 'ETFA-016-10', evaluations: 33 },
        { code: '013-07', entitylegal: 'Procesadora Industrial', entity: 'Unidad Operativa', percentage: 81, etfa: 'ETFA-013-07', evaluations: 37 },
        { code: '020-14', entitylegal: 'Complejo Ambiental Este', entity: 'Zona Metropolitana', percentage: 78, etfa: 'ETFA-020-14', evaluations: 41 },
        { code: '017-11', entitylegal: 'Tratamientos Modernos', entity: 'Sucursal Oeste', percentage: 75, etfa: 'ETFA-017-11', evaluations: 36 },
        { code: '014-08', entitylegal: 'Soluciones Hídricas', entity: 'Centro de Operaciones', percentage: 72, etfa: 'ETFA-014-08', evaluations: 39 },
        { code: '011-05', entitylegal: 'Empresa Municipal Aguas', entity: 'Distrito Central', percentage: 69, etfa: 'ETFA-011-05', evaluations: 34 },
        { code: '008-02', entitylegal: 'Servicios Públicos Unidos', entity: 'Regional Norte', percentage: 66, etfa: 'ETFA-008-02', evaluations: 32 },
        { code: '005-19', entitylegal: 'Corporación Agua Limpia', entity: 'Planta Procesadora', percentage: 63, etfa: 'ETFA-005-19', evaluations: 38 }
      ],
       'filtros-mp': [
        { code: '021-15', entitylegal: 'Empresa Tratamiento Avanzado S.A.', entity: 'Sucursal Norte', percentage: 98, etfa: 'ETFA-021-15', evaluations: 45 },
        { code: '018-12', entitylegal: 'Corporación Ambiental Norte', entity: 'Planta Central', percentage: 95, etfa: 'ETFA-018-12', evaluations: 38 },
        { code: '015-09', entitylegal: 'Servicios Ecológicos Ltda.', entity: 'División Sur', percentage: 92, etfa: 'ETFA-015-09', evaluations: 42 },
        { code: '012-06', entitylegal: 'Industrias Verdes S.A.', entity: 'Complejo Industrial', percentage: 89, etfa: 'ETFA-012-06', evaluations: 35 },
        { code: '019-13', entitylegal: 'Planta Tratamiento Central', entity: 'Sede Principal', percentage: 87, etfa: 'ETFA-019-13', evaluations: 40 },
        { code: '016-10', entitylegal: 'Aguas Limpias del Sur', entity: 'Filial Regional', percentage: 84, etfa: 'ETFA-016-10', evaluations: 33 },
        { code: '013-07', entitylegal: 'Procesadora Industrial', entity: 'Unidad Operativa', percentage: 81, etfa: 'ETFA-013-07', evaluations: 37 },
        { code: '020-14', entitylegal: 'Complejo Ambiental Este', entity: 'Zona Metropolitana', percentage: 78, etfa: 'ETFA-020-14', evaluations: 41 }
      ]
    };

    useEffect(() => {
      if (activeTab !== 'informacion') {
        setTimeout(() => createChart(activeTab), 100);
      }
    }, [activeTab]);

    useEffect(() => {
    if (modalOpen) {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
    }
    }, [modalOpen]);

    const createChart = (tabName) => {
    const container = chartRefs[tabName]?.current;
    if (!container) return;

    const loadingOverlay = container.querySelector('.loading-overlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    setTimeout(() => {
    if (loadingOverlay) loadingOverlay.style.display = 'none';

    const seriesData = currentData.map(item => ({
      name: item.code,
      y: item.percentage,
      color: getColorByPercentage(item.percentage),
      /* drilldown: item.code, */ /* EFC: Para desactivar el drilldown */
      entity: item.entity,
      etfa: item.etfa,
      entitylegal: item.entitylegal,
      evaluations: item.evaluations
    }));

    const drilldownSeries = currentData.map(item => ({
    name: `Detalles - ${item.code}`,
    id: item.code,
    data: [
      { name: 'Código ETFA', y: 25, custom: { label: 'Código ETFA', value: item.etfa }},
      { name: 'Nombre Sucursal', y: 25, custom: { label: 'Nombre Sucursal', value: item.entity }},
      { name: 'Persona Jurídica', y: 25, custom: { label: 'Persona Jurídica', value: item.entitylegal }},
      { name: 'Total Evaluaciones', y: 25, custom: { label: 'Total Evaluaciones', value: item.evaluations }},
      { name: '% Cumplimiento', y: 25, custom: { label: '% Cumplimiento', value: `${item.percentage}%` }}
      ],
    type: 'column',
    colorByPoint: true,
    animation: { duration: 800 }
    }));

    Highcharts.chart(container, {
      chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'},
      animation: {
      duration: 1000,
      easing: 'easeOutQuart'
      }
      },
      title: {
      text: `Cumplimiento por Entidad - ${tabName.replace('-', ' ').toUpperCase()}`,
      align: 'left',
      style: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '20px'}
      },
      xAxis: {
      type: 'category',
      labels: {
      rotation: -45,
      enabled: false, 
      style: {
      fontSize: '12px',
      color: '#475569',
      fontWeight: '500'
      },
    useHTML: false
    },
    lineColor: '#cbd5e1',
    tickColor: '#cbd5e1',
    crosshair: true,
    lineWidth: 2
    },
    yAxis: {
    min: 0,
    max: 100,
    title: {
    text: 'Porcentaje de Cumplimiento (%)',
    style: {
    color: '#475569',
    fontSize: '14px',
    fontWeight: '600'
    }
    },
    gridLineColor: '#f1f5f9',
    labels: {
    style: {
    color: '#475569',
    fontSize: '12px'
    },
    formatter: function () {
    return this.value + '%';
    }
    },
    lineColor: '#cbd5e1',
    lineWidth: 2
    },
    tooltip: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderColor: '#87ceeb',
    borderRadius: 10,
    borderWidth: 2,
    shared: true,
    shadow: {
    color: 'rgba(0,0,0,0.1)',
    offsetX: 0,
    offsetY: 4,
    opacity: 0.3,
    width: 8
    },
    style: {
    fontSize: '13px',
    fontWeight: '500'
    },
    formatter: function () {
    if (this.point.custom) {
    return `<b>${this.point.custom.label}:</b><br/>${this.point.custom.value}`;
    }
    return ` <b><strong>Persona Jurídica:</b> ${this.point.entitylegal}</strong><br/>
    <b>Nombre Sucursal:</b> ${this.point.entity}<br/>
    <b>Código ETFA:</b> ${this.point.etfa}<br/>
    <b>Evaluaciones:</b> ${this.point.evaluations}<br/>
    <b>Cumplimiento:</b> ${this.y}%`;
    }
    },
    plotOptions: 
    {
      column: 
      {
        pointPadding: 0.05,
        groupPadding: 0.1,
        borderWidth: 0,
        borderRadius: 6,
        animation: 
        {
          duration: 1200,
          easing: 'easeOutQuart'
        },
        states: 
        {
          hover: 
          {
            color: '#5dade2',
            brightness: 0.1
          }
        }
      },

      series: 
      {
        point: 
        {
          events: 
          {
            dblclick: function (e) 
            {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }
        }
      }
    },
    series: [
    {
    name: 'Cumplimiento',
    colorByPoint: true,
    data: seriesData,
    animation: { duration: 1200 }
    },
    {
    name: 'Línea de Tendencia',
    type: 'spline',
    data: seriesData.map(point => point.y),
    color: '#1e3a8a',
    lineWidth: 3,
    marker: {
    enabled: true,
    radius: 6,
    fillColor: '#1e3a8a',
    lineColor: '#ffffff',
    lineWidth: 2
    },
    enableMouseTracking: false,
    animation: { duration: 2000 },
    zIndex: 10
    }
    ],
    drilldown: {
    activeAxisLabelStyle: {
    color: '#87ceeb',
    fontWeight: 'bold'
    },
    activeDataLabelStyle: {
    color: '#87ceeb',
    fontWeight: 'bold'
    },
    series: drilldownSeries
    },
    credits: { enabled: false },
    legend: {
    align: 'left',
    enabled: true,
    verticalAlign: 'top',
    itemStyle: {
    color: '#475569',
    fontSize: '13px',
    fontWeight: '500'
    }
    }
    });
    }, 800);
    };

    /* EFC: Para mantener en variable el nombre del tab activo */
    const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label || '';

    /* EFC: La data del tab activo */
    const currentData = chartData[activeTab] || [];

  return (
    <>
      {/* EFC: Estructura standard pantalla */}
      <div>                                                                   
          <div className="mx-auto px-6 custom-container">
              <Breadcrumbs />  
              {/* EFC: Titulo */}
              <div className="titulo-pantalla">
                <h2>
                    Ranking ETFA - Departamento de Entidades Técnicas y Laboratorio - SMA
                </h2>     
              </div>

              {/* EFC: Contenido */}    
              <div className="contenido-pantalla">

                <div className="tab-container">
                {tabs.map((tab) => (
                <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                >
                {tab.label}
                </button>
                ))}
                </div>

              {tabs.map((tab) => (
              <div
                key={tab.id}
                id={tab.id}
                className={`tab-content ${activeTab === tab.id ? 'active' : 'hidden'}`}
              >
                {tab.id !== 'informacion' ? (
                  <>
                      <div className="flex justify-end mb-4">
                        <button className="boton-ranking-verde" 
                                onClick={() => setModalOpen(true)}>
                            <i class="fa-solid fa-rectangle-list"></i>Ver detalles
                        </button>
                      </div>
                      <div className="chart-container">
                        <div ref={chartRefs[tab.id]} id={`chartContainer-${tab.id}`} style={{ position: 'relative' }}>
                            <div className="loading-overlay">
                                <div className="spinner" />
                            </div>
                        </div>
                      </div>
                  </>
                ) : (
                  <div className="info-content">                  
                    <p><strong>Ranking ETFA</strong> se elabora utilizando las evaluaciones de desempeño analítico realizadas por la SMA a las Entidades Técnicas de Fiscalización Ambiental (ETFA), a través de los Ensayos de Aptitud.</p>
                    <p><strong>Periodo de evaluación:</strong> 2016-2024.</p>
                    <p><strong>Matrices:</strong> aguas residuales, aguas superficiales y filtros impactados con MP.</p>
                    <p><strong>Evaluación satisfactoria:</strong> Resultado entregado por una ETFA, en el marco de los Ensayos de Aptitud de la SMA, que cumple con los criterios de evaluación para ser calificado como satisfactorio.</p>
                    <p><strong>Total de evaluaciones:</strong> Sumatoria del total de parámetros evaluados durante el período de evaluación, por ETFA y matriz.</p>
                    <p><strong>% satisfactorio:</strong> Promedio de evaluaciones de desempeño satisfactorias que ha obtenido una ETFA durante el período de evaluación, de acuerdo con la siguiente fórmula:</p>
                    <div style={{ textAlign: 'center' }}><math xmlns="http://www.w3.org/1998/Math/MathML" >
                      <strong>
                        <mrow>
                          <mo></mo>
                          <mfrac>
                          <mi>S</mi>
                          <mi>T</mi>
                          </mfrac>
                          <mo></mo>
                          <mo>&#x00D7;</mo>
                          <mn>100</mn>
                        </mrow>
                      </strong>
                    </math>
                    </div>
                    <p>Donde,</p>
                    <ul>
                    <li><p><strong>S</strong> = Total de evaluaciones satisfactorias.</p></li>
                    <li><p><strong>T</strong> = Total de evaluaciones durante el período informado.</p></li>
                    </ul>
                    <p><strong>Ensayos de Aptitud:</strong> se encuentran disponibles en el siguiente enlace: <a style={{color: 'blue',textDecoration: 'underline',}} href="https://portal.sma.gob.cl/index.php/portal-regulados/entidades-tecnicas/ensayos-de-aptitud/" class="uri">https://portal.sma.gob.cl/index.php/portal-regulados/entidades-tecnicas/ensayos-de-aptitud/</a></p>

                    <p><strong>NOTA:</strong></p>
                    <p>En el ranking se presentan únicamente las ETFA autorizadas al 01-04-2024, de acuerdo con lo indicado en el registro público de la SMA <a style={{color: 'blue',textDecoration: 'underline',}} href="https://entidadestecnicas.sma.gob.cl/Sucursal/RegistroPublico" class="uri">https://entidadestecnicas.sma.gob.cl/Sucursal/RegistroPublico</a></p>
                  </div>
                )}
              </div>
              ))}  
              </div>
          </div> 
      </div>

      {/* EFC: Control del MODAL */}
      {modalOpen && (
        
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center"
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={(e) => {
          if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >

        <div className="bg-white rounded-lg w-[90%] max-w-6xl p-6 shadow-lg relative max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()} // evita que el click en el modal cierre
        >

        {/* Título */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        Ranking ETFA Detalles de Cumplimiento - {activeTabLabel}
        </h2>

        {/* Botón cerrar */}
        <button
          onClick={() => setModalOpen(false)}
          style={{ position: 'absolute', top: 15, right: 15 }}
          className="bg-transparent border-none text-2xl cursor-pointer"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {/* Sección de botones */}
        <div className="modal-buttons">
           {/* Botón Exportar a XLS */}
          <button
            onClick={() => exportExcel(activeTab, currentData)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
          >
            <i class="fa-regular fa-file-excel"></i> Exportar a Excel
          </button>
          {/* Botón Exportar a PDF */}
          <button
            onClick={() => exportPDF(activeTab, currentData)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
            <i class="fa-regular fa-file-pdf"></i> Exportar a PDF
          </button>
        </div>

        {/* Tabla con datos */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Código ETFA</th>
                <th className="py-2 px-4 border-b text-left">Persona Jurídica</th>
                <th className="py-2 px-4 border-b text-left">Nombre Sucursal</th>
                <th className="py-2 px-4 border-b text-center">Total Evaluaciones</th>
                <th className="py-2 px-4 border-b text-center">% Satisfactorio</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.etfa}</td>
                  <td className="py-2 px-4 border-b"><strong>{item.entitylegal}</strong></td>
                  <td className="py-2 px-4 border-b">{item.entity}</td>
                  <td className="py-2 px-4 border-b text-center">{item.evaluations}</td>
                  <td className="py-2 px-4 border-b text-center font-semibold" style={{  backgroundColor: getColorByPercentage(item.percentage) }}>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>
        </div>
      )}
        
    </>
  );
}
