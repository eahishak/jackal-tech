import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

// Hypothetical API endpoint
const String apiUrl = 'https://api.jackaltechltd.com/info';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => InfoProvider(),
      child: JackalTechApp(),
    ),
  );
}

class JackalTechApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jackal Tech Ltd Info',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: InfoScreen(),
    );
  }
}

class InfoProvider extends ChangeNotifier {
  Map<String, dynamic> _info = {};
  bool _isLoading = false;
  bool _hasError = false;

  Map<String, dynamic> get info => _info;
  bool get isLoading => _isLoading;
  bool get hasError => _hasError;

  Future<void> fetchInfo() async {
    _isLoading = true;
    _hasError = false;
    notifyListeners();

    try {
      final response = await http.get(Uri.parse(apiUrl));
      if (response.statusCode == 200) {
        _info = jsonDecode(response.body);
      } else {
        _hasError = true;
      }
    } catch (e) {
      _hasError = true;
    }

    _isLoading = false;
    notifyListeners();
  }
}

class InfoScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final infoProvider = Provider.of<InfoProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Jackal Tech Ltd Info'),
      ),
      body: infoProvider.isLoading
          ? Center(child: CircularProgressIndicator())
          : infoProvider.hasError
              ? Center(child: Text('Error loading information'))
              : ListView(
                  padding: EdgeInsets.all(16.0),
                  children: [
                    Text(
                      'About Us',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    Text(infoProvider.info['aboutUs'] ?? 'N/A'),
                    SizedBox(height: 16),
                    Text(
                      'Services',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    ..._buildServices(infoProvider.info['services']),
                    SizedBox(height: 16),
                    Text(
                      'Team',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    ..._buildTeam(infoProvider.info['team']),
                    SizedBox(height: 16),
                    Text(
                      'Contact',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    _buildContact(infoProvider.info['contact']),
                  ],
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: infoProvider.fetchInfo,
        child: Icon(Icons.refresh),
      ),
    );
  }

  List<Widget> _buildServices(List<dynamic>? services) {
    if (services == null || services.isEmpty) {
      return [Text('No services available')];
    }
    return services.map((service) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Text('• $service'),
      );
    }).toList();
  }

  List<Widget> _buildTeam(List<dynamic>? team) {
    if (team == null || team.isEmpty) {
      return [Text('No team members available')];
    }
    return team.map((member) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Text('• ${member['name']} - ${member['role']}'),
      );
    }).toList();
  }

  Widget _buildContact(Map<String, dynamic>? contact) {
    if (contact == null) {
      return Text('No contact information available');
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Phone: ${contact['phone']}'),
        SizedBox(height: 4),
        Text('Email: ${contact['email']}'),
        SizedBox(height: 4),
        Text('Address: ${contact['address']}'),
      ],
    );
  }
}


import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

// Hypothetical API endpoint
const String apiUrl = 'https://api.jackaltechltd.com/info';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => InfoProvider(),
      child: JackalTechApp(),
    ),
  );
}

class JackalTechApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jackal Tech Ltd Info',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: InfoScreen(),
    );
  }
}

class InfoProvider extends ChangeNotifier {
  Map<String, dynamic> _info = {};
  bool _isLoading = false;
  bool _hasError = false;

  Map<String, dynamic> get info => _info;
  bool get isLoading => _isLoading;
  bool get hasError => _hasError;

  Future<void> fetchInfo() async {
    _isLoading = true;
    _hasError = false;
    notifyListeners();

    try {
      final response = await http.get(Uri.parse(apiUrl));
      if (response.statusCode == 200) {
        _info = jsonDecode(response.body);
      } else {
        _hasError = true;
      }
    } catch (e) {
      _hasError = true;
    }

    _isLoading = false;
    notifyListeners();
  }
}

class InfoScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final infoProvider = Provider.of<InfoProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Jackal Tech Ltd Info'),
      ),
      body: infoProvider.isLoading
          ? Center(child: CircularProgressIndicator())
          : infoProvider.hasError
              ? Center(child: Text('Error loading information'))
              : ListView(
                  padding: EdgeInsets.all(16.0),
                  children: [
                    Text(
                      'About Us',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    Text(infoProvider.info['aboutUs'] ?? 'N/A'),
                    SizedBox(height: 16),
                    Text(
                      'Services',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    ..._buildServices(infoProvider.info['services']),
                    SizedBox(height: 16),
                    Text(
                      'Team',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    ..._buildTeam(infoProvider.info['team']),
                    SizedBox(height: 16),
                    Text(
                      'Contact',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    _buildContact(infoProvider.info['contact']),
                  ],
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: infoProvider.fetchInfo,
        child: Icon(Icons.refresh),
      ),
    );
  }

  List<Widget> _buildServices(List<dynamic>? services) {
    if (services == null || services.isEmpty) {
      return [Text('No services available')];
    }
    return services.map((service) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Text('• $service'),
      );
    }).toList();
  }

  List<Widget> _buildTeam(List<dynamic>? team) {
    if (team == null || team.isEmpty) {
      return [Text('No team members available')];
    }
    return team.map((member) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Text('• ${member['name']} - ${member['role']}'),
      );
    }).toList();
  }

  Widget _buildContact(Map<String, dynamic>? contact) {
    if (contact == null) {
      return Text('No contact information available');
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Phone: ${contact['phone']}'),
        SizedBox(height: 4),
        Text('Email: ${contact['email']}'),
        SizedBox(height: 4),
        Text('Address: ${contact['address']}'),
      ],
    );
  }
}








import 'package:shared_preferences/shared_preferences.dart';

class InfoProvider extends ChangeNotifier {
  Map<String, dynamic> _info = {};
  bool _isLoading = false;
  bool _hasError = false;

  Map<String, dynamic> get info => _info;
  bool get isLoading => _isLoading;
  bool get hasError => _hasError;

  InfoProvider() {
    _loadInfoFromCache();
  }

  Future<void> fetchInfo() async {
    _isLoading = true;
    _hasError = false;
    notifyListeners();

    try {
      final response = await http.get(Uri.parse(apiUrl));
      if (response.statusCode == 200) {
        _info = jsonDecode(response.body);
        _cacheInfo(_info);
      } else {
        _hasError = true;
      }
    } catch (e) {
      _hasError = true;
    }

    _isLoading = false;
    notifyListeners();
  }

  Future<void> _cacheInfo(Map<String, dynamic> info) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('info', jsonEncode(info));
  }

  Future<void> _loadInfoFromCache() async {
    final prefs = await SharedPreferences.getInstance();
    final infoString = prefs.getString('info');
    if (infoString != null) {
      _info = jsonDecode(infoString);
      notifyListeners();
    }
  }
}





class JackalTechApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jackal Tech Ltd Info',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.light,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
      ),
      themeMode: ThemeMode.system, // Use system theme mode
      home: InfoScreen(),
    );
  }
}



class InfoScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final infoProvider = Provider.of<InfoProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Jackal Tech Ltd Info'),
      ),
      body: infoProvider.isLoading
          ? Center(child: CircularProgressIndicator())
          : infoProvider.hasError
              ? Center(child: Text('Error loading information'))
              : ListView(
                  padding: EdgeInsets.all(16.0),
                  children: [
                    _buildSectionHeader('About Us'),
                    _buildSectionContent(infoProvider.info['aboutUs'] ?? 'N/A'),
                    _buildSectionHeader('Services'),
                    ..._buildServices(infoProvider.info['services']),
                    _buildSectionHeader('Team'),
                    ..._buildTeam(infoProvider.info['team']),
                    _buildSectionHeader('Contact'),
                    _buildContact(infoProvider.info['contact']),
                  ],
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: infoProvider.fetchInfo,
        child: Icon(Icons.refresh),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16.0),
      child: Text(
        title,
        style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildSectionContent(String content) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        content,
        style: TextStyle(fontSize: 16),
      ),
    );
  }

  List<Widget> _buildServices(List<dynamic>? services) {
    if (services == null || services.isEmpty) {
      return [Text('No services available')];
    }
    return services.map((service) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Text('• $service'),
      );
    }).toList();
  }

  List<Widget> _buildTeam(List<dynamic>? team) {
    if (team == null || team.isEmpty) {
      return [Text('No team members available')];
    }
    return team.map((member) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Text('• ${member['name']} - ${member['role']}'),
      );
    }).toList();
  }

  Widget _buildContact(Map<String, dynamic>? contact) {
    if (contact == null) {
      return Text('No contact information available');
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Phone: ${contact['phone']}'),
        SizedBox(height: 4),
        Text('Email: ${contact['email']}'),
        SizedBox(height: 4),
        Text('Address: ${contact['address']}'),
      ],
    );
  }
}
