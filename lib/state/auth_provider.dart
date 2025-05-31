import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService;
  User? _user;
  bool _isLoggedIn = false;
  String? _token;

  AuthProvider(this._authService) {
    _initializeAuthState();
  }

  User? get user => _user;
  bool get isLoggedIn => _isLoggedIn;
  String? get token => _token;

  Future<void> _initializeAuthState() async {
    _user = await _authService.getCurrentUser();
    _token = await _authService.getToken();
    _isLoggedIn = _user != null && _token != null;
    notifyListeners();
  }

  Future<void> login(User user, String token) async {
    await _authService.saveUserSession(user, token);
    _user = user;
    _token = token;
    _isLoggedIn = true;
    notifyListeners();
  }

  Future<void> logout() async {
    await _authService.logout();
    _user = null;
    _token = null;
    _isLoggedIn = false;
    notifyListeners();
  }

  Future<void> checkAuthStatus() async {
    final isLoggedIn = await _authService.isLoggedIn();
    if (isLoggedIn) {
      _user = await _authService.getCurrentUser();
      _token = await _authService.getToken();
      _isLoggedIn = true;
    } else {
      _user = null;
      _token = null;
      _isLoggedIn = false;
    }
    notifyListeners();
  }
}
