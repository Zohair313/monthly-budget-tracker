import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function MonthComparisonCard() {
  const { summary } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

  const comparison = summary.comparison_with_prev_month;
  if (!comparison || comparison.prev_expense === 0) {
    return null;
  }

  const changePercent = comparison.expense_change_percent || 0;
  const isSpendingUp = changePercent > 0;
  const prevMonthName = MONTH_SHORT[comparison.prev_month - 1];

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceSubtle, borderColor: colors.borderSubtle }]}>
      <View style={styles.leftRow}>
        <View
          style={[
            styles.badgeIcon,
            { backgroundColor: isSpendingUp ? colors.expenseLight : colors.incomeLight }
          ]}
        >
          <Ionicons
            name={isSpendingUp ? 'trending-up' : 'trending-down'}
            size={14}
            color={isSpendingUp ? colors.expense : colors.income}
          />
        </View>
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: colors.text }]}>
            {Math.abs(changePercent)}% {isSpendingUp ? 'higher spending' : 'savings improved'}
          </Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>
            Compared to {prevMonthName} (Rs. {comparison.prev_expense.toLocaleString()})
          </Text>
        </View>
      </View>
      <View style={[styles.pill, { backgroundColor: colors.surface }]}>
        <Text style={[styles.pillText, { color: isSpendingUp ? colors.expense : colors.income }]}>
          {isSpendingUp ? `+${changePercent}%` : `${changePercent}%`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  badgeIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWrap: {
    flex: 1
  },
  title: {
    fontSize: 11,
    fontWeight: '700'
  },
  sub: {
    fontSize: 10,
    marginTop: 1
  },
  pill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700'
  }
});
