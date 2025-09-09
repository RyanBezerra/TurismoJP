// DOM Elements
const bookingForm = document.querySelector('.booking-form');
const navDots = document.querySelectorAll('.dot');
const navArrows = document.querySelectorAll('.nav-arrow');
const destinationInput = document.getElementById('destination');
const personSelect = document.getElementById('person');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

// Current slide index
let currentSlide = 0;
const totalSlides = navDots.length;

// Roteiros turísticos da Paraíba
const destinations = [
    {
        name: 'Caminhos do Frio',
        image: 'caminhos-frio.jpg',
        description: 'Serras históricas com clima ameno e cultura rica'
    },
    {
        name: 'Rota do Cangaço',
        image: 'rota-cangaco.jpg',
        description: 'Caminhos de Lampião e a história do sertão'
    },
    {
        name: 'Trilhas Ecológicas',
        image: 'trilhas-ecologicas.jpg',
        description: 'Natureza preservada e aventuras ao ar livre'
    },
    {
        name: 'Ecoparques',
        image: 'ecoparques.jpg',
        description: 'Parques naturais e conservação ambiental'
    },
    {
        name: 'Artesanato Local',
        image: 'artesanato.jpg',
        description: 'Tradições artesanais e cultura popular'
    }
];

// Datas de exemplo para demonstração
const sampleDates = [
    { checkin: 'Dom, 17 Set 2020', checkout: 'Ter, 17 Out 2020' },
    { checkin: 'Seg, 20 Out 2020', checkout: 'Qua, 20 Nov 2020' },
    { checkin: 'Sex, 15 Nov 2020', checkout: 'Dom, 15 Dez 2020' },
    { checkin: 'Ter, 10 Dez 2020', checkout: 'Qui, 10 Jan 2021' },
    { checkin: 'Sáb, 5 Jan 2021', checkout: 'Seg, 5 Fev 2021' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Inicializando aplicação...');
        initializeNavigation();
        initializeBookingForm();
        initializeAnimations();
        startSlideshow();
        initializeDestinationsNavigation();
        initializeDestinationCards();
        console.log('Aplicação inicializada com sucesso!');
    } catch (error) {
        console.log('Erro na inicialização:', error);
    }
});

// Navigation functionality
function initializeNavigation() {
    // Navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
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
        if (e.key === 'ArrowUp') {
            previousSlide();
        } else if (e.key === 'ArrowDown') {
            nextSlide();
        }
    });
}

// Slide navigation functions
function goToSlide(index) {
    currentSlide = index;
    updateSlideDisplay();
    updateNavigationDots();
    updateDestination();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

function updateSlideDisplay() {
    // Update hero background or content based on current slide
    const heroBackground = document.querySelector('.hero-background');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    // Add slide transition effect
    heroBackground.style.transition = 'all 0.5s ease';
    
    // Atualizar conteúdo baseado no slide atual
    const destination = destinations[currentSlide];
    if (destination) {
        heroTitle.innerHTML = `Descubra ${destination.name} na <span class="highlight">Paraíba</span>`;
        heroSubtitle.textContent = destination.description;
    }
}

function updateNavigationDots() {
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function updateDestination() {
    const destination = destinations[currentSlide];
    if (destination) {
        destinationInput.value = destination.name;
    }
}

// Booking form functionality
function initializeBookingForm() {
    // Form submission
    bookingForm.addEventListener('submit', handleFormSubmission);
    
    // Destination click to cycle through options
    destinationInput.addEventListener('click', () => {
        nextSlide();
    });
    
    // Person selection with validation
    personSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value === '5+') {
            // Poderia abrir um modal para entrada de número personalizado
            console.log('Número personalizado de pessoas necessário');
        }
    });
    
    // Date inputs - make them interactive
    [checkinInput, checkoutInput].forEach(input => {
        input.addEventListener('click', () => {
            showDatePicker(input);
        });
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = {
        destination: destinationInput.value,
        person: personSelect.value,
        checkin: checkinInput.value,
        checkout: checkoutInput.value
    };
    
    // Simulate booking process
    showBookingConfirmation(formData);
}

function showBookingConfirmation(data) {
    // Criar um modal de confirmação simples
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
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
    `;
    
    // Add modal styles
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
    
    // Manipular botões do modal
    modal.querySelector('.btn-confirm').addEventListener('click', () => {
        alert('Roteiro confirmado! Obrigado por escolher a Paraíba Turismo.');
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showDatePicker(input) {
    // Simulação simples de seletor de data
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 dias a partir de agora
    
    if (input === checkinInput) {
        const dateStr = formatDate(currentDate);
        input.value = dateStr;
    } else if (input === checkoutInput) {
        const dateStr = formatDate(futureDate);
        input.value = dateStr;
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

function getOrdinalSuffix(day) {
    // Em português, não usamos sufixos ordinais como em inglês
    return '';
}

// Animation and effects
function initializeAnimations() {
    // Removed parallax effect to keep background fixed
    
    // Smooth reveal animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.booking-form, .nav-dots');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Slideshow automático
function startSlideshow() {
    setInterval(() => {
        nextSlide();
    }, 8000); // Mudar slide a cada 8 segundos
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.1)';
    }
});

// Alternar menu mobile (para futuras melhorias)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Utility functions
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

// Otimização de performance
// Popular Destinations Navigation - Versão Simplificada
function initializeDestinationsNavigation() {
    console.log('Iniciando navegação de destinos...');
    
    // Aguardar um pouco para garantir que o DOM está pronto
    setTimeout(() => {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const cards = document.querySelectorAll('.destination-card');
        
        console.log('Botões encontrados:', prevBtn, nextBtn);
        console.log('Cartões encontrados:', cards.length);
        
        if (prevBtn && nextBtn && cards.length > 0) {
            let currentIndex = 0;
            const totalCards = cards.length;
            
            // Função para mostrar apenas os cartões visíveis
            function showCards() {
                const cardsPerView = window.innerWidth > 768 ? 4 : 1;
                
                // Mostrar todos os cartões primeiro
                cards.forEach((card, index) => {
                    card.style.display = 'block';
                });
                
                // Depois esconder os que não devem aparecer
                cards.forEach((card, index) => {
                    if (index < currentIndex || index >= currentIndex + cardsPerView) {
                        card.style.display = 'none';
                    }
                });
                
                // Atualizar estado dos botões
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                nextBtn.style.opacity = currentIndex >= totalCards - cardsPerView ? '0.5' : '1';
                
                console.log('Índice atual:', currentIndex, 'Cartões por view:', cardsPerView);
            }
            
            // Event listener para botão anterior
            prevBtn.onclick = function() {
                console.log('Clicou no botão anterior');
                if (currentIndex > 0) {
                    currentIndex--;
                    showCards();
                }
            };
            
            // Event listener para botão próximo
            nextBtn.onclick = function() {
                console.log('Clicou no botão próximo');
                const cardsPerView = window.innerWidth > 768 ? 4 : 1;
                if (currentIndex < totalCards - cardsPerView) {
                    currentIndex++;
                    showCards();
                }
            };
            
            // Inicializar
            showCards();
            console.log('Navegação configurada com sucesso!');
        } else {
            console.log('Elementos não encontrados!');
        }
    }, 100);
}

// Destination card interactions
function initializeDestinationCards() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            
            // Update the main form with selected destination
            const destinationInput = document.getElementById('destination');
            if (destinationInput) {
                destinationInput.value = title;
            }
            
            // Scroll to booking form
            const bookingSection = document.querySelector('.booking-section');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Show confirmation
            setTimeout(() => {
                alert(`Roteiro "${title}" selecionado! Preencha os dados para continuar.`);
            }, 500);
        });
    });
}

const debouncedScroll = debounce(() => {
    // Manipular eventos de scroll de forma eficiente
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Função global para navegação (fallback)
let currentDestIndex = 0;

function navigateDestinations(direction) {
    console.log('Navegação chamada:', direction);
    
    const cards = document.querySelectorAll('.destination-card');
    const totalCards = cards.length;
    const cardsPerView = window.innerWidth > 768 ? 4 : 1;
    
    if (direction === 'prev' && currentDestIndex > 0) {
        currentDestIndex--;
    } else if (direction === 'next' && currentDestIndex < totalCards - cardsPerView) {
        currentDestIndex++;
    }
    
    // Mostrar/ocultar cartões
    cards.forEach((card, index) => {
        if (index >= currentDestIndex && index < currentDestIndex + cardsPerView) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Atualizar botões
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) prevBtn.style.opacity = currentDestIndex === 0 ? '0.5' : '1';
    if (nextBtn) nextBtn.style.opacity = currentDestIndex >= totalCards - cardsPerView ? '0.5' : '1';
    
    console.log('Índice atual:', currentDestIndex);
}

// Features already initialized in main DOMContentLoaded
