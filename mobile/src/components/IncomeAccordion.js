import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  ActivityIndicator
} from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard, getClayButton, getClayInput, getClayPill } from '../theme/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

export default function IncomeAccordion({ isExpanded, onToggle }) {
  const { summary, incomeData, updateIncome, selectedMonth, selectedYear } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const clayCard = getClayCard(themeMode);
  const clayPill = getClayPill(themeMode);
  const clayInput = getClayInput(themeMode);

  const [inputAmount, setInputAmount] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Chevron rotation animation
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [isExpanded]);

  useEffect(() => {
    if (incomeData?.amount) {
      setInputAmount(String(incomeData.amount));
    } else {
      setInputAmount('');
    }
    setFeedbackMsg('');
  }, [incomeData, selectedMonth, selectedYear]);

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (onToggle) onToggle();
  };

  const handleSaveIncome = async () => {
    setFeedbackMsg('');
    const num = parseFloat(inputAmount);

    if (isNaN(num) || num < 0) {
      setFeedbackMsg('Please enter a valid non-negative income amount.');
      return;
    }

    setIsSaving(true);
    try {
      await updateIncome(num);
      setFeedbackMsg('✓ Income saved! Balance updated dynamically.');
      setTimeout(() => setFeedbackMsg(''), 4000);
    } catch (err) {
      setFeedbackMsg(err.message || 'Failed to save income.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreset = (val) => {
    setInputAmount(String(val));
  };

  const totalIncome = summary.total_income || 0;
  const isIncomeSet = totalIncome > 0;

  return (
    <View
      style={[
        styles.container,
        clayCard,
        {
          borderColor: isExpanded ? colors.income : colors.border,
          borderWidth: isExpanded ? 1.5 : 1
        }
      ]}
    >
      {/* Accordion Header (Clickable) */}
      <TouchableOpacity
        style={styles.headerTouch}
        onPress={handleToggle}
        activeOpacity={0.8}
        accessibilityLabel="Toggle Monthly Income Accordion"
      >
        <View style={styles.headerLeft}>
          {/* 3D Mint Clay Icon Coin */}
          <View
            style={[
              styles.iconCoin,
              {
                backgroundColor: colors.incomeSurface,
                borderColor: colors.incomeBorder,
                borderTopColor: 'rgba(255, 255, 255, 0.8)'
              }
            ]}
          >
            <Ionicons name="arrow-down-circle" size={24} color={colors.income} />
          </View>

          <View style={styles.headerTextGroup}>
            <View style={styles.titleRow}>
              <Text style={[styles.accordionTitle, { color: colors.text }]}>Monthly Income</Text>
              <View
                style={[
                  styles.badgePill,
                  clayPill,
                  {
                    backgroundColor: isIncomeSet ? colors.incomeLight : colors.surfaceSubtle,
                    borderColor: isIncomeSet ? colors.incomeBorder : colors.border
                  }
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isIncomeSet ? colors.income : colors.textSecondary }
                  ]}
                >
                  {isIncomeSet ? 'Target Set' : 'Not Set'}
                </Text>
              </View>
            </View>

            <Text style={[styles.accordionSubtitle, { color: colors.textSecondary }]}>
              {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
            </Text>
          </View>
        </View>

        {/* Header Right: Amount & Animated Chevron */}
        <View style={styles.headerRight}>
          <Text style={[styles.amountText, { color: colors.income }]}>
            {formatCurrency(totalIncome)}
          </Text>

          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Accordion Body (Expanded View) */}
      {isExpanded && (
        <View style={[styles.expandedContent, { borderTopColor: colors.borderSubtle }]}>
          {/* Explanatory Policy Banner */}
          <View style={[styles.policyNotice, { backgroundColor: colors.incomeLight, borderColor: colors.incomeBorder }]}>
            <Ionicons name="information-circle" size={16} color={colors.income} />
            <Text style={[styles.policyNoticeText, { color: colors.incomeDark }]}>
              Income is never hardcoded. Changing your income automatically recalculates your remaining balance for {MONTH_NAMES[selectedMonth - 1]}.
            </Text>
          </View>

          {/* Quick Metrics Bar */}
          <View style={[styles.metricsBar, { backgroundColor: colors.surfaceSubtle }]}>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>BASE INCOME</Text>
              <Text style={[styles.metricVal, { color: colors.income }]}>{formatCurrency(totalIncome)}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>TOTAL SPENT</Text>
              <Text style={[styles.metricVal, { color: colors.expense }]}>{formatCurrency(summary.total_expense || 0)}</Text>
            </View>
          </View>

          {/* Inline Set/Update Income Form */}
          <View style={styles.formSection}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
              ENTER OR UPDATE INCOME AMOUNT (PKR)
            </Text>

            <View style={[styles.inputRow, clayInput]}>
              <Text style={[styles.currencyPrefix, { color: colors.income }]}>Rs.</Text>
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                keyboardType="numeric"
                placeholder="100000"
                placeholderTextColor={colors.textTertiary}
                value={inputAmount}
                onChangeText={setInputAmount}
              />
            </View>

            {/* Quick Presets */}
            <View style={styles.presetRow}>
              {[50000, 100000, 150000, 200000].map((preset) => (
                <TouchableOpacity
                  key={preset}
                  style={[styles.presetChip, clayPill, { backgroundColor: colors.surface }]}
                  onPress={() => handlePreset(preset)}
                >
                  <Text style={[styles.presetText, { color: colors.textSecondary }]}>
                    Rs. {(preset / 1000)}k
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Feedback Message */}
            {feedbackMsg.length > 0 && (
              <View
                style={[
                  styles.feedbackBox,
                  {
                    backgroundColor: feedbackMsg.includes('✓') ? colors.incomeLight : colors.expenseLight,
                    borderColor: feedbackMsg.includes('✓') ? colors.incomeBorder : colors.expenseBorder
                  }
                ]}
              >
                <Text
                  style={[
                    styles.feedbackText,
                    { color: feedbackMsg.includes('✓') ? colors.income : colors.expense }
                  ]}
                >
                  {feedbackMsg}
                </Text>
              </View>
            )}

            {/* Save Income Button */}
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: colors.income,
                  borderTopColor: 'rgba(255, 255, 255, 0.4)',
                  borderBottomColor: colors.incomeDark
                }
              ]}
              onPress={handleSaveIncome}
              disabled={isSaving}
              activeOpacity={0.8}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <View style={styles.saveBtnContent}>
                  <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>Save Income Amount</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 22,
    overflow: 'hidden'
  },
  headerTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconCoin: {
    width: 46,
    height: 46,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  headerTextGroup: {
    flex: 1
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800'
  },
  accordionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  amountText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.4
  },
  expandedContent: {
    borderTopWidth: 1,
    padding: 16
  },
  policyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14
  },
  policyNoticeText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15
  },
  metricsBar: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 12,
    justifyContent: 'space-around',
    marginBottom: 16
  },
  metricItem: {
    alignItems: 'center'
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 2
  },
  metricVal: {
    fontSize: 14,
    fontWeight: '800'
  },
  metricDivider: {
    width: 1,
    backgroundColor: '#CBD5E1'
  },
  formSection: {
    gap: 10
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  currencyPrefix: {
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    padding: 0
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4
  },
  presetChip: {
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  presetText: {
    fontSize: 11,
    fontWeight: '700'
  },
  feedbackBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  feedbackText: {
    fontSize: 11,
    fontWeight: '700'
  },
  saveButton: {
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    borderTopWidth: 1.5,
    borderBottomWidth: 3
  },
  saveBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800'
  }
});
