import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/auth_service.dart';
import '../views/welcome/otp_screen.dart'; // Added for OtpScreen navigation
import 'package:firebase_auth/firebase_auth.dart' as fb_auth;

class AuthProvider extends ChangeNotifier {
  final AuthService _authService;
  bool _isLoading = false;
  String? _errorMessage;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  User? _user;
  bool _isLoggedIn = false;
  String? _token;

  AuthProvider(this._authService) {
    _initializeAuthState();
  }

  User? get user => _user;
  bool get isLoggedIn => _isLoggedIn;
  String? get token => _token;
  AuthService get authService => _authService;

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

  // Method to update user state from Firebase user
  Future<void> updateUserFromFirebase(fb_auth.User firebaseUser) async {
    // Create a local User object from Firebase user data
    // You might want to fetch more details from your backend here
    _user = User(
      id: firebaseUser.uid, // Using UID as id
      name: firebaseUser.displayName ?? 'User', // Or fetch from backend
      email: firebaseUser.email ?? '', // Or fetch from backend
      phone: firebaseUser.phoneNumber ?? '', // Corrected parameter name
      // Add other fields as necessary, potentially fetching from your backend
    );
    _token = await firebaseUser.getIdToken(); // Using Firebase ID token
    _isLoggedIn = true;

    // Optionally, save this updated session to SharedPreferences if needed
    // For now, this example assumes Firebase is the source of truth after login
    // If you want to persist this across app restarts without re-authenticating immediately:
    // await _authService.saveUserSession(_user!, _token!);

    notifyListeners();
  }

  Future<void> signInWithEmailAndPassword(String email, String password) async {
    try {
      final fb_auth.User? firebaseUser = await _authService.signInWithEmailAndPassword(email, password);
      if (firebaseUser != null) {
        // Optional: Check for email verification. If email verification is required,
        // you might want to handle it here, e.g., by checking firebaseUser.emailVerified
        // and potentially throwing an error or triggering a verification email flow.
        // For now, we'll proceed to update the user assuming successful authentication.
        // Example: 
        // if (!firebaseUser.emailVerified) {
        //   await firebaseUser.sendEmailVerification();
        //   throw fb_auth.FirebaseAuthException(
        //     code: 'email-not-verified',
        //     message: 'Please verify your email. A verification email has been sent.',
        //   );
        // }
        await updateUserFromFirebase(firebaseUser);
      } else {
        // This case might not be hit if _authService.signInWithEmailAndPassword throws on failure
        throw Exception('Sign in failed. Firebase user is null.');
      }
    } on fb_auth.FirebaseAuthException {
      // Re-throw the specific Firebase auth exception to be handled in the UI
      rethrow;
    } catch (e) {
      // Re-throw any other exceptions
      throw Exception('An unexpected error occurred during email sign-in: ${e.toString()}');
    }
  }

  Future<void> registerWithEmailAndPasswordAndName(String email, String password, String name) async {
    try {
      final fb_auth.User? firebaseUser = await _authService.createUserWithEmailAndPasswordAndName(email, password, name);
      if (firebaseUser != null) {
        // Optional: Send email verification if desired
        // if (!firebaseUser.emailVerified) {
        //   await firebaseUser.sendEmailVerification();
        //   // You might want to inform the user that a verification email has been sent
        // }
        await updateUserFromFirebase(firebaseUser);
      } else {
        throw Exception('Registration failed. Firebase user is null.');
      }
    } on fb_auth.FirebaseAuthException {
      rethrow;
    } catch (e) {
      throw Exception('An unexpected error occurred during registration: ${e.toString()}');
    }
  }

  Future<void> registerWithPhone(String phoneNumber, String name, BuildContext context) async {
    _isLoading = true;
    _errorMessage = null; // Clear previous errors
    notifyListeners();

    try {
      await _authService.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (fb_auth.PhoneAuthCredential credential) async {
          // This callback is for auto-retrieval or instant verification.
          _isLoading = false;
          // notifyListeners(); // Moved after try-catch to ensure error message is set before notifying
          try {
            final userCredential = await _authService.signInWithPhoneCredential(credential);
            final fbUser = userCredential?.user;
            if (fbUser != null) {
              bool isNewUser = userCredential?.additionalUserInfo?.isNewUser ?? false;
              if (isNewUser && name.isNotEmpty) {
                await fbUser.updateDisplayName(name);
                await fbUser.reload();
                final updatedFbUser = _authService.currentFirebaseUser;
                 await updateUserFromFirebase(updatedFbUser ?? fbUser);
                 _errorMessage = null; // Success
              } else {
                 await updateUserFromFirebase(fbUser);
                 _errorMessage = null; // Success
              }
              // Navigation to home is handled by the listener on isLoggedIn state in main.dart or a wrapper widget
            } else {
              _errorMessage = 'Auto-verification failed. Firebase user is null after credential sign-in.';
            }
          } on fb_auth.FirebaseAuthException catch (e) {
            _errorMessage = 'Auto-verification sign-in failed: ${e.message}';
          } catch (e) {
            _errorMessage = 'An unexpected error occurred during auto-verification processing: ${e.toString()}';
          }
          notifyListeners(); // Notify after all outcomes within try-catch
        },
        verificationFailed: (fb_auth.FirebaseAuthException e) {
          _isLoading = false;
          _errorMessage = 'Phone number verification failed: ${e.message}';
          notifyListeners();
        },
        codeSent: (String verificationId, int? resendToken) {
          _isLoading = false;
          _errorMessage = null; // Clear error on successful code send
          notifyListeners();
          // Navigate to OTP screen
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => OtpScreen(
                verificationId: verificationId,
                phoneNumber: phoneNumber,
                forceResendingToken: resendToken,
                isRegistrationFlow: true,
                userName: name,
              ),
            ),
          );
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          // This callback means that auto-retrieval has timed out.
          // The user will have to manually enter the OTP.
          // The 'codeSent' callback would have already been called, so navigation to OtpScreen is handled there.
          // You might want to log this event or update UI if needed, but often no direct action is required here
          // if codeSent has already navigated.
          print('OTP auto-retrieval timed out. Verification ID: $verificationId');
        },
      );
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error initiating phone verification: ${e.toString()}';
      notifyListeners();
    }
  }

  Future<void> signInWithPhone(String phoneNumber, BuildContext context) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _authService.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        verificationCompleted: (fb_auth.PhoneAuthCredential credential) async {
          _isLoading = false;
          try {
            final userCredential = await _authService.signInWithPhoneCredential(credential);
            final fbUser = userCredential?.user;
            if (fbUser != null) {
              await updateUserFromFirebase(fbUser);
              _errorMessage = null;
            } else {
              _errorMessage = 'Auto-verification failed. Firebase user is null.';
            }
          } on fb_auth.FirebaseAuthException catch (e) {
            _errorMessage = 'Auto-verification sign-in failed: ${e.message}';
          } catch (e) {
            _errorMessage = 'An unexpected error occurred during auto-verification: ${e.toString()}';
          }
          notifyListeners();
        },
        verificationFailed: (fb_auth.FirebaseAuthException e) {
          _isLoading = false;
          _errorMessage = 'Phone number verification failed: ${e.message}';
          notifyListeners();
        },
        codeSent: (String verificationId, int? resendToken) {
          _isLoading = false;
          _errorMessage = null;
          notifyListeners();
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => OtpScreen(
                verificationId: verificationId,
                phoneNumber: phoneNumber,
                forceResendingToken: resendToken,
                isRegistrationFlow: false, // For login
              ),
            ),
          );
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          print('OTP auto-retrieval timed out for login. Verification ID: $verificationId');
        },
      );
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Error initiating phone sign-in: ${e.toString()}';
      notifyListeners();
    }
  }

  
}
