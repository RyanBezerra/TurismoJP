// ========================================
// MAPA INTERATIVO - JAVASCRIPT
// ========================================

// Estado global do mapa
const MapState = {
    map: null,
    markers: [],
    clusters: null,
    userLocation: null,
    isOffline: false,
    currentFilter: 'all',
    searchResults: [],
    isFullscreen: false
};

// Função para carregar dados das lojas locais
async function loadLocalBusinessesFromApi() {
    try {
        const res = await fetch('../../api/businesses.php');
        if(!res.ok) throw new Error('HTTP '+res.status);
        const payload = await res.json();
        const items = Array.isArray(payload.items) ? payload.items : [];
        return items.map(item => ({
            id: `local-${item.id}`,
            name: item.nome,
            lat: item.latitude ? Number(item.latitude) : null,
            lng: item.longitude ? Number(item.longitude) : null,
            type: (item.tipo === 'Restaurante') ? 'gastronomia' : (item.tipo === 'Artesão' ? 'artesanato' : 'servicos'),
            category: (item.tipo || '').toLowerCase(),
            description: item.descricao || '',
            bairro: item.bairro || '',
            contato: item.contato || '',
            pagamentoUrl: item.pagamento_url || '',
            isLocalBusiness: true
        })).filter(p => p.lat && p.lng);
    } catch (e) {
        console.warn('Falha API businesses:', e);
        return [];
    }
}

function loadLocalBusinessesFromLocalStorage() {
    try {
        const LOCAIS_STORAGE_KEY = 'turismojp.locais.v2';
        const rawData = localStorage.getItem(LOCAIS_STORAGE_KEY) || '[]';
        console.log('🔍 Dados brutos do localStorage:', rawData);
        
        const locaisData = JSON.parse(rawData);
        console.log('📊 Dados parseados:', locaisData.length, 'itens');
        
        // Debug: mostrar todos os itens e suas propriedades de localização
        locaisData.forEach((item, index) => {
            console.log(`Item ${index + 1}: "${item.nome}"`, {
                hasLocation: item.hasLocation,
                latitude: item.latitude,
                longitude: item.longitude,
                googleMapsUrl: item.googleMapsUrl,
                bairro: item.bairro,
                tipo: item.tipo
            });
        });
        
        const filteredData = locaisData.filter(item => item.hasLocation && item.latitude && item.longitude);
        console.log(`✅ ${filteredData.length} itens têm localização válida`);
        
        const mappedData = filteredData.map(item => {
            // Mapear tipo para categoria do mapa
            let mapType = 'servicos';
            if (item.tipo === 'Restaurante') mapType = 'gastronomia';
            if (item.tipo === 'Artesão') mapType = 'artesanato';
            if (item.tipo === 'Guia') mapType = 'servicos';
            
            const mapPoint = {
                id: `local-${item.id}`,
                name: item.nome,
                lat: item.latitude,
                lng: item.longitude,
                type: mapType,
                category: item.tipo.toLowerCase(),
                description: item.descricao,
                bairro: item.bairro,
                contato: item.contato,
                pagamentoUrl: item.pagamentoUrl,
                isLocalBusiness: true
            };
            
            console.log(`🗺️ Adicionando ao mapa: "${item.nome}" em ${item.latitude}, ${item.longitude}`);
            return mapPoint;
        });
        
        return mappedData;
    } catch (e) {
        console.error('Erro ao carregar dados dos locais:', e);
        return [];
    }
}

// Dados dos pontos de interesse
const POINTS_DATA = {
    roteiros: [
        {
            id: 'centro-historico-jp',
            name: 'Centro Histórico de João Pessoa',
            lat: -7.1195,
            lng: -34.8795,
            type: 'roteiros',
            category: 'historico',
            description: 'Centro histórico com arquitetura colonial preservada da terceira cidade mais antiga do Brasil.',
            price: 'R$ 45/pessoa',
            duration: '4 horas',
            difficulty: 'Fácil',
            rating: 4.9,
            reviews: 234,
            image: '../experiencias/imagens/centro_historico_jp.png',
            includes: ['Guia histórico', 'Mapa', 'Água', 'Ingressos museus'],
            googleMapsUrl: 'https://maps.app.goo.gl/jVrsAciDGb18KkNz6'
        },
        {
            id: 'farol-cabo-branco',
            name: 'Farol do Cabo Branco',
            lat: -7.1472,
            lng: -34.7958,
            type: 'roteiros',
            category: 'turistico',
            description: 'Marco geográfico do ponto mais oriental das Américas com vista panorâmica do oceano.',
            price: 'R$ 30/pessoa',
            duration: '2 horas',
            difficulty: 'Fácil',
            rating: 4.8,
            reviews: 198,
            image: '../experiencias/imagens/farol_cabo_branco.png',
            includes: ['Acesso ao farol', 'Vista panorâmica', 'Foto souvenir'],
            googleMapsUrl: 'https://maps.app.goo.gl/zii4yzZgZPYxbXQB6'
        },
        {
            id: 'parque-arruda-camara',
            name: 'Parque Arruda Câmara',
            lat: -7.1306,
            lng: -34.8667,
            type: 'roteiros',
            category: 'ecologico',
            description: 'Parque urbano com trilhas, lago e diversidade de fauna e flora nativa.',
            price: 'R$ 45/pessoa',
            duration: '3 horas',
            difficulty: 'Fácil',
            rating: 4.8,
            reviews: 156,
            image: '../experiencias/imagens/parque_arruda_camara.png',
            includes: ['Guia ambiental', 'Material educativo', 'Binóculos', 'Lanche'],
            googleMapsUrl: 'https://maps.app.goo.gl/ZWBqfFNo82ArmUKv5'
        },
        {
            id: 'trilha-jacare',
            name: 'Trilha do Jacaré',
            lat: -7.0889,
            lng: -34.8556,
            type: 'roteiros',
            category: 'ecologico',
            description: 'Trilha ecológica com observação do pôr do sol e fauna local do Rio Paraíba.',
            price: 'R$ 65/pessoa',
            duration: '4 horas',
            difficulty: 'Médio',
            rating: 4.7,
            reviews: 143,
            image: '../experiencias/imagens/por_do_sol_do_jacare.png',
            includes: ['Guia local', 'Transporte de barco', 'Lanche', 'Seguro'],
            googleMapsUrl: 'https://maps.app.goo.gl/RLUtQVHsCANX8xn48'
        }
    ],
    artesanato: [
        // Seção de artesanato vazia por enquanto
    ]
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando mapa...');
    
    try {
        initializeMap();
        initializeControls();
        initializeOfflineMode();
        
        // Aguardar um pouco antes de carregar os dados
        setTimeout(() => {
            loadMapData();
        }, 500);
        
        // Event listeners para atualização automática quando localStorage muda
        window.addEventListener('storage', function(e) {
            if (e.key === 'turismojp.locais.v2') {
                console.log('🔄 Dados do localStorage alterados, recarregando mapa...');
                loadMapData();
            }
        });
        
        // Event listener para quando a aba ganha foco (caso o storage tenha mudado)
        window.addEventListener('focus', function() {
            console.log('🔄 Aba ganhou foco, recarregando dados do mapa...');
            loadMapData();
        });
        
    } catch (error) {
        console.error('Erro na inicialização:', error);
        
        // Remover loading mesmo com erro
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hide');
        }
    }
});

function initializeMap() {
    try {
        // Configuração inicial do mapa
        MapState.map = L.map('map', {
            center: [-7.1195, -34.8450], // João Pessoa
            zoom: 11,
            zoomControl: true,
            attributionControl: true
        });

        // Adicionar camadas de mapa
        addMapLayers();
        
        // Configurar clusters
        MapState.clusters = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 50
        });
        MapState.map.addLayer(MapState.clusters);

        // Event listeners do mapa
        MapState.map.on('click', handleMapClick);
        MapState.map.on('zoomend', handleZoomChange);
        
        console.log('Mapa inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar mapa:', error);
    }
}

function addMapLayers() {
    // Camada online (OpenStreetMap)
    const onlineLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    });

    // Camada offline (usando tiles locais se disponível)
    const offlineLayer = L.tileLayer('data/tiles/{z}/{x}/{y}.png', {
        attribution: 'Mapa Offline Paraíba',
        maxZoom: 16
    });

    // Adicionar camada online por padrão
    onlineLayer.addTo(MapState.map);

    // Armazenar referências das camadas
    MapState.map.onlineLayer = onlineLayer;
    MapState.map.offlineLayer = offlineLayer;
}

// ========================================
// CONTROLES DO MAPA
// ========================================
function initializeControls() {
    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => handleFilterChange(btn.dataset.filter));
    });

    // Busca
    const searchInput = document.getElementById('mapSearch');
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    // Botões de ação
    document.getElementById('locateBtn').addEventListener('click', locateUser);
    document.getElementById('offlineBtn').addEventListener('click', toggleOfflineMode);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);

    // Menu móvel
    initializeMobileMenu();
}

function handleFilterChange(filter) {
    MapState.currentFilter = filter;
    
    // Atualizar botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Filtrar marcadores
    filterMarkers();
}

function filterMarkers() {
    // Limpar clusters
    MapState.clusters.clearLayers();
    
    // Carregar dados das lojas locais
    const localBusinesses = loadLocalBusinesses();
    
    // Combinar dados estáticos com dados dinâmicos das lojas
    const allPoints = [
        ...Object.values(POINTS_DATA).flat(),
        ...localBusinesses
    ];
    
    // Adicionar marcadores filtrados
    allPoints.forEach(point => {
        if (MapState.currentFilter === 'all' || point.type === MapState.currentFilter) {
            addMarkerToMap(point);
        }
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('mapSearch').value.toLowerCase();
    
    if (searchTerm.length < 2) {
        MapState.searchResults = [];
        filterMarkers();
        return;
    }

    // Carregar dados das lojas locais
    const localBusinesses = loadLocalBusinesses();
    
    // Combinar dados estáticos com dados dinâmicos das lojas
    const allPoints = [
        ...Object.values(POINTS_DATA).flat(),
        ...localBusinesses
    ];

    // Buscar pontos
    MapState.searchResults = allPoints.filter(point => 
        point.name.toLowerCase().includes(searchTerm) ||
        point.description.toLowerCase().includes(searchTerm) ||
        (point.specialties && point.specialties.some(s => s.toLowerCase().includes(searchTerm))) ||
        (point.bairro && point.bairro.toLowerCase().includes(searchTerm))
    );

    // Mostrar apenas resultados da busca
    MapState.clusters.clearLayers();
    MapState.searchResults.forEach(point => addMarkerToMap(point));

    // Centralizar no primeiro resultado
    if (MapState.searchResults.length > 0) {
        const firstResult = MapState.searchResults[0];
        MapState.map.setView([firstResult.lat, firstResult.lng], 13);
    }
}

// ========================================
// MARCADORES E POPUPS
// ========================================
async function loadMapData() {
    try {
        console.log('Iniciando carregamento dos dados do mapa...');
        
        // Carregar dados das lojas locais (cache + API)
        const localFromCache = loadLocalBusinessesFromLocalStorage();
        let localFromApi = [];
        try { localFromApi = await loadLocalBusinessesFromApi(); } catch(_) {}
        const localBusinesses = localFromApi.length ? localFromApi : localFromCache;
        console.log('Lojas locais carregadas:', localBusinesses.length);
        
        // Combinar dados estáticos com dados dinâmicos das lojas
        const allPoints = [
            ...Object.values(POINTS_DATA).flat(),
            ...localBusinesses
        ];
        
        console.log('Total de pontos para adicionar:', allPoints.length);
        
        // Limpar marcadores antigos primeiro
        if (MapState.clusters) {
            MapState.clusters.clearLayers();
        }
        MapState.markers = [];
        
        // Adicionar todos os marcadores
        allPoints.forEach((point, index) => {
            try {
                addMarkerToMap(point);
            } catch (error) {
                console.error(`Erro ao adicionar marcador ${index}:`, error, point);
            }
        });

        console.log('Marcadores adicionados com sucesso');
        
        // Ocultar loading
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hide');
            console.log('Loading overlay removido');
        }
        
    } catch (error) {
        console.error('Erro no carregamento dos dados do mapa:', error);
        
        // Garantir que o loading seja removido mesmo com erro
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hide');
        }
    }
}

function addMarkerToMap(point) {
    try {
        if (!point || !point.lat || !point.lng) {
            console.warn('Ponto inválido ignorado:', point);
            return;
        }
        
        const icon = createCustomIcon(point.type);
        const marker = L.marker([point.lat, point.lng], { icon })
            .bindPopup(createPopupContent(point), {
                maxWidth: 300,
                className: 'custom-popup'
            });

        if (MapState.clusters) {
            MapState.clusters.addLayer(marker);
            MapState.markers.push(marker);
        }
    } catch (error) {
        console.error('Erro ao criar marcador:', error, point);
    }
}

function createCustomIcon(type) {
    const iconConfig = {
        roteiros: { icon: 'fas fa-route', color: '#ff6b35' },
        servicos: { icon: 'fas fa-store', color: '#4CAF50' },
        gastronomia: { icon: 'fas fa-utensils', color: '#FF9800' },
        artesanato: { icon: 'fas fa-palette', color: '#9C27B0' }
    };

    const config = iconConfig[type] || { icon: 'fas fa-map-marker-alt', color: '#666' };

    return L.divIcon({
        className: 'custom-marker',
        html: `<i class="${config.icon}" style="color: ${config.color}"></i>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

function createPopupContent(point) {
    let content = `
        <div class="popup-content">
            <h3 class="popup-title">${point.name}</h3>
            <p class="popup-description">${point.description}</p>
    `;

    // Informações específicas por tipo
    if (point.type === 'roteiros') {
        content += `
            <div class="popup-details">
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${point.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${point.price}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-signal"></i>
                    <span>${point.difficulty}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <span>${point.rating} (${point.reviews})</span>
                </div>
            </div>
        `;
    } else if (point.type === 'gastronomia') {
        content += `
            <div class="popup-details">
                <div class="detail-item">
                    <i class="fas fa-phone"></i>
                    <span>${point.phone}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${point.priceRange}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <span>${point.rating} (${point.reviews})</span>
                </div>
            </div>
            <div class="specialties">
                <strong>Especialidades:</strong>
                <p>${point.specialties.join(', ')}</p>
            </div>
        `;
    } else if (point.type === 'hospedagem') {
        content += `
            <div class="popup-details">
                <div class="detail-item">
                    <i class="fas fa-phone"></i>
                    <span>${point.phone}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${point.priceRange}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <span>${point.rating} (${point.reviews})</span>
                </div>
            </div>
            <div class="amenities">
                <strong>Comodidades:</strong>
                <p>${point.amenities.join(', ')}</p>
            </div>
        `;
    } else if (point.type === 'servicos') {
        if (point.isLocalBusiness) {
            // Layout para negócios locais
            content += `
                <div class="popup-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${point.bairro}</span>
                    </div>
                    ${point.contato ? `<div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${point.contato}</span>
                    </div>` : ''}
                </div>
                <div class="business-type">
                    <strong>Categoria:</strong>
                    <p>${point.category}</p>
                </div>
            `;
        } else {
            // Layout para serviços estáticos
            content += `
                <div class="popup-details">
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${point.phone}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-star"></i>
                        <span>${point.rating} (${point.reviews})</span>
                    </div>
                </div>
                <div class="services">
                    <strong>Serviços:</strong>
                    <p>${point.services.join(', ')}</p>
                </div>
            `;
        }
    } else if (point.type === 'gastronomia') {
        if (point.isLocalBusiness) {
            // Layout para restaurantes locais
            content += `
                <div class="popup-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${point.bairro}</span>
                    </div>
                    ${point.contato ? `<div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${point.contato}</span>
                    </div>` : ''}
                </div>
                <div class="business-type">
                    <strong>Categoria:</strong>
                    <p>Gastronomia</p>
                </div>
            `;
        } else {
            // Layout para gastronomia estática
            content += `
                <div class="popup-details">
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${point.phone}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${point.priceRange}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-star"></i>
                        <span>${point.rating} (${point.reviews})</span>
                    </div>
                </div>
                <div class="specialties">
                    <strong>Especialidades:</strong>
                    <p>${point.specialties.join(', ')}</p>
                </div>
            `;
        }
    } else if (point.type === 'artesanato') {
        if (point.isLocalBusiness) {
            // Layout para artesãos locais
            content += `
                <div class="popup-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${point.bairro}</span>
                    </div>
                    ${point.contato ? `<div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>${point.contato}</span>
                    </div>` : ''}
                </div>
                <div class="business-type">
                    <strong>Categoria:</strong>
                    <p>Artesanato</p>
                </div>
            `;
        }
    }

    content += `
            <div class="popup-actions">
                <button class="popup-btn popup-btn-primary" onclick="viewDetails('${point.id}')">
                    <i class="fas fa-info-circle"></i>
                    Ver Detalhes
                </button>
                <button class="popup-btn popup-btn-secondary" onclick="getDirections('${point.lat}', '${point.lng}')">
                    <i class="fas fa-directions"></i>
                    Como Chegar
                </button>
            </div>
        </div>
    `;

    return content;
}

// ========================================
// FUNCIONALIDADES DE LOCALIZAÇÃO
// ========================================
function locateUser() {
    if (!navigator.geolocation) {
        showNotification('Geolocalização não suportada neste navegador', 'error');
        return;
    }

    const locateBtn = document.getElementById('locateBtn');
    locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    locateBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            MapState.userLocation = { lat: latitude, lng: longitude };
            
            // Adicionar marcador da localização do usuário
            addUserLocationMarker(latitude, longitude);
            
            // Centralizar mapa na localização do usuário
            MapState.map.setView([latitude, longitude], 15);
            
            showNotification('Localização encontrada!', 'success');
            
            // Restaurar botão
            locateBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
            locateBtn.disabled = false;
        },
        (error) => {
            console.error('Erro na geolocalização:', error);
            showNotification('Não foi possível obter sua localização', 'error');
            
            // Restaurar botão
            locateBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
            locateBtn.disabled = false;
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

function addUserLocationMarker(lat, lng) {
    // Remover marcador anterior se existir
    if (MapState.userLocationMarker) {
        MapState.map.removeLayer(MapState.userLocationMarker);
    }

    // Criar novo marcador
    const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: '<i class="fas fa-map-marker-alt" style="color: #E91E63; font-size: 24px;"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    MapState.userLocationMarker = L.marker([lat, lng], { icon: userIcon })
        .addTo(MapState.map)
        .bindPopup('Sua localização atual');
}

// ========================================
// MODO OFFLINE
// ========================================
function initializeOfflineMode() {
    // Verificar status da conexão
    window.addEventListener('online', () => {
        MapState.isOffline = false;
        updateOfflineStatus();
        switchToOnlineMode();
    });

    window.addEventListener('offline', () => {
        MapState.isOffline = true;
        updateOfflineStatus();
        switchToOfflineMode();
    });

    // Verificar status inicial
    if (!navigator.onLine) {
        MapState.isOffline = true;
        updateOfflineStatus();
        switchToOfflineMode();
    }
}

function toggleOfflineMode() {
    MapState.isOffline = !MapState.isOffline;
    updateOfflineStatus();
    
    if (MapState.isOffline) {
        switchToOfflineMode();
    } else {
        switchToOnlineMode();
    }
}

function switchToOfflineMode() {
    // Trocar para camada offline
    MapState.map.removeLayer(MapState.map.onlineLayer);
    MapState.map.addLayer(MapState.map.offlineLayer);
    
    // Atualizar botão
    const offlineBtn = document.getElementById('offlineBtn');
    offlineBtn.classList.add('active');
    offlineBtn.innerHTML = '<i class="fas fa-wifi-slash"></i>';
    
    showNotification('Modo offline ativado', 'info');
}

function switchToOnlineMode() {
    // Trocar para camada online
    MapState.map.removeLayer(MapState.map.offlineLayer);
    MapState.map.addLayer(MapState.map.onlineLayer);
    
    // Atualizar botão
    const offlineBtn = document.getElementById('offlineBtn');
    offlineBtn.classList.remove('active');
    offlineBtn.innerHTML = '<i class="fas fa-wifi"></i>';
    
    showNotification('Modo online ativado', 'success');
}

function updateOfflineStatus() {
    const statusElement = document.getElementById('offlineStatus');
    if (MapState.isOffline) {
        statusElement.classList.add('show');
    } else {
        statusElement.classList.remove('show');
    }
}

// ========================================
// TELA CHEIA
// ========================================
function toggleFullscreen() {
    MapState.isFullscreen = !MapState.isFullscreen;
    
    if (MapState.isFullscreen) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

function enterFullscreen() {
    document.body.classList.add('fullscreen');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullscreenBtn.classList.add('active');
    
    // Redimensionar mapa
    setTimeout(() => {
        MapState.map.invalidateSize();
    }, 100);
}

function exitFullscreen() {
    document.body.classList.remove('fullscreen');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullscreenBtn.classList.remove('active');
    
    // Redimensionar mapa
    setTimeout(() => {
        MapState.map.invalidateSize();
    }, 100);
}

// ========================================
// EVENTOS DO MAPA
// ========================================
function handleMapClick(e) {
    console.log('Clique no mapa:', e.latlng);
}

function handleZoomChange() {
    const zoom = MapState.map.getZoom();
    console.log('Zoom alterado para:', zoom);
}

// ========================================
// FUNÇÕES DE AÇÃO
// ========================================
function viewDetails(pointId) {
    // Carregar dados das lojas locais
    const localBusinesses = loadLocalBusinesses();
    
    // Combinar dados estáticos com dados dinâmicos das lojas
    const allPoints = [
        ...Object.values(POINTS_DATA).flat(),
        ...localBusinesses
    ];
    
    // Encontrar ponto pelos dados
    const point = allPoints.find(p => p.id === pointId);
    if (!point) return;

    if (point.isLocalBusiness) {
        // Se for um negócio local, redirecionar para a página da loja
        const originalId = pointId.replace('local-', '');
        window.open(`../locais/loja.html?id=${originalId}`, '_blank');
        showNotification(`Abrindo loja: ${point.name}`, 'info');
    } else {
        // Redirecionar para página de detalhes ou abrir modal
        showNotification(`Abrindo detalhes de ${point.name}`, 'info');
        
        // Aqui você pode implementar a lógica para mostrar detalhes
        // Por exemplo, abrir um modal ou redirecionar para uma página
    }
}

function getDirections(lat, lng) {
    // Abrir no Google Maps ou outro serviço de navegação
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
    showNotification('Abrindo navegação...', 'info');
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
// FUNÇÕES UTILITÁRIAS
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
        success: '#4CAF50',
        error: '#f44336',
        warning: '#FF9800',
        info: '#2196F3'
    };
    return colors[type] || '#2196F3';
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
    
    .popup-details {
        margin: 15px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    
    .popup-details .detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #4a5568;
    }
    
    .popup-details .detail-item i {
        color: #ff6b35;
        width: 16px;
    }
    
    .specialties,
    .amenities,
    .services {
        margin: 15px 0;
        font-size: 14px;
    }
    
    .specialties strong,
    .amenities strong,
    .services strong {
        color: #1a202c;
        display: block;
        margin-bottom: 5px;
    }
    
    .user-location-marker {
        background: none;
        border: none;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

