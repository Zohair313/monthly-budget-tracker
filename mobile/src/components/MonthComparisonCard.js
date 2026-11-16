import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard, getClayPill } from '../theme/colors';

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

export default function MonthComparisonCard() {
  const { summary } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const clayCard = getClayCard(themeMode);
  const clayPill = getClayPill(themeMode);

  const comparison = summary.comparison_with_prev_month;
  if (!comparison) return null;

  const prevExpense = comparison.prev_expense || 0;
  const currentExpense = summary.total_expense || 0;
  const changePercent = comparison.expense_change_percent !== undefined
    ? comparison.expense_change_percent
    : (prevExpense > 0 ? Math.round(((currentExpense - prevExpense) / prevExpense) * 1000) / 10 : 0);

  const isIncrease = changePercent > 0;
  const isZero = changePercent === 0;

  const trendColor = isIncrease ? colors.expense : (isZero ? colors.textSecondary : colors.income);
  const trendBg = isIncrease ? colors.expenseLight : (isZero ? colors.surfaceSubtle : colors.incomeLight);
  const trendBorderBottom = isIncrease ? colors.expenseDark : (isZero ? colors.clayBorderBottom : colors.incomeDark);
  const iconName = isIncrease ? 'trending-up' : (isZero ? 'remove' : 'trending-down');

  return (
    <View style={[styles.container, clayCard]}>
      <View style={styles.contentRow}>
        <View style={styles.leftInfo}>
          <Text style={[styles.overline, { color: colors.textSecondary }]}>
            PREVIOUS MONTH COMPARISON
          </Text>
          <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
            Previous Expense: <Text style={{ color: colors.text, fontWeight: '800' }}>{formatCurrency(prevExpense)}</Text>
          </Text>
        </View>

        <View
          style={[
            styles.trendPill,
            clayPill,
            {
              backgroundColor: trendBg,
              borderBottomColor: trendBorderBottom
            }
          ]}
        >
          <Ionicons name={iconName} size={15} color={trendColor} />
          <Text style={[styles.trendText, { color: trendColor }]}>
            {isIncrease ? `+${changePercent}%` : `${changePercent}%`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftInfo: {
    flex: 1
  },
  overline: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600'
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  trendText: {
    fontSize: 12,
    fontWeight: '900'
  }
});
