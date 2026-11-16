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
  const clayCard = getClayCard(themeMode);
  const clayPill = getClayPill(themeMode);

  const totalIncome = summary.total_income || 0;
  const totalExpense = summary.total_expense || 0;
  const remainingBalance = summary.remaining_balance !== undefined ? summary.remaining_balance : (totalIncome - totalExpense);
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  // Determine remaining card status styling
  let balanceStatusColor = colors.income;
  let balanceStatusBg = colors.incomeLight;
  let balanceStatusBorder = colors.incomeDark;
  let balanceStatusLabel = `Healthy (${burnRate}% spent)`;

  if (isOverBudget) {
    balanceStatusColor = colors.expense;
    balanceStatusBg = colors.expenseLight;
    balanceStatusBorder = colors.expenseDark;
    balanceStatusLabel = `Deficit (-Rs. ${Math.abs(remainingBalance).toLocaleString()})`;
  } else if (isBudgetAlert) {
    balanceStatusColor = colors.warning;
    balanceStatusBg = colors.warningLight;
    balanceStatusBorder = colors.warningDark;
    balanceStatusLabel = `Caution: ${burnRate}% spent`;
  }

  return (
    <View style={styles.container}>
      {/* 1. Main Hero Card: Remaining Balance */}
      <View
        style={[
          styles.mainBalanceCard,
          clayCard,
          isOverBudget && {
            borderBottomColor: colors.expenseDark,
            shadowColor: colors.expenseDark
          }
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <View style={styles.cardTitleWrap}>
            <View style={[styles.miniDot, { backgroundColor: balanceStatusColor }]} />
            <Text style={[styles.cardOverline, { color: colors.textSecondary }]}>REMAINING BALANCE</Text>
          </View>
          <View
            style={[
              styles.statusPill,
              clayPill,
              {
                backgroundColor: balanceStatusBg,
                borderBottomColor: balanceStatusBorder
              }
            ]}
          >
            <Text style={[styles.statusPillText, { color: balanceStatusColor }]}>
              {balanceStatusLabel}
            </Text>
          </View>
        </View>

        <Text style={[styles.mainBalanceAmount, { color: isOverBudget ? colors.expense : colors.text }]}>
          {formatCurrency(remainingBalance)}
        </Text>

        {/* Debossed Clay Progress Track */}
        <View
          style={[
            styles.progressTrack,
            {
              backgroundColor: colors.surfaceSubtle,
              borderTopColor: themeMode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(148,163,184,0.4)',
              borderBottomColor: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)'
            }
          ]}
        >
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(burnRate, 100)}%`,
                backgroundColor: isOverBudget ? colors.expense : (isBudgetAlert ? colors.warning : colors.income),
                borderTopColor: 'rgba(255, 255, 255, 0.45)',
                borderBottomColor: isOverBudget ? colors.expenseDark : (isBudgetAlert ? colors.warningDark : colors.incomeDark)
              }
            ]}
          />
        </View>

        <View style={styles.progressLabelRow}>
          <Text style={[styles.progressSubtext, { color: colors.textTertiary }]}>
            {burnRate}% of monthly income used
          </Text>
          <Text style={[styles.progressSubtext, { color: colors.textTertiary }]}>
            {totalIncome > 0 ? `${formatCurrency(Math.max(0, remainingBalance))} left` : 'No income set'}
          </Text>
        </View>
      </View>

      {/* 2 & 3. Side-by-Side Puffy Clay Cards */}
      <View style={styles.dualCardRow}>
        {/* Total Income Card */}
        <View style={[styles.subCard, clayCard]}>
          <View style={styles.subCardTop}>
            <View
              style={[
                styles.iconCoin,
                {
                  backgroundColor: colors.incomeLight,
                  borderTopColor: 'rgba(255, 255, 255, 0.45)',
                  borderBottomColor: colors.incomeDark,
                  shadowColor: colors.incomeDark
                }
              ]}
            >
              <Ionicons name="arrow-down-circle-outline" size={18} color={colors.income} />
            </View>
            <TouchableOpacity
              onPress={onOpenSetIncome}
              style={[
                styles.editIncomeButton,
                clayPill,
                {
                  backgroundColor: colors.primaryLight,
                  borderBottomColor: colors.primaryDark
                }
              ]}
              accessibilityLabel="Edit Income"
            >
              <Ionicons name="create-outline" size={13} color={colors.primary} />
              <Text style={[styles.editIncomeText, { color: colors.primary }]}>
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

        {/* Total Expense Card */}
        <View style={[styles.subCard, clayCard]}>
          <View style={styles.subCardTop}>
            <View
              style={[
                styles.iconCoin,
                {
                  backgroundColor: colors.expenseLight,
                  borderTopColor: 'rgba(255, 255, 255, 0.45)',
                  borderBottomColor: colors.expenseDark,
                  shadowColor: colors.expenseDark
                }
              ]}
            >
              <Ionicons name="arrow-up-circle-outline" size={18} color={colors.expense} />
            </View>
            <View
              style={[
                styles.countBadge,
                clayPill,
                {
                  backgroundColor: colors.surfaceSubtle
                }
              ]}
            >
              <Text style={[styles.countBadgeText, { color: colors.textSecondary }]}>
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
    padding: 20
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
    gap: 7
  },
  miniDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  cardOverline: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.9
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700'
  },
  mainBalanceAmount: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
    marginVertical: 4
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressSubtext: {
    fontSize: 11,
    fontWeight: '600'
  },
  dualCardRow: {
    flexDirection: 'row',
    gap: 12
  },
  subCard: {
    flex: 1,
    padding: 16
  },
  subCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  iconCoin: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  },
  editIncomeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  editIncomeText: {
    fontSize: 11,
    fontWeight: '700'
  },
  countBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700'
  },
  subCardLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginBottom: 4
  },
  subCardAmount: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5
  },
  subCardHint: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4
  }
});
