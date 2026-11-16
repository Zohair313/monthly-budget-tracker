import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from './Icon';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

export default function Header({ onOpenSettings }) {
  const { user, logout, themeMode, toggleTheme, demoMode } = useAuth();
  const colors = palette[themeMode];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of Monthly Budget Tracker?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => logout()
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.borderSubtle }]}>
      <View style={styles.leftRow}>
        <View style={[styles.avatarCircle, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
          </Text>
        </View>
        <View style={styles.userTextContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.appTitle, { color: colors.text }]}>Budget Tracker</Text>
            {demoMode && (
              <View style={[styles.demoBadge, { backgroundColor: colors.warningLight }]}>
                <Text style={[styles.demoBadgeText, { color: colors.warning }]}>DEMO</Text>
              </View>
            )}
          </View>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]} numberOfLines={1}>
            {user?.name || user?.email || 'Welcome'}
          </Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={toggleTheme}
          accessibilityLabel="Toggle Theme"
        >
          <Ionicons
            name={themeMode === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={themeMode === 'dark' ? '#FBBF24' : colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={onOpenSettings}
          accessibilityLabel="Server Settings"
        >
          <Ionicons name="settings-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={handleLogout}
          accessibilityLabel="Logout"
        >
          <Ionicons name="log-out-outline" size={18} color={colors.expense} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginRight: 10
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700'
  },
  userTextContainer: {
    flex: 1
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3
  },
  demoBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 6
  },
  demoBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  userEmail: {
    fontSize: 12,
    marginTop: 1
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
