import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/destination_provider.dart';
import '../models/destination.dart';

class CategoryFilter extends StatelessWidget {
  const CategoryFilter({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<DestinationProvider>(
      builder: (context, provider, child) {
        return SizedBox(
          height: 50,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            children: [
              // All categories
              _buildFilterChip(
                context,
                'Todos',
                null,
                provider.selectedType == null,
                () => provider.setFilters(type: null),
              ),
              
              const SizedBox(width: 8),
              
              // Category chips
              ...DestinationType.values.map((type) {
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: _buildFilterChip(
                    context,
                    type.displayName,
                    type,
                    provider.selectedType == type,
                    () => provider.setFilters(type: type),
                  ),
                );
              }),
            ],
          ),
        );
      },
    );
  }

  Widget _buildFilterChip(
    BuildContext context,
    String label,
    DestinationType? type,
    bool isSelected,
    VoidCallback onTap,
  ) {
    return FilterChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (selected) => onTap(),
      backgroundColor: Colors.grey[100],
      selectedColor: Theme.of(context).primaryColor.withOpacity(0.2),
      checkmarkColor: Theme.of(context).primaryColor,
      labelStyle: TextStyle(
        color: isSelected ? Theme.of(context).primaryColor : Colors.grey[700],
        fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
      ),
      side: BorderSide(
        color: isSelected ? Theme.of(context).primaryColor : Colors.grey[300]!,
        width: isSelected ? 2 : 1,
      ),
    );
  }
}
