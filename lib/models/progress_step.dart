class ProgressStep {
  final String label;
  final String date;
  final ProgressStatus status;
  final String description;
  final Duration? estimatedDuration;

  ProgressStep({
    required this.label,
    required this.date,
    required this.status,
    this.description = '',
    this.estimatedDuration,
  });

  String get statusDescription {
    switch (status) {
      case ProgressStatus.done:
        return 'Completed';
      case ProgressStatus.inprogress:
        return 'In Progress';
      case ProgressStatus.pending:
        return 'Pending';
    }
  }
}

enum ProgressStatus { done, inprogress, pending }
