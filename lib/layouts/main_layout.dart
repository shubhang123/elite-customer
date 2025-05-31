import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../state/auth_provider.dart';
import '../views/home/home_screen.dart';
import '../views/chat/chat_screen.dart';
import '../views/payments/payments_screen.dart';
import '../views/profile/profile_screen.dart';
import '../views/progress/progress_screen.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/app_bar_with_notifications.dart';

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  static void navigateToIndex(BuildContext context, String route) {
    int index;
    switch (route) {
      case '/track':
        index = 1;
        break;
      case '/chat':
        index = 2;
        break;
      case '/payments':
        index = 3;
        break;
      case '/profile':
        index = 4;
        break;
      case '/home':
        index = 0;
        break;
      default:
        index = 0;
    }
    final state = context.findRootAncestorStateOfType<_MainLayoutState>();
    if (state != null) {
      state._onTabTapped(index);
    }
  }

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _currentIndex = 0;

  final List<Widget> _pages = const [
    HomeScreen(),
    ProgressScreen(),
    ChatScreen(),
    PaymentsScreen(),
    ProfileScreen(),
  ];

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    await authProvider.checkAuthStatus();

    if (!authProvider.isLoggedIn && mounted) {
      Navigator.of(context).pushReplacementNamed('/');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, child) {
        if (!authProvider.isLoggedIn) {
          return const Center(child: CircularProgressIndicator());
        }

        return Scaffold(
          body: IndexedStack(
            index: _currentIndex,
            children: _pages,
          ),
          bottomNavigationBar: BottomNavBar(
            currentIndex: _currentIndex,
            onTap: _onTabTapped,
          ),
        );
      },
    );
  }
}
