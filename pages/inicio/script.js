// ========================================
//   NOVA TELA DE INÍCIO - JAVASCRIPT INTERATIVO
// ========================================

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


// ===== SEARCH SYSTEM =====
function initSearchSystem() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchForm = document.getElementById('searchForm');
    const destinationInput = document.getElementById('destination');
    const suggestionsContainer = document.getElementById('destinationSuggestions');
    
    // Sample destinations data
    const destinations = [
        'João Pessoa', 'Campina Grande', 'Cabedelo', 'Santa Rita', 'Patos',
        'Caminhos do Frio', 'Rota do Cangaço', 'Serra da Borborema',
        'Centro Histórico', 'Farol do Cabo Branco', 'Parque Arruda Câmara',
        'Praia de Tambaba', 'Litoral Norte', 'Sertão Paraibano'
    ];
    
    // Tab switching
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update form action based on tab
            const tabType = tab.dataset.tab;
            // You can add logic here to change form behavior based on tab
        });
    });
    
    // Destination suggestions
    if (destinationInput && suggestionsContainer) {
        destinationInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 1) {
                const matches = destinations.filter(dest => 
                    dest.toLowerCase().includes(query)
                );
                
                if (matches.length > 0) {
                    suggestionsContainer.innerHTML = matches
                        .slice(0, 5)
                        .map(match => `<div class="suggestion-item">${match}</div>`)
                        .join('');
                    suggestionsContainer.style.display = 'block';
                } else {
                    suggestionsContainer.style.display = 'none';
                }
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // Handle suggestion clicks
        suggestionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-item')) {
                destinationInput.value = e.target.textContent;
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!destinationInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }
    
    // Form submission
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const destination = destinationInput.value;
            const category = document.getElementById('category').value;
            const duration = document.getElementById('duration').value;
            const price = document.getElementById('price').value;
            
            // Build search URL
            let searchUrl = '../roteiros/roteiros.html';
            const params = new URLSearchParams();
            
            if (destination) params.append('destination', destination);
            if (category) params.append('category', category);
            if (duration) params.append('duration', duration);
            if (price) params.append('price', price);
            
            if (params.toString()) {
                searchUrl += '?' + params.toString();
            }
            
            showNotification('Redirecionando para os resultados...');
            setTimeout(() => {
                window.location.href = searchUrl;
            }, 1000);
        });
    }
}

// ===== DESTINATIONS SLIDER =====
let currentDestinationSlide = 0;
const destinationsPerSlide = 3;

function initDestinationsSlider() {
    const slider = document.getElementById('destinationsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.destination-card');
    
    if (!slider || !cards.length) return;
    
    const totalSlides = Math.ceil(cards.length / destinationsPerSlide);
    
    function updateSlider() {
        const translateX = -currentDestinationSlide * (100 / destinationsPerSlide);
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentDestinationSlide === 0;
        if (nextBtn) nextBtn.disabled = currentDestinationSlide >= totalSlides - 1;
    }
    
    function nextSlide() {
        if (currentDestinationSlide < totalSlides - 1) {
            currentDestinationSlide++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentDestinationSlide > 0) {
            currentDestinationSlide--;
            updateSlider();
        }
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initialize
    updateSlider();
}

// ===== TESTIMONIALS SLIDER =====
let currentTestimonial = 0;

function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navButtons = document.querySelectorAll('.testimonial-nav-btn');
    
    if (!testimonialCards.length) return;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        navButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
    
    // Event listeners
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-play
    setInterval(nextTestimonial, 5000);
}

// ===== CARD INTERACTIONS =====
function initCardInteractions() {
    // Favorite functionality
    const favoriteButtons = document.querySelectorAll('.action-btn.favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            const isFavorited = icon.classList.contains('fas');
            
            if (isFavorited) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                showNotification('Removido dos favoritos');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#ff6b35';
                showNotification('Adicionado aos favoritos');
            }
        });
    });
    
    // Share functionality
    const shareButtons = document.querySelectorAll('.action-btn.share');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.destination-card');
            const title = card.querySelector('.card-title').textContent;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: 'Confira este destino incrível na Paraíba!',
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showNotification('Link copiado para a área de transferência!');
                });
            }
        });
    });
    
    // Compare functionality
    const compareButtons = document.querySelectorAll('.action-btn.compare');
    let comparedItems = [];
    
    compareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.destination-card');
            const title = card.querySelector('.card-title').textContent;
            
            if (this.classList.contains('comparing')) {
                // Remove from comparison
                comparedItems = comparedItems.filter(item => item !== title);
                this.classList.remove('comparing');
                this.style.background = '';
                showNotification('Removido da comparação');
            } else {
                // Add to comparison
                if (comparedItems.length >= 3) {
                    showNotification('Máximo de 3 itens para comparação');
                    return;
                }
                comparedItems.push(title);
                this.classList.add('comparing');
                this.style.background = '#ff6b35';
                this.style.color = 'white';
                showNotification('Adicionado à comparação');
            }
            
            // Update compare counter (if you have one)
            updateCompareCounter(comparedItems.length);
        });
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
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
    const animatedElements = document.querySelectorAll(
        '.feature-card, .destination-card, .testimonial-card, .map-container'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== INTERACTIVE MAP =====
function initInteractiveMap() {
    const mapBtn = document.querySelector('.map-btn');
    
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            showNotification('Funcionalidade do mapa em desenvolvimento!');
            // Here you would integrate with a real map service like Google Maps or Leaflet
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function updateCompareCounter(count) {
    // Update compare counter in UI if it exists
    const counter = document.querySelector('.compare-counter');
    if (counter) {
        counter.textContent = count;
        counter.style.display = count > 0 ? 'block' : 'none';
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initSearchSystem();
    initDestinationsSlider();
    initTestimonialsSlider();
    initCardInteractions();
    initScrollAnimations();
    initInteractiveMap();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
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
        
        .action-btn.comparing {
            background: #ff6b35 !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);