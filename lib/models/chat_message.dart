enum MessageSender { customer, designer }

class ChatMessage {
  final String id;
  final String text;
  final MessageSender sender;
  final DateTime timestamp;
  final String? imageUrl;
  final bool isDesignPreview;

  ChatMessage({
    required this.id,
    required this.text,
    required this.sender,
    required this.timestamp,
    this.imageUrl,
    this.isDesignPreview = false,
  });
}
