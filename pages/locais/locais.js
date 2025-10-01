window.LocaisPage = (function(){
    const MOCK_DATA = [
        { nome: 'Mercado de Artesanato Paraibano', categoria: 'Entretenimento', bairro: 'Centro', descricao: 'Mercado coberto com barracas de artesanato local, souvenirs e local público para fotos', nota: 4.6, imagem: 'img/Mercado de Artesanato Paraibano.jpg' },
        { nome: 'Feirinha de Tambaú', categoria: 'Entretenimento', bairro: 'Tambaú', descricao: 'Mercado ao ar livre com comida de rua, barracas de artesanato, música ao vivo e apresentações de dança', nota: 4.6, imagem: 'img/Feirinha de Tambaú.jpg' },
        { nome: 'Centro Cultural São Francisco', categoria: 'Entretenimento', bairro: 'Jaguaribe', descricao: 'Visitas guiadas a uma igreja católica de estilo barroco com arquitetura ornamentada e elementos dourados', nota: 4.7, imagem: 'img/Centro Cultural São Francisco.jpg' },
        { nome: 'Estação Cabo Branco - Ciência, Cultura e Artes', categoria: 'Entretenimento', bairro: 'Cabo Branco', descricao: 'Complexo de cunho educacional com mostras diversas, observações astronômicas orientadas e oficinas de arte', nota: 4.3, imagem: 'img/Estação Cabo Branco.jpg' },
        { nome: 'Theatro Santa Roza', categoria: 'Entretenimento', bairro: 'Centro', descricao: 'Teatro histórico de 200 poltronas com balcão duplo e agenda cultural variada com bilheteria convencional', nota: 4.7, imagem: 'img/Theatro Santa Roza.jpg' },
        { nome: 'Peixada do Amor', categoria: 'Gastronomia', bairro: 'Cabo Branco', descricao: 'Especialidades em frutos do mar com vista panorâmica do oceano', nota: 4.7, imagem: 'img/Peixada do Amor.jpg' },
        { nome: 'Mangai', categoria: 'Gastronomia', bairro: 'Manaíra', descricao: 'Restaurante intimista fino serve especialidades brasileiras repaginadas e criativas em menu diversificado', nota: 4.6, imagem: 'img/Mangai.jpg' },
        { nome: 'Nau Frutos do Mar', categoria: 'Gastronomia', bairro: 'Tambaú', descricao: 'Culinária contemporânea de frutos do mar, além de carnes e sobremesas, em ambiente requintado de ar intimista', nota: 4.7, imagem: 'img/Nau Frutos do Mar.jpg' },
        { nome: 'Sal e Brasa João Pessoa', categoria: 'Gastronomia', bairro: 'Cabo Branco', descricao: 'Variedade de cortes de carne na brasa e buffet com diversos tipos de entradas e saladas, em espaço familiar', nota: 4.6, imagem: 'img/Sal e Brasa João Pessoa.jpg' },
        { nome: 'Feijoada do João', categoria: 'Gastronomia', bairro: 'Jaguaribe', descricao: 'Café tradicional com doces caseiros e ambiente histórico aconchegante', nota: 4.6, imagem: 'img/Feijoada do João.jpg' },
        { nome: 'Manaíra Shopping', categoria: 'Shoppings e Lojas', bairro: 'Manaíra', descricao: 'Shopping com mais de 250 lojas, cinema e praça de alimentação, além de opções descontraídas da culinária internacional', nota: 4.5, imagem: 'img/Manaíra Shopping.jpg' },
        { nome: 'Mangabeira Shopping', categoria: 'Shoppings e Lojas', bairro: 'Mangabeira', descricao: 'Shopping dinâmico com uma variedade de lojas, um cinema, boliche e opções gastronômicas', nota: 4.6, imagem: 'img/Mangabeira Shopping.jpg' },
        { nome: 'Shopping Sul', categoria: 'Shoppings e Lojas', bairro: 'Valentina', descricao: 'Shopping de 1998 com lojas, praça de alimentação, área de recreação infantil e serviços bancários', nota: 4.2, imagem: 'img/Shopping Sul.jpg' },
        { nome: 'Shopping Tambiá', categoria: 'Shoppings e Lojas', bairro: 'Centro', descricao: 'Shopping com praça de alimentação, além de lojas de roupas, calçados, joias, eletrônicos etc.', nota: 4.5, imagem: 'img/Shopping Tambiá.jpg' },
        { nome: 'Mag Shopping', categoria: 'Shoppings e Lojas', bairro: 'Manaíra', descricao: 'Shopping à beira-mar com visual náutico, mais de 100 lojas, além de praça de alimentação e cinema', nota: 4.5, imagem: 'img/Mag Shopping.jpg' },
        { nome: 'Ville Des Plantes Open Mall', categoria: 'Shoppings e Lojas', bairro: 'Jardim Cidade Universitária', descricao: 'Shopping a céu aberto com arquitetura moderna e área verde integrada', nota: 4.7, imagem: 'img/Ville Des Plantes Open Mall.jpg' },
        { nome: 'Hotel Verdegreen', categoria: 'Hospedagem', bairro: 'Manaíra', descricao: 'Hotel descontraído em frente à praia de João Pessoa com obras de arte renomadas, próximo ao Parque Zoobotânico e ao Farol do Cabo Branco', nota: 4.7, imagem: 'img/Hotel Verdegreen.jpg' },
        { nome: 'Tambaú Hotel', categoria: 'Hospedagem', bairro: 'Tambaú', descricao: 'Símbolo arquitetônico da cidade com design icônico à beira-mar', nota: 4.8, imagem: 'img/Tambaú Hotel.jpg' },
        { nome: 'Nord Luxxor Tambaú', categoria: 'Hospedagem', bairro: 'Tambaú', descricao: 'Hotel moderno em frente à praia, próximo à Feirinha de Artesanato de Tambaú e ao Centro Cultural São Francisco', nota: 4.6, imagem: 'img/Nord Luxxor Tambaú.jpg' },
        { nome: 'Hardman Praia Hotel', categoria: 'Hospedagem', bairro: 'Manaíra', descricao: 'Hotel descontraído em frente à Praia de Manaíra, perto da Praça Alcides Carneiro e do Aeroporto Internacional de João Pessoa-Bayeux', nota: 4.3, imagem: 'img/Hardman Praia Hotel.jpg' },
        { nome: 'Hotel Cabo Branco Atlântico', categoria: 'Hospedagem', bairro: 'Cabo Branco', descricao: 'Hotel sofisticado em frente à praia, próximo ao Centro de Convenções e ao Aeroporto Internacional Castro Pinto', nota: 4.5, imagem: 'img/Hotel Cabo Branco Atlântico.jpg' }
    ]; 

    function initialize(){
        bindFilters();
        render(MOCK_DATA);
    }

    function bindFilters(){
        const search = document.getElementById('search');
        const categoria = document.getElementById('categoria');
        const bairro = document.getElementById('bairro');
        const handler = () => {
            const term = (search?.value || '').toLowerCase();
            const cat = categoria?.value || 'todas';
            const bai = bairro?.value || 'todos';
            const filtered = MOCK_DATA.filter(item => {
                const okText = item.nome.toLowerCase().includes(term) || (item.descricao||'').toLowerCase().includes(term);
                const okCat = cat === 'todas' || item.categoria === cat;
                const okBairro = bai === 'todos' || item.bairro === bai;
                return okText && okCat && okBairro;
            });
            render(filtered);
        };
        [search, categoria, bairro].forEach(el => el && el.addEventListener('input', handler));
        [categoria, bairro].forEach(el => el && el.addEventListener('change', handler));
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
                <div class="local-rating"><i class="fas fa-star"></i> ${item.nota.toFixed(1)}</div>
                <h3 class="local-title">${item.nome}</h3>
                <div class="local-meta">
                    <span><i class="fas fa-tag"></i> ${item.categoria}</span>
                    <span>•</span>
                    <span><i class="fas fa-location-dot"></i> ${item.bairro}</span>
                </div>
                <div class="local-tags"><span class="tag">${item.descricao}</span></div>
            </div>
        </article>`;
    }

    function capitalize(str){ return str.charAt(0).toUpperCase() + str.slice(1); }

    return { initialize };
})();


