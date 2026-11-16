import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from './Icon';
import { useAuth } from '../context/AuthContext';
import { palette, getClayPill } from '../theme/colors';

export default function Header({ onOpenSettings }) {
  const { user, logout, themeMode, toggleTheme, demoMode } = useAuth();
  const colors = palette[themeMode] || palette.dark;
  const clayPill = getClayPill(themeMode);

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.clayBorderBottom,
          shadowColor: colors.clayShadowColor
        }
      ]}
    >
      <View style={styles.leftRow}>
        <View
          style={[
            styles.avatarCircle,
            {
              backgroundColor: colors.primary,
              borderTopColor: 'rgba(255, 255, 255, 0.45)',
              borderBottomColor: colors.primaryDark,
              shadowColor: colors.primaryDark
            }
          ]}
        >
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
          </Text>
        </View>
        <View style={styles.userTextContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.appTitle, { color: colors.text }]}>Budget Tracker</Text>
            {demoMode && (
              <View
                style={[
                  styles.demoBadge,
                  clayPill,
                  {
                    backgroundColor: colors.warningLight,
                    borderBottomColor: colors.warningDark
                  }
                ]}
              >
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
          style={[
            styles.clayIconButton,
            {
              backgroundColor: colors.surfaceSubtle,
              borderTopColor: colors.clayBorderTop,
              borderLeftColor: colors.clayBorderLeft,
              borderRightColor: colors.clayBorderRight,
              borderBottomColor: colors.clayBorderBottom,
              shadowColor: colors.clayShadowColor
            }
          ]}
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
          style={[
            styles.clayIconButton,
            {
              backgroundColor: colors.surfaceSubtle,
              borderTopColor: colors.clayBorderTop,
              borderLeftColor: colors.clayBorderLeft,
              borderRightColor: colors.clayBorderRight,
              borderBottomColor: colors.clayBorderBottom,
              shadowColor: colors.clayShadowColor
            }
          ]}
          onPress={onOpenSettings}
          accessibilityLabel="Server Settings"
        >
          <Ionicons name="settings-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.clayIconButton,
            {
              backgroundColor: colors.expenseLight,
              borderTopColor: 'rgba(255, 255, 255, 0.35)',
              borderLeftColor: 'rgba(255, 255, 255, 0.2)',
              borderRightColor: colors.expenseDark,
              borderBottomColor: colors.expenseDark,
              shadowColor: colors.expenseDark
            }
          ]}
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
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    marginRight: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  userTextContainer: {
    flex: 1
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  demoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6
  },
  demoBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  userEmail: {
    fontSize: 12,
    marginTop: 2
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  clayIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3
  }
});
