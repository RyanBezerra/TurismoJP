// ========================================
// PÁGINA SOBRE - JAVASCRIPT ESPECÍFICO
// ========================================

// Configurações da página
const SOBRE_CONFIG = {
    animationDuration: 600,
    scrollOffset: 100
};

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    initializeSobrePage();
});

function initializeSobrePage() {
    try {
        initializeAnimations();
        initializeCounters();
        initializeParallax();
        initializeVideoModal();
        console.log('✅ Página Sobre inicializada com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização da página Sobre:', error);
    }
}

// ========================================
// ANIMAÇÕES DE SCROLL
// ========================================
function initializeAnimations() {
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
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll(
        '.missao-card, .equipe-card, .impacto-card, .stat-item, .historia-text, .historia-image'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all ${SOBRE_CONFIG.animationDuration}ms ease-out`;
        observer.observe(el);
    });
}

// ========================================
// CONTADORES ANIMADOS
// ========================================
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ========================================
// EFEITO PARALLAX
// ========================================
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.sobre-hero .hero-background');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 10));
}

// ========================================
// MODAL DE VÍDEO
// ========================================
function initializeVideoModal() {
    const videoTrigger = document.querySelector('.historia-image');
    
    if (videoTrigger) {
        videoTrigger.addEventListener('click', openVideoModal);
    }
}

function openVideoModal() {
    const modal = createVideoModal();
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal(modal);
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeVideoModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close" onclick="closeVideoModal(this.closest('.video-modal'))">
                <i class="fas fa-times"></i>
            </button>
            <div class="video-container">
                <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.video-modal-content');
    modalContent.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 800px;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        animation: slideInUp 0.3s ease;
    `;
    
    const closeBtn = modal.querySelector('.video-modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        transition: background 0.3s ease;
    `;
    
    const videoContainer = modal.querySelector('.video-container');
    videoContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
    `;
    
    const iframe = modal.querySelector('iframe');
    iframe.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `;
    
    return modal;
}

function closeVideoModal(modal) {
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// ========================================
// INTERAÇÕES DOS CARDS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeCardInteractions();
});

function initializeCardInteractions() {
    // Cards da equipe
    const teamCards = document.querySelectorAll('.equipe-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Cards de impacto
    const impactCards = document.querySelectorAll('.impacto-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ========================================
// SCROLL SUAVE PARA SEÇÕES
// ========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// EFEITOS DE HOVER AVANÇADOS
// ========================================
function initializeAdvancedHoverEffects() {
    const cards = document.querySelectorAll('.missao-card, .equipe-card, .impacto-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.15)';
        });
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
// ANIMAÇÕES CSS DINÂMICAS
// ========================================
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInUp {
            from { 
                opacity: 0; 
                transform: translateY(30px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// FUNÇÕES UTILITÁRIAS
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

// ========================================
// INICIALIZAÇÃO COMPLETA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    addDynamicAnimations();
    initializeAdvancedHoverEffects();
    initializeLazyLoading();
});

// ========================================
// FUNÇÕES GLOBAIS PARA HTML
// ========================================
window.scrollToSection = scrollToSection;
window.closeVideoModal = closeVideoModal;
