import 'package:intl/intl.dart';

class Booking {
  final String id;
  final String destinationId;
  final String destinationName;
  final DateTime checkIn;
  final DateTime checkOut;
  final int travelers;
  final double totalPrice;
  final BookingStatus status;
  final DateTime createdAt;
  final String? notes;
  final List<String> localBusinesses;

  const Booking({
    required this.id,
    required this.destinationId,
    required this.destinationName,
    required this.checkIn,
    required this.checkOut,
    required this.travelers,
    required this.totalPrice,
    required this.status,
    required this.createdAt,
    this.notes,
    this.localBusinesses = const [],
  });

  Booking copyWith({
    String? id,
    String? destinationId,
    String? destinationName,
    DateTime? checkIn,
    DateTime? checkOut,
    int? travelers,
    double? totalPrice,
    BookingStatus? status,
    DateTime? createdAt,
    String? notes,
    List<String>? localBusinesses,
  }) {
    return Booking(
      id: id ?? this.id,
      destinationId: destinationId ?? this.destinationId,
      destinationName: destinationName ?? this.destinationName,
      checkIn: checkIn ?? this.checkIn,
      checkOut: checkOut ?? this.checkOut,
      travelers: travelers ?? this.travelers,
      totalPrice: totalPrice ?? this.totalPrice,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      notes: notes ?? this.notes,
      localBusinesses: localBusinesses ?? this.localBusinesses,
    );
  }

  int get duration {
    return checkOut.difference(checkIn).inDays;
  }

  String get formattedCheckIn {
    return DateFormat('dd/MM/yyyy').format(checkIn);
  }

  String get formattedCheckOut {
    return DateFormat('dd/MM/yyyy').format(checkOut);
  }

  String get formattedCreatedAt {
    return DateFormat('dd/MM/yyyy HH:mm').format(createdAt);
  }

  String get formattedTotalPrice {
    return NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$').format(totalPrice);
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'destinationId': destinationId,
      'destinationName': destinationName,
      'checkIn': checkIn.toIso8601String(),
      'checkOut': checkOut.toIso8601String(),
      'travelers': travelers,
      'totalPrice': totalPrice,
      'status': status.name,
      'createdAt': createdAt.toIso8601String(),
      'notes': notes,
      'localBusinesses': localBusinesses,
    };
  }

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'] as String,
      destinationId: json['destinationId'] as String,
      destinationName: json['destinationName'] as String,
      checkIn: DateTime.parse(json['checkIn'] as String),
      checkOut: DateTime.parse(json['checkOut'] as String),
      travelers: json['travelers'] as int,
      totalPrice: (json['totalPrice'] as num).toDouble(),
      status: BookingStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => BookingStatus.pending,
      ),
      createdAt: DateTime.parse(json['createdAt'] as String),
      notes: json['notes'] as String?,
      localBusinesses: List<String>.from(json['localBusinesses'] as List? ?? []),
    );
  }
}

enum BookingStatus {
  pending,
  confirmed,
  cancelled,
  completed,
}

extension BookingStatusExtension on BookingStatus {
  String get displayName {
    switch (this) {
      case BookingStatus.pending:
        return 'Pendente';
      case BookingStatus.confirmed:
        return 'Confirmado';
      case BookingStatus.cancelled:
        return 'Cancelado';
      case BookingStatus.completed:
        return 'Concluído';
    }
  }

  String get color {
    switch (this) {
      case BookingStatus.pending:
        return '#FFA500';
      case BookingStatus.confirmed:
        return '#00FF00';
      case BookingStatus.cancelled:
        return '#FF0000';
      case BookingStatus.completed:
        return '#0000FF';
    }
  }
}
