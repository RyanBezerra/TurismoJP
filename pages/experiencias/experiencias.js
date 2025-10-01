// ========================================
// PÁGINA EXPERIÊNCIAS - SCRIPT PRINCIPAL
// ========================================

// Estado global da aplicação
const ExperienciasState = {
    currentFilter: 'all',
    searchTerm: '',
    allExperiencias: [],
    filteredExperiencias: [],
    isLoading: false
};

// Configurações
const CONFIG = {
    searchDelay: 300,
    animationDuration: 300,
    maxCardsPerLoad: 8
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeExperienciasPage();
});

function initializeExperienciasPage() {
    try {
        initializeSearch();
        initializeFilters();
        initializeCards();
        initializeLoadMore();
        initializeMobileMenu();
        loadAllExperiencias();
        console.log('✅ Página de experiências inicializada com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
    }
}

// ========================================
// FUNCIONALIDADE DE BUSCA
// ========================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(handleSearch, CONFIG.searchDelay));
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    ExperienciasState.searchTerm = searchTerm;
    
    applyFilters();
    updateSearchResults();
}

function updateSearchResults() {
    const grid = document.getElementById('experienciasGrid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.experiencia-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const location = card.querySelector('.card-location span').textContent.toLowerCase();
        
        const matchesSearch = !ExperienciasState.searchTerm || 
            title.includes(ExperienciasState.searchTerm) ||
            description.includes(ExperienciasState.searchTerm) ||
            location.includes(ExperienciasState.searchTerm);

        if (matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Atualizar contador de resultados
    updateResultsCounter(visibleCount);
}

// ========================================
// SISTEMA DE FILTROS
// ========================================
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => handleFilterClick(button));
    });
}

function handleFilterClick(button) {
    const filter = button.getAttribute('data-filter');
    
    // Atualizar estado
    ExperienciasState.currentFilter = filter;
    
    // Atualizar UI dos botões
    updateFilterButtons(button);
    
    // Aplicar filtros
    applyFilters();
}

function updateFilterButtons(activeButton) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    activeButton.classList.add('active');
}

function applyFilters() {
    const grid = document.getElementById('experienciasGrid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.experiencia-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const location = card.querySelector('.card-location span').textContent.toLowerCase();
        
        const matchesCategory = ExperienciasState.currentFilter === 'all' || 
            category === ExperienciasState.currentFilter;
        
        const matchesSearch = !ExperienciasState.searchTerm || 
            title.includes(ExperienciasState.searchTerm) ||
            description.includes(ExperienciasState.searchTerm) ||
            location.includes(ExperienciasState.searchTerm);

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    updateResultsCounter(visibleCount);
}

// ========================================
// INTERAÇÕES DOS CARDS
// ========================================
function initializeCards() {
    const cards = document.querySelectorAll('.experiencia-card');
    
    cards.forEach(card => {
        initializeCardInteractions(card);
    });
}

function initializeCardInteractions(card) {
    // Click no card principal
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn')) {
            handleCardClick(card);
        }
    });

    // Botões de ação
    const actionButtons = card.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            handleActionButton(button);
        });
    });

    // Botão explorar
    const exploreButton = card.querySelector('.card-btn');
    if (exploreButton) {
        exploreButton.addEventListener('click', (e) => {
            e.stopPropagation();
            handleCardClick(card);
        });
    }
}

function handleCardClick(card) {
    const title = card.querySelector('.card-title').textContent;
    const location = card.querySelector('.card-location span').textContent;
    
    console.log(`Explorando: ${title} em ${location}`);
    
    // Aqui você pode implementar a navegação para a página específica
    // Por enquanto, vamos apenas mostrar um alerta
    showCardDetails(title, location);
}

function handleActionButton(button) {
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('fa-heart')) {
        // Toggle favorito
        toggleFavorite(button, icon);
    } else if (icon.classList.contains('fa-share-alt')) {
        // Compartilhar
        shareExperience(button);
    }
}

function toggleFavorite(button, icon) {
    const isFavorited = icon.classList.contains('fas');
    
    if (isFavorited) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        showNotification('Removido dos favoritos', 'info');
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#ff6b35';
        showNotification('Adicionado aos favoritos', 'success');
    }
}

function shareExperience(button) {
    const card = button.closest('.experiencia-card');
    const title = card.querySelector('.card-title').textContent;
    const location = card.querySelector('.card-location span').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: `Experiência: ${title}`,
            text: `Confira esta experiência incrível em ${location}!`,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores sem suporte ao Web Share API
        const shareText = `Confira esta experiência incrível: ${title} em ${location}! ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Link copiado para a área de transferência!', 'success');
        }).catch(() => {
            showNotification('Erro ao copiar link', 'error');
        });
    }
}

// ========================================
// CARREGAR MAIS FUNCIONALIDADE
// ========================================
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', handleLoadMore);
}

function handleLoadMore() {
    if (ExperienciasState.isLoading) return;

    ExperienciasState.isLoading = true;
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Simular loading
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Carregando...</span>';
    loadMoreBtn.disabled = true;

    // Simular carregamento de mais experiências
    setTimeout(() => {
        loadMoreExperiencias();
        ExperienciasState.isLoading = false;
        
        loadMoreBtn.innerHTML = '<span>Carregar Mais Experiências</span> <i class="fas fa-arrow-down"></i>';
        loadMoreBtn.disabled = false;
        
        showNotification('Mais experiências carregadas!', 'success');
    }, 1500);
}

function loadMoreExperiencias() {
    // Aqui você implementaria a lógica para carregar mais experiências
    // Por enquanto, vamos apenas simular adicionando mais cards
    console.log('Carregando mais experiências...');
}

// ========================================
// CARREGAR TODAS AS EXPERIÊNCIAS
// ========================================
function loadAllExperiencias() {
    const grid = document.getElementById('experienciasGrid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.experiencia-card');
    ExperienciasState.allExperiencias = Array.from(cards).map(card => ({
        element: card,
        title: card.querySelector('.card-title').textContent,
        location: card.querySelector('.card-location span').textContent,
        category: card.getAttribute('data-category'),
        description: card.querySelector('.card-description').textContent
    }));

    ExperienciasState.filteredExperiencias = [...ExperienciasState.allExperiencias];
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
// UTILITÁRIOS E NOTIFICAÇÕES
// ========================================
function showCardDetails(title, location) {
    const modal = createModal(`
        <div class="modal-content">
            <h3>${title}</h3>
            <p><strong>Localização:</strong> ${location}</p>
            <p>Esta é uma prévia da experiência. Em breve, você poderá acessar a página completa com todas as informações detalhadas.</p>
            <div class="modal-actions">
                <button class="btn-primary" onclick="closeModal()">Fechar</button>
                <button class="btn-secondary" onclick="addToFavorites('${title}')">Adicionar aos Favoritos</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'experience-modal';
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
        animation: fadeIn 0.3s ease;
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
        animation: slideInUp 0.3s ease;
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.experience-modal');
    if (modal) {
        modal.remove();
    }
}

function addToFavorites(title) {
    showNotification(`${title} adicionado aos favoritos!`, 'success');
    closeModal();
}

function updateResultsCounter(count) {
    // Você pode implementar um contador de resultados aqui
    console.log(`${count} experiências encontradas`);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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
// ANIMAÇÕES CSS ADICIONAIS
// ========================================
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
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 20px;
    }
    
    .btn-primary, .btn-secondary {
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .btn-primary {
        background: #ff6b35;
        color: white;
    }
    
    .btn-secondary {
        background: transparent;
        color: #ff6b35;
        border: 2px solid #ff6b35;
    }
    
    .btn-primary:hover, .btn-secondary:hover {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// ========================================
// EFEITOS DE SCROLL
// ========================================
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    if (header) {
        header.style.background = window.scrollY > 100 ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.1)';
    }
}, 10));

// ========================================
// FUNÇÕES GLOBAIS PARA MODAL
// ========================================
window.closeModal = closeModal;
window.addToFavorites = addToFavorites;
