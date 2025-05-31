import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import '../../state/app_state.dart';
import '../../models/chat_message.dart';
import '../../widgets/app_bar_with_notifications.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final jobId = appState.jobId;
    final messages = appState.chatMessages;

    // Scroll to bottom when new messages are added
    WidgetsBinding.instance.addPostFrameCallback((_) => _scrollToBottom());

    return Scaffold(
      appBar: AppBarWithNotifications(
        title: 'Chat with Designer',
        additionalActions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Text(
              jobId,
              style: const TextStyle(color: Colors.grey, fontSize: 12),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: messages.length,
              itemBuilder: (context, i) {
                final msg = messages[i];
                final widget = msg.isDesignPreview && msg.imageUrl != null
                    ? _DesignPreview(
                        imageUrl: msg.imageUrl!,
                        onApprove: () {
                          appState.addChatMessage(
                            ChatMessage(
                              id: DateTime.now()
                                  .millisecondsSinceEpoch
                                  .toString(),
                              text: 'Design approved',
                              sender: MessageSender.customer,
                              timestamp: DateTime.now(),
                            ),
                          );
                        },
                        onRequestChanges: () {
                          appState.addChatMessage(
                            ChatMessage(
                              id: DateTime.now()
                                  .millisecondsSinceEpoch
                                  .toString(),
                              text: 'Changes requested',
                              sender: MessageSender.customer,
                              timestamp: DateTime.now(),
                            ),
                          );
                        },
                      )
                    : _ChatBubble(
                        isMe: msg.sender == MessageSender.customer,
                        text: msg.text,
                        timestamp: msg.timestamp,
                      );

                return AnimatedSlide(
                  offset: const Offset(0, 0),
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeOutQuad,
                  child: AnimatedOpacity(
                    opacity: 1.0,
                    duration: const Duration(milliseconds: 300),
                    child: widget,
                  ),
                );
              },
            ),
          ),
          _ChatInput(
            onMessageSent: (_) => _scrollToBottom(),
          ),
        ],
      ),
    );
  }
}

class _ChatBubble extends StatelessWidget {
  final bool isMe;
  final String text;
  final DateTime? timestamp;
  const _ChatBubble({
    required this.isMe,
    required this.text,
    this.timestamp,
  });

  String _formatTime(DateTime time) {
    return '${time.hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Column(
        crossAxisAlignment:
            isMe ? CrossAxisAlignment.end : CrossAxisAlignment.start,
        children: [
          Container(
            margin: const EdgeInsets.symmetric(vertical: 4),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: isMe ? const Color(0xFF2575FC) : Colors.grey[200],
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            constraints: BoxConstraints(
              maxWidth: MediaQuery.of(context).size.width * 0.7,
            ),
            child: Text(
              text,
              style: TextStyle(
                color: isMe ? Colors.white : Colors.black87,
                fontSize: 16,
              ),
            ),
          ),
          if (timestamp != null)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              child: Text(
                _formatTime(timestamp!),
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _DesignPreview extends StatefulWidget {
  final String imageUrl;
  final VoidCallback onApprove;
  final VoidCallback onRequestChanges;
  const _DesignPreview({
    required this.imageUrl,
    required this.onApprove,
    required this.onRequestChanges,
  });

  @override
  State<_DesignPreview> createState() => _DesignPreviewState();
}

class _DesignPreviewState extends State<_DesignPreview>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1, end: 1.05).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggleExpanded() {
    setState(() {
      _isExpanded = !_isExpanded;
      if (_isExpanded) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 16),
        GestureDetector(
          onTap: _toggleExpanded,
          child: ScaleTransition(
            scale: _scaleAnimation,
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Stack(
                children: [
                  Hero(
                    tag: widget.imageUrl,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: widget.imageUrl.startsWith('http')
                          ? Image.network(
                              widget.imageUrl,
                              height: _isExpanded ? 300 : 180,
                              width: double.infinity,
                              fit: BoxFit.cover,
                            )
                          : Image.file(
                              File(widget.imageUrl),
                              height: _isExpanded ? 300 : 180,
                              width: double.infinity,
                              fit: BoxFit.cover,
                            ),
                    ),
                  ),
                  Positioned(
                    top: 8,
                    right: 8,
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.5),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        _isExpanded ? Icons.zoom_out : Icons.zoom_in,
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                onPressed: widget.onApprove,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                icon: const Icon(Icons.check, color: Colors.white),
                label: const Text('Approve', style: TextStyle(fontSize: 16)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: widget.onRequestChanges,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                icon: const Icon(Icons.edit, color: Colors.white),
                label: const Text('Request Changes',
                    style: TextStyle(fontSize: 16)),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _ChatInput extends StatefulWidget {
  final Function(String) onMessageSent;
  const _ChatInput({required this.onMessageSent});

  @override
  State<_ChatInput> createState() => _ChatInputState();
}

class _ChatInputState extends State<_ChatInput>
    with SingleTickerProviderStateMixin {
  final TextEditingController _controller = TextEditingController();
  bool _isSending = false;
  bool _isComposing = false;
  late AnimationController _sendButtonController;
  late Animation<double> _sendButtonAnimation;

  Future<void> _pickImage(ImageSource source) async {
    final ImagePicker picker = ImagePicker();
    try {
      final XFile? image = await picker.pickImage(
        source: source,
        imageQuality: 70,
        maxWidth: 1200,
      );
      if (image != null && mounted) {
        final String imagePath = image.path;
        final appState = Provider.of<AppState>(context, listen: false);
        setState(() => _isSending = true);
        await Future.delayed(const Duration(milliseconds: 500));
        appState.addChatMessage(ChatMessage(
          id: DateTime.now().millisecondsSinceEpoch.toString(),
          text: '',
          sender: MessageSender.customer,
          timestamp: DateTime.now(),
          imageUrl: imagePath,
          isDesignPreview: true,
        ));
        widget.onMessageSent('');
        setState(() => _isSending = false);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to pick image: ${e.toString()}')),
        );
      }
    }
  }

  @override
  void initState() {
    super.initState();
    _sendButtonController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _sendButtonAnimation = CurvedAnimation(
      parent: _sendButtonController,
      curve: Curves.easeIn,
    );
    _controller.addListener(_handleTextChanged);
  }

  @override
  void dispose() {
    _controller.removeListener(_handleTextChanged);
    _controller.dispose();
    _sendButtonController.dispose();
    super.dispose();
  }

  void _handleTextChanged() {
    final isComposing = _controller.text.isNotEmpty;
    if (isComposing != _isComposing) {
      setState(() {
        _isComposing = isComposing;
      });
      if (isComposing) {
        _sendButtonController.forward();
      } else {
        _sendButtonController.reverse();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context, listen: false);
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _controller,
                decoration: InputDecoration(
                  hintText: 'Type a message...',
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(24)),
                  contentPadding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 0),
                ),
              ),
            ),
            IconButton(
              icon: const Icon(Icons.image, color: Color(0xFF2575FC)),
              onPressed: () {
                showModalBottomSheet(
                  context: context,
                  backgroundColor: Colors.white,
                  shape: const RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.vertical(top: Radius.circular(20)),
                  ),
                  builder: (context) => SafeArea(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        ListTile(
                          leading: const Icon(Icons.camera_alt,
                              color: Color(0xFF2575FC)),
                          title: const Text('Take Photo'),
                          onTap: () async {
                            Navigator.pop(context);
                            await _pickImage(ImageSource.camera);
                          },
                        ),
                        ListTile(
                          leading: const Icon(Icons.photo_library,
                              color: Color(0xFF2575FC)),
                          title: const Text('Choose from Gallery'),
                          onTap: () async {
                            Navigator.pop(context);
                            await _pickImage(ImageSource.gallery);
                          },
                        ),
                        const SizedBox(height: 8),
                      ],
                    ),
                  ),
                );
              },
            ),
            ScaleTransition(
              scale: _sendButtonAnimation,
              child: IconButton(
                icon: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 200),
                  transitionBuilder: (child, animation) => ScaleTransition(
                    scale: animation,
                    child: child,
                  ),
                  child: _isSending
                      ? const SizedBox(
                          width: 24,
                          height: 24,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor:
                                AlwaysStoppedAnimation(Color(0xFF2575FC)),
                          ),
                        )
                      : const Icon(
                          Icons.send,
                          color: Color(0xFF2575FC),
                          key: ValueKey('send'),
                        ),
                ),
                onPressed: (!_isComposing || _isSending)
                    ? null
                    : () async {
                        if (_controller.text.trim().isEmpty) return;
                        setState(() => _isSending = true);
                        await Future.delayed(const Duration(milliseconds: 500));
                        appState.addChatMessage(ChatMessage(
                          id: DateTime.now().millisecondsSinceEpoch.toString(),
                          text: _controller.text.trim(),
                          sender: MessageSender.customer,
                          timestamp: DateTime.now(),
                        ));
                        widget.onMessageSent(_controller.text.trim());
                        _controller.clear();
                        setState(() {
                          _isSending = false;
                          _isComposing = false;
                        });
                        _sendButtonController.reverse();
                      },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
