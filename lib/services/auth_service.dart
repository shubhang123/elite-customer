import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';

class AuthService {
  static const String _userKey = 'user';
  static const String _tokenKey = 'token';

  final SharedPreferences _prefs;

  AuthService(this._prefs);

  static Future<AuthService> create() async {
    final prefs = await SharedPreferences.getInstance();
    return AuthService(prefs);
  }

  Future<bool> isLoggedIn() async {
    return _prefs.containsKey(_tokenKey);
  }

  Future<void> saveUserSession(User user, String token) async {
    await _prefs.setString(_userKey, jsonEncode(user.toJson()));
    await _prefs.setString(_tokenKey, token);
  }

  Future<void> logout() async {
    await _prefs.remove(_userKey);
    await _prefs.remove(_tokenKey);
  }

  Future<User?> getCurrentUser() async {
    final userJson = _prefs.getString(_userKey);
    if (userJson == null) return null;
    return User.fromJson(jsonDecode(userJson));
  }

  Future<String?> getToken() async {
    return _prefs.getString(_tokenKey);
  }
}
