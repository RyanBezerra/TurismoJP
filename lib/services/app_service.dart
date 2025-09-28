import 'dart:convert';
import 'dart:math';

import '../models/destination.dart';
import '../models/route.dart';
import '../models/booking.dart';
import '../models/local_business.dart';

class AppService {
  // Simular delay de rede
  Future<void> _simulateNetworkDelay() async {
    await Future.delayed(Duration(milliseconds: 500 + Random().nextInt(1000)));
  }

  // Obter destinos
  Future<List<Destination>> getDestinations() async {
    await _simulateNetworkDelay();
    return _mockDestinations;
  }

  // Obter rotas
  Future<List<Route>> getRoutes() async {
    await _simulateNetworkDelay();
    return _mockRoutes;
  }

  // Obter negócios locais
  Future<List<LocalBusiness>> getLocalBusinesses() async {
    await _simulateNetworkDelay();
    return _mockLocalBusinesses;
  }

  // Obter reservas
  Future<List<Booking>> getBookings() async {
    await _simulateNetworkDelay();
    return _mockBookings;
  }

  // Criar reserva
  Future<void> createBooking(Booking booking) async {
    await _simulateNetworkDelay();
    _mockBookings.add(booking);
  }

  // Atualizar reserva
  Future<void> updateBooking(Booking booking) async {
    await _simulateNetworkDelay();
    final index = _mockBookings.indexWhere((b) => b.id == booking.id);
    if (index != -1) {
      _mockBookings[index] = booking;
    }
  }

  // Cancelar reserva
  Future<void> cancelBooking(String bookingId) async {
    await _simulateNetworkDelay();
    final index = _mockBookings.indexWhere((b) => b.id == bookingId);
    if (index != -1) {
      _mockBookings[index] = _mockBookings[index].copyWith(
        status: BookingStatus.cancelled,
      );
    }
  }

  // Dados mockados
  static final List<Destination> _mockDestinations = [
    Destination(
      id: '1',
      name: 'Caminhos do Frio',
      description: 'Roteiro pelas serras históricas com clima ameno, artesanato local e gastronomia típica.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Serra da Borborema, PB',
      rating: 4.9,
      reviewCount: 127,
      price: 89.0,
      pricePeriod: '/pessoa',
      type: DestinationType.cultural,
      highlights: ['Clima ameno', 'Artesanato local', 'Gastronomia típica'],
      images: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      detailedDescription: 'O roteiro Caminhos do Frio leva você pelas serras históricas da Paraíba, onde o clima ameno e a rica cultura local criam uma experiência única. Conheça artesãos tradicionais, saboreie a gastronomia típica e desfrute de paisagens deslumbrantes.',
      activities: ['Visita a ateliês de artesanato', 'Degustação de comidas típicas', 'Caminhadas pelas serras'],
      localBusinesses: ['1', '2', '3'],
      isFeatured: true,
    ),
    Destination(
      id: '2',
      name: 'Rota do Cangaço',
      description: 'Caminhos de Lampião e a rica história do sertão nordestino.',
      imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Sertão Paraibano, PB',
      rating: 4.7,
      reviewCount: 89,
      price: 75.0,
      pricePeriod: '/pessoa',
      type: DestinationType.historical,
      highlights: ['História do cangaço', 'Cultura sertaneja', 'Paisagens únicas'],
      images: [
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      detailedDescription: 'Reviva a história do cangaço através dos caminhos percorridos por Lampião e seu bando. Conheça a cultura sertaneja, suas tradições e a resistência do povo nordestino.',
      activities: ['Visita a museus históricos', 'Contação de histórias', 'Caminhadas históricas'],
      localBusinesses: ['4', '5'],
      isFeatured: false,
    ),
    Destination(
      id: '3',
      name: 'Parque Arruda Câmara',
      description: 'Parque urbano com trilhas, lago e diversidade de fauna e flora.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'João Pessoa, PB',
      rating: 4.8,
      reviewCount: 156,
      price: 45.0,
      pricePeriod: '/pessoa',
      type: DestinationType.nature,
      highlights: ['Trilhas ecológicas', 'Diversidade de fauna', 'Lago central'],
      images: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      detailedDescription: 'O Parque Arruda Câmara é um oásis verde no coração de João Pessoa, oferecendo trilhas ecológicas, um belo lago e uma rica diversidade de fauna e flora.',
      activities: ['Trilhas ecológicas', 'Observação de aves', 'Piqueniques'],
      localBusinesses: ['6'],
      isFeatured: false,
    ),
    Destination(
      id: '4',
      name: 'Bosque dos Sonhos',
      description: 'Área de preservação com trilhas ecológicas e atividades de aventura.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Campina Grande, PB',
      rating: 4.6,
      reviewCount: 98,
      price: 65.0,
      pricePeriod: '/pessoa',
      type: DestinationType.ecological,
      highlights: ['Trilhas ecológicas', 'Atividades de aventura', 'Preservação ambiental'],
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      detailedDescription: 'O Bosque dos Sonhos é uma área de preservação ambiental que oferece trilhas ecológicas e diversas atividades de aventura em meio à natureza preservada.',
      activities: ['Trilhas ecológicas', 'Arvorismo', 'Tirolesa'],
      localBusinesses: ['7'],
      isFeatured: false,
    ),
    Destination(
      id: '5',
      name: 'Litoral Norte',
      description: 'Praias paradisíacas com águas cristalinas e coqueirais.',
      imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Cabedelo, PB',
      rating: 4.9,
      reviewCount: 203,
      price: 95.0,
      pricePeriod: '/pessoa',
      type: DestinationType.nature,
      highlights: ['Praias paradisíacas', 'Águas cristalinas', 'Coqueirais'],
      images: [
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      detailedDescription: 'O Litoral Norte da Paraíba oferece praias paradisíacas com águas cristalinas e coqueirais, perfeitas para relaxar e desfrutar da natureza.',
      activities: ['Banho de mar', 'Caminhadas na praia', 'Esportes aquáticos'],
      localBusinesses: ['8', '9'],
      isFeatured: true,
    ),
  ];

  static final List<Route> _mockRoutes = [
    Route(
      id: '1',
      name: 'Roteiro Cultural Completo',
      description: 'Uma jornada completa pela cultura paraibana, visitando os principais pontos históricos e culturais.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      destinations: ['1', '2'],
      duration: 3,
      price: 200.0,
      pricePeriod: '/pessoa',
      type: RouteType.cultural,
      highlights: ['Cultura local', 'História rica', 'Experiências únicas'],
      activities: ['Visitas guiadas', 'Degustações', 'Artesanato'],
      localBusinesses: ['1', '2', '3', '4', '5'],
      difficulty: 'Fácil',
      requirements: ['Roupas confortáveis', 'Câmera fotográfica'],
      minPeople: 2,
      maxPeople: 8,
      rating: 4.8,
      isFeatured: true,
    ),
    Route(
      id: '2',
      name: 'Aventura Ecológica',
      description: 'Explore a natureza paraibana através de trilhas e atividades de aventura.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      destinations: ['3', '4'],
      duration: 2,
      price: 150.0,
      pricePeriod: '/pessoa',
      type: RouteType.ecological,
      highlights: ['Natureza preservada', 'Atividades de aventura', 'Trilhas ecológicas'],
      activities: ['Trilhas', 'Arvorismo', 'Observação de fauna'],
      localBusinesses: ['6', '7'],
      difficulty: 'Médio',
      requirements: ['Roupas de trilha', 'Tênis adequado', 'Protetor solar'],
      minPeople: 1,
      maxPeople: 6,
      rating: 4.6,
      isFeatured: false,
    ),
    Route(
      id: '3',
      name: 'Rota do Cangaço Histórico',
      description: 'Reviva a história do cangaço através dos caminhos percorridos por Lampião.',
      imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      destinations: ['2'],
      duration: 1,
      price: 120.0,
      pricePeriod: '/pessoa',
      type: RouteType.historical,
      highlights: ['História do cangaço', 'Cultura sertaneja', 'Paisagens únicas'],
      activities: ['Visita a museus', 'Contação de histórias', 'Caminhadas históricas'],
      localBusinesses: ['4', '5'],
      difficulty: 'Fácil',
      requirements: ['Roupas confortáveis', 'Câmera fotográfica'],
      minPeople: 2,
      maxPeople: 10,
      rating: 4.7,
      isFeatured: true,
    ),
    Route(
      id: '4',
      name: 'Gastronomia do Sertão',
      description: 'Descubra os sabores únicos da culinária sertaneja paraibana.',
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      destinations: ['1', '2'],
      duration: 2,
      price: 180.0,
      pricePeriod: '/pessoa',
      type: RouteType.gastronomy,
      highlights: ['Culinária típica', 'Ingredientes locais', 'Tradições culinárias'],
      activities: ['Degustações', 'Oficinas culinárias', 'Visitas a produtores'],
      localBusinesses: ['2', '3'],
      difficulty: 'Fácil',
      requirements: ['Apetite', 'Roupas confortáveis'],
      minPeople: 1,
      maxPeople: 8,
      rating: 4.9,
      isFeatured: false,
    ),
  ];

  static final List<LocalBusiness> _mockLocalBusinesses = [
    LocalBusiness(
      id: '1',
      name: 'Ateliê do Artesão João',
      description: 'Artesanato tradicional em madeira e cerâmica.',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Serra da Borborema',
      type: BusinessType.artisan,
      rating: 4.8,
      reviewCount: 45,
      phone: '(83) 99999-9999',
      email: 'joao@artesao.com',
      website: 'www.artesaojoao.com',
      services: ['Artesanato em madeira', 'Cerâmica', 'Oficinas'],
      images: [
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      address: 'Rua das Flores, 123 - Serra da Borborema',
      openingHours: ['Seg-Sex: 8h-18h', 'Sáb: 8h-12h'],
      isVerified: true,
    ),
    LocalBusiness(
      id: '2',
      name: 'Restaurante Sabor do Sertão',
      description: 'Culinária típica do sertão paraibano.',
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Serra da Borborema',
      type: BusinessType.restaurant,
      rating: 4.9,
      reviewCount: 78,
      phone: '(83) 88888-8888',
      email: 'contato@sabordosertao.com',
      website: 'www.sabordosertao.com',
      services: ['Carne de sol', 'Tapioca', 'Bebidas típicas'],
      images: [
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      address: 'Rua Principal, 456 - Serra da Borborema',
      openingHours: ['Ter-Dom: 11h-22h'],
      isVerified: true,
    ),
    LocalBusiness(
      id: '3',
      name: 'Pousada Serra Verde',
      description: 'Hospedagem aconchegante nas serras.',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      location: 'Serra da Borborema',
      type: BusinessType.hotel,
      rating: 4.7,
      reviewCount: 92,
      phone: '(83) 77777-7777',
      email: 'reservas@serraverde.com',
      website: 'www.serraverde.com',
      services: ['Hospedagem', 'Café da manhã', 'Trilhas guiadas'],
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
      address: 'Rua da Paz, 789 - Serra da Borborema',
      openingHours: ['24h'],
      isVerified: true,
    ),
  ];

  static final List<Booking> _mockBookings = [
    Booking(
      id: '1',
      destinationId: '1',
      destinationName: 'Caminhos do Frio',
      checkIn: DateTime.now().add(const Duration(days: 7)),
      checkOut: DateTime.now().add(const Duration(days: 10)),
      travelers: 2,
      totalPrice: 178.0,
      status: BookingStatus.confirmed,
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
      localBusinesses: ['1', '2', '3'],
    ),
  ];
}
