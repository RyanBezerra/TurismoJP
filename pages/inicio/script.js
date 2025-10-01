// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});

// ===== DESTINATIONS SLIDER =====
let currentSlide = 0;
const totalSlides = 3;
let slider, dots;

function initDestinationsSlider() {
    slider = document.querySelector('.destinations-slider');
    dots = document.querySelectorAll('.slider-dots .dot');
    
    if (slider && dots.length > 0) {
        // Add event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
    }
}

function navigateDestinations(direction) {
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else if (direction === 'prev') {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    
    updateSlider();
}

function updateSlider() {
    if (slider) {
        const translateX = -currentSlide * 100;
        slider.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update dots
    if (dots && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDestinationsSlider();
    initHeroSlider();
});

// ===== HERO NAVIGATION DOTS =====
let heroDots, heroArrows;

function initHeroSlider() {
    heroDots = document.querySelectorAll('.nav-dots .dot');
    heroArrows = document.querySelectorAll('.nav-arrow');
    
    if (heroDots.length > 0) {
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all dots
                heroDots.forEach(d => d.classList.remove('active'));
                // Add active class to clicked dot
                dot.classList.add('active');
                
                // Here you can add logic to change hero content
                changeHeroContent(index);
            });
        });
    }
    
    if (heroArrows.length > 0) {
        heroArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const isUp = arrow.classList.contains('up');
                let currentIndex = Array.from(heroDots).findIndex(dot => dot.classList.contains('active'));
                
                if (isUp) {
                    currentIndex = (currentIndex - 1 + heroDots.length) % heroDots.length;
                } else {
                    currentIndex = (currentIndex + 1) % heroDots.length;
                }
                
                // Update active dot
                heroDots.forEach(d => d.classList.remove('active'));
                heroDots[currentIndex].classList.add('active');
                
                changeHeroContent(currentIndex);
            });
        });
    }
}

function changeHeroContent(index) {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const destinationInput = document.getElementById('destination');
    
    const heroContent = [
        {
            title: 'Descubra a Paraíba além do <span class="highlight">sol e mar</span>',
            subtitle: 'Roteiros culturais e ecológicos que conectam você aos negócios locais',
            destination: 'Caminhos do Frio'
        },
        {
            title: 'Explore a <span class="highlight">cultura nordestina</span>',
            subtitle: 'História, tradições e sabores únicos da Paraíba',
            destination: 'Rota do Cangaço'
        },
        {
            title: 'Conecte-se com a <span class="highlight">natureza</span>',
            subtitle: 'Parques, trilhas e experiências ecológicas inesquecíveis',
            destination: 'Parque Arruda Câmara'
        },
        {
            title: 'Saboreie a <span class="highlight">gastronomia local</span>',
            subtitle: 'Pratos típicos e ingredientes frescos da região',
            destination: 'Gastronomia Paraibana'
        },
        {
            title: 'Viva experiências <span class="highlight">únicas</span>',
            subtitle: 'Aventuras e descobertas que marcam para sempre',
            destination: 'Experiências Especiais'
        }
    ];
    
    if (heroTitle && heroSubtitle && destinationInput) {
        heroTitle.innerHTML = heroContent[index].title;
        heroSubtitle.textContent = heroContent[index].subtitle;
        destinationInput.value = heroContent[index].destination;
    }
}

// ===== CARD INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.action-btn[title="Favoritar"]');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#ff6b35';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
            }
        });
    });
    
    // Share button functionality
    const shareButtons = document.querySelectorAll('.action-btn[title="Compartilhar"]');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Paraíba Turismo',
                    text: 'Descubra os melhores roteiros da Paraíba!',
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showNotification('Link copiado para a área de transferência!');
                });
            }
        });
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== SMOOTH SCROLLING =====
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

// ===== SCROLL ANIMATIONS =====
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
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.destination-card, .gastronomy-card, .culture-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const personSelect = document.getElementById('person');
            if (personSelect && personSelect.value) {
                showNotification('Redirecionando para os roteiros...');
                setTimeout(() => {
                    window.location.href = '../roteiros/roteiros.html';
                }, 1000);
            }
        });
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Arrow keys for hero navigation
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const isUp = e.key === 'ArrowUp';
        const currentIndex = Array.from(heroDots).findIndex(dot => dot.classList.contains('active'));
        let newIndex;
        
        if (isUp) {
            newIndex = (currentIndex - 1 + heroDots.length) % heroDots.length;
        } else {
            newIndex = (currentIndex + 1) % heroDots.length;
        }
        
        heroDots.forEach(d => d.classList.remove('active'));
        heroDots[newIndex].classList.add('active');
        changeHeroContent(newIndex);
    }
    
    // Left/Right arrows for destinations slider
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const direction = e.key === 'ArrowLeft' ? 'prev' : 'next';
        navigateDestinations(direction);
    }
});

// ===== AUTO-PLAY FOR HERO SLIDER =====
let heroAutoPlay = setInterval(() => {
    const currentIndex = Array.from(heroDots).findIndex(dot => dot.classList.contains('active'));
    const nextIndex = (currentIndex + 1) % heroDots.length;
    
    heroDots.forEach(d => d.classList.remove('active'));
    heroDots[nextIndex].classList.add('active');
    changeHeroContent(nextIndex);
}, 5000);

// Pause auto-play on hover
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mouseenter', () => {
        clearInterval(heroAutoPlay);
    });
    
    hero.addEventListener('mouseleave', () => {
        heroAutoPlay = setInterval(() => {
            const currentIndex = Array.from(heroDots).findIndex(dot => dot.classList.contains('active'));
            const nextIndex = (currentIndex + 1) % heroDots.length;
            
            heroDots.forEach(d => d.classList.remove('active'));
            heroDots[nextIndex].classList.add('active');
            changeHeroContent(nextIndex);
        }, 5000);
    });
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav.active {
        display: flex;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);
