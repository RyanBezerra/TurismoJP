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
        const data = getAllItems();
        render(data);
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

    function bindCadastro(){
        const form = document.getElementById('cadastro-form');
        const feedback = document.getElementById('cadastro-feedback');
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

    function buildItemFromForm(){
        const nome = document.getElementById('nomeItem')?.value?.trim();
        const bairro = document.getElementById('bairroForm')?.value?.trim();
        const descricao = document.getElementById('descricaoForm')?.value?.trim();
        const pagamentoUrl = document.getElementById('pagamentoUrl')?.value?.trim();
        const contato = document.getElementById('contatoForm')?.value?.trim();
        if(!nome || !bairro || !descricao) return null;
        const tipo = document.getElementById('tipo')?.value || 'Serviços';
        const imagem = '../experiencias/imagens/gastronomia_paraibana.png';
        return {
            nome,
            categoria: tipo,
            bairro,
            descricao,
            imagem,
            tipo,
            pagamentoUrl: pagamentoUrl || '',
            contato: contato || ''
        };
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
                if(cadastroAcc) cadastroAcc.style.display = 'block';
            }else{
                if(statusEl) statusEl.textContent = 'Você está desconectado';
                if(btnLogin) btnLogin.style.display = 'inline-flex';
                if(btnLogout) btnLogout.style.display = 'none';
                if(cadastroAcc) cadastroAcc.style.display = 'none';
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


