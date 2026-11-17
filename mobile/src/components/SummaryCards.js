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
  const isDark = themeMode === 'dark';

  const totalIncome = summary.total_income || 0;
  const totalExpense = summary.total_expense || 0;
  const remainingBalance = summary.remaining_balance !== undefined ? summary.remaining_balance : (totalIncome - totalExpense);
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  // Executive Balance Card background tone
  let cardBg = isDark ? '#111827' : '#0F172A'; // Obsidian Navy Standard
  let statusBadgeColor = '#10B981';
  let statusBadgeText = 'Healthy';

  if (isOverBudget) {
    cardBg = isDark ? '#7F1D1D' : '#881337'; // Crimson
    statusBadgeColor = '#EF4444';
    statusBadgeText = 'Over Budget';
  } else if (isBudgetAlert) {
    cardBg = isDark ? '#78350F' : '#713F12'; // Amber
    statusBadgeColor = '#F59E0B';
    statusBadgeText = '80% Spent';
  }

  return (
    <View style={styles.container}>
      {/* 1. Executive 3D Tactile Balance Card */}
      <View style={[styles.executiveCard, { backgroundColor: cardBg }]}>
        {/* Subtle glass reflection gradient simulation */}
        <View style={styles.cardBevelHighlight} />

        {/* Card Header: Label & Mastercard Circles */}
        <View style={styles.cardHeader}>
          <View style={styles.balanceLabelGroup}>
            <Text style={styles.balanceOverline}>TOTAL AVAILABLE BALANCE</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(remainingBalance)}</Text>
          </View>

          {/* Overlapping Mastercard Circular Emblem */}
          <View style={styles.mastercardContainer}>
            <View style={[styles.mastercardCircle, { backgroundColor: '#EF4444' }]} />
            <View style={[styles.mastercardCircle, { backgroundColor: '#F59E0B', marginLeft: -12, opacity: 0.92 }]} />
          </View>
        </View>

        {/* Masked Card Digits */}
        <View style={styles.cardNumberWrap}>
          <Text style={styles.cardNumberText}>••••   ••••   ••••   3432</Text>
        </View>

        {/* Card Footer: Expiry, Cardholder & Budget Health Pill */}
        <View style={styles.cardFooter}>
          <View style={styles.cardMetaBlock}>
            <Text style={styles.cardMetaLabel}>CARDHOLDER</Text>
            <Text style={styles.cardMetaValue} numberOfLines={1}>
              {user?.name || 'Trainee Developer'}
            </Text>
          </View>

          <View style={styles.cardMetaBlock}>
            <Text style={styles.cardMetaLabel}>EXPIRES</Text>
            <Text style={styles.cardMetaValue}>12/28</Text>
          </View>

          <View style={[styles.statusPill, { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: statusBadgeColor }]}>
            <View style={[styles.statusDot, { backgroundColor: statusBadgeColor }]} />
            <Text style={[styles.statusPillText, { color: '#FFFFFF' }]}>
              {statusBadgeText}
            </Text>
          </View>
        </View>

        {/* Burn Rate Track */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(burnRate, 100)}%`,
                  backgroundColor: statusBadgeColor
                }
              ]}
            />
          </View>
          <Text style={styles.progressPercentText}>{burnRate}% spent</Text>
        </View>

        {/* Quick Balance Metrics Bar */}
        <View style={styles.metricsRow}>
          <TouchableOpacity
            style={styles.metricTouch}
            onPress={onOpenSetIncome}
            activeOpacity={0.8}
            accessibilityLabel="Set Monthly Income"
          >
            <View style={styles.metricLabelRow}>
              <View style={[styles.miniDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.metricLabel}>INCOME</Text>
            </View>
            <Text style={[styles.metricValue, { color: '#10B981' }]}>
              {formatCurrency(totalIncome)}
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalDivider} />

          <TouchableOpacity
            style={styles.metricTouch}
            onPress={onOpenAddExpense}
            activeOpacity={0.8}
            accessibilityLabel="View Expenses"
          >
            <View style={styles.metricLabelRow}>
              <View style={[styles.miniDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.metricLabel}>EXPENSES</Text>
            </View>
            <Text style={[styles.metricValue, { color: '#EF4444' }]}>
              {formatCurrency(totalExpense)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Four Tactile Action Tiles */}
      <View style={styles.actionsGrid}>
        {/* Action 1: Income */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenSetIncome}
          activeOpacity={0.8}
          accessibilityLabel="Open Income Accordion"
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.tileMintBg, borderColor: colors.tileMintBorder }]}>
            <Ionicons name="arrow-down-circle" size={24} color={colors.tileMint} />
          </View>
          <Text style={[styles.actionLabel, { color: colors.text }]}>Income</Text>
        </TouchableOpacity>

        {/* Action 2: Expense */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenAddExpense}
          activeOpacity={0.8}
          accessibilityLabel="Open Expense Accordion"
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.tileCoralBg, borderColor: colors.tileCoralBorder }]}>
            <Ionicons name="receipt" size={24} color={colors.tileCoral} />
          </View>
          <Text style={[styles.actionLabel, { color: colors.text }]}>Expense</Text>
        </TouchableOpacity>

        {/* Action 3: Analytics */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onToggleCategoryBreakdown}
          activeOpacity={0.8}
          accessibilityLabel="Toggle Analytics"
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.tileVioletBg, borderColor: colors.tileVioletBorder }]}>
            <Ionicons name="bar-chart" size={22} color={colors.tileViolet} />
          </View>
          <Text style={[styles.actionLabel, { color: colors.text }]}>Analytics</Text>
        </TouchableOpacity>

        {/* Action 4: Statement */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenExport}
          activeOpacity={0.8}
          accessibilityLabel="Export Statement"
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.tileCyanBg, borderColor: colors.tileCyanBorder }]}>
            <Ionicons name="document-text" size={22} color={colors.tileCyan} />
          </View>
          <Text style={[styles.actionLabel, { color: colors.text }]}>Statement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 16
  },
  executiveCard: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden'
  },
  cardBevelHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  balanceLabelGroup: {
    flex: 1
  },
  balanceOverline: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginTop: 4
  },
  mastercardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4
  },
  mastercardCircle: {
    width: 28,
    height: 28,
    borderRadius: 14
  },
  cardNumberWrap: {
    marginVertical: 8
  },
  cardNumberText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2.5
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  cardMetaBlock: {
    justifyContent: 'center'
  },
  cardMetaLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  cardMetaValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    maxWidth: 120
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800'
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14
  },
  progressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 2.5
  },
  progressPercentText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700'
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)'
  },
  metricTouch: {
    flex: 1
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2
  },
  miniDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  metricLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2
  },
  verticalDivider: {
    width: 1,
    height: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginHorizontal: 12
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18
  },
  actionCol: {
    alignItems: 'center',
    flex: 1
  },
  actionIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 7,
    letterSpacing: 0.1
  }
});
