// ========================================
// PÁGINA DE ROTEIROS - JAVASCRIPT
// ========================================

// Estado global da página de roteiros
const RoteirosState = {
    currentView: 'grid',
    currentPage: 1,
    itemsPerPage: 6,
    filteredRoteiros: [],
    allRoteiros: [],
    activeFilters: {
        search: '',
        category: '',
        duration: '',
        price: '',
        difficulty: ''
    }
};

// Dados dos roteiros
const ROTEIROS_DATA = [
    { 
        id: 'caminhos-frio',
        title: 'Caminhos do Frio',
        category: 'cultural',
        duration: 2,
        price: 89,
        difficulty: 'facil',
        location: 'Serra da Borborema, PB',
        rating: 4.9,
        reviews: 127,
        description: 'Roteiro pelas serras históricas com clima ameno, artesanato local e gastronomia típica. Inclui visita a ateliês de artesãos e degustação de comidas regionais.',
        image: 'img/WhatsApp-Image-2022-05-27-at-16.49.42-300x277.jpeg.webp',
        badge: { icon: 'fas fa-mountain', text: 'Serra' },
        details: {
            maxPeople: 8,
            minPeople: 2,
            includes: ['Guia local', 'Transporte', 'Alimentação', 'Ingressos'],
            highlights: ['Artesanato local', 'Gastronomia típica', 'Clima ameno', 'Paisagens serranas']
        }
    },
    {
        id: 'rota-cangaco',
        title: 'Rota do Cangaço',
        category: 'historico',
        duration: 1,
        price: 75,
        difficulty: 'medio',
        location: 'Sertão Paraibano, PB',
        rating: 4.7,
        reviews: 89,
        description: 'Caminhos de Lampião e a rica história do sertão nordestino. Visita a locais históricos e museus que contam a saga do cangaço.',
        image: 'img/canganco.webp',
        badge: { icon: 'fas fa-history', text: 'Histórico' },
        details: {
            maxPeople: 6,
            minPeople: 1,
            includes: ['Guia especializado', 'Transporte', 'Ingressos', 'Material didático'],
            highlights: ['História do cangaço', 'Museus históricos', 'Cultura sertaneja', 'Lampião']
        }
    },
    {
        id: 'parque-arruda',
        title: 'Parque Arruda Câmara',
        category: 'ecologico',
        duration: 1,
        price: 45,
        difficulty: 'facil',
        location: 'João Pessoa, PB',
        rating: 4.8,
        reviews: 156,
        description: 'Parque urbano com trilhas, lago e diversidade de fauna e flora. Ideal para famílias e amantes da natureza.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: { icon: 'fas fa-tree', text: 'Natureza' },
        details: {
            maxPeople: 10,
            minPeople: 1,
            includes: ['Guia ambiental', 'Material educativo', 'Binóculos', 'Lanche'],
            highlights: ['Trilhas ecológicas', 'Observação de aves', 'Lago natural', 'Flora nativa']
        }
    },
    {
        id: 'bosque-sonhos',
        title: 'Bosque dos Sonhos',
        category: 'ecologico',
        duration: 2,
        price: 65,
        difficulty: 'medio',
        location: 'Campina Grande, PB',
        rating: 4.6,
        reviews: 98,
        description: 'Área de preservação com trilhas ecológicas e atividades de aventura. Inclui camping e observação de aves.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: { icon: 'fas fa-leaf', text: 'Ecológico' },
        details: {
            maxPeople: 6,
            minPeople: 2,
            includes: ['Equipamentos de camping', 'Guia especializado', 'Alimentação', 'Seguro'],
            highlights: ['Camping selvagem', 'Trilhas desafiadoras', 'Observação de fauna', 'Aventura']
        }
    },
    {
        id: 'rota-gastronomica',
        title: 'Rota Gastronômica',
        category: 'gastronomico',
        duration: 1,
        price: 95,
        difficulty: 'facil',
        location: 'João Pessoa, PB',
        rating: 4.9,
        reviews: 203,
        description: 'Tour gastronômico pelos melhores restaurantes e barracas de praia. Degustação de pratos típicos e drinks locais.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: { icon: 'fas fa-utensils', text: 'Gastronômico' },
        details: {
            maxPeople: 8,
            minPeople: 2,
            includes: ['Degustações', 'Guia gastronômico', 'Transporte', 'Drinks'],
            highlights: ['Pratos típicos', 'Barracas de praia', 'Drinks locais', 'Cultura culinária']
        }
    },
    {
        id: 'trilhas-aventura',
        title: 'Trilhas de Aventura',
        category: 'aventura',
        duration: 3,
        price: 120,
        difficulty: 'dificil',
        location: 'Interior da Paraíba, PB',
        rating: 4.7,
        reviews: 112,
        description: 'Trilhas desafiadoras pelas serras com rapel, escalada e camping selvagem. Para aventureiros experientes.',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        badge: { icon: 'fas fa-hiking', text: 'Aventura' },
        details: {
            maxPeople: 4,
            minPeople: 2,
            includes: ['Equipamentos de segurança', 'Guia especializado', 'Alimentação', 'Seguro'],
            highlights: ['Rapel', 'Escalada', 'Camping selvagem', 'Trilhas desafiadoras']
        }
    }
];

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeRoteirosPage();
});

function initializeRoteirosPage() {
    try {
        RoteirosState.allRoteiros = [...ROTEIROS_DATA];
        RoteirosState.filteredRoteiros = [...ROTEIROS_DATA];
        
        initializeFilters();
        initializeSearch();
        initializeViewToggle();
        initializeCardInteractions();
        initializePagination();
        updateResultsCount();
        
        console.log('✅ Página de roteiros inicializada com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização da página de roteiros:', error);
    }
}

// ========================================
// SISTEMA DE FILTROS
// ========================================
function initializeFilters() {
    const filterSelects = document.querySelectorAll('#categoryFilter, #durationFilter, #priceFilter, #difficultyFilter');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilterChange);
    });
}

function handleFilterChange() {
    const category = document.getElementById('categoryFilter').value;
    const duration = document.getElementById('durationFilter').value;
    const price = document.getElementById('priceFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    
    RoteirosState.activeFilters = {
        ...RoteirosState.activeFilters,
        category,
        duration,
        price,
        difficulty
    };
    
    applyFilters();
}

function applyFilters() {
    let filtered = [...ROTEIROS_DATA];
    
    // Filtro por busca
    if (RoteirosState.activeFilters.search) {
        const searchTerm = RoteirosState.activeFilters.search.toLowerCase();
        filtered = filtered.filter(roteiro => 
            roteiro.title.toLowerCase().includes(searchTerm) ||
            roteiro.description.toLowerCase().includes(searchTerm) ||
            roteiro.location.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtro por categoria
    if (RoteirosState.activeFilters.category) {
        filtered = filtered.filter(roteiro => 
            roteiro.category === RoteirosState.activeFilters.category
        );
    }
    
    // Filtro por duração
    if (RoteirosState.activeFilters.duration) {
        if (RoteirosState.activeFilters.duration === '4+') {
            filtered = filtered.filter(roteiro => roteiro.duration >= 4);
        } else {
            const duration = parseInt(RoteirosState.activeFilters.duration);
            filtered = filtered.filter(roteiro => roteiro.duration === duration);
        }
    }
    
    // Filtro por preço
    if (RoteirosState.activeFilters.price) {
        const [min, max] = RoteirosState.activeFilters.price.split('-').map(p => 
            p === '+' ? Infinity : parseInt(p)
        );
        filtered = filtered.filter(roteiro => {
            if (max === Infinity) {
                return roteiro.price >= min;
            }
            return roteiro.price >= min && roteiro.price <= max;
        });
    }
    
    // Filtro por dificuldade
    if (RoteirosState.activeFilters.difficulty) {
        filtered = filtered.filter(roteiro => 
            roteiro.difficulty === RoteirosState.activeFilters.difficulty
        );
    }
    
    RoteirosState.filteredRoteiros = filtered;
    RoteirosState.currentPage = 1;
    
    renderRoteiros();
    updateResultsCount();
    updatePagination();
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('durationFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('difficultyFilter').value = '';
    
    RoteirosState.activeFilters = {
        search: '',
        category: '',
        duration: '',
        price: '',
        difficulty: ''
    };
    
    RoteirosState.filteredRoteiros = [...ROTEIROS_DATA];
    RoteirosState.currentPage = 1;
    
    renderRoteiros();
    updateResultsCount();
    updatePagination();
}

// ========================================
// SISTEMA DE BUSCA
// ========================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    RoteirosState.activeFilters.search = searchTerm;
    applyFilters();
}

// ========================================
// ALTERNÂNCIA DE VISUALIZAÇÃO
// ========================================
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            changeView(view);
        });
    });
}

function changeView(view) {
    RoteirosState.currentView = view;
    
    // Atualizar botões ativos
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Atualizar grid
    const grid = document.getElementById('roteirosGrid');
    grid.classList.toggle('list-view', view === 'list');
}

// ========================================
// INTERAÇÕES DOS CARDS
// ========================================
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.roteiro-card');
    
    cards.forEach(card => {
        // Botões de ação
        const actionBtns = card.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleActionButton(btn);
            });
        });
        
        // Clique no card
        card.addEventListener('click', () => {
            const roteiroId = card.dataset.roteiroId || getRoteiroIdFromCard(card);
            if (roteiroId) {
                viewRoteiro(roteiroId);
            }
        });
    });
}

function getRoteiroIdFromCard(card) {
    const title = card.querySelector('.card-title').textContent;
    const roteiro = ROTEIROS_DATA.find(r => r.title === title);
    return roteiro ? roteiro.id : null;
}

function handleActionButton(btn) {
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('fa-heart')) {
        // Toggle favorite
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.style.color = icon.classList.contains('fas') ? '#ff6b35' : '';
        
        // Feedback visual
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    } else if (icon.classList.contains('fa-share-alt')) {
        // Share functionality
        shareRoteiro(btn);
    }
}

function shareRoteiro(btn) {
    const card = btn.closest('.roteiro-card');
    const title = card.querySelector('.card-title').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: `${title} - Paraíba Turismo`,
            text: `Confira este roteiro incrível na Paraíba!`,
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        showNotification('Link copiado para a área de transferência!');
    }
}

// ========================================
// MODAL DE DETALHES
// ========================================
function viewRoteiro(roteiroId) {
    const roteiro = ROTEIROS_DATA.find(r => r.id === roteiroId);
    if (!roteiro) return;
    
    const modal = document.getElementById('roteiroModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = createModalContent(roteiro);
    modal.classList.add('active');
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', handleModalKeydown);
}

function createModalContent(roteiro) {
    const stars = generateStars(roteiro.rating);
    const includes = roteiro.details.includes.map(item => `<li>${item}</li>`).join('');
    const highlights = roteiro.details.highlights.map(item => `<li>${item}</li>`).join('');
    
    return `
        <div class="modal-roteiro">
            <div class="modal-image">
                <img src="${roteiro.image}" alt="${roteiro.title}">
                <div class="modal-badge">
                    <i class="${roteiro.badge.icon}"></i>
                    <span>${roteiro.badge.text}</span>
                </div>
            </div>
            
            <div class="modal-info">
                <div class="modal-header">
                    <h2>${roteiro.title}</h2>
                    <div class="modal-rating">
                        <div class="stars">${stars}</div>
                        <span>${roteiro.rating} (${roteiro.reviews} avaliações)</span>
                    </div>
                </div>
                
                <div class="modal-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${roteiro.location}</span>
                </div>
                
                <div class="modal-description">
                    <p>${roteiro.description}</p>
                </div>
                
                <div class="modal-details">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${roteiro.duration} ${roteiro.duration === 1 ? 'dia' : 'dias'}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>${roteiro.details.minPeople}-${roteiro.details.maxPeople} pessoas</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-signal"></i>
                            <span>${getDifficultyText(roteiro.difficulty)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>R$ ${roteiro.price}/pessoa</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-sections">
                    <div class="modal-section">
                        <h3>O que está incluído</h3>
                        <ul>${includes}</ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Destaques</h3>
                        <ul>${highlights}</ul>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-reserve" onclick="reserveRoteiro('${roteiro.id}')">
                        <i class="fas fa-calendar-check"></i>
                        Reservar Roteiro
                    </button>
                    <button class="btn-contact" onclick="contactGuide('${roteiro.id}')">
                        <i class="fas fa-phone"></i>
                        Falar com Guia
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getDifficultyText(difficulty) {
    const difficulties = {
        'facil': 'Fácil',
        'medio': 'Médio',
        'dificil': 'Difícil'
    };
    return difficulties[difficulty] || difficulty;
}

function closeModal() {
    const modal = document.getElementById('roteiroModal');
    modal.classList.remove('active');
    document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// ========================================
// SISTEMA DE PAGINAÇÃO
// ========================================
function initializePagination() {
    updatePagination();
}

function changePage(direction) {
    const totalPages = Math.ceil(RoteirosState.filteredRoteiros.length / RoteirosState.itemsPerPage);
    
    if (direction === -1 && RoteirosState.currentPage > 1) {
        RoteirosState.currentPage--;
    } else if (direction === 1 && RoteirosState.currentPage < totalPages) {
        RoteirosState.currentPage++;
    }
    
    renderRoteiros();
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(RoteirosState.filteredRoteiros.length / RoteirosState.itemsPerPage);
    const pageNumbers = document.querySelector('.page-numbers');
    
    if (!pageNumbers) return;
    
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === RoteirosState.currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pageNumbers.appendChild(pageBtn);
    }
    
    // Atualizar botões de navegação
    const prevBtn = document.querySelector('.page-btn:first-child');
    const nextBtn = document.querySelector('.page-btn:last-child');
    
    if (prevBtn) prevBtn.disabled = RoteirosState.currentPage === 1;
    if (nextBtn) nextBtn.disabled = RoteirosState.currentPage === totalPages;
}

function goToPage(page) {
    RoteirosState.currentPage = page;
    renderRoteiros();
    updatePagination();
}

// ========================================
// RENDERIZAÇÃO DOS ROTEIROS
// ========================================
function renderRoteiros() {
    const grid = document.getElementById('roteirosGrid');
    if (!grid) return;
    
    const startIndex = (RoteirosState.currentPage - 1) * RoteirosState.itemsPerPage;
    const endIndex = startIndex + RoteirosState.itemsPerPage;
    const roteirosToShow = RoteirosState.filteredRoteiros.slice(startIndex, endIndex);
    
    grid.innerHTML = roteirosToShow.map(roteiro => createRoteiroCard(roteiro)).join('');
    
    // Reinicializar interações dos cards
    initializeCardInteractions();
}

function createRoteiroCard(roteiro) {
    const stars = generateStars(roteiro.rating);
    const difficultyText = getDifficultyText(roteiro.difficulty);
    
    return `
        <div class="roteiro-card" data-roteiro-id="${roteiro.id}" data-category="${roteiro.category}" data-duration="${roteiro.duration}" data-price="${roteiro.price}" data-difficulty="${roteiro.difficulty}">
            <div class="card-image">
                <img src="${roteiro.image}" alt="${roteiro.title}">
                <div class="card-overlay">
                    <div class="card-badge">
                        <i class="${roteiro.badge.icon}"></i>
                        <span>${roteiro.badge.text}</span>
                    </div>
                    <div class="card-actions">
                        <button class="action-btn" title="Favoritar">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-btn" title="Compartilhar">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${roteiro.title}</h3>
                    <div class="card-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${roteiro.rating} (${roteiro.reviews})</span>
                    </div>
                </div>
                <div class="card-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${roteiro.location}</span>
                </div>
                <p class="card-description">${roteiro.description}</p>
                <div class="card-details">
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>${roteiro.duration} ${roteiro.duration === 1 ? 'dia' : 'dias'}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-users"></i>
                        <span>${roteiro.details.minPeople}-${roteiro.details.maxPeople} pessoas</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-signal"></i>
                        <span>${difficultyText}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-price">
                        <span class="price-label">A partir de</span>
                        <span class="price-value">R$ ${roteiro.price}</span>
                        <span class="price-period">/pessoa</span>
                    </div>
                    <button class="card-btn" onclick="viewRoteiro('${roteiro.id}')">
                        <span>Ver Detalhes</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// FUNÇÕES DE RESERVA E CONTATO
// ========================================
function reserveRoteiro(roteiroId) {
    const roteiro = ROTEIROS_DATA.find(r => r.id === roteiroId);
    if (!roteiro) return;
    
    // Redirecionar para página de reserva ou abrir modal
    showReservationModal(roteiro);
}

function contactGuide(roteiroId) {
    const roteiro = ROTEIROS_DATA.find(r => r.id === roteiroId);
    if (!roteiro) return;
    
    showNotification('Redirecionando para contato com o guia...');
    // Implementar lógica de contato
}

function showReservationModal(roteiro) {
    const modal = createModal(`
        <div class="reservation-modal">
            <h3>Reservar ${roteiro.title}</h3>
            <p>Preço: R$ ${roteiro.price}/pessoa</p>
            <p>Duração: ${roteiro.duration} ${roteiro.duration === 1 ? 'dia' : 'dias'}</p>
            <div class="reservation-form">
                <div class="form-group">
                    <label>Número de pessoas</label>
                    <select id="peopleCount">
                        <option value="1">1 pessoa</option>
                        <option value="2" selected>2 pessoas</option>
                        <option value="3">3 pessoas</option>
                        <option value="4">4 pessoas</option>
                        <option value="5">5 pessoas</option>
                        <option value="6">6 pessoas</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Data preferida</label>
                    <input type="date" id="preferredDate" min="${getTomorrowDate()}">
                </div>
                <div class="form-group">
                    <label>Observações</label>
                    <textarea id="observations" placeholder="Alguma observação especial?"></textarea>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-confirm" onclick="confirmReservation('${roteiro.id}')">
                    Confirmar Reserva
                </button>
                <button class="btn-cancel" onclick="closeReservationModal()">
                    Cancelar
                </button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function confirmReservation(roteiroId) {
    const peopleCount = document.getElementById('peopleCount').value;
    const preferredDate = document.getElementById('preferredDate').value;
    const observations = document.getElementById('observations').value;
    
    showNotification('Reserva confirmada! Entraremos em contato em breve.');
    closeReservationModal();
}

function closeReservationModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================
function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        const count = RoteirosState.filteredRoteiros.length;
        countElement.textContent = `${count} roteiro${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
    }
}

function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

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
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            ${content}
        </div>
    `;
    
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
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

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
// ANIMAÇÕES CSS
// ========================================
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
    
    .modal-roteiro {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        align-items: start;
    }
    
    .modal-image {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
    }
    
    .modal-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    
    .modal-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        background: rgba(255, 107, 53, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .modal-header h2 {
        font-family: 'Playfair Display', serif;
        font-size: 2rem;
        margin-bottom: 10px;
        color: #1a202c;
    }
    
    .modal-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
    }
    
    .modal-location {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4a5568;
        margin-bottom: 20px;
    }
    
    .modal-location i {
        color: #ff6b35;
    }
    
    .modal-description {
        margin-bottom: 25px;
    }
    
    .modal-description p {
        color: #4a5568;
        line-height: 1.6;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 25px;
    }
    
    .modal-section {
        margin-bottom: 25px;
    }
    
    .modal-section h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #1a202c;
    }
    
    .modal-section ul {
        list-style: none;
        padding: 0;
    }
    
    .modal-section li {
        padding: 5px 0;
        color: #4a5568;
        position: relative;
        padding-left: 20px;
    }
    
    .modal-section li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #ff6b35;
        font-weight: bold;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
    }
    
    .btn-reserve,
    .btn-contact {
        flex: 1;
        padding: 15px;
        border: none;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;
    }
    
    .btn-reserve {
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        color: white;
    }
    
    .btn-contact {
        background: #e2e8f0;
        color: #4a5568;
    }
    
    .btn-reserve:hover,
    .btn-contact:hover {
        transform: translateY(-2px);
    }
    
    .reservation-form {
        text-align: left;
        margin: 20px 0;
    }
    
    .reservation-form .form-group {
        margin-bottom: 20px;
    }
    
    .reservation-form label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #4a5568;
    }
    
    .reservation-form select,
    .reservation-form input,
    .reservation-form textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
    }
    
    .reservation-form textarea {
        height: 80px;
        resize: vertical;
    }
    
    @media (max-width: 768px) {
        .modal-roteiro {
            grid-template-columns: 1fr;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .detail-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
