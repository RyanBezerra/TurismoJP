# 🌴 Paraíba Turismo - App Flutter

## 📱 Sobre o Projeto

O **Paraíba Turismo** é um aplicativo mobile desenvolvido em Flutter que transforma a experiência turística na Paraíba, indo além do tradicional "sol e mar" para explorar o rico potencial dos roteiros culturais e ecológicos do estado. O app conecta turistas com pequenos empreendedores locais, criando uma jornada interativa e personalizada.

## ✨ Funcionalidades

### 🗺️ Roteiros Interativos
- **Caminhos do Frio**: Serras históricas com clima ameno e cultura rica
- **Rota do Cangaço**: Caminhos de Lampião e a história do sertão
- **Trilhas Ecológicas**: Natureza preservada e aventuras ao ar livre
- **Ecoparques**: Parques naturais e conservação ambiental
- **Artesanato Local**: Tradições artesanais e cultura popular

### 📱 Interface Moderna
- Design responsivo e intuitivo
- Navegação por slides interativos
- Sistema de busca e filtros
- Animações suaves e transições elegantes
- Paleta de cores inspirada na cultura paraibana

### 🎯 Experiência do Usuário
- Navegação por pontos de interesse
- Seleção dinâmica de roteiros
- Sistema de reservas integrado
- Conexão com negócios locais
- Confirmação de roteiros em tempo real
- Sistema de favoritos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Flutter**: Framework de desenvolvimento mobile
- **Dart**: Linguagem de programação
- **Provider**: Gerenciamento de estado
- **Go Router**: Navegação entre telas
- **Cached Network Image**: Cache de imagens
- **Shared Preferences**: Armazenamento local

### Recursos Técnicos
- Design responsivo (mobile-first)
- Navegação por teclado
- Animações Flutter
- Intersection Observer API
- Debounce para otimização de performance
- Slideshow automático

## 📁 Estrutura do Projeto

```
lib/
├── main.dart                 # Ponto de entrada da aplicação
├── models/                   # Modelos de dados
│   ├── destination.dart      # Modelo de destino
│   ├── route.dart           # Modelo de rota
│   ├── booking.dart         # Modelo de reserva
│   └── local_business.dart  # Modelo de negócio local
├── providers/               # Gerenciamento de estado
│   ├── app_provider.dart    # Configurações do app
│   └── destination_provider.dart # Estado dos destinos
├── screens/                 # Telas da aplicação
│   ├── home_screen.dart     # Tela inicial
│   ├── destinations_screen.dart # Lista de destinos
│   ├── destination_detail_screen.dart # Detalhes do destino
│   ├── booking_screen.dart  # Tela de reserva
│   ├── favorites_screen.dart # Favoritos
│   └── profile_screen.dart  # Perfil do usuário
├── widgets/                 # Widgets reutilizáveis
│   ├── destination_card.dart # Card de destino
│   ├── hero_section.dart    # Seção hero
│   ├── search_bar.dart      # Barra de busca
│   ├── category_filter.dart # Filtro de categorias
│   └── bottom_navigation.dart # Navegação inferior
├── services/                # Serviços
│   └── app_service.dart     # Serviço principal
└── theme/                   # Tema da aplicação
    └── app_theme.dart       # Configuração do tema
```

## 🚀 Como Executar

### Pré-requisitos
- Flutter SDK (versão 3.0.0 ou superior)
- Dart SDK
- Android Studio ou VS Code
- Emulador Android ou dispositivo físico

### Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd paraiba-turismo
   ```

2. Instale as dependências:
   ```bash
   flutter pub get
   ```

3. Execute o aplicativo:
   ```bash
   flutter run
   ```

### Build para Produção
```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release
```

## 🎮 Como Usar

### Navegação Principal
1. **Tela Inicial**: Visualize destinos em destaque e navegue pelos slides
2. **Destinos**: Explore todos os destinos disponíveis com filtros
3. **Favoritos**: Acesse seus destinos favoritos
4. **Perfil**: Configure suas preferências e visualize estatísticas

### Seleção de Roteiros
1. Navegue pelos destinos na tela inicial ou na lista de destinos
2. Toque em um destino para ver detalhes completos
3. Use a barra de busca para encontrar destinos específicos
4. Aplique filtros por categoria, preço e avaliação

### Sistema de Reservas
1. Selecione um destino e toque em "Reservar"
2. Preencha suas informações pessoais
3. Escolha as datas de entrada e saída
4. Selecione o número de viajantes
5. Confirme sua reserva

### Favoritos
1. Toque no ícone de coração em qualquer destino
2. Acesse seus favoritos na aba "Favoritos"
3. Gerencie sua lista de destinos preferidos

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: #ff6b35 (Laranja vibrante)
- **Secundária**: #1e3c72 (Azul profundo)
- **Neutros**: #2d3748, #718096, #f8f9fa
- **Texto**: #333, #fff

### Tipografia
- **Títulos**: Playfair Display (serif elegante)
- **Corpo**: Inter (sans-serif moderna)

### Responsividade
- **Mobile**: Layout otimizado para smartphones
- **Tablet**: Adaptação de grid e espaçamentos
- **Desktop**: Suporte para telas maiores

## 🔧 Funcionalidades Técnicas

### Flutter
- **Navegação**: Go Router para navegação entre telas
- **Estado**: Provider para gerenciamento de estado
- **Imagens**: Cached Network Image para cache eficiente
- **Armazenamento**: Shared Preferences para dados locais
- **Animações**: Animações nativas do Flutter

### Performance
- **Lazy Loading**: Carregamento sob demanda
- **Image Caching**: Cache inteligente de imagens
- **State Management**: Gerenciamento eficiente de estado
- **Memory Management**: Otimização de memória

## 🌟 Diferenciais

### Para o Turista
- **Experiência Imersiva**: Navegação intuitiva pelos roteiros
- **Informações Centralizadas**: Tudo em um só lugar
- **Conexão Local**: Acesso direto aos negócios locais
- **Personalização**: Roteiros adaptados às preferências

### Para os Negócios Locais
- **Visibilidade Digital**: Presença online sem custos
- **Conexão Direta**: Relacionamento com turistas
- **Geração de Renda**: Novas oportunidades de negócio
- **Sustentabilidade**: Turismo responsável e local

### Para a Paraíba
- **Diversificação Turística**: Além do sol e mar
- **Desenvolvimento Regional**: Fomento ao turismo interiorano
- **Preservação Cultural**: Valorização das tradições locais
- **Sustentabilidade**: Turismo ecológico e responsável

## 🚧 Roadmap Futuro

### Fase 1 - MVP (Atual)
- [x] Interface básica
- [x] Navegação por roteiros
- [x] Sistema de reservas
- [x] Design responsivo
- [x] Sistema de favoritos

### Fase 2 - Funcionalidades Avançadas
- [ ] Sistema de autenticação
- [ ] Perfil do usuário completo
- [ ] Histórico de roteiros
- [ ] Avaliações e comentários
- [ ] Notificações push

### Fase 3 - Integração com Negócios
- [ ] Cadastro de empreendedores
- [ ] Sistema de reservas integrado
- [ ] Pagamentos online
- [ ] Chat em tempo real
- [ ] Sistema de avaliações

### Fase 4 - Inteligência Artificial
- [ ] Recomendações personalizadas
- [ ] Chatbot inteligente
- [ ] Análise de preferências
- [ ] Otimização de rotas
- [ ] Predição de demanda

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Áreas de Contribuição
- **Design**: Melhorias na interface e UX
- **Funcionalidades**: Novas features e integrações
- **Conteúdo**: Informações sobre roteiros e destinos
- **Tradução**: Suporte a outros idiomas
- **Testes**: Qualidade e performance

## 📞 Contato e Suporte

### Desenvolvimento
- **Projeto**: Plataforma Inteligente para Gestão e Fomento do Turismo de Experiência
- **Localização**: Paraíba, Brasil
- **Objetivo**: Conectar turistas com o ecossistema turístico local

### Suporte Técnico
- **Issues**: Use o sistema de issues do GitHub
- **Documentação**: Consulte este README
- **Comunidade**: Participe das discussões

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **Comunidade Paraibana**: Pela rica cultura e tradições
- **Empreendedores Locais**: Pela dedicação ao turismo regional
- **Desenvolvedores**: Pela contribuição ao projeto
- **Turistas**: Pela confiança na Paraíba como destino

---

**🌴 Descubra a Paraíba além do sol e mar! 🌴**

*Um aplicativo que conecta pessoas, culturas e experiências únicas no coração do Nordeste brasileiro.*