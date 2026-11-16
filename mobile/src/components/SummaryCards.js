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
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const clayPill = getClayPill(themeMode);

  const totalIncome = summary.total_income || 0;
  const totalExpense = summary.total_expense || 0;
  const remainingBalance = summary.remaining_balance !== undefined ? summary.remaining_balance : (totalIncome - totalExpense);
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  // Dynamic card tone for deficit / alert / healthy
  let cardBg = '#5A44E3';
  let cardBottom = '#3D2BB8';

  if (isOverBudget) {
    cardBg = '#E11D48';
    cardBottom = '#9F1239';
  } else if (isBudgetAlert) {
    cardBg = '#D97706';
    cardBottom = '#92400E';
  }

  const expDateStr = `${String(selectedMonth).padStart(2, '0')}/${String(selectedYear).slice(-2)}`;

  return (
    <View style={styles.container}>
      {/* 1. Signature 3D Inflated Clay Bank Card (Exact reference image style) */}
      <View
        style={[
          styles.clayBankCard,
          {
            backgroundColor: cardBg,
            borderTopColor: 'rgba(255, 255, 255, 0.65)',
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
            <Text style={styles.cardBalanceLabel}>Balance</Text>
            <Text style={styles.cardBalanceAmount}>{formatCurrency(remainingBalance)}</Text>
          </View>

          {/* Overlapping 3D Mastercard Clay Coins (Exact reference image) */}
          <View style={styles.mastercardWrap}>
            <View style={[styles.coin, styles.coinOrange]} />
            <View style={[styles.coin, styles.coinYellow]} />
          </View>
        </View>

        {/* Card Middle: Card Number Dots */}
        <View style={styles.cardNumberRow}>
          <Text style={styles.cardDots}>••••   ••••   ••••</Text>
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

        {/* Card Bottom: Income, Cycle, Expense */}
        <View style={styles.cardBottomRow}>
          <View>
            <View style={styles.metaRow}>
              <View style={[styles.miniIndicator, { backgroundColor: '#34D399' }]} />
              <Text style={styles.cardMetaLabel}>INCOME</Text>
            </View>
            <Text style={styles.cardMetaValue}>{formatCurrency(totalIncome)}</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.cardMetaLabel}>EXP</Text>
            <Text style={styles.cardMetaValue}>{expDateStr}</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.metaRow}>
              <View style={[styles.miniIndicator, { backgroundColor: '#FB7185' }]} />
              <Text style={styles.cardMetaLabel}>EXPENSE</Text>
            </View>
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
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileMint,
                borderTopColor: 'rgba(255, 255, 255, 0.70)',
                borderLeftColor: 'rgba(255, 255, 255, 0.45)',
                borderRightColor: colors.tileMintDark,
                borderBottomColor: colors.tileMintDark,
                shadowColor: colors.tileMintDark
              }
            ]}
          >
            <Ionicons name="arrow-down-circle" size={26} color="#FFFFFF" />
          </View>
          <Text style={styles.tileLabel}>Transfer</Text>
        </TouchableOpacity>

        {/* Tile 2: Pay Bill / Add Expense (Coral Rose) */}
        <TouchableOpacity
          style={styles.tileCol}
          onPress={onOpenAddExpense}
          accessibilityLabel="Add New Expense"
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileCoral,
                borderTopColor: 'rgba(255, 255, 255, 0.70)',
                borderLeftColor: 'rgba(255, 255, 255, 0.45)',
                borderRightColor: colors.tileCoralDark,
                borderBottomColor: colors.tileCoralDark,
                shadowColor: colors.tileCoralDark
              }
            ]}
          >
            <Ionicons name="arrow-up-circle" size={26} color="#FFFFFF" />
          </View>
          <Text style={styles.tileLabel}>Pay Bill</Text>
        </TouchableOpacity>

        {/* Tile 3: Shop / Charts (Soft Violet) */}
        <TouchableOpacity
          style={styles.tileCol}
          onPress={onToggleCategoryBreakdown}
          accessibilityLabel="Category Charts"
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileViolet,
                borderTopColor: 'rgba(255, 255, 255, 0.70)',
                borderLeftColor: 'rgba(255, 255, 255, 0.45)',
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
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.clayTile,
              {
                backgroundColor: colors.tileCyan,
                borderTopColor: 'rgba(255, 255, 255, 0.70)',
                borderLeftColor: 'rgba(255, 255, 255, 0.45)',
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
    paddingTop: 6,
    paddingBottom: 22
  },
  clayBankCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: 22,
    borderRadius: 26,
    borderTopWidth: 3,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 5.5,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.40,
    shadowRadius: 20,
    elevation: 10
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
    color: '#D4CCFD',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3
  },
  cardBalanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.6,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5
  },
  mastercardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4
  },
  coin: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.45)'
  },
  coinOrange: {
    backgroundColor: '#FF6B4A',
    marginRight: -10,
    zIndex: 1
  },
  coinYellow: {
    backgroundColor: '#FFC837'
  },
  cardNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  cardDots: {
    color: 'rgba(255, 255, 255, 0.80)',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2
  },
  cardLastDigits: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1
  },
  cardProgressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    borderTopWidth: 1.5,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.30)',
    borderBottomColor: 'rgba(255, 255, 255, 0.20)',
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2
  },
  miniIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5
  },
  cardMetaLabel: {
    color: '#D4CCFD',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8
  },
  cardMetaValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 1
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
    width: 64,
    height: 64,
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
