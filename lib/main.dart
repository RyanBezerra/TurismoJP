import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'providers/app_provider.dart';
import 'providers/destination_provider.dart';
import 'screens/home_screen.dart';
import 'screens/destinations_screen.dart';
import 'screens/destination_detail_screen.dart';
import 'screens/booking_screen.dart';
import 'screens/favorites_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/about_screen.dart';
import 'screens/welcome_screen.dart';
import 'screens/routes_screen.dart';
import 'theme/app_theme.dart';
import 'services/app_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Inicializar SharedPreferences
  final prefs = await SharedPreferences.getInstance();
  
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppProvider(prefs)),
        ChangeNotifierProvider(create: (_) => DestinationProvider()),
      ],
      child: const ParaibaTurismoApp(),
    ),
  );
}

class ParaibaTurismoApp extends StatelessWidget {
  const ParaibaTurismoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, appProvider, child) {
        return MaterialApp.router(
          title: 'Paraíba Turismo',
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          routerConfig: _router,
        );
      },
    );
  }
}

final GoRouter _router = GoRouter(
  initialLocation: '/welcome',
  routes: [
    GoRoute(
      path: '/welcome',
      name: 'welcome',
      builder: (context, state) => const WelcomeScreen(),
    ),
    GoRoute(
      path: '/',
      name: 'home',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/destinations',
      name: 'destinations',
      builder: (context, state) => const DestinationsScreen(),
    ),
    GoRoute(
      path: '/routes',
      name: 'routes',
      builder: (context, state) => const RoutesScreen(),
    ),
    GoRoute(
      path: '/destination/:id',
      name: 'destination-detail',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return DestinationDetailScreen(destinationId: id);
      },
    ),
    GoRoute(
      path: '/route/:id',
      name: 'route-detail',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        // TODO: Implementar RouteDetailScreen
        return const HomeScreen();
      },
    ),
    GoRoute(
      path: '/booking',
      name: 'booking',
      builder: (context, state) {
        final destinationId = state.uri.queryParameters['destinationId'];
        return BookingScreen(destinationId: destinationId);
      },
    ),
    GoRoute(
      path: '/favorites',
      name: 'favorites',
      builder: (context, state) => const FavoritesScreen(),
    ),
    GoRoute(
      path: '/profile',
      name: 'profile',
      builder: (context, state) => const ProfileScreen(),
    ),
    GoRoute(
      path: '/about',
      name: 'about',
      builder: (context, state) => const AboutScreen(),
    ),
  ],
);
