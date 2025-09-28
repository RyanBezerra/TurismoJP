# 📁 Estrutura do Projeto - Paraíba Turismo

## 🗂️ Organização dos Arquivos

```
paraiba_turismo/
├── 📱 android/                    # Configurações Android
│   ├── app/                      # Configurações do app
│   ├── gradle/                   # Configurações Gradle
│   └── *.gradle.kts             # Scripts de build
│
├── 🎨 assets/                    # Recursos do app
│   └── images/                  # Imagens organizadas
│       ├── 674ba1294cfb843914fa88081e8aabde2fb97006-1600x1066.avif
│       ├── canganco.webp
│       └── WhatsApp-Image-2022-05-27-at-16.49.42-300x277.jpeg.webp
│
├── 💻 lib/                       # Código fonte Dart/Flutter
│   ├── main.dart                # Ponto de entrada
│   ├── models/                  # Modelos de dados
│   │   ├── booking.dart
│   │   ├── destination.dart
│   │   ├── local_business.dart
│   │   └── route.dart
│   ├── providers/               # Gerenciamento de estado
│   │   ├── app_provider.dart
│   │   └── destination_provider.dart
│   ├── screens/                 # Telas da aplicação
│   │   ├── booking_screen.dart
│   │   ├── destination_detail_screen.dart
│   │   ├── destinations_screen.dart
│   │   ├── favorites_screen.dart
│   │   ├── home_screen.dart
│   │   └── profile_screen.dart
│   ├── services/                # Serviços
│   │   └── app_service.dart
│   ├── theme/                   # Tema da aplicação
│   │   └── app_theme.dart
│   └── widgets/                 # Widgets reutilizáveis
│       ├── bottom_navigation.dart
│       ├── category_filter.dart
│       ├── destination_card.dart
│       ├── hero_section.dart
│       └── search_bar.dart
│
├── 📋 Configurações
│   ├── analysis_options.yaml    # Configurações do analisador
│   ├── .gitignore              # Arquivos ignorados pelo Git
│   ├── pubspec.yaml            # Dependências e configurações
│   ├── pubspec.lock            # Versões fixas das dependências
│   └── README.md               # Documentação do projeto
│
└── 📄 PROJECT_STRUCTURE.md     # Este arquivo
```

## ✅ Limpeza Realizada

### 🗑️ Arquivos Removidos:
- ❌ `build/` - Pasta de build temporária
- ❌ `.idea/` - Configurações do IntelliJ/Android Studio
- ❌ `.dart_tool/` - Cache do Dart
- ❌ `img/` - Pasta de imagens desorganizada
- ❌ `flutter_01.png` - Imagem não utilizada
- ❌ `android/paraiba_turismo_android.iml` - Arquivo de configuração IDE
- ❌ `.flutter-plugins-dependencies` - Arquivo temporário

### 📁 Estrutura Organizada:
- ✅ `assets/images/` - Imagens organizadas
- ✅ `pubspec.yaml` - Atualizado com assets
- ✅ `.gitignore` - Melhorado para ignorar arquivos desnecessários

## 🚀 Como Usar

### Executar o App:
```bash
flutter pub get    # Instalar dependências
flutter run        # Executar no dispositivo/emulador
```

### Build para Produção:
```bash
flutter build apk --release    # Android
flutter build ios --release    # iOS
```

## 📝 Notas Importantes

- **Assets**: Todas as imagens estão em `assets/images/`
- **Código**: Todo o código Dart está em `lib/`
- **Configurações**: Arquivos de configuração na raiz
- **Android**: Configurações específicas do Android em `android/`

## 🔄 Manutenção

Para manter o projeto organizado:
1. Sempre coloque novas imagens em `assets/images/`
2. Execute `flutter clean` antes de commits importantes
3. Mantenha o `.gitignore` atualizado
4. Documente mudanças na estrutura aqui
