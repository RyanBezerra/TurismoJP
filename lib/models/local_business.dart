class LocalBusiness {
  final String id;
  final String name;
  final String description;
  final String imageUrl;
  final String location;
  final BusinessType type;
  final double rating;
  final int reviewCount;
  final String phone;
  final String email;
  final String website;
  final List<String> services;
  final List<String> images;
  final String address;
  final List<String> openingHours;
  final bool isVerified;
  final bool isFavorite;

  const LocalBusiness({
    required this.id,
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.location,
    required this.type,
    required this.rating,
    required this.reviewCount,
    required this.phone,
    required this.email,
    required this.website,
    required this.services,
    required this.images,
    required this.address,
    required this.openingHours,
    this.isVerified = false,
    this.isFavorite = false,
  });

  LocalBusiness copyWith({
    String? id,
    String? name,
    String? description,
    String? imageUrl,
    String? location,
    BusinessType? type,
    double? rating,
    int? reviewCount,
    String? phone,
    String? email,
    String? website,
    List<String>? services,
    List<String>? images,
    String? address,
    List<String>? openingHours,
    bool? isVerified,
    bool? isFavorite,
  }) {
    return LocalBusiness(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      imageUrl: imageUrl ?? this.imageUrl,
      location: location ?? this.location,
      type: type ?? this.type,
      rating: rating ?? this.rating,
      reviewCount: reviewCount ?? this.reviewCount,
      phone: phone ?? this.phone,
      email: email ?? this.email,
      website: website ?? this.website,
      services: services ?? this.services,
      images: images ?? this.images,
      address: address ?? this.address,
      openingHours: openingHours ?? this.openingHours,
      isVerified: isVerified ?? this.isVerified,
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
      'type': type.name,
      'rating': rating,
      'reviewCount': reviewCount,
      'phone': phone,
      'email': email,
      'website': website,
      'services': services,
      'images': images,
      'address': address,
      'openingHours': openingHours,
      'isVerified': isVerified,
      'isFavorite': isFavorite,
    };
  }

  factory LocalBusiness.fromJson(Map<String, dynamic> json) {
    return LocalBusiness(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      imageUrl: json['imageUrl'] as String,
      location: json['location'] as String,
      type: BusinessType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => BusinessType.restaurant,
      ),
      rating: (json['rating'] as num).toDouble(),
      reviewCount: json['reviewCount'] as int,
      phone: json['phone'] as String,
      email: json['email'] as String,
      website: json['website'] as String,
      services: List<String>.from(json['services'] as List),
      images: List<String>.from(json['images'] as List),
      address: json['address'] as String,
      openingHours: List<String>.from(json['openingHours'] as List),
      isVerified: json['isVerified'] as bool? ?? false,
      isFavorite: json['isFavorite'] as bool? ?? false,
    );
  }
}

enum BusinessType {
  restaurant,
  hotel,
  tourGuide,
  artisan,
  transport,
  entertainment,
  shop,
  other,
}

extension BusinessTypeExtension on BusinessType {
  String get displayName {
    switch (this) {
      case BusinessType.restaurant:
        return 'Restaurante';
      case BusinessType.hotel:
        return 'Hospedagem';
      case BusinessType.tourGuide:
        return 'Guia Turístico';
      case BusinessType.artisan:
        return 'Artesão';
      case BusinessType.transport:
        return 'Transporte';
      case BusinessType.entertainment:
        return 'Entretenimento';
      case BusinessType.shop:
        return 'Loja';
      case BusinessType.other:
        return 'Outros';
    }
  }

  String get icon {
    switch (this) {
      case BusinessType.restaurant:
        return '🍽️';
      case BusinessType.hotel:
        return '🏨';
      case BusinessType.tourGuide:
        return '🗺️';
      case BusinessType.artisan:
        return '🎨';
      case BusinessType.transport:
        return '🚗';
      case BusinessType.entertainment:
        return '🎭';
      case BusinessType.shop:
        return '🛍️';
      case BusinessType.other:
        return '🏢';
    }
  }
}
