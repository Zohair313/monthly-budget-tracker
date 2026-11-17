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

  // Claymorphic Card background tone matching reference image
  let cardBg = '#5B42DE'; // Soft embossed 3D violet clay card
  let accentPillBg = 'rgba(255, 255, 255, 0.2)';
  let accentPillText = '#FFFFFF';

  if (isOverBudget) {
    cardBg = '#881337'; // Crimson
    accentPillBg = 'rgba(0, 0, 0, 0.3)';
    accentPillText = '#FDA4AF';
  } else if (isBudgetAlert) {
    cardBg = '#78350F'; // Amber
    accentPillBg = 'rgba(0, 0, 0, 0.3)';
    accentPillText = '#FDE68A';
  }

  return (
    <View style={styles.container}>
      {/* 1. 3D Clay Debit-Style Balance Card (Mirrors User Reference Design) */}
      <View style={[styles.executiveCard, { backgroundColor: cardBg }]}>
        {/* Subtle Clay Inner Highlight Overlays */}
        <View style={styles.cardBevelHighlight} />

        {/* Card Header: Label & Overlapping Mastercard Circles */}
        <View style={styles.cardHeader}>
          <View style={styles.balanceLabelGroup}>
            <Text style={styles.balanceOverline}>BALANCE</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(remainingBalance)}</Text>
          </View>

          {/* Mastercard Logo (Overlapping Coral & Gold Circles) */}
          <View style={styles.mastercardContainer}>
            <View style={[styles.mastercardCircle, { backgroundColor: '#FF4757' }]} />
            <View style={[styles.mastercardCircle, { backgroundColor: '#FFA502', marginLeft: -12, opacity: 0.92 }]} />
          </View>
        </View>

        {/* Masked Card Digits */}
        <View style={styles.cardNumberWrap}>
          <Text style={styles.cardNumberText}>••••   ••••   ••••   3432</Text>
        </View>

        {/* Card Footer: Expiry, Cardholder & Budget Health Pill */}
        <View style={styles.cardFooter}>
          <View style={styles.cardMetaBlock}>
            <Text style={styles.cardMetaLabel}>EXP</Text>
            <Text style={styles.cardMetaValue}>12/28</Text>
          </View>

          <View style={styles.cardMetaBlock}>
            <Text style={styles.cardMetaLabel}>CARDHOLDER</Text>
            <Text style={styles.cardMetaValue} numberOfLines={1}>
              {user?.name || 'Trainee Developer'}
            </Text>
          </View>

          <View style={[styles.statusPill, { backgroundColor: accentPillBg }]}>
            <Text style={[styles.statusPillText, { color: accentPillText }]}>
              {isOverBudget ? 'Over Budget' : (isBudgetAlert ? '80% Spent' : 'Healthy')}
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
                  backgroundColor: isOverBudget ? '#FB7185' : (isBudgetAlert ? '#FBBF24' : '#2ED573')
                }
              ]}
            />
          </View>
          <Text style={styles.progressPercentText}>{burnRate}% used</Text>
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
              <View style={[styles.miniDot, { backgroundColor: '#2ED573' }]} />
              <Text style={styles.metricLabel}>INCOME</Text>
            </View>
            <Text style={[styles.metricValue, { color: '#2ED573' }]}>
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
              <View style={[styles.miniDot, { backgroundColor: '#FF6B81' }]} />
              <Text style={styles.metricLabel}>EXPENSES</Text>
            </View>
            <Text style={[styles.metricValue, { color: '#FF6B81' }]}>
              {formatCurrency(totalExpense)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Four Pastel Squircle Clay Action Buttons (Matches Reference Image) */}
      <View style={styles.actionsGrid}>
        {/* Action 1: Income / Transfer (Mint Clay Squircle) */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenSetIncome}
          activeOpacity={0.8}
          accessibilityLabel="Open Income Accordion"
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#55E6C1' }]}>
            <Ionicons name="arrow-down-circle" size={24} color="#057A55" />
          </View>
          <Text style={styles.actionLabel}>Income</Text>
        </TouchableOpacity>

        {/* Action 2: Expense / Pay Bill (Rose Clay Squircle) */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenAddExpense}
          activeOpacity={0.8}
          accessibilityLabel="Open Expense Accordion"
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#FF7698' }]}>
            <Ionicons name="receipt" size={24} color="#9F1239" />
          </View>
          <Text style={styles.actionLabel}>Expense</Text>
        </TouchableOpacity>

        {/* Action 3: Analytics / Shop (Lilac Clay Squircle) */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onToggleCategoryBreakdown}
          activeOpacity={0.8}
          accessibilityLabel="Toggle Analytics"
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#A29BFE' }]}>
            <Ionicons name="pie-chart" size={23} color="#4338CA" />
          </View>
          <Text style={styles.actionLabel}>Analytics</Text>
        </TouchableOpacity>

        {/* Action 4: Statement / Saving (Sky Blue Clay Squircle) */}
        <TouchableOpacity
          style={styles.actionCol}
          onPress={onOpenExport}
          activeOpacity={0.8}
          accessibilityLabel="Export Statement"
        >
          <View style={[styles.actionIconBox, { backgroundColor: '#70D6FF' }]}>
            <Ionicons name="document-text" size={23} color="#0369A1" />
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
    borderRadius: 26,
    padding: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderLeftColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#2B1A78',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 9,
    position: 'relative',
    overflow: 'hidden'
  },
  cardBevelHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26
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
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
    marginTop: 4
  },
  mastercardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2
  },
  mastercardCircle: {
    width: 28,
    height: 28,
    borderRadius: 14
  },
  cardNumberWrap: {
    marginVertical: 12
  },
  cardNumberText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 3
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  cardMetaBlock: {
    justifyContent: 'center'
  },
  cardMetaLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)'
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
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    borderRadius: 2.5
  },
  progressPercentText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '700'
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)'
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
    color: 'rgba(255, 255, 255, 0.75)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 3.5,
    borderTopColor: 'rgba(255, 255, 255, 0.85)',
    borderLeftColor: 'rgba(255, 255, 255, 0.65)',
    borderRightColor: 'rgba(0, 0, 0, 0.08)',
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 0.2
  }
});
