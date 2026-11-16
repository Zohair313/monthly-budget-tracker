import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthSelector() {
  const { selectedMonth, selectedYear, nextMonth, prevMonth, changeMonth } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

  const currentDate = new Date();
  const isCurrentMonth = selectedMonth === (currentDate.getMonth() + 1) && selectedYear === currentDate.getFullYear();

  const handleJumpToCurrent = () => {
    changeMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TouchableOpacity
        style={[styles.arrowButton, { backgroundColor: colors.surfaceSubtle }]}
        onPress={prevMonth}
        accessibilityLabel="Previous Month"
      >
        <Ionicons name="chevron-back" size={18} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.centerInfo}>
        <View style={styles.monthRow}>
          <Text style={[styles.monthText, { color: colors.text }]}>
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
          </Text>
          {isCurrentMonth ? (
            <View style={[styles.currentBadge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.currentBadgeText, { color: colors.primary }]}>Current</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleJumpToCurrent} style={[styles.jumpBadge, { backgroundColor: colors.surfaceSubtle }]}>
              <Text style={[styles.jumpBadgeText, { color: colors.textSecondary }]}>Jump to Today</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.arrowButton, { backgroundColor: colors.surfaceSubtle }]}
        onPress={nextMonth}
        accessibilityLabel="Next Month"
      >
        <Ionicons name="chevron-forward" size={18} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrowButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerInfo: {
    alignItems: 'center'
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  monthText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  currentBadgeText: {
    fontSize: 11,
    fontWeight: '600'
  },
  jumpBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  jumpBadgeText: {
    fontSize: 11,
    fontWeight: '500'
  }
});
