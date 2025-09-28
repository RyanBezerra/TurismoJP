import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';

import '../providers/destination_provider.dart';
import '../widgets/destination_card.dart';
import '../widgets/search_bar.dart' as custom_search;
import '../widgets/category_filter.dart';
import '../widgets/bottom_navigation.dart';

class DestinationsScreen extends StatefulWidget {
  const DestinationsScreen({super.key});

  @override
  State<DestinationsScreen> createState() => _DestinationsScreenState();
}

class _DestinationsScreenState extends State<DestinationsScreen> {
  final ScrollController _scrollController = ScrollController();
  bool _isGridView = true;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<DestinationProvider>().initialize();
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Destinos'),
        actions: [
          IconButton(
            icon: Icon(_isGridView ? Icons.list : Icons.grid_view),
            onPressed: () {
              setState(() {
                _isGridView = !_isGridView;
              });
            },
          ),
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () => _showFilterBottomSheet(context),
          ),
        ],
      ),
      body: Consumer<DestinationProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (provider.error != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Erro ao carregar destinos',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    provider.error!,
                    style: Theme.of(context).textTheme.bodyMedium,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => provider.refresh(),
                    child: const Text('Tentar novamente'),
                  ),
                ],
              ),
            );
          }

          return Column(
            children: [
              // Search Bar
              const Padding(
                padding: EdgeInsets.all(16),
                child: custom_search.SearchBar(),
              ),

              // Category Filter
              const CategoryFilter(),

              // Results count
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${provider.destinations.length} destinos encontrados',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    if (provider.selectedType != null || provider.searchQuery.isNotEmpty)
                      TextButton(
                        onPressed: () => provider.clearFilters(),
                        child: const Text('Limpar filtros'),
                      ),
                  ],
                ),
              ),

              // Destinations List
              Expanded(
                child: _isGridView
                    ? GridView.builder(
                        controller: _scrollController,
                        padding: const EdgeInsets.all(16),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.8,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                        ),
                        itemCount: provider.destinations.length,
                        itemBuilder: (context, index) {
                          final destination = provider.destinations[index];
                          return DestinationCard(
                            destination: destination,
                            onTap: () => context.go('/destination/${destination.id}'),
                          );
                        },
                      )
                    : ListView.builder(
                        controller: _scrollController,
                        padding: const EdgeInsets.all(16),
                        itemCount: provider.destinations.length,
                        itemBuilder: (context, index) {
                          final destination = provider.destinations[index];
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: DestinationCard(
                              destination: destination,
                              onTap: () => context.go('/destination/${destination.id}'),
                              isListView: true,
                            ),
                          );
                        },
                      ),
              ),
            ],
          );
        },
      ),
      bottomNavigationBar: const BottomNavigation(),
    );
  }

  void _showFilterBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => const FilterBottomSheet(),
    );
  }
}

class FilterBottomSheet extends StatefulWidget {
  const FilterBottomSheet({super.key});

  @override
  State<FilterBottomSheet> createState() => _FilterBottomSheetState();
}

class _FilterBottomSheetState extends State<FilterBottomSheet> {
  double _maxPrice = 1000.0;
  double _minRating = 0.0;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Filtros',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          // Price Range
          Text(
            'Preço máximo: R\$ ${_maxPrice.toInt()}',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          Slider(
            value: _maxPrice,
            min: 0,
            max: 1000,
            divisions: 20,
            onChanged: (value) {
              setState(() {
                _maxPrice = value;
              });
            },
          ),
          
          const SizedBox(height: 16),
          
          // Rating Range
          Text(
            'Avaliação mínima: ${_minRating.toStringAsFixed(1)} ⭐',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          Slider(
            value: _minRating,
            min: 0,
            max: 5,
            divisions: 10,
            onChanged: (value) {
              setState(() {
                _minRating = value;
              });
            },
          ),
          
          const SizedBox(height: 24),
          
          // Apply Button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                context.read<DestinationProvider>().setFilters(
                  maxPrice: _maxPrice,
                  minRating: _minRating,
                );
                Navigator.pop(context);
              },
              child: const Text('Aplicar Filtros'),
            ),
          ),
        ],
      ),
    );
  }
}
