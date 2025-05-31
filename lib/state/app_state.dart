import 'package:flutter/material.dart';
import '../models/user_profile.dart';
import '../models/job_summary.dart';
import '../models/progress_step.dart';
import '../models/payment_summary.dart';
import '../models/payment_entry.dart';
import '../models/notification_entry.dart';
import '../models/chat_message.dart';
import '../models/feature_card.dart';

class AppState extends ChangeNotifier {
  // User
  UserProfile? user;

  // Home
  JobSummary? jobSummary;
  List<FeatureCardModel> features = [];

  // Progress
  List<ProgressStep> progressSteps = [];

  // Payments
  PaymentSummary? paymentSummary;
  List<PaymentEntry> paymentHistory = [];

  // Notifications
  List<NotificationEntry> notifications = [];

  // Chat
  List<ChatMessage> chatMessages = [];
  String jobId = '';

  // Load mock data (for demo/testing)
  void loadMockData() {
    user = UserProfile(name: 'John Doe', phone: '+91 9876543210');
    jobSummary =
        JobSummary(status: 'In Production', estimatedDelivery: '30 May 2025');
    features = [
      FeatureCardModel(
          icon: Icons.timeline, label: 'Track Progress', route: '/track'),
      FeatureCardModel(
          icon: Icons.chat_bubble_outline,
          label: 'Chat with Designer',
          route: '/chat'),
      FeatureCardModel(
          icon: Icons.payment, label: 'View Payments', route: '/payments'),
      FeatureCardModel(
          icon: Icons.notifications,
          label: 'Notifications',
          route: '/notifications'),
    ];
    progressSteps = [
      ProgressStep(
          label: 'Design Uploaded',
          date: '25 May 2025',
          status: ProgressStatus.done,
          description:
              'Initial design concept uploaded for your review. Please check the design in the chat section.',
          estimatedDuration: const Duration(days: 1)),
      ProgressStep(
          label: 'Awaiting Feedback',
          date: '26 May 2025',
          status: ProgressStatus.done,
          description:
              'Design review completed. Your feedback has been incorporated into the updated design.',
          estimatedDuration: const Duration(days: 2)),
      ProgressStep(
          label: 'Payment Pending',
          date: '28 May 2025',
          status: ProgressStatus.inprogress,
          description:
              'Awaiting payment confirmation. Once payment is received, production will begin.',
          estimatedDuration: const Duration(days: 1)),
      ProgressStep(
          label: 'In Production',
          date: '30 May 2025',
          status: ProgressStatus.pending,
          description:
              'Final design will be produced according to approved specifications.',
          estimatedDuration: const Duration(days: 3)),
      ProgressStep(
          label: 'Out for Delivery', date: '—', status: ProgressStatus.pending),
    ];
    paymentSummary = PaymentSummary(total: 25000, paid: 15000, due: 10000);
    paymentHistory = [
      PaymentEntry(
          date: '25 May 2025', amount: 10000, status: PaymentStatus.paid),
      PaymentEntry(
          date: '27 May 2025', amount: 5000, status: PaymentStatus.paid),
      PaymentEntry(
          date: '30 May 2025', amount: 10000, status: PaymentStatus.due),
    ];
    notifications = [
      NotificationEntry(
          icon: Icons.design_services,
          message: 'New Design Uploaded',
          date: '28 May 2025, 10:00 AM'),
      NotificationEntry(
          icon: Icons.payment,
          message: 'Payment Reminder',
          date: '27 May 2025, 09:00 AM'),
      NotificationEntry(
          icon: Icons.local_shipping,
          message: 'Order Out for Delivery',
          date: '26 May 2025, 05:00 PM'),
    ];
    chatMessages = [
      ChatMessage(
        id: '1',
        text: 'Hi, can I see the latest design?',
        sender: MessageSender.customer,
        timestamp: DateTime.now().subtract(const Duration(minutes: 10)),
      ),
      ChatMessage(
        id: '2',
        text: 'Sure! Please see the attached.',
        sender: MessageSender.designer,
        timestamp: DateTime.now().subtract(const Duration(minutes: 9)),
      ),
      ChatMessage(
        id: '3',
        text: '',
        sender: MessageSender.designer,
        timestamp: DateTime.now().subtract(const Duration(minutes: 9)),
        imageUrl: 'assets/logo.png',
        isDesignPreview: true,
      ),
      ChatMessage(
        id: '4',
        text: 'Looks great!',
        sender: MessageSender.customer,
        timestamp: DateTime.now().subtract(const Duration(minutes: 8)),
      ),
    ];
    jobId = 'JOB12345';
    notifyListeners();
  }

  // User actions
  void updateUser(UserProfile newUser) {
    user = newUser;
    notifyListeners();
  }

  void logout() {
    user = null;
    jobSummary = null;
    features = [];
    progressSteps = [];
    paymentSummary = null;
    paymentHistory = [];
    notifications = [];
    chatMessages = [];
    jobId = '';
    notifyListeners();
  }

  // Job summary actions
  void updateJobSummary(JobSummary summary) {
    jobSummary = summary;
    notifyListeners();
  }

  // Progress actions
  void setProgressSteps(List<ProgressStep> steps) {
    progressSteps = steps;
    notifyListeners();
  }

  void addProgressStep(ProgressStep step) {
    progressSteps.add(step);
    notifyListeners();
  }

  void updateProgressStep(int index, ProgressStep step) {
    if (index >= 0 && index < progressSteps.length) {
      progressSteps[index] = step;
      notifyListeners();
    }
  }

  void removeProgressStep(int index) {
    if (index >= 0 && index < progressSteps.length) {
      progressSteps.removeAt(index);
      notifyListeners();
    }
  }

  // Payment actions
  void updatePaymentSummary(PaymentSummary summary) {
    paymentSummary = summary;
    notifyListeners();
  }

  void setPaymentHistory(List<PaymentEntry> history) {
    paymentHistory = history;
    notifyListeners();
  }

  void addPaymentEntry(PaymentEntry entry) {
    paymentHistory.add(entry);
    notifyListeners();
  }

  void updatePaymentEntry(int index, PaymentEntry entry) {
    if (index >= 0 && index < paymentHistory.length) {
      paymentHistory[index] = entry;
      notifyListeners();
    }
  }

  void removePaymentEntry(int index) {
    if (index >= 0 && index < paymentHistory.length) {
      paymentHistory.removeAt(index);
      notifyListeners();
    }
  }

  // Notification actions
  void setNotifications(List<NotificationEntry> list) {
    notifications = list;
    notifyListeners();
  }

  void addNotification(NotificationEntry entry) {
    notifications.insert(0, entry);
    notifyListeners();
  }

  void removeNotification(int index) {
    if (index >= 0 && index < notifications.length) {
      notifications.removeAt(index);
      notifyListeners();
    }
  }

  // Chat actions
  void setChatMessages(List<ChatMessage> list) {
    chatMessages = list;
    notifyListeners();
  }

  void addChatMessage(ChatMessage message) {
    chatMessages.add(message);
    notifyListeners();
  }

  void removeChatMessage(int index) {
    if (index >= 0 && index < chatMessages.length) {
      chatMessages.removeAt(index);
      notifyListeners();
    }
  }

  void setJobId(String id) {
    jobId = id;
    notifyListeners();
  }

  // Feature cards actions
  void setFeatures(List<FeatureCardModel> list) {
    features = list;
    notifyListeners();
  }
}
