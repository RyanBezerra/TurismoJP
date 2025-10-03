window.LocaisPage = (function(){
    const STORAGE_KEY = 'turismojp.locais.v2';
    const USERS_KEY = 'turismojp.users.v1';
    const SESSION_KEY = 'turismojp.session.v1';
    const MOCK_DATA = [];
    

    function initialize(){
        try { localStorage.removeItem('turismojp.locais.v1'); } catch(e){}
        bindFilters();
        bindCadastro();
        bindAuthBar();
        // Renderiza imediatamente com cache local e busca atualização no servidor
        const cached = getAllItems();
        render(cached);
        fetchAndSyncFromApi();
    }

    function bindFilters(){
        const search = document.getElementById('search');
        const tipoFilter = document.getElementById('tipoFilter');
        const bairro = document.getElementById('bairro');
        const handler = () => {
            const term = (search?.value || '').toLowerCase();
            const tipo = tipoFilter?.value || 'todos';
            const bai = bairro?.value || 'todos';
            const filtered = getAllItems().filter(item => {
                const okText = item.nome.toLowerCase().includes(term) || (item.descricao||'').toLowerCase().includes(term);
                const okTipo = tipo === 'todos' || (item.tipo || '').toLowerCase() === tipo.toLowerCase();
                const okBairro = bai === 'todos' || item.bairro === bai;
                return okText && okTipo && okBairro;
            });
            render(filtered);
        };
        [search, tipoFilter, bairro].forEach(el => el && el.addEventListener('input', handler));
        [tipoFilter, bairro].forEach(el => el && el.addEventListener('change', handler));
    }

    function render(lista){
        const grid = document.getElementById('locais-grid');
        if (!grid) return;
        grid.innerHTML = lista.map(toCardHtml).join('');
    }

    function toCardHtml(item){
        return `
        <article class="local-card" tabindex="0">
            <div class="local-cover">
                <img src="${item.imagem}" alt="${item.nome}">
            </div>
            <div class="local-content">
                <div class="local-rating"></div>
                <h3 class="local-title">${item.nome}</h3>
                <div class="local-meta">
                    <span><i class="fas fa-tag"></i> ${item.tipo || item.categoria}</span>
                    <span>•</span>
                    <span><i class="fas fa-location-dot"></i> ${item.bairro}</span>
                </div>
                <div class="local-tags"><span class="tag">${item.descricao}</span></div>
                <div style="margin-top:10px"><a class="btn-primary" href="./loja.html?id=${item.id}">Ver loja</a></div>
            </div>
        </article>`;
    }

    function getAllItems(){
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            const userItems = raw ? JSON.parse(raw) : [];
            return userItems;
        }catch(e){
            return [];
        }
    }

    async function fetchAndSyncFromApi(){
        try{
            const url = '../../api/businesses.php';
            const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
            if(!res.ok) throw new Error('HTTP '+res.status);
            const payload = await res.json();
            const items = Array.isArray(payload.items) ? payload.items : [];
            // Normaliza campos para o formato existente da UI
            const normalized = items.map(it => ({
                id: it.id,
                ownerId: it.owner_id,
                nome: it.nome,
                tipo: it.tipo,
                categoria: it.tipo,
                bairro: it.bairro,
                descricao: it.descricao,
                imagem: it.imagem || '../experiencias/imagens/gastronomia_paraibana.png',
                contato: it.contato || '',
                pagamentoUrl: it.pagemento_url || it.pagamento_url || '',
                googleMapsUrl: it.google_maps_url || '',
                latitude: it.latitude ? Number(it.latitude) : undefined,
                longitude: it.longitude ? Number(it.longitude) : undefined,
                hasLocation: it.has_location === 1 || it.has_location === true
            }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            render(normalized);
        }catch(err){
            console.warn('Falha ao buscar dados do servidor:', err);
        }
    }

    function bindCadastro(){
        const form = document.getElementById('cadastro-form');
        const feedback = document.getElementById('cadastro-feedback');
        const getLocationBtn = document.getElementById('getLocationBtn');
        
        
        // Add validation for Google Maps URL
        const googleMapsInput = document.getElementById('googleMapsUrl');
        if(googleMapsInput) {
            googleMapsInput.addEventListener('input', function() {
                const url = this.value.trim();
                const feedback = document.getElementById('location-feedback');
                
                // Remove existing feedback if any
                if(feedback) feedback.remove();
                
                if(url) {
                    const coords = extractCoordinatesFromGoogleMapsUrl(url);
                    const feedbackEl = document.createElement('small');
                    feedbackEl.id = 'location-feedback';
                    feedbackEl.style.display = 'block';
                    feedbackEl.style.marginTop = '4px';
                    
                    if(coords && coords !== 'SHORTENED_URL' && coords.latitude && coords.longitude) {
                        feedbackEl.style.color = '#059669';
                        feedbackEl.innerHTML = `✅ Localização detectada: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
                    } else if(coords === 'SHORTENED_URL') {
                        feedbackEl.style.color = '#ffc107';
                        feedbackEl.innerHTML = `⚠️ Link encurtado detectado. Para usar a localização:<br>
                            <strong>1.</strong> Abra este link no Google Maps<br>
                            <strong>2.</strong> Copie a URL da barra de endereço (ela terá as coordenadas)<br>
                            <strong>3.</strong> Cole aqui a nova URL`;
                    } else if(url.includes('maps.google') || url.includes('goo.gl')) {
                        feedbackEl.style.color = '#dc2626';
                        feedbackEl.innerHTML = '❌ Link do Google Maps inválido. Tente copiar novamente.';
                    }
                    
                    if(feedbackEl.innerHTML) {
                        this.parentNode.insertBefore(feedbackEl, this.parentNode.querySelector('.form-help'));
                    }
                }
            });
        }

        // Bind location button - now uses current location and fills Google Maps URL
        if(getLocationBtn) {
            getLocationBtn.addEventListener('click', function() {
                getLocationBtn.textContent = '📍 Obtendo localização...';
                getLocationBtn.disabled = true;
                
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function(position) {
                            const lat = position.coords.latitude.toFixed(6);
                            const lng = position.coords.longitude.toFixed(6);
                            // Create a Google Maps URL with the coordinates
                            const googleMapsUrl = `https://maps.google.com/maps?q=${lat},${lng}`;
                            document.getElementById('googleMapsUrl').value = googleMapsUrl;
                            getLocationBtn.textContent = '✅ Localização obtida';
                            setTimeout(() => {
                                getLocationBtn.textContent = '📍 Usar minha localização atual';
                                getLocationBtn.disabled = false;
                            }, 2000);
                        },
                        function(error) {
                            console.error('Erro ao obter localização:', error);
                            getLocationBtn.textContent = '❌ Erro na localização';
                            setTimeout(() => {
                                getLocationBtn.textContent = '📍 Usar minha localização atual';
                                getLocationBtn.disabled = false;
                            }, 2000);
                        }
                    );
                } else {
                    getLocationBtn.textContent = '❌ Não suportado';
                    setTimeout(() => {
                        getLocationBtn.textContent = '📍 Usar minha localização atual';
                        getLocationBtn.disabled = false;
                    }, 2000);
                }
            });
        }
        
        if(!form) return;
        form.addEventListener('submit', function(ev){
            ev.preventDefault();
            const user = getCurrentUser();
            if(!user){
                if(feedback){ feedback.textContent = 'Você precisa estar logado para publicar.'; feedback.style.color = '#dc2626'; }
                return;
            }
            if(hasUserItem(user.id)){
                if(feedback){ feedback.textContent = 'Cada conta pode ter apenas 1 oferta.'; feedback.style.color = '#dc2626'; }
                return;
            }
            const item = buildItemFromForm();
            if(!item){
                if(feedback) { feedback.textContent = 'Preencha os campos obrigatórios.'; feedback.style.color = '#dc2626'; }
                return;
            }
            const list = getStoredList();
            const newItem = { ...item, ownerId: user.id, id: generateId() };
            list.unshift(newItem);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            if(feedback) { feedback.textContent = 'Oferta publicada com sucesso!'; feedback.style.color = '#059669'; }
            // Redireciona direto para a página da loja criada para visualizar contato imediatamente
            location.href = `./loja.html?id=${newItem.id}`;
        });
    }

    // Function to extract coordinates from Google Maps URL
    function extractCoordinatesFromGoogleMapsUrl(url) {
        if (!url) return null;
        
        try {
            // Check if it's a shortened URL (goo.gl or maps.app.goo.gl)
            if (url.includes('goo.gl') || url.includes('maps.app.goo.gl')) {
                return 'SHORTENED_URL';
            }
            
            // Pattern 1: Direct coordinates in URL like maps.google.com/maps?q=lat,lng
            let match = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
            if (match) {
                return {
                    latitude: parseFloat(match[1]),
                    longitude: parseFloat(match[2])
                };
            }
            
            // Pattern 2: @lat,lng in URL like maps.google.com/maps/@lat,lng,zoom
            match = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
            if (match) {
                return {
                    latitude: parseFloat(match[1]),
                    longitude: parseFloat(match[2])
                };
            }
            
            // Pattern 3: Place coordinates in URL
            match = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
            if (match) {
                return {
                    latitude: parseFloat(match[1]),
                    longitude: parseFloat(match[2])
                };
            }
            
            return null;
        } catch (e) {
            return null;
        }
    }

    function buildItemFromForm(){
        const nome = document.getElementById('nomeItem')?.value?.trim();
        const bairro = document.getElementById('bairroForm')?.value?.trim();
        const descricao = document.getElementById('descricaoForm')?.value?.trim();
        const pagamentoUrl = document.getElementById('pagamentoUrl')?.value?.trim();
        const contato = document.getElementById('contatoForm')?.value?.trim();
        const googleMapsUrl = document.getElementById('googleMapsUrl')?.value?.trim();
        const imagemLojaCustom = document.getElementById('imagemLoja')?.value?.trim();
        
        if(!nome || !bairro || !descricao) return null;
        const tipo = document.getElementById('tipo')?.value || 'Serviços';
        const imagem = imagemLojaCustom || '../experiencias/imagens/gastronomia_paraibana.png';
        
        const item = {
            nome,
            categoria: tipo,
            bairro,
            descricao,
            imagem,
            tipo,
            pagamentoUrl: pagamentoUrl || '',
            contato: contato || '',
            googleMapsUrl: googleMapsUrl || ''
        };
        
        // Extract coordinates from Google Maps URL if provided
        if(googleMapsUrl) {
            const coords = extractCoordinatesFromGoogleMapsUrl(googleMapsUrl);
            if(coords && coords !== 'SHORTENED_URL') {
                item.latitude = coords.latitude;
                item.longitude = coords.longitude;
                item.hasLocation = true;
            }
        }
        
        return item;
    }

    function getStoredList(){
        try{
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        }catch(e){
            return [];
        }
    }

    function hasUserItem(userId){
        return getStoredList().some(i => i.ownerId === userId);
    }

    function generateId(){
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    // Auth
    function bindAuthBar(){
        const btnLogin = document.getElementById('btn-login');
        const btnLogout = document.getElementById('btn-logout');
        const statusEl = document.getElementById('auth-status');
        const cadastroAcc = document.getElementById('cadastro-accordion');
        updateAuthBar();
        btnLogin && btnLogin.addEventListener('click', () => openAuthDialog());
        btnLogout && btnLogout.addEventListener('click', () => { logout(); updateAuthBar(); });

        function updateAuthBar(){
            const user = getCurrentUser();
            if(user){
                if(statusEl) statusEl.textContent = `Conectado como ${user.name}`;
                if(btnLogin) btnLogin.style.display = 'none';
                if(btnLogout) btnLogout.style.display = 'inline-flex';
                
                // Verifica se o usuário já tem uma loja
                const userHasStore = hasUserItem(user.id);
                if(userHasStore){
                    // Esconde o formulário de cadastro
                    if(cadastroAcc) cadastroAcc.style.display = 'none';
                    
                    // Cria ou atualiza o botão "Ver minha loja"
                    let viewStoreBtn = document.getElementById('view-store-btn');
                    if(!viewStoreBtn){
                        viewStoreBtn = document.createElement('div');
                        viewStoreBtn.id = 'view-store-btn';
                        viewStoreBtn.className = 'view-store-section';
                        viewStoreBtn.innerHTML = `
                            <div class="view-store-card">
                                <div class="view-store-content">
                                    <h3>✅ Sua loja está ativa!</h3>
                                    <p>Gerencie seus produtos, serviços e informações de contato.</p>
                                    <button id="btn-view-store" class="btn-primary">Ver minha loja</button>
                                </div>
                            </div>
                        `;
                        cadastroAcc.parentNode.insertBefore(viewStoreBtn, cadastroAcc);
                        
                        // Adiciona evento ao botão
                        document.getElementById('btn-view-store').addEventListener('click', () => {
                            const userStore = getStoredList().find(item => item.ownerId === user.id);
                            if(userStore){
                                window.location.href = `./loja.html?id=${userStore.id}`;
                            }
                        });
                    }
                } else {
                    // Remove o botão "Ver minha loja" se existir e mostra o formulário
                    const viewStoreBtn = document.getElementById('view-store-btn');
                    if(viewStoreBtn) viewStoreBtn.remove();
                    if(cadastroAcc) cadastroAcc.style.display = 'block';
                }
            }else{
                if(statusEl) statusEl.textContent = 'Você está desconectado';
                if(btnLogin) btnLogin.style.display = 'inline-flex';
                if(btnLogout) btnLogout.style.display = 'none';
                if(cadastroAcc) cadastroAcc.style.display = 'none';
                
                // Remove o botão "Ver minha loja" se existir
                const viewStoreBtn = document.getElementById('view-store-btn');
                if(viewStoreBtn) viewStoreBtn.remove();
            }
        }
    }

    function openAuthDialog(){
        // Redireciona para página de login
        window.location.href = './login.html';
    }

    function logout(){
        try{ localStorage.removeItem(SESSION_KEY); }catch(e){}
    }

    function getUsers(){
        try{
            const raw = localStorage.getItem(USERS_KEY);
            return raw ? JSON.parse(raw) : [];
        }catch(e){ return []; }
    }

    function getCurrentUser(){
        try{
            const sess = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
            if(!sess) return null;
            return getUsers().find(u => u.id === sess.userId) || null;
        }catch(e){ return null; }
    }


    function capitalize(str){ return str.charAt(0).toUpperCase() + str.slice(1); }

    return { initialize };
})();


