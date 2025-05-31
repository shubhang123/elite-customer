import 'dart:convert';

class User {
  final String id;
  final String name;
  final String phone;
  final String? email;
  final String? avatar;

  User({
    required this.id,
    required this.name,
    required this.phone,
    this.email,
    this.avatar,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'email': email,
      'avatar': avatar,
    };
  }

  static User fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      phone: json['phone'],
      email: json['email'],
      avatar: json['avatar'],
    );
  }
}
