// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Cambiar icono
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
}

// Smooth Scroll para enlaces internos
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
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Botón "Únete a Nuestros Talleres"
const talleresBtn = document.getElementById('talleresBtn');
if (talleresBtn) {
    talleresBtn.addEventListener('click', () => {
        // Mostrar advertencia
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
        
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
}

// Botón "Asóciate" y "Convertirme en Socio"
const asociateBtn = document.getElementById('asociateBtn');
const socioGratisBtn = document.getElementById('socioGratisBtn');

function showSocioModal() {
    const modal = document.getElementById('socioModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        // Crear modal si no existe
        const modalHTML = `
            <div id="socioModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
                        <button onclick="closeModal('socioModal')" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
                            Cerrar
                        </button>
                        <a href="#talleres-contacto" onclick="closeModal('socioModal')" class="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-center">
                            ¡Quiero ser socio!
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const newModal = document.getElementById('socioModal');
        newModal.addEventListener('click', (e) => {
            if (e.target === newModal) {
                closeModal('socioModal');
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Asignar eventos a los botones
if (asociateBtn) {
    asociateBtn.addEventListener('click', showSocioModal);
}

if (socioGratisBtn) {
    socioGratisBtn.addEventListener('click', showSocioModal);
}

// Botón "Descargar Catálogo"
const descargarCatalogoBtn = document.getElementById('descargarCatalogo');
if (descargarCatalogoBtn) {
    descargarCatalogoBtn.addEventListener('click', () => {
        // Simular descarga (puedes cambiar la URL por la real cuando tengas el catálogo)
        const link = document.createElement('a');
        link.href = '#'; // Cambia esto por la URL real del catálogo PDF
        link.download = 'Catálogo-Acordeones-2024.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Mostrar mensaje
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-4 rounded-xl shadow-2xl z-50 transform transition-transform duration-300 translate-y-full max-w-sm';
        notification.innerHTML = `
            <div class="flex items-start gap-3">
                <i class="fas fa-info-circle text-accent text-2xl mt-1"></i>
                <div>
                    <div class="font-bold text-lg">Catálogo no disponible aún</div>
                    <div class="text-sm mt-1">Estamos preparando nuestro catálogo 2024.</div>
                    <div class="text-xs text-gray-200 mt-2">Contáctanos por WhatsApp para recibir información actualizada: (+51) 904 703 990</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.classList.remove('translate-y-full');
        }, 100);
        
        // Eliminar después de 5 segundos
        setTimeout(() => {
            notification.classList.add('translate-y-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    });
}

// Botón "Ver Métodos de Pago"
const verMetodosPagoBtn = document.getElementById('verMetodosPago');
if (verMetodosPagoBtn) {
    verMetodosPagoBtn.addEventListener('click', () => {
        const metodosPago = document.getElementById('metodosPago');
        if (metodosPago) {
            metodosPago.classList.toggle('hidden');
            
            // Scroll suave a la sección
            if (metodosPago.classList.contains('hidden')) {
                verMetodosPagoBtn.innerHTML = '<i class="fas fa-credit-card mr-2"></i> Ver Métodos de Pago';
            } else {
                verMetodosPagoBtn.innerHTML = '<i class="fas fa-times mr-2"></i> Ocultar Métodos de Pago';
                metodosPago.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });
}

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Cambiar texto del botón
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío
        setTimeout(() => {
            // Mostrar mensaje de éxito
            const successMsg = document.createElement('div');
            successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 -translate-y-full';
            successMsg.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fas fa-check-circle"></i>
                    <span>¡Mensaje enviado correctamente!</span>
                </div>
            `;
            
            document.body.appendChild(successMsg);
            
            // Animación de entrada
            setTimeout(() => {
                successMsg.classList.remove('-translate-y-full');
            }, 100);
            
            // Resetear formulario
            this.reset();
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                successMsg.classList.add('-translate-y-full');
                setTimeout(() => {
                    successMsg.remove();
                }, 300);
            }, 3000);
            
            // Enviar email (simulado)
            console.log('Formulario enviado a: cultura@asociacióndeacordeonistas.pe');
            
        }, 1500);
    });
}

// Efecto de scroll en header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
    } else {
        header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
    }
});

// Actualizar año actual en footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Agregar año también a cualquier otro lugar que diga 2024
    document.querySelectorAll('*').forEach(element => {
        if (element.textContent.includes('2024') && !element.textContent.includes(currentYear.toString())) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
});

// Funciones globales para modales
window.closeModal = closeModal;

// Mostrar mensaje de bienvenida
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('Asociación de Acordeonistas Del Perú - Página oficial');
        console.log('Contacto: cultura@asociacióndeacordeonistas.pe');
        console.log('Teléfono/WhatsApp: (+51) 904 703 990');
        console.log('Dirección: Av. 28 de Julio 564, Miraflores, Lima');
    }, 1000);
});