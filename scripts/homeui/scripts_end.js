 // Toggle mobile menu
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        // Show more info function
        function showMoreInfo(section) {
            alert(`Mostrando más información sobre: ${section}`);
            // Aquí puedes agregar la lógica para mostrar más información
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('mobileMenu').classList.add('hidden');
            });
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
 
  (function(){function c(){var b=a.contentDocument||a.contentWindow.document;
  if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9598c2e5c6a988b2',t:'MTc1MTU3MDY0OC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
  
  const toggleMenuBtn = document.getElementById("toggleMenu");
  const menu = document.getElementById("accessibilityMenu");

  let currentFontSize = 16;
  let menuTimeout;

  // Reinicia el temporizador de auto cierre
  function resetAutoClose() {
  clearTimeout(menuTimeout);
  menuTimeout = setTimeout(() => {
    menu.classList.remove("show");
  }, 5000); // 5 segundos
  }

  // Mostrar u ocultar menú
  toggleMenuBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // No se cierre al hacer click en el botón
  menu.classList.toggle("show");

  // Si se muestra, inicia el temporizador para auto-cierre
  if (menu.classList.contains("show")) {
    resetAutoClose();
  } else {
    clearTimeout(menuTimeout);
  }
  });

  function changeFontSize(delta) {
    currentFontSize += delta;
    document.body.style.fontSize = currentFontSize + "px";
    resetAutoClose();
  }

  function resetFontSize() {
    currentFontSize = 16;
    document.body.style.fontSize = currentFontSize + "px";
    resetAutoClose();
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    resetAutoClose();
  }

  // Cerrar menú al hacer clic fuera de él
  document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !toggleMenuBtn.contains(event.target)) {
    menu.classList.remove("show");
    clearTimeout(menuTimeout);
  }
  });

  function showTab(tabName) {

      currentTabName = tabName; // ← Añade esta línea
        console.log('current tab');
      console.log(currentTabName);
      
      // Ocultar todos los contenidos de tabs
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Remover clase active de todos los tabs
      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(tab => tab.classList.remove('active'));
      
      // Mostrar el contenido del tab seleccionado
      document.getElementById(tabName).classList.add('active');
      
      // Activar el tab clickeado
      event.target.classList.add('active');
      
      // Crear gráfico si es necesario
      if (tabName !== 'informacion') {
          setTimeout(() => {
              createChart(tabName);
          }, 100);
      }
  }


  /* desplegar detalle de los datos */
  function openModal(tabName) {
      const modal = document.getElementById("detailsModal");
      const tableBody = document.getElementById("modalTableBody");

      modal.classList.remove('hidden');
      modal.classList.add('flex-center');

      modalTitle.textContent = `Detalles de Cumplimiento - ${tabName}`;
      
      // Limpiar
      tableBody.innerHTML = "";

      // Filtrar por tab (en este caso asumimos los mismos datos para todos)
      // Si más adelante tienes distintos datasets por tab, cambia aquí
      const dataForTab = [...chartData]; // en el futuro, podrías usar chartDataAguasResiduales, etc.

      const sortedData = dataForTab.sort((a, b) => b.percentage - a.percentage);

      sortedData.forEach(item => {
      const row = `
          <tr class="hover:bg-gray-50" style="background-color: ${getColorByPercentage(item.percentage)};">
              <td class="py-2 px-4 border-b">${item.etfa}</td>
              <td class="py-2 px-4 border-b">${item.entity}</td>
              <td class="py-2 px-4 border-b">${item.entitylegal}</td>
              <td class="py-2 px-4 border-b text-center">${item.evaluations}</td>
              <td class="py-2 px-4 border-b text-center">${item.percentage}%</td>
          </tr>
      `;
      tableBody.innerHTML += row;
      });

      modal.classList.remove("hidden");
  }

  function exportPDF(tabName = '') {

      const now = new Date();
      const dateStr = now.toLocaleDateString("es-CL");
      const timeStr = now.toLocaleTimeString("es-CL");
      const datetimeStr = `Generado el ${dateStr} a las ${timeStr}`;

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("landscape");

      // Fecha y hora
      doc.setFontSize(10);
      doc.setTextColor(100); // gris suave
      doc.text(datetimeStr, 14, 28);

      // Título
      doc.setFontSize(16);
      doc.text(`Cumplimiento por entidad - ${tabName.replace('-', ' ')}`, 14, 20);
  
      // Cabeceras y datos
      const headers = [["Código ETFA", "Persona Jurídica", "Nombre Sucursal", "Total Evaluaciones", "% Satisfactorio"]];
      const rows = chartData
          .sort((a, b) => b.percentage - a.percentage)
          .map(item => [item.etfa, item.entity, item.evaluations, `${item.percentage}%`, item.percentage]);


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
          columnStyles: {
          4: { cellWidth: 0, overflow: 'hidden' } // Ocultamos la columna extra
          },
          didParseCell: function (data) {
          if (data.section === 'body') {
          const porcentaje = data.row.raw[4]; // Usamos columna oculta
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

  /* cerrar modal */
  function closeModal() {
      const modal = document.getElementById('detailsModal');
      modal.classList.remove('flex-center');
      modal.classList.add('hidden');
  }

  function getColorByPercentage(percentage) {
      if (percentage >= 85) return '#8AC926'; // Verde suave
      if (percentage >= 70) return '#B0D639'; // Verde claro
      if (percentage >= 55) return '#D2E249'; // Amarillo
      if (percentage >= 30) return '#EFE657'; // Naranja
      return '#DCA253'; // Rojo suave
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