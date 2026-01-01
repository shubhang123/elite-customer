import 'dart:async';
import 'package:flutter/material.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import 'package:provider/provider.dart';
import 'package:firebase_auth/firebase_auth.dart' as fb_auth; // For FirebaseAuthException
import 'package:sms_autofill/sms_autofill.dart';
import '../../state/auth_provider.dart';

class OtpScreen extends StatefulWidget {
  final String? verificationId;
  final String? phoneNumber;
  final int? forceResendingToken;
  final bool isRegistrationFlow;
  final String? userName;

  const OtpScreen({
    super.key,
    this.verificationId,
    this.phoneNumber,
    this.forceResendingToken,
    this.isRegistrationFlow = false,
    this.userName,
  });

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}
class _OtpScreenState extends State<OtpScreen> with CodeAutoFill {
  // These will now be initialized from widget.verificationId etc.
  // String? verificationId;
  // String? phoneNumber;
  // int? forceResendingToken;
  final TextEditingController _otpController = TextEditingController();
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  StreamController<ErrorAnimationType>? _errorController;
  bool _isLoading = false;
  bool _hasError = false;
  int _resendTimeout = 30;
  Timer? _resendTimer;
  bool _isResendingOtp = false;

  @override
  void initState() {
    super.initState();
    _errorController = StreamController<ErrorAnimationType>();
    // Arguments are now passed via constructor
    if (widget.verificationId != null && widget.phoneNumber != null) {
      _startResendTimer(); // Start timer only if we have necessary data
    }
    // Start listening for SMS autofill
    listenForCode();
    // For debugging, get app signature for Android SMS autofill (optional)
    // SmsAutoFill().getAppSignature.then((signature) {
    //   print('App Signature: $signature');
    // });
  }

  // didChangeDependencies is no longer needed to fetch arguments as they are passed via constructor
  // @override
  // void didChangeDependencies() {
  //   super.didChangeDependencies();
  //   // ... (old code removed)
  // }

  void _startResendTimer() {
    _resendTimer?.cancel();
    setState(() => _resendTimeout = 30);
    _resendTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_resendTimeout == 0) {
        timer.cancel();
      } else {
        setState(() => _resendTimeout--);
      }
    });
  }

  @override
  void codeUpdated() {
    // Called when SMS autofill detects a code
    if (mounted && _otpController.text.length == 6) {
      _verifyOtp(_otpController.text);
    }
  }

  Future<void> _verifyOtp(String otp) async {
    if (widget.verificationId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Verification ID not found. Please go back and try again.')),
      );
      return;
    }
    setState(() => _isLoading = true);

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final authService = authProvider.authService;

      final userCredential = await authService.signInWithOtp(widget.verificationId!, otp);
      final fbUser = userCredential?.user;

      if (fbUser != null) {
        bool isNewUser = userCredential?.additionalUserInfo?.isNewUser ?? false;
        if (widget.isRegistrationFlow && widget.userName != null && widget.userName!.isNotEmpty && isNewUser) {
          try {
            await fbUser.updateDisplayName(widget.userName);
            await fbUser.reload(); // Reload to get updated user info
            // Fetch the potentially updated user from FirebaseAuth instance after reload
            final updatedFbUser = authService.currentFirebaseUser;
            if (updatedFbUser != null) {
                await authProvider.updateUserFromFirebase(updatedFbUser);
            } else {
                // Fallback if currentFirebaseUser is null after reload, though unlikely
                await authProvider.updateUserFromFirebase(fbUser);
            }
          } catch (e) {
            print('Error updating display name: $e');
            // Proceed with original fbUser if display name update fails
            await authProvider.updateUserFromFirebase(fbUser);
          }
        } else {
          await authProvider.updateUserFromFirebase(fbUser);
        }

        if (mounted) {
          // Potentially clear OTP controller
          _otpController.clear();
          Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
        }
      } else {
        if (mounted) {
          _errorController?.add(ErrorAnimationType.shake);
          setState(() => _hasError = true);
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Invalid OTP or verification failed.')),
          );
        }
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  Future<void> _resendOtp() async {
    if (widget.phoneNumber == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Phone number not available to resend OTP.')),
      );
      return;
    }

    setState(() => _isResendingOtp = true);

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final authService = authProvider.authService;

    try {
      await authService.verifyPhoneNumber(
        phoneNumber: widget.phoneNumber!,
        forceResendingToken: widget.forceResendingToken,
        verificationCompleted: (fb_auth.PhoneAuthCredential credential) async {
          // This is for auto-retrieval on resend, which might happen on some devices.
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('OTP auto-verified on resend.')),
          );
          final userCredential = await authService.signInWithPhoneCredential(credential);
          final fbUser = userCredential?.user;
          if (fbUser != null) {
            await authProvider.updateUserFromFirebase(fbUser);
          }
          if (mounted) {
            Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
          }
        },
        verificationFailed: (fb_auth.FirebaseAuthException e) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Failed to resend OTP: ${e.message}')),
          );
        },
        codeSent: (String newVerificationId, int? newResendToken) {
          if (mounted) {
            // Note: OtpScreen's own state for these is not directly mutable if passed by widget.
            // This callback is more for updating the parent/provider if it needs to manage these IDs.
            // For the purpose of this screen, if resend happens, the parent (AuthProvider)
            // would typically re-navigate to OtpScreen with new IDs or update them via a provider.
            // However, for simplicity here, we're just showing a message.
            // If you need to re-use the same OtpScreen instance with new IDs, you'd need a different state management approach.
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('A new OTP has been sent. Please use the new OTP.')),
            );
            // To properly update verificationId and resendToken for the *current* screen instance
            // without re-navigation, you'd need to make them mutable state variables again and
            // update them here. However, passing them via constructor is cleaner if re-navigation occurs.
            // For now, we assume the user will use the new OTP with the existing screen, or re-navigation handles it.
            // If we want to update the current instance's IDs for resend without re-navigation:
            // setState(() {
            //   this.verificationId = newVerificationId; // This would require verificationId to be a state variable
            //   this.forceResendingToken = newResendToken; // Same for forceResendingToken
            // });
            // For now, we'll assume the parent (AuthProvider) handles re-navigation or state update if needed.

            _startResendTimer(); // Restart the timer
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('New OTP sent successfully.')),
            );
          }
        },
        codeAutoRetrievalTimeout: (String newVerificationId) {
          // Similar to codeSent, handling this depends on whether the screen instance is reused or re-navigated.
          if (mounted) {
            // setState(() {
            //   this.verificationId = newVerificationId; // If verificationId were a mutable state variable
            // });
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('OTP auto-retrieval timed out for resend.')),
            );
          }
        },
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error resending OTP: ${e.toString()}')),
      );
    } finally {
      if (mounted) {
        setState(() => _isResendingOtp = false);
      }
    }
  }

  @override
  void dispose() {
    _errorController?.close();
    _resendTimer?.cancel();
    _otpController.dispose();
    cancel(); // For CodeAutoFill mixin (sms_autofill)
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
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
            child: Column(
              children: [
                const SizedBox(height: 24),
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
                  'Verification Code',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: Colors.black87,
                      ),
                ),
                const SizedBox(height: 12),
                Text(
                  'We\'ve sent a verification code to\n${widget.phoneNumber ?? 'your phone'}',
                  // Consider formatting phoneNumber if it includes country code already
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.black54,
                        height: 1.5,
                      ),
                ),
                const SizedBox(height: 40),
                PinCodeTextField(
                  appContext: context,
                  length: 6,
                  controller: _otpController,
                  errorAnimationController: _errorController,
                  keyboardType: TextInputType.number,
                  autoFocus: true,
                  cursorColor: Theme.of(context).colorScheme.primary,
                  animationType: AnimationType.scale,
                  pinTheme: PinTheme(
                    shape: PinCodeFieldShape.box,
                    borderRadius: BorderRadius.circular(12),
                    fieldHeight: 56,
                    fieldWidth: 44,
                    activeFillColor: Colors.white,
                    inactiveFillColor: Colors.grey.shade50,
                    selectedFillColor: Colors.white,
                    activeColor: _hasError
                        ? Colors.red
                        : Theme.of(context).colorScheme.primary,
                    inactiveColor: Colors.grey.shade300,
                    selectedColor: Theme.of(context).colorScheme.primary,
                  ),
                  animationDuration: const Duration(milliseconds: 300),
                  enableActiveFill: true,
                  errorAnimationDuration: 500,
                  onChanged: (value) {
                    setState(() => _hasError = false);
                  },
                  onCompleted: _verifyOtp,
                ),
                const SizedBox(height: 32),
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 0,
                    ),
                    onPressed: _isLoading // Restored: only check _isLoading
                        ? null
                        : () {
                            if (_otpController.text.length == 6) {
                              _verifyOtp(_otpController.text);
                            } else {
                              _errorController?.add(ErrorAnimationType.shake);
                              setState(() => _hasError = true);
                            }
                          },
                    child: _isLoading
                        ? const SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                              strokeWidth: 3,
                              valueColor:
                                  AlwaysStoppedAnimation<Color>(Colors.white),
                            ),
                          )
                        : const Text('Verify Code'),
                  ),
                ),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      _resendTimeout > 0 
                          ? 'Resend OTP in 0:${_resendTimeout.toString().padLeft(2, '0')}' 
                          : 'Didn\'t receive the code?',
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 14,
                      ),
                    ),
                    if (_resendTimeout == 0 && !_isResendingOtp) // Show button only if timer is 0 AND not currently resending
                      TextButton(
                        onPressed: _isLoading || _isResendingOtp // Disable if main verify is loading OR resend is in progress
                            ? null 
                            : _resendOtp,
                        child: Text(
                          'Resend OTP',
                          style: TextStyle(
                            color: Theme.of(context).primaryColor,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                      ),
                    if (_isResendingOtp) // Show loader if resending
                      const Padding(
                        padding: EdgeInsets.only(left: 8.0),
                        child: SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 24),
              ], // Closes Column children
            ), // Closes Column
          ), // Closes Padding
        ), // Closes SingleChildScrollView
      ), // Closes SafeArea
    ); // Closes Scaffold
  }
}
