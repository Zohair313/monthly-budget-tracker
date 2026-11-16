import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

export default function BudgetAlertBanner() {
  const { summary, lastWarning, clearWarning } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

  const totalIncome = summary.total_income || 0;
  const remainingBalance = summary.remaining_balance || 0;
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = remainingBalance < 0;
  const isBudgetAlert = summary.is_budget_alert || (totalIncome > 0 && burnRate >= 80);

  if (!lastWarning && !isOverBudget && !isBudgetAlert) {
    return null;
  }

  // 1. If user just triggered an over-budget transaction warning
  if (lastWarning) {
    return (
      <View style={[styles.banner, { backgroundColor: colors.warningLight, borderColor: colors.warning }]}>
        <Ionicons name="warning" size={18} color={colors.warning} style={styles.icon} />
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: colors.warning }]}>Balance Notice</Text>
          <Text style={[styles.desc, { color: colors.text }]}>{lastWarning}</Text>
        </View>
        <TouchableOpacity onPress={clearWarning} style={styles.dismissBtn}>
          <Ionicons name="close" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    );
  }

  // 2. Persistent Over-Budget Deficit Warning
  if (isOverBudget) {
    return (
      <View style={[styles.banner, { backgroundColor: colors.expenseLight, borderColor: colors.expense }]}>
        <Ionicons name="alert-circle" size={18} color={colors.expense} style={styles.icon} />
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: colors.expense }]}>Over-Budget Deficit Alert</Text>
          <Text style={[styles.desc, { color: colors.text }]}>
            Total expenses exceed this month's income by Rs. {Math.abs(remainingBalance).toLocaleString()}.
          </Text>
        </View>
      </View>
    );
  }

  // 3. 80% Threshold Budget Alert (Bonus Requirement)
  if (isBudgetAlert) {
    return (
      <View style={[styles.banner, { backgroundColor: colors.warningLight, borderColor: colors.warning }]}>
        <Ionicons name="notifications" size={18} color={colors.warning} style={styles.icon} />
        <View style={styles.textWrap}>
          <Text style={[styles.title, { color: colors.warning }]}>80% Budget Alert</Text>
          <Text style={[styles.desc, { color: colors.text }]}>
            You have spent {burnRate}% of your monthly income. Only Rs. {remainingBalance.toLocaleString()} remaining.
          </Text>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 2,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  },
  textWrap: {
    flex: 1
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: 0.2
  },
  desc: {
    fontSize: 11,
    lineHeight: 15
  },
  dismissBtn: {
    padding: 4,
    marginLeft: 6
  }
});
