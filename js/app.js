// Cargar el menú de navegación desde nav.html
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('nav.html');
        if (response.ok) {
            const navHTML = await response.text();
            document.getElementById('nav-container').innerHTML = navHTML;
            
            // ESPERAR UN POCO PARA QUE EL DOM SE ACTUALICE
            setTimeout(() => {
                initMobileMenu();
                initSmoothScroll();
                initSubmenus();
            }, 50);
        } else {
            console.error('Error al cargar nav.html:', response.status);
        }
    } catch (error) {
        console.error('Error al cargar el menú de navegación:', error);
    }
    
    // Inicializar otras funcionalidades
    initContactForm();
    initButtons();
    initModals();
    updateCurrentYear();
});

// ========== FUNCIONES DEL MENÚ ==========

// Menú móvil - VERSIÓN CORREGIDA
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        // Remover listeners anteriores para evitar duplicados
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            mobileMenu.classList.toggle('hidden');
            
            const icon = this.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
    }
}

// Submenú móvil - VERSIÓN CORREGIDA
function initSubmenus() {
    const mobileCategoriasBtn = document.getElementById('mobileCategoriasBtn');
    const mobileSubmenu = document.getElementById('mobileSubmenu');
    const chevronMobile = document.getElementById('categoriasChevronMobile');
    
    if (mobileCategoriasBtn && mobileSubmenu) {
        // Remover listeners anteriores
        const newBtn = mobileCategoriasBtn.cloneNode(true);
        mobileCategoriasBtn.parentNode.replaceChild(newBtn, mobileCategoriasBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            mobileSubmenu.classList.toggle('hidden');
            
            if (chevronMobile) {
                chevronMobile.classList.toggle('rotate-180');
            }
        });
    }
    
    // Cerrar menú móvil al hacer clic en enlaces
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenu) {
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }
}

// Smooth Scroll para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
}

// ========== FUNCIONES EXISTENTES (SIN CAMBIOS) ==========

// Función para mostrar notificaciones
function showNotification(message, type = 'info', duration = 5000) {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-primary',
        warning: 'bg-yellow-500'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl z-50 transform transition-transform duration-300 translate-y-full max-w-sm`;
    notification.innerHTML = `
        <div class="flex items-start gap-3">
            <i class="fas ${icons[type]} text-2xl mt-1"></i>
            <div>
                <div class="font-bold text-lg">${message}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-y-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-y-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Botones principales
function initButtons() {
    const talleresBtn = document.getElementById('talleresBtn');
    if (talleresBtn) {
        talleresBtn.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl max-w-md w-full p-8">
                    <div class="text-center mb-6">
                        <i class="fas fa-calendar-times text-yellow-500 text-4xl mb-4"></i>
                        <h3 class="text-2xl font-bold text-primary mb-2">Talleres no Disponibles</h3>
                        <p class="text-gray-600">Por el momento no tenemos talleres en curso.</p>
                        <p class="text-gray-500 text-sm mt-2">Pronto anunciaremos nuevos talleres para 2024.</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg mb-6">
                        <p class="text-sm text-gray-600">
                            <i class="fas fa-info-circle text-primary mr-2"></i>
                            Síguenos en redes sociales para estar al tanto de nuestras próximas actividades.
                        </p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="w-full bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-semibold">
                        Entendido
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    }

    const descargarCatalogoBtn = document.getElementById('descargarCatalogo');
    if (descargarCatalogoBtn) {
        descargarCatalogoBtn.addEventListener('click', () => {
            showNotification('Estamos preparando nuestro catálogo 2024. Contáctanos por WhatsApp para recibir información actualizada.', 'info', 6000);
        });
    }

    const verMetodosPagoBtn = document.getElementById('verMetodosPago');
    if (verMetodosPagoBtn) {
        verMetodosPagoBtn.addEventListener('click', () => {
            const metodosPago = document.getElementById('metodosPago');
            if (metodosPago) {
                metodosPago.classList.toggle('hidden');
                verMetodosPagoBtn.innerHTML = metodosPago.classList.contains('hidden') 
                    ? '<i class="fas fa-credit-card mr-2"></i> Ver Métodos de Pago'
                    : '<i class="fas fa-times mr-2"></i> Ocultar Métodos de Pago';
                
                if (!metodosPago.classList.contains('hidden')) {
                    metodosPago.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }
}

// Gestión de modales
function initModals() {
    createSocioModal();
    
    const asociateBtn = document.getElementById('asociateBtn');
    const socioGratisBtn = document.getElementById('socioGratisBtn');
    
    if (asociateBtn) {
        asociateBtn.addEventListener('click', showSocioModal);
    }
    
    if (socioGratisBtn) {
        socioGratisBtn.addEventListener('click', showSocioModal);
    }
}

function createSocioModal() {
    if (document.getElementById('socioModal')) return;
    
    const modalHTML = `
        <div id="socioModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl max-w-md w-full p-8">
                <div class="text-center mb-6">
                    <i class="fas fa-users text-primary text-4xl mb-4"></i>
                    <h3 class="text-2xl font-bold text-primary mb-2">¡Conviértete en Nuestro Socio!</h3>
                    <p class="text-gray-600 mb-4">Únete a nuestra comunidad de acordeonistas peruanos</p>
                </div>
                <div class="space-y-4 mb-6">
                    <div class="flex items-center">
                        <i class="fas fa-check text-secondary mr-3"></i>
                        <span>Membresía <span class="font-bold text-primary">GRATUITA</span> permanente</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-check text-secondary mr-3"></i>
                        <span>Descuentos exclusivos en instrumentos</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-check text-secondary mr-3"></i>
                        <span>Acceso a eventos especiales</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-check text-secondary mr-3"></i>
                        <span>Networking con músicos profesionales</span>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button onclick="window.closeModal('socioModal')" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                        Cerrar
                    </button>
                    <a href="#talleres-contacto" onclick="window.closeModal('socioModal')" class="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-center">
                        ¡Quiero ser socio!
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('socioModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal('socioModal');
        }
    });
}

function showSocioModal() {
    const modal = document.getElementById('socioModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('¡Mensaje enviado correctamente!', 'success', 3000);
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Actualizar año actual
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Efecto de scroll en header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
        } else {
            header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
        }
    }
});

// Exponer funciones globalmente
window.closeModal = closeModal;