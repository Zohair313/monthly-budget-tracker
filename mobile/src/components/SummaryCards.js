import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

export default function SummaryCards({ onOpenSetIncome }) {
  const { summary, incomeData, expenses } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

  const totalIncome = summary.total_income || 0;
  const totalExpense = summary.total_expense || 0;
  const remainingBalance = summary.remaining_balance !== undefined ? summary.remaining_balance : (totalIncome - totalExpense);
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  // Determine remaining card status styling
  let balanceStatusColor = colors.income;
  let balanceStatusBg = colors.incomeLight;
  let balanceStatusLabel = `Healthy (${burnRate}% spent)`;

  if (isOverBudget) {
    balanceStatusColor = colors.expense;
    balanceStatusBg = colors.expenseLight;
    balanceStatusLabel = `Deficit (-Rs. ${Math.abs(remainingBalance).toLocaleString()})`;
  } else if (isBudgetAlert) {
    balanceStatusColor = colors.warning;
    balanceStatusBg = colors.warningLight;
    balanceStatusLabel = `Caution: ${burnRate}% spent`;
  }

  return (
    <View style={styles.container}>
      {/* 1. Main Hero Card: Remaining Balance */}
      <View
        style={[
          styles.mainBalanceCard,
          {
            backgroundColor: colors.surface,
            borderColor: isOverBudget ? colors.expense : (isBudgetAlert ? colors.warning : colors.border),
            borderWidth: isOverBudget || isBudgetAlert ? 1.5 : 1
          }
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <View style={styles.cardTitleWrap}>
            <View style={[styles.miniDot, { backgroundColor: balanceStatusColor }]} />
            <Text style={[styles.cardOverline, { color: colors.textSecondary }]}>REMAINING BALANCE</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: balanceStatusBg }]}>
            <Text style={[styles.statusPillText, { color: balanceStatusColor }]}>
              {balanceStatusLabel}
            </Text>
          </View>
        </View>

        <Text style={[styles.mainBalanceAmount, { color: isOverBudget ? colors.expense : colors.text }]}>
          {formatCurrency(remainingBalance)}
        </Text>

        {/* Progress Bar */}
        <View style={[styles.progressTrack, { backgroundColor: colors.surfaceSubtle }]}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(burnRate, 100)}%`,
                backgroundColor: isOverBudget ? colors.expense : (isBudgetAlert ? colors.warning : colors.income)
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

      {/* 2 & 3. Side-by-Side Cards: Total Income & Total Expense */}
      <View style={styles.dualCardRow}>
        {/* Total Income Card */}
        <View style={[styles.subCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.subCardTop}>
            <View style={[styles.iconPill, { backgroundColor: colors.incomeLight }]}>
              <Ionicons name="arrow-down-circle-outline" size={16} color={colors.income} />
            </View>
            <TouchableOpacity
              onPress={onOpenSetIncome}
              style={[styles.editIncomeButton, { backgroundColor: colors.surfaceSubtle }]}
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
        <View style={[styles.subCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.subCardTop}>
            <View style={[styles.iconPill, { backgroundColor: colors.expenseLight }]}>
              <Ionicons name="arrow-up-circle-outline" size={16} color={colors.expense} />
            </View>
            <View style={[styles.countBadge, { backgroundColor: colors.surfaceSubtle }]}>
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
    gap: 12
  },
  mainBalanceCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  cardTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  miniDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5
  },
  cardOverline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  statusPill: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '600'
  },
  mainBalanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    marginVertical: 4
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 6,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 3
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressSubtext: {
    fontSize: 11,
    fontWeight: '500'
  },
  dualCardRow: {
    flexDirection: 'row',
    gap: 12
  },
  subCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1
  },
  subCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  iconPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editIncomeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  editIncomeText: {
    fontSize: 11,
    fontWeight: '600'
  },
  countBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '600'
  },
  subCardLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 4
  },
  subCardAmount: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.4
  },
  subCardHint: {
    fontSize: 11,
    marginTop: 4
  }
});
