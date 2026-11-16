import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayPill } from '../theme/colors';

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
  const clayPill = getClayPill(themeMode);

  const totalIncome = summary.total_income || 0;
  const totalExpense = summary.total_expense || 0;
  const remainingBalance = summary.remaining_balance !== undefined ? summary.remaining_balance : (totalIncome - totalExpense);
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  // Dynamic card tone for deficit / alert / healthy
  let cardBg = '#5A45ED';
  let cardBottom = '#3D2BC2';
  let cardStatus = 'Active';

  if (isOverBudget) {
    cardBg = '#DC2626';
    cardBottom = '#991B1B';
    cardStatus = 'Deficit';
  } else if (isBudgetAlert) {
    cardBg = '#D97706';
    cardBottom = '#92400E';
    cardStatus = 'Alert 80%';
  }

  const expDateStr = `${String(selectedMonth).padStart(2, '0')}/${String(selectedYear).slice(-2)}`;

  return (
    <View style={styles.container}>
      {/* 1. The Signature 3D Inflated Clay Bank Card (Exact reference image style) */}
      <View
        style={[
          styles.clayBankCard,
          {
            backgroundColor: cardBg,
            borderTopColor: 'rgba(255, 255, 255, 0.60)',
            borderLeftColor: 'rgba(255, 255, 255, 0.40)',
            borderRightColor: cardBottom,
            borderBottomColor: cardBottom,
            shadowColor: cardBottom
          }
        ]}
      >
        {/* Subtle decorative clay background curve */}
        <View style={styles.decorativeCurve} />

        {/* Card Top: Balance & Overlapping Mastercard Clay Coins */}
        <View style={styles.cardTopRow}>
          <View>
            <Text style={styles.cardBalanceLabel}>Remaining Balance</Text>
            <Text style={styles.cardBalanceAmount}>{formatCurrency(remainingBalance)}</Text>
          </View>

          {/* Overlapping 3D Mastercard Clay Coins (Reference image) */}
          <View style={styles.mastercardWrap}>
            <View style={[styles.coin, styles.coinOrange]} />
            <View style={[styles.coin, styles.coinYellow]} />
          </View>
        </View>

        {/* Card Middle: Card Number Masking */}
        <View style={styles.cardNumberRow}>
          <Text style={styles.cardDots}>••••  ••••  ••••</Text>
          <Text style={styles.cardLastDigits}>{String(selectedYear)}</Text>
        </View>

        {/* Card Progress Line */}
        <View style={styles.cardProgressTrack}>
          <View
            style={[
              styles.cardProgressBar,
              {
                width: `${Math.min(burnRate, 100)}%`,
                backgroundColor: isOverBudget ? '#FDA4AF' : (isBudgetAlert ? '#FDE68A' : '#6EE7B7')
              }
            ]}
          />
        </View>

        {/* Card Bottom: Exp & Name */}
        <View style={styles.cardBottomRow}>
          <View>
            <Text style={styles.cardMetaLabel}>TOTAL INCOME</Text>
            <Text style={styles.cardMetaValue}>{formatCurrency(totalIncome)}</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.cardMetaLabel}>CYCLE</Text>
            <Text style={styles.cardMetaValue}>{expDateStr}</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.cardMetaLabel}>TOTAL EXPENSE</Text>
            <Text style={styles.cardMetaValue}>{formatCurrency(totalExpense)}</Text>
          </View>
        </View>
      </View>

      {/* 2. Four Colorful 3D Squishy Clay Action Tiles (Exact reference image row) */}
      <View style={styles.quickTilesRow}>
        {/* Tile 1: Transfer / Set Income (Mint Green) */}
        <TouchableOpacity
          style={styles.tileCol}
          onPress={onOpenSetIncome}
          accessibilityLabel="Set Monthly Income"
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileMint,
                borderTopColor: 'rgba(255, 255, 255, 0.65)',
                borderLeftColor: 'rgba(255, 255, 255, 0.40)',
                borderRightColor: colors.tileMintDark,
                borderBottomColor: colors.tileMintDark,
                shadowColor: colors.tileMintDark
              }
            ]}
          >
            <Ionicons name="arrow-down-circle" size={26} color="#FFFFFF" />
          </View>
          <Text style={styles.tileLabel}>Income</Text>
        </TouchableOpacity>

        {/* Tile 2: Pay Bill / Add Expense (Coral Rose) */}
        <TouchableOpacity
          style={styles.tileCol}
          onPress={onOpenAddExpense}
          accessibilityLabel="Add New Expense"
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileCoral,
                borderTopColor: 'rgba(255, 255, 255, 0.65)',
                borderLeftColor: 'rgba(255, 255, 255, 0.40)',
                borderRightColor: colors.tileCoralDark,
                borderBottomColor: colors.tileCoralDark,
                shadowColor: colors.tileCoralDark
              }
            ]}
          >
            <Ionicons name="arrow-up-circle" size={26} color="#FFFFFF" />
          </View>
          <Text style={styles.tileLabel}>Expense</Text>
        </TouchableOpacity>

        {/* Tile 3: Shop / Categories (Soft Violet) */}
        <TouchableOpacity
          style={styles.tileCol}
          onPress={onToggleCategoryBreakdown}
          accessibilityLabel="Category Breakdown"
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileViolet,
                borderTopColor: 'rgba(255, 255, 255, 0.65)',
                borderLeftColor: 'rgba(255, 255, 255, 0.40)',
                borderRightColor: colors.tileVioletDark,
                borderBottomColor: colors.tileVioletDark,
                shadowColor: colors.tileVioletDark
              }
            ]}
          >
            <Ionicons name="pie-chart" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.tileLabel}>Charts</Text>
        </TouchableOpacity>

        {/* Tile 4: Saving / Export CSV (Cyan Aqua) */}
        <TouchableOpacity
          style={styles.tileCol}
          onPress={onOpenExport}
          accessibilityLabel="Export Statement"
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileCyan,
                borderTopColor: 'rgba(255, 255, 255, 0.65)',
                borderLeftColor: 'rgba(255, 255, 255, 0.40)',
                borderRightColor: colors.tileCyanDark,
                borderBottomColor: colors.tileCyanDark,
                shadowColor: colors.tileCyanDark
              }
            ]}
          >
            <Ionicons name="download" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.tileLabel}>Export</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 22
  },
  clayBankCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: 22,
    borderRadius: 28,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 6,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 22,
    elevation: 12
  },
  decorativeCurve: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  cardBalanceLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4
  },
  cardBalanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6
  },
  mastercardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4
  },
  coin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)'
  },
  coinOrange: {
    backgroundColor: '#FF5722',
    marginRight: -10,
    zIndex: 1
  },
  coinYellow: {
    backgroundColor: '#FFC107'
  },
  cardNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  cardDots: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2
  },
  cardLastDigits: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1
  },
  cardProgressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderTopWidth: 1.5,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.35)',
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    marginBottom: 16
  },
  cardProgressBar: {
    height: '100%',
    borderRadius: 4
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  cardMetaLabel: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 2
  },
  cardMetaValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  quickTilesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  tileCol: {
    alignItems: 'center',
    flex: 1
  },
  clayTile: {
    width: 62,
    height: 62,
    borderRadius: 22,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6
  },
  tileLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 0.2
  }
});
