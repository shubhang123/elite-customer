import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:timeline_tile/timeline_tile.dart';
import '../../state/app_state.dart';
import '../../models/progress_step.dart';
import '../../widgets/app_bar_with_notifications.dart';

class ProgressScreen extends StatefulWidget {
  const ProgressScreen({super.key});

  @override
  State<ProgressScreen> createState() => _ProgressScreenState();
}

class _ProgressScreenState extends State<ProgressScreen> {
  final _scrollController = ScrollController();
  bool _hasShownAnimation = false;

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  Color _getStatusColor(ProgressStatus status) {
    switch (status) {
      case ProgressStatus.done:
        return Colors.green;
      case ProgressStatus.inprogress:
        return const Color(0xFF2575FC);
      default:
        return Colors.grey;
    }
  }

  IconData _getStatusIcon(ProgressStatus status) {
    switch (status) {
      case ProgressStatus.done:
        return Icons.check_circle;
      case ProgressStatus.inprogress:
        return Icons.pending;
      default:
        return Icons.radio_button_unchecked;
    }
  }

  String _formatDuration(Duration duration) {
    final days = duration.inDays;
    return '$days day${days > 1 ? 's' : ''}';
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final steps = appState.progressSteps;
    final currentStep = steps.firstWhere(
      (step) => step.status == ProgressStatus.inprogress,
      orElse: () => steps.last,
    );

    final totalDuration = steps.fold<Duration>(
      Duration.zero,
      (prev, step) => prev + (step.estimatedDuration ?? Duration.zero),
    );
    final completedDuration =
        steps.where((s) => s.status == ProgressStatus.done).fold<Duration>(
              Duration.zero,
              (prev, step) => prev + (step.estimatedDuration ?? Duration.zero),
            );
    final progress =
        completedDuration.inMilliseconds / totalDuration.inMilliseconds;

    return Scaffold(
      appBar: const AppBarWithNotifications(title: 'Order Progress'),
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Current Status Card
              Container(
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF2575FC), Color(0xFF6A11CB)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF2575FC).withOpacity(0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(
                            _getStatusIcon(currentStep.status),
                            color: Colors.white,
                            size: 32,
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Current Status',
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.white70,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  currentStep.label,
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: LinearProgressIndicator(
                          value: progress,
                          backgroundColor: Colors.white24,
                          valueColor:
                              const AlwaysStoppedAnimation<Color>(Colors.white),
                          minHeight: 8,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Estimated completion: ${_formatDuration(totalDuration)}',
                        style: const TextStyle(
                          fontSize: 14,
                          color: Colors.white70,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),
              // Timeline Steps
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: steps.length,
                itemBuilder: (context, index) {
                  final step = steps[index];
                  return _TimelineStep(
                    isFirst: index == 0,
                    isLast: index == steps.length - 1,
                    step: step,
                    animationDelay: Duration(milliseconds: index * 200),
                    hasShownAnimation: _hasShownAnimation,
                    onAnimationComplete: () {
                      if (index == steps.length - 1) {
                        setState(() => _hasShownAnimation = true);
                      }
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TimelineStep extends StatefulWidget {
  final bool isFirst;
  final bool isLast;
  final ProgressStep step;
  final Duration animationDelay;
  final bool hasShownAnimation;
  final VoidCallback onAnimationComplete;

  const _TimelineStep({
    required this.isFirst,
    required this.isLast,
    required this.step,
    required this.animationDelay,
    required this.hasShownAnimation,
    required this.onAnimationComplete,
  });

  @override
  State<_TimelineStep> createState() => _TimelineStepState();
}

class _TimelineStepState extends State<_TimelineStep>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0.3, 0),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutQuad,
    ));

    if (!widget.hasShownAnimation) {
      Future.delayed(widget.animationDelay, () {
        if (mounted) {
          _controller.forward().then((_) => widget.onAnimationComplete());
        }
      });
    } else {
      _controller.value = 1.0;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Color _getStatusColor(ProgressStatus status) {
    switch (status) {
      case ProgressStatus.done:
        return Colors.green;
      case ProgressStatus.inprogress:
        return const Color(0xFF2575FC);
      default:
        return Colors.grey;
    }
  }

  IconData _getStatusIcon(ProgressStatus status) {
    switch (status) {
      case ProgressStatus.done:
        return Icons.check_circle;
      case ProgressStatus.inprogress:
        return Icons.pending_outlined;
      default:
        return Icons.radio_button_unchecked;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _getStatusColor(widget.step.status);
    final icon = _getStatusIcon(widget.step.status);

    return FadeTransition(
      opacity: _fadeAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: InkWell(
          onTap: () => setState(() => _isExpanded = !_isExpanded),
          child: Container(
            decoration: BoxDecoration(
              color: _isExpanded ? color.withOpacity(0.05) : null,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              children: [
                SizedBox(
                  height: 100,
                  child: TimelineTile(
                    isFirst: widget.isFirst,
                    isLast: widget.isLast,
                    beforeLineStyle: LineStyle(
                      color: widget.step.status == ProgressStatus.done
                          ? Colors.green
                          : Colors.grey.shade300,
                    ),
                    indicatorStyle: IndicatorStyle(
                      width: 30,
                      height: 30,
                      indicator: _CustomIndicator(
                        color: color,
                        icon: icon,
                      ),
                      drawGap: true,
                    ),
                    endChild: Padding(
                      padding: const EdgeInsets.only(left: 16),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  widget.step.label,
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: widget.step.status ==
                                            ProgressStatus.inprogress
                                        ? const Color(0xFF2575FC)
                                        : Colors.black87,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  widget.step.date,
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey[600],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          if (widget.step.description.isNotEmpty)
                            AnimatedRotation(
                              turns: _isExpanded ? 0.5 : 0,
                              duration: const Duration(milliseconds: 300),
                              child: Icon(
                                Icons.keyboard_arrow_down,
                                color: color,
                              ),
                            ),
                          const SizedBox(width: 16),
                        ],
                      ),
                    ),
                  ),
                ),
                if (_isExpanded && widget.step.description.isNotEmpty)
                  Container(
                    margin:
                        const EdgeInsets.only(left: 56, right: 16, bottom: 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(0.1),
                                blurRadius: 4,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 8,
                                      vertical: 4,
                                    ),
                                    decoration: BoxDecoration(
                                      color: color.withOpacity(0.1),
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Text(
                                      widget.step.statusDescription,
                                      style: TextStyle(
                                        color: color,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ),
                                  if (widget.step.estimatedDuration !=
                                      null) ...[
                                    const SizedBox(width: 8),
                                    Icon(Icons.timer_outlined,
                                        size: 14, color: Colors.grey[600]),
                                    const SizedBox(width: 4),
                                    Text(
                                      '${widget.step.estimatedDuration!.inDays} days',
                                      style: TextStyle(
                                        color: Colors.grey[600],
                                        fontSize: 12,
                                      ),
                                    ),
                                  ],
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                widget.step.description,
                                style: const TextStyle(
                                  color: Colors.black87,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CustomIndicator extends StatelessWidget {
  final Color color;
  final IconData icon;

  const _CustomIndicator({
    required this.color,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        border: Border.all(
          color: color,
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.2),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Icon(
        icon,
        color: color,
        size: 20,
      ),
    );
  }
}
