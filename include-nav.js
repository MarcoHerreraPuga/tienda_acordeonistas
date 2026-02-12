// include-nav.js - Carga el nav en TODAS las páginas
// FUNCIONA EN VERCEL PORQUE USA RUTAS ABSOLUTAS

async function includeNav() {
    try {
        // Usar fetch con ruta absoluta desde la raíz
        const response = await fetch('/nav-content.html');
        if (response.ok) {
            const navHTML = await response.text();
            
            // Buscar TODOS los contenedores de nav y reemplazar
            const navContainers = document.querySelectorAll('#nav-container, .nav-container, [data-include="nav"]');
            
            navContainers.forEach(container => {
                container.innerHTML = navHTML;
            });
            
            // Si no hay contenedores, buscar el header o body
            if (navContainers.length === 0) {
                const header = document.querySelector('header');
                if (header) {
                    header.outerHTML = navHTML;
                } else {
                    // Insertar al principio del body
                    document.body.insertAdjacentHTML('afterbegin', navHTML);
                }
            }
            
            // Disparar evento para que otros scripts sepan que el nav cargó
            window.dispatchEvent(new CustomEvent('navLoaded'));
        } else {
            console.error('Error cargando nav:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includeNav);
} else {
    includeNav();
}