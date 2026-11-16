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
  const { user, logout, themeMode, toggleTheme, demoMode } = useAuth();
  const { selectedMonth, selectedYear, nextMonth, prevMonth } = useBudget();
  const colors = palette[themeMode] || palette.light;

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
    <View style={styles.container}>
      {/* Left: Settings / Quick Config Button */}
      <TouchableOpacity
        style={styles.frostedIconBtn}
        onPress={onOpenSettings}
        accessibilityLabel="App Settings"
      >
        <Ionicons name="grid-outline" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Center: Sleek Month Navigation Capsule */}
      <View style={styles.monthCapsule}>
        <TouchableOpacity onPress={prevMonth} style={styles.chevronTouch} accessibilityLabel="Previous month">
          <Ionicons name="chevron-back" size={14} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
        </Text>

        <TouchableOpacity onPress={nextMonth} style={styles.chevronTouch} accessibilityLabel="Next month">
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Right: Theme Toggle & Avatar */}
      <View style={styles.rightGroup}>
        <TouchableOpacity
          style={styles.frostedIconBtnSmall}
          onPress={toggleTheme}
          accessibilityLabel="Toggle Theme"
        >
          <Ionicons
            name={themeMode === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={16}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarWrap}
          onPress={handleLogout}
          accessibilityLabel="Profile / Logout"
        >
          <View style={styles.avatarCircle}>
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
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  frostedIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  frostedIconBtnSmall: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 8
  },
  chevronTouch: {
    padding: 2
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  avatarWrap: {
    borderRadius: 18,
    padding: 1.5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)'
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4F46E5'
  }
});
