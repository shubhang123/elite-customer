import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/feature_card.dart';
import '../../models/user_profile.dart';
import '../../models/job_summary.dart';
import '../../state/app_state.dart';
import '../../layouts/main_layout.dart';
import '../../widgets/app_bar_with_notifications.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final user = appState.user;
    final jobSummary = appState.jobSummary;
    final features = appState.features;

    return Scaffold(
      appBar: AppBarWithNotifications(
        title: '',
        showBackButton: false,
        additionalActions: [
          Padding(
            padding: const EdgeInsets.only(left: 16.0),
            child: Image.asset('assets/logo.png', height: 32),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (user != null)
              Text('Hello, ${user.name}',
                  style: const TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 20),
            if (jobSummary != null)
              Card(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16)),
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Order Status',
                              style: TextStyle(
                                  fontSize: 18, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 8),
                          Text(jobSummary.status,
                              style: const TextStyle(
                                  fontSize: 16, color: Colors.blue)),
                          const SizedBox(height: 8),
                          Text('Est. Delivery: ${jobSummary.estimatedDelivery}',
                              style: const TextStyle(
                                  fontSize: 14, color: Colors.grey)),
                        ],
                      ),
                      const Icon(Icons.local_shipping,
                          size: 40, color: Color(0xFF2575FC)),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 28),
            if (features.isNotEmpty)
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                childAspectRatio: 1.2,
                children: features
                    .map((feature) => _FeatureCard(feature: feature))
                    .toList(),
              ),
          ],
        ),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final FeatureCardModel feature;
  const _FeatureCard({required this.feature});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => MainLayout.navigateToIndex(context, feature.route),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        elevation: 2,
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(feature.icon, size: 36, color: const Color(0xFF2575FC)),
              const SizedBox(height: 12),
              Text(feature.label,
                  style: const TextStyle(
                      fontSize: 15, fontWeight: FontWeight.w500)),
            ],
          ),
        ),
      ),
    );
  }
}
