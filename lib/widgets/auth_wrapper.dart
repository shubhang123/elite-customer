import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../state/auth_provider.dart';
import '../views/welcome/welcome_screen.dart';
import '../layouts/main_layout.dart';

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    // Check auth status on initial build if not already checked
    // This is a common pattern, but ensure it doesn't cause excessive calls.
    // Alternatively, AuthProvider's constructor can call checkAuthStatus.
    // For now, let's assume AuthProvider handles its initial check.

    if (authProvider.isLoggedIn) {
      return const MainLayout(); // User is logged in, show main app layout
    } else {
      return const WelcomeScreen(); // User is not logged in, show welcome/login flow
    }
  }
}
