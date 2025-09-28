// ========================================
// JAVASCRIPT COMPARTILHADO - PARAÍBA TURISMO
// ========================================

// Configurações globais
const COMMON_CONFIG = {
    animationDuration: 300,
    scrollOffset: 100
};

// ========================================
// MENU MÓVEL
// ========================================
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!mobileMenuToggle || !nav) return;
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });
}

function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!nav || !mobileMenuToggle) return;
    
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!nav || !mobileMenuToggle) return;
    
    nav.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// SCROLL SUAVE
// ========================================
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// EFEITOS DE SCROLL
// ========================================
function initializeScrollEffects() {
    window.addEventListener('scroll', debounce(() => {
        const header = document.querySelector('.header');
        if (header) {
            header.style.background = window.scrollY > 100 ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.1)';
        }
    }, 10));
}

// ========================================
// ANIMAÇÕES DE ENTRADA
// ========================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.section-header, .card, .stat-item, .footer-section'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all ${COMMON_CONFIG.animationDuration}ms ease-out`;
        observer.observe(el);
    });
}

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// UTILITÁRIOS
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeMobileMenu();
        initializeSmoothScroll();
        initializeScrollEffects();
        initializeScrollAnimations();
        initializeLazyLoading();
        console.log('✅ JavaScript compartilhado inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização do JavaScript compartilhado:', error);
    }
});

// ========================================
// FUNÇÕES GLOBAIS
// ========================================
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

window.closeModal = function(modal) {
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
};
