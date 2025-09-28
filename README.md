# 🌴 Paraíba Turismo - Estrutura Organizada

## 📁 Estrutura do Projeto

```
TurismoJP/
├── pages/                          # Páginas da aplicação
│   ├── index/                      # Página principal
│   │   ├── index.html             # HTML da página principal
│   │   ├── style.css              # CSS específico da página principal
│   │   └── script.js              # JavaScript específico da página principal
│   └── sobre/                      # Página "Sobre"
│       ├── sobre.html             # HTML da página "Sobre"
│       ├── sobre.css              # CSS específico da página "Sobre"
│       └── sobre.js               # JavaScript específico da página "Sobre"
├── shared/                         # Recursos compartilhados
│   ├── css/
│   │   └── common.css             # Estilos compartilhados (header, footer, etc.)
│   ├── js/
│   │   └── common.js              # JavaScript compartilhado (menu, scroll, etc.)
│   └── img/                       # Imagens compartilhadas
│       ├── 674ba1294cfb843914fa88081e8aabde2fb97006-1600x1066.avif
│       ├── canganco.webp
│       └── WhatsApp-Image-2022-05-27-at-16.49.42-300x277.jpeg.webp
└── README.md                      # Este arquivo
```

## 🎯 Organização por Página

### 📄 **Página Principal** (`pages/index/`)
- **HTML**: `index.html` - Página principal com hero section, destinos e formulário
- **CSS**: `style.css` - Estilos específicos da página principal
- **JS**: `script.js` - Funcionalidades específicas (slides, formulário, etc.)

### 📄 **Página Sobre** (`pages/sobre/`)
- **HTML**: `sobre.html` - Página sobre a empresa, equipe e missão
- **CSS**: `sobre.css` - Estilos específicos da página sobre
- **JS**: `sobre.js` - Funcionalidades específicas (contadores, modal, etc.)

## 🔧 **Recursos Compartilhados** (`shared/`)

### 🎨 **CSS Compartilhado** (`shared/css/common.css`)
- Estilos do header e footer
- Classes utilitárias
- Responsividade base
- Animações comuns

### ⚡ **JavaScript Compartilhado** (`shared/js/common.js`)
- Menu mobile
- Scroll suave
- Efeitos de scroll
- Lazy loading
- Funções utilitárias

### 🖼️ **Imagens Compartilhadas** (`shared/img/`)
- Todas as imagens do projeto
- Acessíveis por todas as páginas

## 🚀 **Como Executar**

### Página Principal
```bash
# Navegue para a pasta da página
cd pages/index

# Abra o arquivo HTML
start index.html
```

### Página Sobre
```bash
# Navegue para a pasta da página
cd pages/sobre

# Abra o arquivo HTML
start sobre.html
```

## 📋 **Vantagens da Nova Estrutura**

### ✅ **Organização**
- Cada página tem seus próprios arquivos
- Fácil manutenção e desenvolvimento
- Separação clara de responsabilidades

### ✅ **Reutilização**
- Recursos compartilhados em uma pasta
- Evita duplicação de código
- Manutenção centralizada

### ✅ **Escalabilidade**
- Fácil adição de novas páginas
- Estrutura consistente
- Desenvolvimento em equipe

### ✅ **Performance**
- Carregamento otimizado
- Lazy loading implementado
- Código modular

## 🔗 **Links Entre Páginas**

- **Página Principal** → **Sobre**: `../sobre/sobre.html`
- **Sobre** → **Página Principal**: `../index/index.html`

## 📱 **Responsividade**

Todas as páginas são totalmente responsivas e funcionam em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎨 **Design System**

### Cores
- **Primária**: #ff6b35 (Laranja)
- **Secundária**: #1e3c72 (Azul)
- **Neutros**: #2d3748, #718096, #f8f9fa

### Tipografia
- **Títulos**: Playfair Display
- **Corpo**: Inter

### Componentes
- Header fixo com menu mobile
- Footer com links e contatos
- Cards com hover effects
- Animações suaves

## 🛠️ **Desenvolvimento**

Para adicionar uma nova página:

1. Crie uma pasta em `pages/nova-pagina/`
2. Adicione os arquivos: `nova-pagina.html`, `nova-pagina.css`, `nova-pagina.js`
3. Inclua os recursos compartilhados:
   ```html
   <link rel="stylesheet" href="../../shared/css/common.css">
   <link rel="stylesheet" href="nova-pagina.css">
   <script src="../../shared/js/common.js"></script>
   <script src="nova-pagina.js"></script>
   ```
4. Atualize os links de navegação

## 📞 **Suporte**

Para dúvidas ou problemas:
- Verifique os caminhos dos arquivos
- Confirme se os recursos compartilhados estão acessíveis
- Teste a responsividade em diferentes dispositivos

---

**🌴 Desenvolvido com ❤️ para a Paraíba Turismo**