import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_auth/firebase_auth.dart' as fb_auth;
import '../models/user.dart';

class AuthService {
  static const String _userKey = 'user';
  static const String _tokenKey = 'token';

  final SharedPreferences _prefs;

  AuthService(this._prefs);

  final fb_auth.FirebaseAuth _firebaseAuth = fb_auth.FirebaseAuth.instance;

  // Public getter for FirebaseAuth instance
  fb_auth.FirebaseAuth get firebaseAuthInstance => _firebaseAuth;

  static Future<AuthService> create() async {
    final prefs = await SharedPreferences.getInstance();
    return AuthService(prefs);
  }

  Future<bool> isLoggedIn() async {
    // Primarily check Firebase auth state
    return _firebaseAuth.currentUser != null;
    // We might also want to check _prefs.containsKey(_tokenKey) depending on session management strategy
  }

  Future<void> saveUserSession(User user, String token) async {
    await _prefs.setString(_userKey, jsonEncode(user.toJson()));
    await _prefs.setString(_tokenKey, token);
  }

  Future<void> logout() async {
    await _firebaseAuth.signOut();
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

  // Firebase Phone Authentication Methods

  fb_auth.User? get currentFirebaseUser => _firebaseAuth.currentUser;

  Future<void> verifyPhoneNumber({
    required String phoneNumber,
    required Function(fb_auth.PhoneAuthCredential) verificationCompleted,
    required Function(fb_auth.FirebaseAuthException) verificationFailed,
    required Function(String, int?) codeSent,
    required Function(String) codeAutoRetrievalTimeout,
    int? forceResendingToken, // Added this line
    Duration timeout = const Duration(seconds: 60),
  }) async {
    await _firebaseAuth.verifyPhoneNumber(
      phoneNumber: phoneNumber,
      verificationCompleted: verificationCompleted,
      verificationFailed: verificationFailed,
      codeSent: codeSent,
      codeAutoRetrievalTimeout: codeAutoRetrievalTimeout,
      forceResendingToken: forceResendingToken, // Added this line
      timeout: timeout,
    );
  }

  Future<fb_auth.UserCredential?> signInWithOtp(String verificationId, String smsCode) async {
    try {
      final fb_auth.PhoneAuthCredential credential = fb_auth.PhoneAuthProvider.credential(
        verificationId: verificationId,
        smsCode: smsCode,
      );
      return await _firebaseAuth.signInWithCredential(credential);
    } catch (e) {
      // Handle error, e.g., invalid OTP
      print('Error signing in with OTP: $e');
      return null;
    }
  }

  Future<fb_auth.UserCredential?> signInWithPhoneCredential(fb_auth.PhoneAuthCredential credential) async {
    try {
      return await _firebaseAuth.signInWithCredential(credential);
    } catch (e) {
      print('Error signing in with phone credential: $e');
      return null;
    }
  }

  // Method to link phone number to an existing anonymous or other user (optional)
  Future<void> linkPhoneNumber(String verificationId, String smsCode) async {
    final credential = fb_auth.PhoneAuthProvider.credential(
      verificationId: verificationId,
      smsCode: smsCode,
    );
    await _firebaseAuth.currentUser?.linkWithCredential(credential);
  }

  // Method to update phone number for an existing user (optional)
  // This often requires recent re-authentication.
  Future<void> updatePhoneNumber(String verificationId, String smsCode) async {
     final credential = fb_auth.PhoneAuthProvider.credential(
      verificationId: verificationId,
      smsCode: smsCode,
    );
    await _firebaseAuth.currentUser?.updatePhoneNumber(credential);
  }

  // Firebase Email/Password Authentication

  Future<fb_auth.User?> createUserWithEmailAndPasswordAndName(String email, String password, String name) async {
    try {
      final fb_auth.UserCredential userCredential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      // Update the user's display name
      await userCredential.user?.updateDisplayName(name);
      // Reload the user to get the updated display name
      await userCredential.user?.reload();
      return _firebaseAuth.currentUser; // Return the user with updated info
    } on fb_auth.FirebaseAuthException catch (e) {
      print('FirebaseAuthException during email registration: ${e.code} - ${e.message}');
      rethrow;
    } catch (e) {
      print('Error creating user with email and password: $e');
      return null;
    }
  }

  Future<fb_auth.User?> signInWithEmailAndPassword(String email, String password) async {
    try {
      final fb_auth.UserCredential userCredential = await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return userCredential.user;
    } on fb_auth.FirebaseAuthException catch (e) {
      // Specific Firebase Auth errors can be handled or re-thrown here
      // For example, you might want to log them or map them to custom error types
      print('FirebaseAuthException during email sign-in: ${e.code} - ${e.message}');
      rethrow; // Re-throw to be caught by AuthProvider or UI layer
    } catch (e) {
      print('Error signing in with email and password: $e');
      // Handle other errors, e.g., network issues
      return null; // Or rethrow a generic exception
    }
  }
}
