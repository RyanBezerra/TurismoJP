// ========================================
// TURISMO PARAÍBA - SCRIPT PRINCIPAL
// ========================================

// Configurações globais
const CONFIG = {
    slideshowInterval: 8000,
    destinations: [
        { name: 'Caminhos do Frio', image: 'caminhos-frio.jpg', description: 'Serras históricas com clima ameno e cultura rica' },
        { name: 'Rota do Cangaço', image: 'rota-cangaco.jpg', description: 'Caminhos de Lampião e a história do sertão' },
        { name: 'Trilhas Ecológicas', image: 'trilhas-ecologicas.jpg', description: 'Natureza preservada e aventuras ao ar livre' },
        { name: 'Ecoparques', image: 'ecoparques.jpg', description: 'Parques naturais e conservação ambiental' },
        { name: 'Artesanato Local', image: 'artesanato.jpg', description: 'Tradições artesanais e cultura popular' }
    ]
};

// Estado global da aplicação
const AppState = {
    currentSlide: 0,
    totalSlides: 5,
    destinationsSlider: {
        currentIndex: 0,
        totalCards: 0,
        cardsPerView: 2,
        cardWidth: 864,
        isAnimating: false
    }
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    try {
        initializeNavigation();
        initializeMobileMenu();
        initializeBookingForm();
        initializeDestinationsSlider();
        initializeAnimations();
        startSlideshow();
        console.log('✅ Aplicação inicializada com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
    }
}

// ========================================
// NAVEGAÇÃO PRINCIPAL (HERO)
// ========================================
function initializeNavigation() {
    const navDots = document.querySelectorAll('.dot');
    const navArrows = document.querySelectorAll('.nav-arrow');
    
    // Navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Navigation arrows
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            if (e.target.closest('.up')) {
                previousSlide();
            } else if (e.target.closest('.down')) {
                nextSlide();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') previousSlide();
        if (e.key === 'ArrowDown') nextSlide();
    });
}

function goToSlide(index) {
    AppState.currentSlide = index;
    updateSlideDisplay();
    updateNavigationDots();
    updateDestination();
}

function nextSlide() {
    AppState.currentSlide = (AppState.currentSlide + 1) % AppState.totalSlides;
    goToSlide(AppState.currentSlide);
}

function previousSlide() {
    AppState.currentSlide = (AppState.currentSlide - 1 + AppState.totalSlides) % AppState.totalSlides;
    goToSlide(AppState.currentSlide);
}

function updateSlideDisplay() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    const destination = CONFIG.destinations[AppState.currentSlide];
    if (destination) {
        heroTitle.innerHTML = `Descubra ${destination.name} na <span class="highlight">Paraíba</span>`;
        heroSubtitle.textContent = destination.description;
    }
}

function updateNavigationDots() {
    const navDots = document.querySelectorAll('.dot');
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === AppState.currentSlide);
    });
}

function updateDestination() {
    const destinationInput = document.getElementById('destination');
    const destination = CONFIG.destinations[AppState.currentSlide];
    if (destination && destinationInput) {
        destinationInput.value = destination.name;
    }
}

// ========================================
// SLIDER DE DESTINOS
// ========================================
function initializeDestinationsSlider() {
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    const slider = document.querySelector('.destinations-slider');
    const cards = document.querySelectorAll('.destination-card');
    const indicators = document.querySelectorAll('.dot');
    
    if (!prevBtn || !nextBtn || !slider || cards.length === 0) {
        console.error('❌ Elementos do slider não encontrados!');
        return;
    }
    
    AppState.destinationsSlider.totalCards = cards.length;
    updateCardsPerView();
    
    // Event listeners
    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Card interactions
    initializeCardInteractions(cards);
    
    // Resize listener
    window.addEventListener('resize', debounce(handleResize, 250));
    
    updateSlider();
}

function updateCardsPerView() {
    const width = window.innerWidth;
    const slider = AppState.destinationsSlider;
    
    if (width <= 480) {
        slider.cardsPerView = 1;
        slider.cardWidth = 296; // 280px + 16px gap
    } else if (width <= 768) {
        slider.cardsPerView = 1;
        slider.cardWidth = 336; // 320px + 16px gap
    } else if (width <= 1024) {
        slider.cardsPerView = 2;
        slider.cardWidth = 352; // 320px + 32px gap (1 card)
    } else {
        slider.cardsPerView = 2;
        slider.cardWidth = 432; // 400px + 32px gap (1 card)
    }
}

function updateSlider() {
    const slider = document.querySelector('.destinations-slider');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    const indicators = document.querySelectorAll('.dot');
    
    if (!slider) return;
    
    const translateX = -AppState.destinationsSlider.currentIndex * AppState.destinationsSlider.cardWidth;
    slider.style.transform = `translateX(${translateX}px)`;
    
    // Update buttons
    const maxIndex = Math.max(0, AppState.destinationsSlider.totalCards - AppState.destinationsSlider.cardsPerView);
    const canGoPrev = AppState.destinationsSlider.currentIndex > 0;
    const canGoNext = AppState.destinationsSlider.currentIndex < maxIndex;
    
    if (prevBtn) prevBtn.disabled = !canGoPrev;
    if (nextBtn) nextBtn.disabled = !canGoNext;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === AppState.destinationsSlider.currentIndex);
    });
}

function handlePrevClick() {
    if (AppState.destinationsSlider.currentIndex > 0) {
        AppState.destinationsSlider.currentIndex -= AppState.destinationsSlider.cardsPerView;
        if (AppState.destinationsSlider.currentIndex < 0) {
            AppState.destinationsSlider.currentIndex = 0;
        }
        updateSlider();
    }
}

function handleNextClick() {
    const maxIndex = AppState.destinationsSlider.totalCards - AppState.destinationsSlider.cardsPerView;
    if (AppState.destinationsSlider.currentIndex < maxIndex) {
        AppState.destinationsSlider.currentIndex += AppState.destinationsSlider.cardsPerView;
        if (AppState.destinationsSlider.currentIndex > maxIndex) {
            AppState.destinationsSlider.currentIndex = maxIndex;
        }
        updateSlider();
    }
}

function handleResize() {
    updateCardsPerView();
    const maxIndex = Math.max(0, AppState.destinationsSlider.totalCards - AppState.destinationsSlider.cardsPerView);
    if (AppState.destinationsSlider.currentIndex > maxIndex) {
        AppState.destinationsSlider.currentIndex = Math.max(0, maxIndex);
    }
    updateSlider();
}

// ========================================
// INTERAÇÕES DOS CARDS
// ========================================
function initializeCardInteractions(cards) {
    cards.forEach(card => {
        card.addEventListener('click', () => handleCardClick(card));
        
        // Action buttons
        const actionBtns = card.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleActionButton(btn);
            });
        });
    });
}

function handleCardClick(card) {
    const title = card.querySelector('.card-title').textContent;
    const destinationInput = document.getElementById('destination');
    const bookingSection = document.querySelector('.booking-section');
    
    if (destinationInput) destinationInput.value = title;
    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth' });
}

function handleActionButton(btn) {
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('fa-heart')) {
        // Toggle favorite
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.style.color = icon.classList.contains('fas') ? '#ff6b35' : '';
    } else if (icon.classList.contains('fa-share-alt')) {
        // Share functionality
        if (navigator.share) {
            navigator.share({
                title: 'Paraíba Turismo',
                text: 'Confira este destino incrível na Paraíba!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    }
}

// ========================================
// FORMULÁRIO DE RESERVA
// ========================================
function initializeBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    const destinationInput = document.getElementById('destination');
    const personSelect = document.getElementById('person');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (!bookingForm) return;
    
    bookingForm.addEventListener('submit', handleFormSubmission);
    
    if (destinationInput) {
        destinationInput.addEventListener('click', nextSlide);
    }
    
    if (personSelect) {
    personSelect.addEventListener('change', (e) => {
            if (e.target.value === '5+') {
            console.log('Número personalizado de pessoas necessário');
        }
    });
    }
    
    [checkinInput, checkoutInput].forEach(input => {
        if (input) {
            input.addEventListener('click', () => showDatePicker(input));
        }
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = {
        destination: document.getElementById('destination')?.value,
        person: document.getElementById('person')?.value,
        checkin: document.getElementById('checkin')?.value,
        checkout: document.getElementById('checkout')?.value
    };
    
    showBookingConfirmation(formData);
}

function showBookingConfirmation(data) {
    const modal = createModal(`
        <div class="modal-content">
            <h3>Confirmação de Roteiro</h3>
            <p>Roteiro: ${data.destination}</p>
            <p>Viajantes: ${data.person}</p>
            <p>Data de Início: ${data.checkin}</p>
            <p>Data de Retorno: ${data.checkout}</p>
            <p class="local-businesses">✨ Conectando com negócios locais</p>
            <button class="btn-confirm">Confirmar Roteiro</button>
            <button class="btn-cancel">Cancelar</button>
        </div>
    `);
    
    modal.querySelector('.btn-confirm').addEventListener('click', () => {
        alert('Roteiro confirmado! Obrigado por escolher a Paraíba Turismo.');
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = content;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        color: #333;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function showDatePicker(input) {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    if (input.id === 'checkin') {
        input.value = formatDate(currentDate);
    } else if (input.id === 'checkout') {
        input.value = formatDate(futureDate);
    }
}

function formatDate(date) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
}

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
// ANIMAÇÕES E EFEITOS
// ========================================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.booking-form, .nav-dots');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function startSlideshow() {
    setInterval(nextSlide, CONFIG.slideshowInterval);
}

// ========================================
// EFEITOS DE SCROLL
// ========================================
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    if (header) {
        header.style.backgroundColor = window.scrollY > 100 ? 'rgba(0, 0, 0, 0.6)' : 'transparent';
    }
}, 10));

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
// FUNÇÃO GLOBAL DE NAVEGAÇÃO (FALLBACK)
// ========================================
function navigateDestinations(direction) {
    if (direction === 'prev' && AppState.destinationsSlider.currentIndex > 0) {
        AppState.destinationsSlider.currentIndex -= AppState.destinationsSlider.cardsPerView;
        if (AppState.destinationsSlider.currentIndex < 0) {
            AppState.destinationsSlider.currentIndex = 0;
        }
    } else if (direction === 'next') {
        const maxIndex = AppState.destinationsSlider.totalCards - AppState.destinationsSlider.cardsPerView;
        if (AppState.destinationsSlider.currentIndex < maxIndex) {
            AppState.destinationsSlider.currentIndex += AppState.destinationsSlider.cardsPerView;
            if (AppState.destinationsSlider.currentIndex > maxIndex) {
                AppState.destinationsSlider.currentIndex = maxIndex;
            }
        } else {
            return;
        }
    } else {
        return;
    }
    
    updateSlider();
}