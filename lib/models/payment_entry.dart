enum PaymentStatus { paid, due }

class PaymentEntry {
  final String date;
  final int amount;
  final PaymentStatus status;

  PaymentEntry(
      {required this.date, required this.amount, required this.status});
}
