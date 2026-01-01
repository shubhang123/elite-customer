import 'package:flutter/material.dart';
import 'package:provider/provider.dart'; // Added
import '../../state/auth_provider.dart'; // Added
import 'registration_screen.dart';
import 'package:firebase_auth/firebase_auth.dart' as fb_auth; // For FirebaseAuthException

enum LoginMode { email, phone }

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with SingleTickerProviderStateMixin {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _emailFocusNode = FocusNode();
  final _passwordController = TextEditingController(); // Added
  final _phoneController = TextEditingController(); // Added
  late AnimationController _animationController;
  late Animation<double> _fadeInAnimation;
  LoginMode _loginMode = LoginMode.email; // Added
  bool _isLoading = false; // Added


  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _fadeInAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOut,
    );

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    _emailController.dispose();
    _emailFocusNode.dispose();
    _passwordController.dispose(); // Added
    _phoneController.dispose(); // Added
    super.dispose();
  }

  Future<void> _handleLogin() async {
    if (!(_formKey.currentState?.validate() ?? false)) {
      return;
    }
    setState(() => _isLoading = true);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    try {
      if (_loginMode == LoginMode.email) {
        final email = _emailController.text.trim();
        final password = _passwordController.text;
        await authProvider.signInWithEmailAndPassword(email, password);
      } else {
        final phone = _phoneController.text.trim();
        await authProvider.signInWithPhone(phone, context);
        // Navigation to OtpScreen is handled within authProvider.signInWithPhone
        // If successful there, OtpScreen will handle navigation to home.
      }

      // Navigation to home is typically handled by a listener on AuthProvider's isLoggedIn state
      // or by checking authProvider.isLoggedIn here after the await.
      if (mounted && authProvider.isLoggedIn && _loginMode == LoginMode.email) {
        // For email login, navigate directly. Phone login navigates to OTP screen first.
        Navigator.of(context).pushNamedAndRemoveUntil('/home', (route) => false);
      } else if (mounted && authProvider.isLoggedIn && _loginMode == LoginMode.phone) {
        // This case (auto-verified phone login) should also navigate home.
        // If not auto-verified, signInWithPhone would have navigated to OtpScreen.
        // OtpScreen handles navigation to home upon successful OTP verification.
        // So, if we reach here after signInWithPhone and isLoggedIn is true, it means auto-verification was successful.
        Navigator.of(context).pushNamedAndRemoveUntil('/home', (route) => false);
      }
    } on fb_auth.FirebaseAuthException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Login failed: ${e.message ?? "Unknown error"}')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('An unexpected error occurred: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  /*
  Future<void> _handleSendLink() async {
    if (!(_formKey.currentState?.validate() ?? false)) {
      return;
    }

    // setState(() => _isLoading = true); // _isLoading is removed
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final email = _emailController.text.trim();

    try {
      // await authProvider.sendSignInLink(email, context); // sendSignInLink is removed
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Sign-in link sent to $email. Please check your inbox.'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } on fb_auth.FirebaseAuthException catch (e) { // fb_auth is removed
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to send link: ${e.message ?? "Unknown error"}')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('An unexpected error occurred: ${e.toString()}')),
        );
      }
    } finally {
      // if (mounted) setState(() => _isLoading = false); // _isLoading is removed
    }
  }
  */

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black87),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: FadeTransition(
              opacity: _fadeInAnimation,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 24),
                  // Logo
                  Hero(
                    tag: 'appLogo',
                    child: Container(
                      width: 72,
                      height: 72,
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primary,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: Theme.of(context)
                                .colorScheme
                                .primary
                                .withOpacity(0.3),
                            blurRadius: 12,
                            spreadRadius: 2,
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.design_services,
                        color: Colors.white,
                        size: 36,
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),
                  Text(
                    'Sign In',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Welcome! Sign in or register to continue.',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: Colors.grey[600],
                        ),
                  ),
                  const SizedBox(height: 32),
                  Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        SegmentedButton<LoginMode>(
                          segments: const <ButtonSegment<LoginMode>>[
                            ButtonSegment<LoginMode>(
                                value: LoginMode.email, label: Text('Email')),
                            ButtonSegment<LoginMode>(
                                value: LoginMode.phone, label: Text('Phone')),
                          ],
                          selected: <LoginMode>{_loginMode},
                          onSelectionChanged: (Set<LoginMode> newSelection) {
                            setState(() {
                              _loginMode = newSelection.first;
                            });
                          },
                        ),
                        const SizedBox(height: 24),
                        if (_loginMode == LoginMode.email)
                          Column(
                            children: [
                              _buildEmailField(),
                              const SizedBox(height: 16),
                              TextFormField(
                                controller: _passwordController,
                                focusNode: FocusNode(), // Create new or manage existing
                                decoration: const InputDecoration(labelText: 'Password'),
                                obscureText: true,
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter your password';
                                  }
                                  return null;
                                },
                              ),
                            ],
                          )
                        else
                          TextFormField(
                            controller: _phoneController,
                            focusNode: FocusNode(), // Create new or manage existing
                            decoration: const InputDecoration(labelText: 'Phone Number'),
                            keyboardType: TextInputType.phone,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'Please enter your phone number';
                              }
                              return null;
                            },
                          ),
                        const SizedBox(height: 32),
                        ElevatedButton(
                          onPressed: _isLoading ? null : _handleLogin,
                          style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.blue, // Added
                              foregroundColor: Colors.white, // Added for text color
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)
                          ),
                          child: _isLoading
                              ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                              : Text(_loginMode == LoginMode.phone ? 'Continue' : 'Login'),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Don't have an account?"),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const RegistrationScreen()),
                          );
                        },
                        child: const Text('Register'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  // Privacy Notice
                  Text(
                    'By continuing, you agree to our Terms of Service and Privacy Policy',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.black45,
                        ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildEmailField() {
    return TextFormField(
      controller: _emailController,
      focusNode: _emailFocusNode,
      decoration: InputDecoration(
        labelText: 'Email',
        hintText: 'Enter your email address',
        prefixIcon: const Icon(Icons.email),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        fillColor: Colors.grey[100]
      ),
      style: Theme.of(context).textTheme.bodyLarge,
      keyboardType: TextInputType.emailAddress,
    );
  }
}
