import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard } from '../theme/colors';

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

export default function MonthComparisonCard() {
  const { summary } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const clayCard = getClayCard(themeMode);

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
  const iconName = isIncrease ? 'trending-up' : (isZero ? 'remove' : 'trending-down');

  return (
    <View
      style={[
        styles.container,
        clayCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1.5
        }
      ]}
    >
      <View style={styles.cardTouch}>
        <View style={styles.cardLeft}>
          {/* Uniform 46x46 Squircle Violet Coin */}
          <View
            style={[
              styles.iconCoin,
              {
                backgroundColor: isIncrease ? colors.expenseLight : colors.incomeLight,
                borderColor: isIncrease ? colors.expenseBorder : colors.incomeBorder
              }
            ]}
          >
            <Ionicons name={iconName} size={22} color={trendColor} />
          </View>

          <View style={styles.cardTextGroup}>
            <View style={styles.titleRow}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Previous Month</Text>
              <View
                style={[
                  styles.badgePill,
                  {
                    backgroundColor: trendBg,
                    borderColor: trendColor
                  }
                ]}
              >
                <Text style={[styles.badgeText, { color: trendColor }]}>
                  {isIncrease ? `+${changePercent}%` : `${changePercent}%`}
                </Text>
              </View>
            </View>

            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
              Last Month's Spending
            </Text>
          </View>
        </View>

        {/* Right: Amount */}
        <View style={styles.cardRight}>
          <Text style={[styles.amountText, { color: colors.text }]}>
            {formatCurrency(prevExpense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden'
  },
  cardTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 74
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12
  },
  iconCoin: {
    width: 46,
    height: 46,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTextGroup: {
    flex: 1
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2
  },
  badgePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800'
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  amountText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.4
  }
});
