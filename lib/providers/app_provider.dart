import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppProvider extends ChangeNotifier {
  final SharedPreferences _prefs;
  
  AppProvider(this._prefs) {
    _loadSettings();
  }

  // Configurações do app
  bool _isFirstLaunch = true;
  String _language = 'pt';
  bool _notificationsEnabled = true;
  bool _locationEnabled = true;

  // Getters
  bool get isFirstLaunch => _isFirstLaunch;
  String get language => _language;
  bool get notificationsEnabled => _notificationsEnabled;
  bool get locationEnabled => _locationEnabled;

  // Carregar configurações salvas
  void _loadSettings() {
    _isFirstLaunch = _prefs.getBool('is_first_launch') ?? true;
    _language = _prefs.getString('language') ?? 'pt';
    _notificationsEnabled = _prefs.getBool('notifications_enabled') ?? true;
    _locationEnabled = _prefs.getBool('location_enabled') ?? true;
  }

  // Salvar configurações
  Future<void> _saveSettings() async {
    await _prefs.setBool('is_first_launch', _isFirstLaunch);
    await _prefs.setString('language', _language);
    await _prefs.setBool('notifications_enabled', _notificationsEnabled);
    await _prefs.setBool('location_enabled', _locationEnabled);
  }

  // Marcar como não é primeiro lançamento
  void setFirstLaunchCompleted() {
    _isFirstLaunch = false;
    _saveSettings();
    notifyListeners();
  }

  // Alterar idioma
  void setLanguage(String language) {
    _language = language;
    _saveSettings();
    notifyListeners();
  }

  // Alternar notificações
  void toggleNotifications() {
    _notificationsEnabled = !_notificationsEnabled;
    _saveSettings();
    notifyListeners();
  }

  // Alternar localização
  void toggleLocation() {
    _locationEnabled = !_locationEnabled;
    _saveSettings();
    notifyListeners();
  }

  // Resetar configurações
  Future<void> resetSettings() async {
    _isFirstLaunch = true;
    _language = 'pt';
    _notificationsEnabled = true;
    _locationEnabled = true;
    await _saveSettings();
    notifyListeners();
  }
}
