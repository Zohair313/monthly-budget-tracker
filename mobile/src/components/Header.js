import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from './Icon';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { palette } from '../theme/colors';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Header({ onOpenSettings }) {
  const { user, logout, themeMode, toggleTheme } = useAuth();
  const { selectedMonth, selectedYear, nextMonth, prevMonth } = useBudget();
  const colors = palette[themeMode] || palette.light;
  const isDark = themeMode === 'dark';

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Left: Quick Settings / System Status Button */}
      <TouchableOpacity
        style={[
          styles.iconBtn,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border
          }
        ]}
        onPress={onOpenSettings}
        accessibilityLabel="App Settings"
      >
        <Ionicons name="settings-outline" size={18} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Center: Clean Frosted Month Navigation Capsule */}
      <View
        style={[
          styles.monthCapsule,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border
          }
        ]}
      >
        <TouchableOpacity
          onPress={prevMonth}
          style={styles.chevronTouch}
          accessibilityLabel="Previous month"
        >
          <Ionicons name="chevron-back" size={15} color={colors.textSecondary} />
        </TouchableOpacity>

        <Text style={[styles.monthText, { color: colors.text }]}>
          {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
        </Text>

        <TouchableOpacity
          onPress={nextMonth}
          style={styles.chevronTouch}
          accessibilityLabel="Next month"
        >
          <Ionicons name="chevron-forward" size={15} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Right: Theme Toggle & User Avatar */}
      <View style={styles.rightGroup}>
        <TouchableOpacity
          style={[
            styles.iconBtnSmall,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border
            }
          ]}
          onPress={toggleTheme}
          accessibilityLabel="Toggle Theme"
        >
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={16}
            color={isDark ? '#FBBF24' : '#4F46E5'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.avatarWrap, { borderColor: colors.primary }]}
          onPress={handleLogout}
          accessibilityLabel="Profile / Logout"
        >
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  iconBtnSmall: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  monthCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2
  },
  chevronTouch: {
    padding: 2
  },
  monthText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.1
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  avatarWrap: {
    borderRadius: 19,
    padding: 1.5,
    borderWidth: 1.5
  },
  avatarCircle: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF'
  }
});
