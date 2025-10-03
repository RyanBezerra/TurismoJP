// ========================================
// SERVICE WORKER - MAPA OFFLINE
// ========================================

const CACHE_NAME = 'paraiba-turismo-map-v1';
const OFFLINE_URL = 'offline.html';

// Recursos para cache
const urlsToCache = [
    '/',
    '/pages/mapa/mapa.html',
    '/pages/mapa/mapa.css',
    '/pages/mapa/mapa.js',
    '/pages/index/style.css',
    '/shared/css/common.css',
    '/shared/js/common.js',
    // Imagens
    '/shared/img/WhatsApp-Image-2022-05-27-at-16.49.42-300x277.jpeg.webp',
    '/shared/img/canganco.webp',
    '/shared/img/674ba1294cfb843914fa88081e8aabde2fb97006-1600x1066.avif',
    // Fonts
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    // Leaflet
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css',
    'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css',
    'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'
];

// ========================================
// INSTALAÇÃO DO SERVICE WORKER
// ========================================
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Recursos em cache');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Erro ao fazer cache:', error);
            })
    );
});

// ========================================
// ATIVAÇÃO DO SERVICE WORKER
// ========================================
self.addEventListener('activate', event => {
    console.log('Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Ativado');
                return self.clients.claim();
            })
    );
});

// ========================================
// INTERCEPTAÇÃO DE REQUISIÇÕES
// ========================================
self.addEventListener('fetch', event => {
    // Ignorar requisições que não são GET
    if (event.request.method !== 'GET') {
        return;
    }

    // Ignorar requisições de dados (APIs)
    if (event.request.url.includes('/api/')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retornar do cache se disponível
                if (response) {
                    console.log('Service Worker: Servindo do cache:', event.request.url);
                    return response;
                }

                // Tentar buscar da rede
                return fetch(event.request)
                    .then(response => {
                        // Verificar se a resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clonar a resposta para o cache
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.log('Service Worker: Erro na rede:', error);
                        
                        // Se for uma página HTML, mostrar página offline
                        if (event.request.destination === 'document') {
                            return caches.match(OFFLINE_URL);
                        }
                        
                        // Para outros recursos, retornar erro
                        throw error;
                    });
            })
    );
});

// ========================================
// CACHE DE TILES DO MAPA
// ========================================
self.addEventListener('fetch', event => {
    // Interceptar requisições de tiles do mapa
    if (event.request.url.includes('tile.openstreetmap.org') || 
        event.request.url.includes('tiles/')) {
        
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }

                    return fetch(event.request)
                        .then(response => {
                            if (response.status === 200) {
                                const responseToCache = response.clone();
                                caches.open(CACHE_NAME)
                                    .then(cache => {
                                        cache.put(event.request, responseToCache);
                                    });
                            }
                            return response;
                        })
                        .catch(() => {
                            // Retornar tile padrão se não conseguir carregar
                            return new Response('', {
                                status: 404,
                                statusText: 'Not Found'
                            });
                        });
                })
        );
    }
});

// ========================================
// SINCRONIZAÇÃO EM BACKGROUND
// ========================================
self.addEventListener('sync', event => {
    console.log('Service Worker: Sincronização em background');
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Implementar lógica de sincronização
    // Por exemplo, sincronizar dados offline quando voltar online
    return Promise.resolve();
}

// ========================================
// NOTIFICAÇÕES PUSH
// ========================================
self.addEventListener('push', event => {
    console.log('Service Worker: Push recebido');
    
    const options = {
        body: event.data ? event.data.text() : 'Nova atualização disponível!',
        icon: '/shared/img/icon-192x192.png',
        badge: '/shared/img/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver no Mapa',
                icon: '/shared/img/icon-192x192.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '/shared/img/icon-192x192.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Paraíba Turismo', options)
    );
});

// ========================================
// CLIQUE EM NOTIFICAÇÃO
// ========================================
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Clique na notificação');
    
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/pages/mapa/mapa.html')
        );
    } else if (event.action === 'close') {
        // Apenas fechar a notificação
    } else {
        // Ação padrão - abrir o app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// ========================================
// MENSAGENS DO CLIENTE
// ========================================
self.addEventListener('message', event => {
    console.log('Service Worker: Mensagem recebida:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(event.data.urls);
                })
        );
    }
});

// ========================================
// LIMPEZA PERIÓDICA
// ========================================
self.addEventListener('periodicsync', event => {
    if (event.tag === 'content-sync') {
        event.waitUntil(doPeriodicSync());
    }
});

function doPeriodicSync() {
    // Implementar limpeza periódica do cache
    return caches.open(CACHE_NAME)
        .then(cache => {
            return cache.keys();
        })
        .then(keys => {
            // Remover recursos antigos (mais de 7 dias)
            const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
            
            return Promise.all(
                keys.map(key => {
                    return caches.match(key)
                        .then(response => {
                            if (response) {
                                const dateHeader = response.headers.get('date');
                                if (dateHeader && new Date(dateHeader).getTime() < weekAgo) {
                                    return caches.delete(key);
                                }
                            }
                        });
                })
            );
        });
}

// ========================================
// UTILITÁRIOS
// ========================================
function isImageRequest(request) {
    return request.destination === 'image';
}

function isStyleRequest(request) {
    return request.destination === 'style';
}

function isScriptRequest(request) {
    return request.destination === 'script';
}

function isDocumentRequest(request) {
    return request.destination === 'document';
}

// ========================================
// LOGS DE DEBUG
// ========================================
self.addEventListener('error', event => {
    console.error('Service Worker: Erro:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker: Promise rejeitada:', event.reason);
});

console.log('Service Worker: Carregado e pronto!');

