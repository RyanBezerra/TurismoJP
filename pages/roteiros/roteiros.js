// ========================================
// PÁGINA DE ROTEIROS - JAVASCRIPT
// ========================================

// Grid functionality
function initGrid() {
    // Initialize grid layout if needed
    console.log('Grid layout initialized');
}

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

=======
    totalItems: 0,
    filteredItems: [],
    searchTerm: '',
    activeFilters: {},
    favorites: JSON.parse(localStorage.getItem('roteirosFavorites') || '[]'),
    compareList: [],
    roteiros: [
        {
            id: 'caminhos-frio',
            title: 'Caminhos do Frio',
            category: 'cultural',
            duration: 2,
            price: 89,
            difficulty: 'facil',
            region: 'agreste',
            rating: 4.9,
            reviews: 127,
            description: 'Roteiro pelas serras históricas com clima ameno, artesanato local e gastronomia típica. Inclui visita a ateliês de artesãos, degustação de comidas regionais e hospedagem em pousadas charmosas.',
            location: 'Serra da Borborema, PB',
            tags: ['Artesanato', 'Gastronomia', 'História'],
            features: ['Mais Popular', 'Eco-friendly'],
            details: {
                duration: '2 dias',
                groupSize: '2-8 pessoas',
                difficulty: 'Fácil',
                sustainability: 'Sustentável'
            },
            image: '../../shared/img/WhatsApp-Image-2022-05-27-at-16.49.42-300x277.jpeg.webp'
        },
        {
            id: 'rota-cangaco',
            title: 'Rota do Cangaço',
            category: 'historico',
            duration: 1,
            price: 75,
            difficulty: 'medio',
            region: 'sertao',
            rating: 4.7,
            reviews: 89,
            description: 'Caminhos de Lampião e a rica história do sertão nordestino. Visita a locais históricos, museus e sítios arqueológicos que contam a saga do cangaço e a resistência sertaneja.',
            location: 'Sertão Paraibano, PB',
            tags: ['História', 'Cultura', 'Museus'],
            features: ['Histórico'],
            details: {
                duration: '1 dia',
                groupSize: '1-6 pessoas',
                difficulty: 'Médio',
                type: 'Educativo'
            },
            image: '../../shared/img/canganco.webp'
        },
        {
            id: 'parque-arruda',
            title: 'Parque Arruda Câmara',
            category: 'ecologico',
            duration: 1,
            price: 45,
            difficulty: 'facil',
            region: 'litoral',
            rating: 4.8,
            reviews: 156,
            description: 'Parque urbano com trilhas, lago e diversidade de fauna e flora da Mata Atlântica. Ideal para famílias, inclui zoológico, playground e área de piquenique.',
            location: 'João Pessoa, PB',
            tags: ['Natureza', 'Família', 'Trilhas'],
            features: ['Família', 'Acessível'],
            details: {
                duration: '1 dia',
                groupSize: '1-10 pessoas',
                difficulty: 'Fácil',
                type: 'Família'
            },
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'bosque-sonhos',
            title: 'Bosque dos Sonhos',
            category: 'ecologico',
            duration: 2,
            price: 65,
            difficulty: 'medio',
            region: 'agreste',
            rating: 4.6,
            reviews: 98,
            description: 'Área de preservação com trilhas ecológicas e atividades de aventura. Inclui camping, observação de aves, rapel e tirolesa em meio à natureza preservada.',
            location: 'Campina Grande, PB',
            tags: ['Aventura', 'Camping', 'Ecológico'],
            features: ['Camping', 'Aventura'],
            details: {
                duration: '2 dias',
                groupSize: '2-6 pessoas',
                difficulty: 'Médio',
                type: 'Camping'
            },
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'rota-gastronomica',
            title: 'Rota Gastronômica',
            category: 'gastronomico',
            duration: 1,
            price: 95,
            difficulty: 'facil',
            region: 'litoral',
            rating: 4.9,
            reviews: 203,
            description: 'Tour gastronômico pelos melhores restaurantes e barracas de praia. Degustação de pratos típicos, drinks locais e aulas de culinária com chefs regionais.',
            location: 'João Pessoa, PB',
            tags: ['Comida', 'Tradição', 'Local'],
            features: ['Gourmet', 'Local'],
            details: {
                duration: '1 dia',
                groupSize: '2-8 pessoas',
                difficulty: 'Fácil',
                type: 'Gastronomia'
            },
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'trilhas-aventura',
            title: 'Trilhas de Aventura',
            category: 'aventura',
            duration: 3,
            price: 120,
            difficulty: 'dificil',
            region: 'sertao',
            rating: 4.7,
            reviews: 112,
            description: 'Trilhas desafiadoras pelas serras com rapel, escalada e camping selvagem. Para aventureiros experientes, inclui equipamentos de segurança e guias especializados.',
            location: 'Interior da Paraíba, PB',
            tags: ['Extremo', 'Trilhas', 'Aventura'],
            features: ['Extremo', 'Guiado'],
            details: {
                duration: '3 dias',
                groupSize: '2-4 pessoas',
                difficulty: 'Difícil',
                type: 'Seguro'
            },
            image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ]
};

>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeRoteirosPage();
});

function initializeRoteirosPage() {
    try {
<<<<<<< HEAD
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
=======
        initGrid();
        initializeFilters();
        initializeSearch();
        initializeViewOptions();
        initializeCards();
        updateResultsCount();
        loadFavorites();
        console.log('✅ Página de roteiros inicializada com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
    }
}

// ========================================
// SISTEMA DE FILTROS
// ========================================
function initializeFilters() {
<<<<<<< HEAD
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
=======
    const filterInputs = document.querySelectorAll('#categoryFilter, #durationFilter, #priceFilter, #difficultyFilter, #regionFilter, #seasonFilter, #groupSizeFilter, #ratingFilter');
    
    filterInputs.forEach(input => {
        input.addEventListener('change', handleFilterChange);
    });
}

function handleFilterChange(event) {
    const filterType = event.target.id.replace('Filter', '');
    const filterValue = event.target.value;
    
    if (filterValue) {
        RoteirosState.activeFilters[filterType] = filterValue;
    } else {
        delete RoteirosState.activeFilters[filterType];
    }
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
    
    applyFilters();
}

function applyFilters() {
<<<<<<< HEAD
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
=======
    let filteredRoteiros = [...RoteirosState.roteiros];
    
    // Aplicar filtros ativos
    Object.entries(RoteirosState.activeFilters).forEach(([filterType, filterValue]) => {
        if (!filterValue) return; // Skip empty filters
        
        filteredRoteiros = filteredRoteiros.filter(roteiro => {
            switch (filterType) {
                case 'destination':
                    // Map destination values to regions
                    const destinationMap = {
                        'serra-borborema': 'agreste',
                        'litoral': 'litoral',
                        'sertao': 'sertao',
                        'agreste': 'agreste'
                    };
                    return roteiro.region === destinationMap[filterValue];
                case 'travelers':
                    // Check if roteiro can accommodate the group size
                    const groupSize = parseInt(filterValue);
                    const groupSizeText = roteiro.details.groupSize;
                    
                    if (groupSize <= 2) {
                        return groupSizeText.includes('1-2') || groupSizeText.includes('2-8') || groupSizeText.includes('1-6');
                    }
                    if (groupSize <= 4) {
                        return groupSizeText.includes('2-8') || groupSizeText.includes('3-4') || groupSizeText.includes('2-6');
                    }
                    if (groupSize <= 8) {
                        return groupSizeText.includes('2-8') || groupSizeText.includes('5-8') || groupSizeText.includes('1-10');
                    }
                    return groupSizeText.includes('9+') || groupSizeText.includes('1-10');
                case 'checkin':
                case 'checkout':
                    // For now, just return true as we don't have date-based filtering logic
                    return true;
                case 'category':
                    return roteiro.category === filterValue;
                case 'duration':
                    if (filterValue === '5+') {
                        return roteiro.duration >= 5;
                    }
                    return roteiro.duration === parseInt(filterValue);
                case 'price':
                    const [min, max] = filterValue.split('-').map(p => p === '+' ? Infinity : parseInt(p));
                    return roteiro.price >= min && (max === undefined || roteiro.price <= max);
                case 'difficulty':
                    return roteiro.difficulty === filterValue;
                case 'region':
                    return roteiro.region === filterValue;
                case 'rating':
                    return roteiro.rating >= parseFloat(filterValue);
                default:
                    return true;
            }
        });
    });
    
    // Aplicar busca por texto
    if (RoteirosState.searchTerm) {
        const searchLower = RoteirosState.searchTerm.toLowerCase();
        filteredRoteiros = filteredRoteiros.filter(roteiro => 
            roteiro.title.toLowerCase().includes(searchLower) ||
            roteiro.description.toLowerCase().includes(searchLower) ||
            roteiro.location.toLowerCase().includes(searchLower) ||
            roteiro.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }
    
    RoteirosState.filteredItems = filteredRoteiros;
    RoteirosState.totalItems = filteredRoteiros.length;
    RoteirosState.currentPage = 1;
    
    updateResultsCount();
    renderRoteiros();
}

function clearFilters() {
    // Limpar todos os filtros
    document.querySelectorAll('select').forEach(select => {
        select.value = '';
    });
    
    RoteirosState.activeFilters = {};
    RoteirosState.searchTerm = '';
    document.getElementById('searchInput').value = '';
    
    applyFilters();
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
}

// ========================================
// SISTEMA DE BUSCA
// ========================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
<<<<<<< HEAD
    
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
=======
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchBtn.addEventListener('click', performSearch);
}

function handleSearch(event) {
    RoteirosState.searchTerm = event.target.value;
    applyFilters();
}


function clearSearchFilters() {
    // Clear form fields
    document.getElementById('destination').value = '';
    document.getElementById('travelers').value = '1';
    document.getElementById('checkin').value = '';
    document.getElementById('checkout').value = '';
    
    // Clear filters
    RoteirosState.activeFilters = {};
    RoteirosState.searchTerm = '';
    
    // Apply filters to show all roteiros
    applyFilters();
}


// ========================================
// OPÇÕES DE VISUALIZAÇÃO
// ========================================
function initializeViewOptions() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.currentTarget.dataset.view;
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
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
    
<<<<<<< HEAD
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
=======
    // Aplicar classe ao grid
    const grid = document.getElementById('roteirosGrid');
    grid.className = `roteiros-grid ${view}-view`;
    
    renderRoteiros();
}

// ========================================
// RENDERIZAÇÃO DOS CARDS
// ========================================
function initializeCards() {
    RoteirosState.filteredItems = [...RoteirosState.roteiros];
    RoteirosState.totalItems = RoteirosState.roteiros.length;
    renderRoteiros();
}

function renderRoteiros() {
    const grid = document.getElementById('roteirosGrid');
    const startIndex = (RoteirosState.currentPage - 1) * RoteirosState.itemsPerPage;
    const endIndex = startIndex + RoteirosState.itemsPerPage;
    const roteirosToShow = RoteirosState.filteredItems.slice(startIndex, endIndex);
    
    grid.innerHTML = '';
    
    roteirosToShow.forEach(roteiro => {
        const card = createRoteiroCard(roteiro);
        grid.appendChild(card);
    });
    
    updatePagination();
}

function createRoteiroCard(roteiro) {
    const card = document.createElement('div');
    card.className = 'roteiro-card';
    card.dataset.category = roteiro.category;
    card.dataset.duration = roteiro.duration;
    card.dataset.price = roteiro.price;
    card.dataset.difficulty = roteiro.difficulty;
    card.dataset.region = roteiro.region;
    card.dataset.rating = roteiro.rating;
    
    const isFavorite = RoteirosState.favorites.includes(roteiro.id);
    const isComparing = RoteirosState.compareList.includes(roteiro.id);
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${roteiro.image}" alt="${roteiro.title}" loading="lazy">
            <div class="card-overlay">
                <div class="card-badge">
                    <i class="fas fa-${getCategoryIcon(roteiro.category)}"></i>
                    <span>${getCategoryLabel(roteiro.category)}</span>
                </div>
                <div class="card-actions">
                    <button class="action-btn ${isFavorite ? 'favorited' : ''}" title="Favoritar" onclick="toggleFavorite('${roteiro.id}', this)">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="action-btn" title="Compartilhar" onclick="shareRoteiro('${roteiro.id}')">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="action-btn ${isComparing ? 'comparing' : ''}" title="Comparar" onclick="addToCompare('${roteiro.id}', this)">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                </div>
            </div>
            <div class="card-features">
                ${roteiro.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${roteiro.title}</h3>
                <div class="card-rating">
                    <div class="stars">
                        ${generateStars(roteiro.rating)}
                    </div>
                    <span class="rating-text">${roteiro.rating} (${roteiro.reviews} avaliações)</span>
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
                    <span>${roteiro.details.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span>${roteiro.details.groupSize}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-signal"></i>
                    <span>${roteiro.details.difficulty}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-${getDetailIcon(roteiro.details)}"></i>
                    <span>${getDetailValue(roteiro.details)}</span>
                </div>
            </div>
            <div class="card-tags">
                ${roteiro.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
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
    `;
    
    return card;
}

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================
function getCategoryIcon(category) {
    const icons = {
        cultural: 'theater-masks',
        ecologico: 'tree',
        gastronomico: 'utensils',
        aventura: 'hiking',
        historico: 'history',
        religioso: 'church'
    };
    return icons[category] || 'map-marked-alt';
}

function getCategoryLabel(category) {
    const labels = {
        cultural: 'Cultural',
        ecologico: 'Ecológico',
        gastronomico: 'Gastronômico',
        aventura: 'Aventura',
        historico: 'Histórico',
        religioso: 'Religioso'
    };
    return labels[category] || 'Geral';
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
<<<<<<< HEAD
    const hasHalfStar = rating % 1 !== 0;
=======
    const hasHalfStar = rating % 1 >= 0.5;
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
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

<<<<<<< HEAD
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
    
=======
function getDetailIcon(details) {
    if (details.sustainability) return 'leaf';
    if (details.type === 'Educativo') return 'book';
    if (details.type === 'Família') return 'child';
    if (details.type === 'Camping') return 'campground';
    if (details.type === 'Gastronomia') return 'utensils';
    if (details.type === 'Seguro') return 'shield-alt';
    return 'info-circle';
}

function getDetailValue(details) {
    return details.sustainability || details.type || 'Incluído';
}

function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    const count = RoteirosState.totalItems;
    countElement.textContent = `${count} roteiro${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
}

// ========================================
// PAGINAÇÃO
// ========================================
function updatePagination() {
    const totalPages = Math.ceil(RoteirosState.totalItems / RoteirosState.itemsPerPage);
    const pagination = document.querySelector('.pagination');
    const pageNumbers = pagination.querySelector('.page-numbers');
    
    // Limpar números de página existentes
    pageNumbers.innerHTML = '';
    
    // Gerar números de página
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === RoteirosState.currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
<<<<<<< HEAD
        pageBtn.onclick = () => goToPage(i);
=======
        pageBtn.onclick = () => changePage(i - RoteirosState.currentPage);
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
        pageNumbers.appendChild(pageBtn);
    }
    
    // Atualizar botões de navegação
<<<<<<< HEAD
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
=======
    const prevBtn = pagination.querySelector('.page-btn:first-child');
    const nextBtn = pagination.querySelector('.page-btn:last-child');
    
    prevBtn.disabled = RoteirosState.currentPage === 1;
    nextBtn.disabled = RoteirosState.currentPage === totalPages;
}

function changePage(direction) {
    const totalPages = Math.ceil(RoteirosState.totalItems / RoteirosState.itemsPerPage);
    const newPage = RoteirosState.currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        RoteirosState.currentPage = newPage;
        renderRoteiros();
        
        // Scroll para o topo da seção
        document.querySelector('.roteiros-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// FAVORITOS
// ========================================
function loadFavorites() {
    RoteirosState.favorites = JSON.parse(localStorage.getItem('roteirosFavorites') || '[]');
}

function toggleFavorite(roteiroId, button) {
    const index = RoteirosState.favorites.indexOf(roteiroId);
    
    if (index > -1) {
        RoteirosState.favorites.splice(index, 1);
        button.classList.remove('favorited');
        button.querySelector('i').className = 'far fa-heart';
    } else {
        RoteirosState.favorites.push(roteiroId);
        button.classList.add('favorited');
        button.querySelector('i').className = 'fas fa-heart';
    }
    
    localStorage.setItem('roteirosFavorites', JSON.stringify(RoteirosState.favorites));
    
    // Feedback visual
    showNotification(
        index > -1 ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
        index > -1 ? 'info' : 'success'
    );
}

// ========================================
// COMPARAÇÃO
// ========================================
function addToCompare(roteiroId, button) {
    const index = RoteirosState.compareList.indexOf(roteiroId);
    
    if (index > -1) {
        RoteirosState.compareList.splice(index, 1);
        button.classList.remove('comparing');
    } else {
        if (RoteirosState.compareList.length >= 3) {
            showNotification('Máximo de 3 roteiros para comparação', 'warning');
            return;
        }
        RoteirosState.compareList.push(roteiroId);
        button.classList.add('comparing');
    }
    
    updateCompareModal();
    
    // Feedback visual
    showNotification(
        index > -1 ? 'Removido da comparação' : 'Adicionado à comparação',
        index > -1 ? 'info' : 'success'
    );
}

function updateCompareModal() {
    const modal = document.getElementById('compareModal');
    const countElement = document.getElementById('compareCount');
    const bodyElement = document.getElementById('compareBody');
    
    countElement.textContent = `${RoteirosState.compareList.length} roteiro${RoteirosState.compareList.length !== 1 ? 's' : ''} selecionado${RoteirosState.compareList.length !== 1 ? 's' : ''}`;
    
    if (RoteirosState.compareList.length === 0) {
        bodyElement.innerHTML = '<p style="text-align: center; color: #4a5568; padding: 40px;">Nenhum roteiro selecionado para comparação</p>';
        return;
    }
    
    bodyElement.innerHTML = RoteirosState.compareList.map(roteiroId => {
        const roteiro = RoteirosState.roteiros.find(r => r.id === roteiroId);
        return `
            <div class="compare-item">
                <h4>${roteiro.title}</h4>
                <p><strong>Preço:</strong> R$ ${roteiro.price}/pessoa</p>
                <p><strong>Duração:</strong> ${roteiro.details.duration}</p>
                <p><strong>Dificuldade:</strong> ${roteiro.details.difficulty}</p>
                <p><strong>Avaliação:</strong> ${roteiro.rating}/5 (${roteiro.reviews} avaliações)</p>
                <button class="remove-btn" onclick="removeFromCompare('${roteiroId}')">
                    <i class="fas fa-times"></i> Remover
                </button>
            </div>
        `;
    }).join('');
}

function removeFromCompare(roteiroId) {
    const index = RoteirosState.compareList.indexOf(roteiroId);
    if (index > -1) {
        RoteirosState.compareList.splice(index, 1);
        updateCompareModal();
        
        // Atualizar botão no card
        const button = document.querySelector(`[onclick*="${roteiroId}"]`);
        if (button) {
            button.classList.remove('comparing');
        }
    }
}

function closeCompareModal() {
    document.getElementById('compareModal').classList.remove('active');
}

// ========================================
// COMPARTILHAMENTO
// ========================================
function shareRoteiro(roteiroId) {
    const roteiro = RoteirosState.roteiros.find(r => r.id === roteiroId);
    const url = window.location.href;
    const text = `Confira este roteiro incrível: ${roteiro.title} - ${roteiro.description.substring(0, 100)}...`;
    
    if (navigator.share) {
        navigator.share({
            title: roteiro.title,
            text: text,
            url: url
        });
    } else {
        // Fallback para copiar link
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copiado para a área de transferência!', 'success');
        });
    }
}

// ========================================
// MODAL DE DETALHES
// ========================================
function viewRoteiro(roteiroId) {
    const roteiro = RoteirosState.roteiros.find(r => r.id === roteiroId);
    const modal = document.getElementById('roteiroModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="roteiro-details">
            <div class="detail-header">
                <img src="${roteiro.image}" alt="${roteiro.title}" class="detail-image">
                <div class="detail-info">
                    <h2>${roteiro.title}</h2>
                    <div class="detail-rating">
                        <div class="stars">
                            ${generateStars(roteiro.rating)}
                        </div>
                        <span>${roteiro.rating}/5 (${roteiro.reviews} avaliações)</span>
                    </div>
                    <div class="detail-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${roteiro.location}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-content">
                <div class="detail-section">
                    <h3>Descrição</h3>
                    <p>${roteiro.description}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Informações do Roteiro</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>Duração: ${roteiro.details.duration}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-users"></i>
                            <span>Grupo: ${roteiro.details.groupSize}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-signal"></i>
                            <span>Dificuldade: ${roteiro.details.difficulty}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-tag"></i>
                            <span>Categoria: ${getCategoryLabel(roteiro.category)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Tags</h3>
                    <div class="tags-container">
                        ${roteiro.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                
                <div class="detail-actions">
                    <div class="price-section">
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
                        <span class="price-label">A partir de</span>
                        <span class="price-value">R$ ${roteiro.price}</span>
                        <span class="price-period">/pessoa</span>
                    </div>
<<<<<<< HEAD
                    <button class="card-btn" onclick="viewRoteiro('${roteiro.id}')">
                        <span>Ver Detalhes</span>
                        <i class="fas fa-arrow-right"></i>
=======
                    <button class="btn-reserve" onclick="reserveRoteiro('${roteiro.id}')">
                        <i class="fas fa-calendar-check"></i>
                        Reservar Roteiro
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
                    </button>
                </div>
            </div>
        </div>
    `;
<<<<<<< HEAD
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
=======
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('roteiroModal').classList.remove('active');
}

function reserveRoteiro(roteiroId) {
    const roteiro = RoteirosState.roteiros.find(r => r.id === roteiroId);
    
    showNotification(`Redirecionando para reserva do roteiro: ${roteiro.title}`, 'info');
    
    // Aqui você pode implementar a lógica de reserva
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// ========================================
// BUSCA AVANÇADA
// ========================================
function toggleAdvancedSearch() {
    const advancedSearch = document.getElementById('advancedSearch');
    const button = document.querySelector('.btn-advanced-search');
    
    advancedSearch.classList.toggle('active');
    button.classList.toggle('active');
    
    if (advancedSearch.classList.contains('active')) {
        button.innerHTML = '<i class="fas fa-times"></i> Fechar Busca Avançada';
    } else {
        button.innerHTML = '<i class="fas fa-cog"></i> Busca Avançada';
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
    }
}

// ========================================
<<<<<<< HEAD
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
=======
// NOTIFICAÇÕES
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Estilos da notificação
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
<<<<<<< HEAD
        background: #ff6b35;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10001;
=======
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
<<<<<<< HEAD
            document.body.removeChild(notification);
=======
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
        }, 300);
    }, 3000);
}

<<<<<<< HEAD
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

=======
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936',
        info: '#4299e1'
    };
    return colors[type] || '#4299e1';
}

// ========================================
// UTILITÁRIOS
// ========================================
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
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
<<<<<<< HEAD
=======
// EVENT LISTENERS GLOBAIS
// ========================================
document.addEventListener('click', (e) => {
    // Fechar modais ao clicar fora
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        closeCompareModal();
    }
});

document.addEventListener('keydown', (e) => {
    // Fechar modais com ESC
    if (e.key === 'Escape') {
        closeModal();
        closeCompareModal();
    }
});

// ========================================
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
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
    
<<<<<<< HEAD
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
=======
    .roteiro-details {
        padding: 30px;
    }
    
    .detail-header {
        display: flex;
        gap: 30px;
        margin-bottom: 30px;
    }
    
    .detail-image {
        width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 12px;
    }
    
    .detail-info h2 {
        font-family: 'Playfair Display', serif;
        font-size: 2rem;
        color: #1a202c;
        margin-bottom: 15px;
    }
    
    .detail-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }
    
    .detail-location {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4a5568;
    }
    
    .detail-section {
        margin-bottom: 30px;
    }
    
    .detail-section h3 {
        font-size: 1.3rem;
        color: #1a202c;
        margin-bottom: 15px;
        border-bottom: 2px solid #ff6b35;
        padding-bottom: 8px;
    }
    
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    }
    
    .info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #f7fafc;
        border-radius: 8px;
    }
    
    .info-item i {
        color: #ff6b35;
    }
    
    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .detail-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: #f7fafc;
        border-radius: 12px;
    }
    
    .price-section {
        display: flex;
        flex-direction: column;
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
    }
    
    .btn-reserve {
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        color: white;
<<<<<<< HEAD
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
=======
        border: none;
        padding: 15px 30px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
    }
    
    .btn-reserve:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
    }
    
    @media (max-width: 768px) {
        .detail-header {
            flex-direction: column;
        }
        
        .detail-image {
            width: 100%;
            height: 200px;
        }
        
        .detail-actions {
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }
        
        .btn-reserve {
            width: 100%;
            justify-content: center;
>>>>>>> c9d0d59ef600ffe1f8506ff54eae0d8fc926ec56
        }
    }
`;
document.head.appendChild(style);
