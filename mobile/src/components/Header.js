import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from './Icon';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { palette, getClayPill } from '../theme/colors';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function Header({ onOpenSettings, onToggleMonthModal }) {
  const { user, logout, themeMode, toggleTheme, demoMode } = useAuth();
  const { selectedMonth, selectedYear, nextMonth, prevMonth } = useBudget();
  const colors = palette[themeMode] || palette.light;
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
    <View style={styles.container}>
      {/* Left: Apps / Grid Button (Reference image top-left) */}
      <TouchableOpacity
        style={[
          styles.clayHeaderBtn,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.22)',
            borderTopColor: 'rgba(255, 255, 255, 0.50)',
            borderBottomColor: 'rgba(0, 0, 0, 0.25)'
          }
        ]}
        onPress={onOpenSettings}
        accessibilityLabel="App Settings"
      >
        <Ionicons name="apps" size={18} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Center: Month Navigation Pill (Reference image top dropdown) */}
      <View
        style={[
          styles.monthPill,
          clayPill,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.24)',
            borderTopColor: 'rgba(255, 255, 255, 0.60)',
            borderBottomColor: 'rgba(0, 0, 0, 0.30)'
          }
        ]}
      >
        <TouchableOpacity onPress={prevMonth} style={styles.monthArrow}>
          <Ionicons name="chevron-back" size={14} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.monthPillText}>
          {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
        </Text>

        <TouchableOpacity onPress={nextMonth} style={styles.monthArrow}>
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Right: Theme Toggle & Avatar (Reference image top-right) */}
      <View style={styles.rightGroup}>
        <TouchableOpacity
          style={[
            styles.clayHeaderBtnSmall,
            {
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              borderTopColor: 'rgba(255, 255, 255, 0.50)',
              borderBottomColor: 'rgba(0, 0, 0, 0.25)'
            }
          ]}
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
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  clayHeaderBtn: {
    width: 42,
    height: 42,
    borderRadius: 16,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3
  },
  clayHeaderBtnSmall: {
    width: 36,
    height: 36,
    borderRadius: 14,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6
  },
  monthArrow: {
    padding: 3
  },
  monthPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  avatarWrap: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 1.5,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#7B66FF'
  }
});
