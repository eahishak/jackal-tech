import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Jackal Tech Ltd.'),
        ),
        body: Center(
          child: Text('Welcome to Jackal Tech Ltd.'),
        ),
      ),
    );
  }
}
