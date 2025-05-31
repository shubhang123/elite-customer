import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'services/auth_service.dart';
import 'state/app_state.dart';
import 'state/auth_provider.dart';
import 'theme/app_theme.dart';
import 'views/welcome/welcome_screen.dart';
import 'views/welcome/login_screen.dart';
import 'views/welcome/otp_screen.dart';
import 'layouts/main_layout.dart';
import 'views/notifications/notifications_screen.dart';
import 'views/profile/profile_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Configure default animation duration
  Animate.defaultDuration = const Duration(milliseconds: 300);

  final authService = await AuthService.create();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthProvider(authService),
        ),
        ChangeNotifierProvider(
          create: (_) {
            final appState = AppState();
            appState.loadMockData();
            return appState;
          },
        ),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Elite Customer',
      theme: AppTheme.lightTheme(),
      initialRoute: '/',
      routes: {
        '/': (context) => const WelcomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/otp': (context) => const OtpScreen(),
        '/home': (context) => const MainLayout(),
        '/notifications': (context) => const NotificationsScreen(),
        '/profile': (context) => const ProfileScreen(),
      },
    );
  }
}
