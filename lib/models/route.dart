class Route {
  final String id;
  final String name;
  final String description;
  final String imageUrl;
  final List<String> destinations;
  final int duration; // em dias
  final double price;
  final String pricePeriod;
  final RouteType type;
  final List<String> highlights;
  final List<String> activities;
  final List<String> localBusinesses;
  final String difficulty;
  final List<String> requirements;
  final bool isFeatured;
  final bool isFavorite;
  final int minPeople;
  final int maxPeople;
  final double rating;

  const Route({
    required this.id,
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.destinations,
    required this.duration,
    required this.price,
    required this.pricePeriod,
    required this.type,
    required this.highlights,
    required this.activities,
    required this.localBusinesses,
    required this.difficulty,
    required this.requirements,
    required this.minPeople,
    required this.maxPeople,
    required this.rating,
    this.isFeatured = false,
    this.isFavorite = false,
  });

  Route copyWith({
    String? id,
    String? name,
    String? description,
    String? imageUrl,
    List<String>? destinations,
    int? duration,
    double? price,
    String? pricePeriod,
    RouteType? type,
    List<String>? highlights,
    List<String>? activities,
    List<String>? localBusinesses,
    String? difficulty,
    List<String>? requirements,
    int? minPeople,
    int? maxPeople,
    double? rating,
    bool? isFeatured,
    bool? isFavorite,
  }) {
    return Route(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      imageUrl: imageUrl ?? this.imageUrl,
      destinations: destinations ?? this.destinations,
      duration: duration ?? this.duration,
      price: price ?? this.price,
      pricePeriod: pricePeriod ?? this.pricePeriod,
      type: type ?? this.type,
      highlights: highlights ?? this.highlights,
      activities: activities ?? this.activities,
      localBusinesses: localBusinesses ?? this.localBusinesses,
      difficulty: difficulty ?? this.difficulty,
      requirements: requirements ?? this.requirements,
      minPeople: minPeople ?? this.minPeople,
      maxPeople: maxPeople ?? this.maxPeople,
      rating: rating ?? this.rating,
      isFeatured: isFeatured ?? this.isFeatured,
      isFavorite: isFavorite ?? this.isFavorite,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'imageUrl': imageUrl,
      'destinations': destinations,
      'duration': duration,
      'price': price,
      'pricePeriod': pricePeriod,
      'type': type.name,
      'highlights': highlights,
      'activities': activities,
      'localBusinesses': localBusinesses,
      'difficulty': difficulty,
      'requirements': requirements,
      'minPeople': minPeople,
      'maxPeople': maxPeople,
      'rating': rating,
      'isFeatured': isFeatured,
      'isFavorite': isFavorite,
    };
  }

  factory Route.fromJson(Map<String, dynamic> json) {
    return Route(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      imageUrl: json['imageUrl'] as String,
      destinations: List<String>.from(json['destinations'] as List),
      duration: json['duration'] as int,
      price: (json['price'] as num).toDouble(),
      pricePeriod: json['pricePeriod'] as String,
      type: RouteType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => RouteType.cultural,
      ),
      highlights: List<String>.from(json['highlights'] as List),
      activities: List<String>.from(json['activities'] as List),
      localBusinesses: List<String>.from(json['localBusinesses'] as List),
      difficulty: json['difficulty'] as String,
      requirements: List<String>.from(json['requirements'] as List),
      minPeople: json['minPeople'] as int? ?? 1,
      maxPeople: json['maxPeople'] as int? ?? 10,
      rating: (json['rating'] as num?)?.toDouble() ?? 4.5,
      isFeatured: json['isFeatured'] as bool? ?? false,
      isFavorite: json['isFavorite'] as bool? ?? false,
    );
  }

  // Getter para categoria baseado no tipo
  String get category => type.displayName;
}

enum RouteType {
  cultural,
  ecological,
  historical,
  adventure,
  gastronomy,
  nature,
}

extension RouteTypeExtension on RouteType {
  String get displayName {
    switch (this) {
      case RouteType.cultural:
        return 'Cultural';
      case RouteType.ecological:
        return 'Ecológico';
      case RouteType.historical:
        return 'Histórico';
      case RouteType.adventure:
        return 'Aventura';
      case RouteType.gastronomy:
        return 'Gastronomia';
      case RouteType.nature:
        return 'Natureza';
    }
  }

  String get icon {
    switch (this) {
      case RouteType.cultural:
        return '🎭';
      case RouteType.ecological:
        return '🌱';
      case RouteType.historical:
        return '🏛️';
      case RouteType.adventure:
        return '🏔️';
      case RouteType.gastronomy:
        return '🍽️';
      case RouteType.nature:
        return '🌿';
    }
  }
}
