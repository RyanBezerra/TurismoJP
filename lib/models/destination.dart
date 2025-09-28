class Destination {
  final String id;
  final String name;
  final String description;
  final String imageUrl;
  final String location;
  final double rating;
  final int reviewCount;
  final double price;
  final String pricePeriod;
  final DestinationType type;
  final List<String> highlights;
  final List<String> images;
  final String detailedDescription;
  final List<String> activities;
  final List<String> localBusinesses;
  final bool isFeatured;
  final bool isFavorite;

  const Destination({
    required this.id,
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.location,
    required this.rating,
    required this.reviewCount,
    required this.price,
    required this.pricePeriod,
    required this.type,
    required this.highlights,
    required this.images,
    required this.detailedDescription,
    required this.activities,
    required this.localBusinesses,
    this.isFeatured = false,
    this.isFavorite = false,
  });

  Destination copyWith({
    String? id,
    String? name,
    String? description,
    String? imageUrl,
    String? location,
    double? rating,
    int? reviewCount,
    double? price,
    String? pricePeriod,
    DestinationType? type,
    List<String>? highlights,
    List<String>? images,
    String? detailedDescription,
    List<String>? activities,
    List<String>? localBusinesses,
    bool? isFeatured,
    bool? isFavorite,
  }) {
    return Destination(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      imageUrl: imageUrl ?? this.imageUrl,
      location: location ?? this.location,
      rating: rating ?? this.rating,
      reviewCount: reviewCount ?? this.reviewCount,
      price: price ?? this.price,
      pricePeriod: pricePeriod ?? this.pricePeriod,
      type: type ?? this.type,
      highlights: highlights ?? this.highlights,
      images: images ?? this.images,
      detailedDescription: detailedDescription ?? this.detailedDescription,
      activities: activities ?? this.activities,
      localBusinesses: localBusinesses ?? this.localBusinesses,
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
      'location': location,
      'rating': rating,
      'reviewCount': reviewCount,
      'price': price,
      'pricePeriod': pricePeriod,
      'type': type.name,
      'highlights': highlights,
      'images': images,
      'detailedDescription': detailedDescription,
      'activities': activities,
      'localBusinesses': localBusinesses,
      'isFeatured': isFeatured,
      'isFavorite': isFavorite,
    };
  }

  factory Destination.fromJson(Map<String, dynamic> json) {
    return Destination(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      imageUrl: json['imageUrl'] as String,
      location: json['location'] as String,
      rating: (json['rating'] as num).toDouble(),
      reviewCount: json['reviewCount'] as int,
      price: (json['price'] as num).toDouble(),
      pricePeriod: json['pricePeriod'] as String,
      type: DestinationType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => DestinationType.cultural,
      ),
      highlights: List<String>.from(json['highlights'] as List),
      images: List<String>.from(json['images'] as List),
      detailedDescription: json['detailedDescription'] as String,
      activities: List<String>.from(json['activities'] as List),
      localBusinesses: List<String>.from(json['localBusinesses'] as List),
      isFeatured: json['isFeatured'] as bool? ?? false,
      isFavorite: json['isFavorite'] as bool? ?? false,
    );
  }
}

enum DestinationType {
  cultural,
  ecological,
  historical,
  adventure,
  gastronomy,
  nature,
}

extension DestinationTypeExtension on DestinationType {
  String get displayName {
    switch (this) {
      case DestinationType.cultural:
        return 'Cultural';
      case DestinationType.ecological:
        return 'Ecológico';
      case DestinationType.historical:
        return 'Histórico';
      case DestinationType.adventure:
        return 'Aventura';
      case DestinationType.gastronomy:
        return 'Gastronomia';
      case DestinationType.nature:
        return 'Natureza';
    }
  }

  String get icon {
    switch (this) {
      case DestinationType.cultural:
        return '🎭';
      case DestinationType.ecological:
        return '🌱';
      case DestinationType.historical:
        return '🏛️';
      case DestinationType.adventure:
        return '🏔️';
      case DestinationType.gastronomy:
        return '🍽️';
      case DestinationType.nature:
        return '🌿';
    }
  }
}
