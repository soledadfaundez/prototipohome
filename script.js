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

const scrollBtn = document.getElementById("scrollTopBtn");

// Mostrar el botón después de cierto scroll
window.onscroll = function () {
if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
} else {
    scrollBtn.style.display = "none";
}
};

// Función para volver arriba
function scrollToTop() {
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
}