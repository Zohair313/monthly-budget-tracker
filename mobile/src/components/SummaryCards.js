import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

export default function SummaryCards({
  onOpenSetIncome,
  onOpenAddExpense,
  onToggleCategoryBreakdown,
  onOpenExport
}) {
  const { summary, incomeData, expenses, selectedMonth, selectedYear } = useBudget();
  const { user, themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;

  const totalIncome = summary.total_income || 0;
  const totalExpense = summary.total_expense || 0;
  const remainingBalance = summary.remaining_balance !== undefined ? summary.remaining_balance : (totalIncome - totalExpense);
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  // Executive card background tone
  let cardBg = '#1E1B4B'; // Deep Executive Midnight Indigo
  let accentPillBg = 'rgba(255, 255, 255, 0.12)';
  let accentPillText = '#A5B4FC';

  if (isOverBudget) {
    cardBg = '#881337'; // Executive Crimson Velvet
    accentPillBg = 'rgba(0, 0, 0, 0.3)';
    accentPillText = '#FDA4AF';
  } else if (isBudgetAlert) {
    cardBg = '#78350F'; // Executive Cognac Amber
    accentPillBg = 'rgba(0, 0, 0, 0.3)';
    accentPillText = '#FDE68A';
  }

  return (
    <View style={styles.container}>
      {/* 1. Executive Fintech Balance Card (Apple / Revolut Metal Standard) */}
      <View style={[styles.executiveCard, { backgroundColor: cardBg }]}>
        {/* Top Header Row: Label & Contactless Chip */}
        <View style={styles.cardHeader}>
          <View style={styles.labelWithDot}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isOverBudget ? '#FB7185' : (isBudgetAlert ? '#FBBF24' : '#34D399') }
              ]}
            />
            <Text style={styles.balanceOverline}>TOTAL AVAILABLE BALANCE</Text>
          </View>

          <View style={styles.cardBadgeWrap}>
            <View style={[styles.statusPill, { backgroundColor: accentPillBg }]}>
              <Text style={[styles.statusPillText, { color: accentPillText }]}>
                {isOverBudget ? 'Over Budget' : (isBudgetAlert ? '80% Spent' : 'Healthy')}
              </Text>
            </View>
          </View>
        </View>

        {/* Big Crisp Typography Balance */}
        <Text style={styles.balanceAmount}>{formatCurrency(remainingBalance)}</Text>

        {/* Burn Rate Track */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(burnRate, 100)}%`,
                  backgroundColor: isOverBudget ? '#FB7185' : (isBudgetAlert ? '#FBBF24' : '#34D399')
                }
              ]}
            />
          </View>
          <Text style={styles.progressPercentText}>{burnRate}% used</Text>
        </View>

        {/* Card Divider */}
        <View style={styles.cardDivider} />

        {/* Bottom Metrics: Income & Expense */}
        <View style={styles.metricsRow}>
          <TouchableOpacity
            style={styles.metricTouch}
            onPress={onOpenSetIncome}
            accessibilityLabel="Set Monthly Income"
          >
            <View style={styles.metricLabelRow}>
              <View style={[styles.miniDot, { backgroundColor: '#34D399' }]} />
              <Text style={styles.metricLabel}>MONTHLY INCOME</Text>
              <Ionicons name="pencil-sharp" size={10} color="#94A3B8" style={{ marginLeft: 3 }} />
            </View>
            <Text style={[styles.metricValue, { color: '#34D399' }]}>
              {formatCurrency(totalIncome)}
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalDivider} />

          <TouchableOpacity
            style={styles.metricTouch}
            onPress={onOpenAddExpense}
            accessibilityLabel="View Expenses"
          >
            <View style={styles.metricLabelRow}>
              <View style={[styles.miniDot, { backgroundColor: '#FB7185' }]} />
              <Text style={styles.metricLabel}>TOTAL EXPENSE</Text>
            </View>
            <Text style={[styles.metricValue, { color: '#FB7185' }]}>
              {formatCurrency(totalExpense)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Sleek Quick Action Grid (Clean Executive Squircle Tiles) */}
      <View style={styles.actionsGrid}>
        {/* Action 1: Set Income */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenSetIncome}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="wallet-outline" size={22} color="#059669" />
          </View>
          <Text style={styles.actionLabel}>Set Income</Text>
        </TouchableOpacity>

        {/* Action 2: Add Expense */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenAddExpense}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#FFF1F2' }]}>
            <Ionicons name="add-circle-outline" size={24} color="#E11D48" />
          </View>
          <Text style={styles.actionLabel}>Add Expense</Text>
        </TouchableOpacity>

        {/* Action 3: Analytics / Categories */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onToggleCategoryBreakdown}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#EEF2FF' }]}>
            <Ionicons name="bar-chart-outline" size={22} color="#4F46E5" />
          </View>
          <Text style={styles.actionLabel}>Analytics</Text>
        </TouchableOpacity>

        {/* Action 4: Statement Export */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenExport}
          activeOpacity={0.8}
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#F0F9FF' }]}>
            <Ionicons name="document-text-outline" size={22} color="#0284C7" />
          </View>
          <Text style={styles.actionLabel}>Statement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 22
  },
  executiveCard: {
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  labelWithDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  balanceOverline: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1
  },
  cardBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusPill: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700'
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginVertical: 4
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 14
  },
  progressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 2.5
  },
  progressPercentText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600'
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 14
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  metricTouch: {
    flex: 1
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3
  },
  miniDot: {
    width: 4,
    height: 4,
    borderRadius: 2
  },
  metricLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2
  },
  verticalDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 12
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  actionCol: {
    alignItems: 'center',
    flex: 1
  },
  actionIconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 0.2
  }
});
