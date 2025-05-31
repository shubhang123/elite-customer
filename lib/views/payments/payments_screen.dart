import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../state/app_state.dart';
import '../../models/payment_summary.dart';
import '../../models/payment_entry.dart';
import '../../widgets/app_bar_with_notifications.dart';

class PaymentsScreen extends StatelessWidget {
  const PaymentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final paymentSummary = appState.paymentSummary;
    final paymentHistory = appState.paymentHistory;
    return Scaffold(
      appBar: const AppBarWithNotifications(title: 'Payment Summary'),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (paymentSummary != null)
              Card(
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16)),
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _SummaryItem(
                          label: 'Total', value: '₹${paymentSummary.total}'),
                      _SummaryItem(
                          label: 'Paid', value: '₹${paymentSummary.paid}'),
                      _SummaryItem(
                          label: 'Due', value: '₹${paymentSummary.due}'),
                    ],
                  ),
                ),
              ),
            const SizedBox(height: 28),
            const Text('Payment History',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Expanded(
              child: ListView.separated(
                itemCount: paymentHistory.length,
                separatorBuilder: (context, i) => const Divider(),
                itemBuilder: (context, i) {
                  final entry = paymentHistory[i];
                  return ListTile(
                    leading: Icon(
                      entry.status == PaymentStatus.paid
                          ? Icons.check_circle
                          : Icons.error,
                      color: entry.status == PaymentStatus.paid
                          ? Colors.green
                          : Colors.red,
                    ),
                    title: Text('₹${entry.amount}'),
                    subtitle: Text(entry.date),
                    trailing: Text(
                      entry.status == PaymentStatus.paid ? 'Paid' : 'Due',
                      style: TextStyle(
                          color: entry.status == PaymentStatus.paid
                              ? Colors.green
                              : Colors.red),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                      title: const Text('Pay Now'),
                      content:
                          const Text('Online payment integration coming soon.'),
                      actions: [
                        TextButton(
                            onPressed: () => Navigator.pop(context),
                            child: const Text('OK'))
                      ],
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2575FC)),
                child: const Text('Pay Now',
                    style: TextStyle(fontSize: 16, color: Colors.white)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SummaryItem extends StatelessWidget {
  final String label;
  final String value;
  const _SummaryItem({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(label, style: const TextStyle(fontSize: 14, color: Colors.grey)),
        const SizedBox(height: 4),
        Text(value,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
      ],
    );
  }
}
