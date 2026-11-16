import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard, getClayPill } from '../theme/colors';

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

export default function SummaryCards({ onOpenSetIncome }) {
  const { summary, incomeData, expenses } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.dark;
  const clayPill = getClayPill(themeMode);

  const totalIncome = summary.total_income || 0;
  const totalExpense = summary.total_expense || 0;
  const remainingBalance = summary.remaining_balance !== undefined ? summary.remaining_balance : (totalIncome - totalExpense);
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  // Determine Hero Card Dynamic Clay Persona
  let heroBg = colors.heroHealthyBg;
  let heroBottom = colors.heroHealthyBottom;
  let heroGleam = colors.heroHealthyGleam;
  let balanceStatusLabel = `Healthy (${burnRate}% spent)`;
  let statusPillBg = 'rgba(255, 255, 255, 0.22)';
  let statusPillText = '#FFFFFF';

  if (isOverBudget) {
    heroBg = colors.heroDeficitBg;
    heroBottom = colors.heroDeficitBottom;
    heroGleam = colors.heroDeficitGleam;
    balanceStatusLabel = `Deficit (-Rs. ${Math.abs(remainingBalance).toLocaleString()})`;
    statusPillBg = 'rgba(0, 0, 0, 0.35)';
  } else if (isBudgetAlert) {
    heroBg = colors.heroWarningBg;
    heroBottom = colors.heroWarningBottom;
    heroGleam = colors.heroWarningGleam;
    balanceStatusLabel = `Caution: ${burnRate}% spent`;
    statusPillBg = 'rgba(0, 0, 0, 0.30)';
  }

  return (
    <View style={styles.container}>
      {/* 1. Main Signature Hero Clay Pillow: Remaining Balance */}
      <View
        style={[
          styles.mainBalanceCard,
          {
            backgroundColor: heroBg,
            borderTopColor: 'rgba(255, 255, 255, 0.60)',
            borderLeftColor: 'rgba(255, 255, 255, 0.40)',
            borderRightColor: heroBottom,
            borderBottomColor: heroBottom,
            shadowColor: heroBottom
          }
        ]}
      >
        {/* Subtle decorative clay gleam circle in corner */}
        <View style={[styles.cornerGleam, { backgroundColor: heroGleam }]} />

        <View style={styles.cardHeaderRow}>
          <View style={styles.cardTitleWrap}>
            <View style={styles.glowDot} />
            <Text style={styles.cardOverline}>REMAINING BALANCE</Text>
          </View>
          <View
            style={[
              styles.statusPill,
              clayPill,
              {
                backgroundColor: statusPillBg,
                borderTopColor: 'rgba(255, 255, 255, 0.45)',
                borderBottomColor: 'rgba(0, 0, 0, 0.35)'
              }
            ]}
          >
            <Text style={[styles.statusPillText, { color: statusPillText }]}>
              {balanceStatusLabel}
            </Text>
          </View>
        </View>

        <Text style={styles.mainBalanceAmount}>
          {formatCurrency(remainingBalance)}
        </Text>

        {/* Debossed Grooved Progress Track */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(burnRate, 100)}%`,
                backgroundColor: isOverBudget ? '#FDA4AF' : (isBudgetAlert ? '#FDE68A' : '#6EE7B7')
              }
            ]}
          />
        </View>

        <View style={styles.progressLabelRow}>
          <Text style={styles.progressSubtext}>
            {burnRate}% of monthly income used
          </Text>
          <Text style={styles.progressSubtext}>
            {totalIncome > 0 ? `${formatCurrency(Math.max(0, remainingBalance))} left` : 'No income set'}
          </Text>
        </View>
      </View>

      {/* 2 & 3. Side-by-Side Dual Clay Tablets */}
      <View style={styles.dualCardRow}>
        {/* Total Income Clay Tablet */}
        <View
          style={[
            styles.subCard,
            {
              backgroundColor: colors.incomeSurface,
              borderTopColor: colors.clayBorderTop,
              borderLeftColor: colors.clayBorderLeft,
              borderRightColor: colors.incomeBorder,
              borderBottomColor: colors.incomeDark,
              shadowColor: colors.incomeDark
            }
          ]}
        >
          <View style={styles.subCardTop}>
            <View
              style={[
                styles.iconCoin,
                {
                  backgroundColor: colors.income,
                  borderTopColor: 'rgba(255, 255, 255, 0.60)',
                  borderBottomColor: colors.incomeDark
                }
              ]}
            >
              <Ionicons name="arrow-down" size={18} color="#FFFFFF" />
            </View>
            <TouchableOpacity
              onPress={onOpenSetIncome}
              style={[
                styles.editIncomeButton,
                clayPill,
                {
                  backgroundColor: colors.surface,
                  borderBottomColor: colors.incomeDark
                }
              ]}
              accessibilityLabel="Edit Income"
            >
              <Ionicons name="create-outline" size={13} color={colors.income} />
              <Text style={[styles.editIncomeText, { color: colors.income }]}>
                {incomeData ? 'Edit' : 'Set'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.subCardLabel, { color: colors.textSecondary }]}>TOTAL INCOME</Text>
          <Text style={[styles.subCardAmount, { color: colors.income }]}>
            {formatCurrency(totalIncome)}
          </Text>
          <Text style={[styles.subCardHint, { color: colors.textTertiary }]}>
            {incomeData ? 'Monthly target set' : 'Tap Edit to set'}
          </Text>
        </View>

        {/* Total Expense Clay Tablet */}
        <View
          style={[
            styles.subCard,
            {
              backgroundColor: colors.expenseSurface,
              borderTopColor: colors.clayBorderTop,
              borderLeftColor: colors.clayBorderLeft,
              borderRightColor: colors.expenseBorder,
              borderBottomColor: colors.expenseDark,
              shadowColor: colors.expenseDark
            }
          ]}
        >
          <View style={styles.subCardTop}>
            <View
              style={[
                styles.iconCoin,
                {
                  backgroundColor: colors.expense,
                  borderTopColor: 'rgba(255, 255, 255, 0.60)',
                  borderBottomColor: colors.expenseDark
                }
              ]}
            >
              <Ionicons name="arrow-up" size={18} color="#FFFFFF" />
            </View>
            <View
              style={[
                styles.countBadge,
                clayPill,
                {
                  backgroundColor: colors.surface,
                  borderBottomColor: colors.expenseDark
                }
              ]}
            >
              <Text style={[styles.countBadgeText, { color: colors.expense }]}>
                {expenses.length} {expenses.length === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </View>

          <Text style={[styles.subCardLabel, { color: colors.textSecondary }]}>TOTAL EXPENSE</Text>
          <Text style={[styles.subCardAmount, { color: colors.expense }]}>
            {formatCurrency(totalExpense)}
          </Text>
          <Text style={[styles.subCardHint, { color: colors.textTertiary }]}>
            Auto-deducted
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8,
    gap: 14
  },
  mainBalanceCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: 22,
    borderRadius: 28,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 6,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10
  },
  cornerGleam: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cardTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  glowDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3
  },
  cardOverline: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: 'rgba(255, 255, 255, 0.9)'
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '800'
  },
  mainBalanceAmount: {
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1.2,
    color: '#FFFFFF',
    marginVertical: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6
  },
  progressTrack: {
    height: 12,
    borderRadius: 6,
    marginTop: 14,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderTopWidth: 2,
    borderBottomWidth: 1.5,
    borderTopColor: 'rgba(0, 0, 0, 0.35)',
    borderBottomColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(255, 255, 255, 0.60)'
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressSubtext: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)'
  },
  dualCardRow: {
    flexDirection: 'row',
    gap: 12
  },
  subCard: {
    flex: 1,
    padding: 16,
    borderRadius: 24,
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 5,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8
  },
  subCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  iconCoin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  },
  editIncomeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 5
  },
  editIncomeText: {
    fontSize: 11,
    fontWeight: '800'
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '800'
  },
  subCardLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 4
  },
  subCardAmount: {
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -0.6
  },
  subCardHint: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4
  }
});
