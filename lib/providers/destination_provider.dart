import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

import '../models/destination.dart';
import '../models/route.dart' as route_model;
import '../models/booking.dart';
import '../models/local_business.dart';
import '../services/app_service.dart';

class DestinationProvider extends ChangeNotifier {
  final AppService _appService = AppService();
  
  // Estado dos dados
  List<Destination> _destinations = [];
  List<route_model.Route> _routes = [];
  List<Booking> _bookings = [];
  List<LocalBusiness> _localBusinesses = [];
  List<String> _favorites = [];
  
  // Estado de carregamento
  bool _isLoading = false;
  String? _error;
  
  // Filtros
  DestinationType? _selectedType;
  String _searchQuery = '';
  double _maxPrice = 1000.0;
  double _minRating = 0.0;

  // Getters
  List<Destination> get destinations => _filteredDestinations;
  List<route_model.Route> get routes => _routes;
  List<Booking> get bookings => _bookings;
  List<LocalBusiness> get localBusinesses => _localBusinesses;
  List<String> get favorites => _favorites;
  bool get isLoading => _isLoading;
  String? get error => _error;
  DestinationType? get selectedType => _selectedType;
  String get searchQuery => _searchQuery;
  double get maxPrice => _maxPrice;
  double get minRating => _minRating;

  // Destinos filtrados
  List<Destination> get _filteredDestinations {
    List<Destination> filtered = _destinations;
    
    // Filtro por tipo
    if (_selectedType != null) {
      filtered = filtered.where((d) => d.type == _selectedType).toList();
    }
    
    // Filtro por busca
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((d) => 
        d.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
        d.description.toLowerCase().contains(_searchQuery.toLowerCase()) ||
        d.location.toLowerCase().contains(_searchQuery.toLowerCase())
      ).toList();
    }
    
    // Filtro por preço
    filtered = filtered.where((d) => d.price <= _maxPrice).toList();
    
    // Filtro por avaliação
    filtered = filtered.where((d) => d.rating >= _minRating).toList();
    
    return filtered;
  }

  // Destinos em destaque
  List<Destination> get featuredDestinations {
    return _destinations.where((d) => d.isFeatured).toList();
  }

  // Destinos favoritos
  List<Destination> get favoriteDestinations {
    return _destinations.where((d) => _favorites.contains(d.id)).toList();
  }

  // Inicializar dados
  Future<void> initialize() async {
    await loadDestinations();
    await loadRoutes();
    await loadBookings();
    await loadLocalBusinesses();
    await loadFavorites();
  }

  // Carregar destinos
  Future<void> loadDestinations() async {
    _setLoading(true);
    try {
      _destinations = await _appService.getDestinations();
      _error = null;
    } catch (e) {
      _error = e.toString();
    } finally {
      _setLoading(false);
    }
  }

  // Carregar rotas
  Future<void> loadRoutes() async {
    try {
      _routes = await _appService.getRoutes();
    } catch (e) {
      _error = e.toString();
    }
  }

  // Carregar reservas
  Future<void> loadBookings() async {
    try {
      _bookings = await _appService.getBookings();
    } catch (e) {
      _error = e.toString();
    }
  }

  // Carregar negócios locais
  Future<void> loadLocalBusinesses() async {
    try {
      _localBusinesses = await _appService.getLocalBusinesses();
    } catch (e) {
      _error = e.toString();
    }
  }

  // Carregar favoritos
  Future<void> loadFavorites() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final favoritesJson = prefs.getString('favorites');
      if (favoritesJson != null) {
        _favorites = List<String>.from(json.decode(favoritesJson));
      }
    } catch (e) {
      _error = e.toString();
    }
  }

  // Salvar favoritos
  Future<void> _saveFavorites() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('favorites', json.encode(_favorites));
    } catch (e) {
      _error = e.toString();
    }
  }

  // Adicionar/remover favorito
  Future<void> toggleFavorite(String destinationId) async {
    if (_favorites.contains(destinationId)) {
      _favorites.remove(destinationId);
    } else {
      _favorites.add(destinationId);
    }
    await _saveFavorites();
    notifyListeners();
  }

  // Verificar se é favorito
  bool isFavorite(String destinationId) {
    return _favorites.contains(destinationId);
  }

  // Obter destino por ID
  Destination? getDestinationById(String id) {
    try {
      return _destinations.firstWhere((d) => d.id == id);
    } catch (e) {
      return null;
    }
  }

  // Obter rota por ID
  route_model.Route? getRouteById(String id) {
    try {
      return _routes.firstWhere((r) => r.id == id);
    } catch (e) {
      return null;
    }
  }

  // Obter negócio local por ID
  LocalBusiness? getLocalBusinessById(String id) {
    try {
      return _localBusinesses.firstWhere((b) => b.id == id);
    } catch (e) {
      return null;
    }
  }

  // Criar reserva
  Future<void> createBooking(Booking booking) async {
    try {
      await _appService.createBooking(booking);
      _bookings.add(booking);
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      rethrow;
    }
  }

  // Atualizar reserva
  Future<void> updateBooking(Booking booking) async {
    try {
      await _appService.updateBooking(booking);
      final index = _bookings.indexWhere((b) => b.id == booking.id);
      if (index != -1) {
        _bookings[index] = booking;
        notifyListeners();
      }
    } catch (e) {
      _error = e.toString();
      rethrow;
    }
  }

  // Cancelar reserva
  Future<void> cancelBooking(String bookingId) async {
    try {
      await _appService.cancelBooking(bookingId);
      final index = _bookings.indexWhere((b) => b.id == bookingId);
      if (index != -1) {
        _bookings[index] = _bookings[index].copyWith(
          status: BookingStatus.cancelled,
        );
        notifyListeners();
      }
    } catch (e) {
      _error = e.toString();
      rethrow;
    }
  }

  // Aplicar filtros
  void setFilters({
    DestinationType? type,
    String? searchQuery,
    double? maxPrice,
    double? minRating,
  }) {
    _selectedType = type;
    _searchQuery = searchQuery ?? '';
    _maxPrice = maxPrice ?? _maxPrice;
    _minRating = minRating ?? _minRating;
    notifyListeners();
  }

  // Limpar filtros
  void clearFilters() {
    _selectedType = null;
    _searchQuery = '';
    _maxPrice = 1000.0;
    _minRating = 0.0;
    notifyListeners();
  }

  // Definir estado de carregamento
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  // Limpar erro
  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Atualizar dados
  Future<void> refresh() async {
    await initialize();
  }
}
