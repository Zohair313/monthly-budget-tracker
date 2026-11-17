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
  ActivityIndicator,
  Alert
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

const CATEGORIES = [
  { id: 'Food', label: 'Food', icon: 'fast-food', color: '#E11D48', bg: '#FFF1F2' },
  { id: 'Transport', label: 'Transport', icon: 'car-sport', color: '#0284C7', bg: '#F0F9FF' },
  { id: 'Bills', label: 'Bills', icon: 'flash', color: '#D97706', bg: '#FFFBEB' },
  { id: 'Shopping', label: 'Shopping', icon: 'bag-handle', color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'Entertainment', label: 'Fun', icon: 'game-controller', color: '#EC4899', bg: '#FDF2F8' },
  { id: 'Health', label: 'Health', icon: 'medkit', color: '#059669', bg: '#ECFDF5' },
  { id: 'Other', label: 'Other', icon: 'cube', color: '#64748B', bg: '#F1F5F9' }
];

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

export default function ExpenseAccordion({ isExpanded, onToggle, onEditExpense }) {
  const { summary, expenses, addExpense, deleteExpense, selectedMonth, selectedYear } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const clayCard = getClayCard(themeMode);
  const clayPill = getClayPill(themeMode);
  const clayInput = getClayInput(themeMode);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [isAdding, setIsAdding] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Chevron rotation animation
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [isExpanded]);

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (onToggle) onToggle();
  };

  const handleAddExpense = async () => {
    setFeedbackMsg('');
    if (!title.trim()) {
      setFeedbackMsg('Please enter an expense title.');
      return;
    }
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setFeedbackMsg('Please enter a valid expense amount greater than 0.');
      return;
    }

    setIsAdding(true);
    try {
      // Build date for currently selected month
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      let expenseDate;

      if (selectedYear === currentYear && selectedMonth === currentMonth) {
        expenseDate = today.toISOString().split('T')[0];
      } else {
        const paddedMonth = String(selectedMonth).padStart(2, '0');
        expenseDate = `${selectedYear}-${paddedMonth}-01`;
      }

      await addExpense({
        name: title.trim(),
        title: title.trim(),
        amount: num,
        category,
        date: expenseDate
      });

      setTitle('');
      setAmount('');
      setCategory('Food');
      setFeedbackMsg('✓ Expense added successfully!');
      setTimeout(() => setFeedbackMsg(''), 4000);
    } catch (err) {
      setFeedbackMsg(err.message || 'Failed to add expense.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteExpense = async (id, itemTitle) => {
    const performDelete = async () => {
      setDeletingId(id);
      try {
        await deleteExpense(id);
      } catch (err) {
        Alert.alert('Error', err.message || 'Could not delete expense.');
      } finally {
        setDeletingId(null);
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Delete "${itemTitle}"?`)) {
        performDelete();
      }
    } else {
      Alert.alert(
        'Delete Expense',
        `Are you sure you want to delete "${itemTitle}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: performDelete }
        ]
      );
    }
  };

  const totalExpense = summary.total_expense || 0;
  const totalIncome = summary.total_income || 0;
  const burnRate = summary.burn_rate_percent || 0;
  const isOverBudget = summary.remaining_balance !== undefined ? summary.remaining_balance < 0 : false;
  const isBudgetAlert = summary.is_budget_alert || burnRate >= 80;

  return (
    <View
      style={[
        styles.container,
        clayCard,
        {
          borderColor: isExpanded ? colors.expense : colors.border,
          borderWidth: isExpanded ? 1.5 : 1
        }
      ]}
    >
      {/* Accordion Header (Clickable) */}
      <TouchableOpacity
        style={styles.headerTouch}
        onPress={handleToggle}
        activeOpacity={0.8}
        accessibilityLabel="Toggle Monthly Expense Accordion"
      >
        <View style={styles.headerLeft}>
          {/* 3D Coral/Rose Clay Icon Coin */}
          <View
            style={[
              styles.iconCoin,
              {
                backgroundColor: colors.expenseSurface,
                borderColor: colors.expenseBorder,
                borderTopColor: 'rgba(255, 255, 255, 0.8)'
              }
            ]}
          >
            <Ionicons name="receipt" size={22} color={colors.expense} />
          </View>

          <View style={styles.headerTextGroup}>
            <View style={styles.titleRow}>
              <Text style={[styles.accordionTitle, { color: colors.text }]}>Monthly Expenses</Text>
              <View
                style={[
                  styles.badgePill,
                  clayPill,
                  {
                    backgroundColor: isOverBudget ? '#FFE4E6' : (isBudgetAlert ? '#FEF3C7' : colors.expenseLight),
                    borderColor: isOverBudget ? '#FDA4AF' : (isBudgetAlert ? '#FDE68A' : colors.expenseBorder)
                  }
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isOverBudget ? '#E11D48' : (isBudgetAlert ? '#D97706' : colors.expense) }
                  ]}
                >
                  {expenses.length} {expenses.length === 1 ? 'Item' : 'Items'}
                </Text>
              </View>
            </View>

            <Text style={[styles.accordionSubtitle, { color: colors.textSecondary }]}>
              {MONTH_NAMES[selectedMonth - 1]} {selectedYear} • {burnRate}% of income
            </Text>
          </View>
        </View>

        {/* Header Right: Amount & Animated Chevron */}
        <View style={styles.headerRight}>
          <Text style={[styles.amountText, { color: colors.expense }]}>
            {formatCurrency(totalExpense)}
          </Text>

          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Accordion Body (Expanded View) */}
      {isExpanded && (
        <View style={[styles.expandedContent, { borderTopColor: colors.borderSubtle }]}>
          {/* Budget Consumption Progress Bar */}
          <View style={[styles.budgetStatusBar, { backgroundColor: colors.surfaceSubtle }]}>
            <View style={styles.statusBarHeader}>
              <Text style={[styles.statusBarTitle, { color: colors.textSecondary }]}>
                BUDGET CONSUMED
              </Text>
              <Text
                style={[
                  styles.statusBarValue,
                  { color: isOverBudget ? colors.expense : (isBudgetAlert ? colors.warning : colors.income) }
                ]}
              >
                {burnRate}% {isOverBudget ? '(Over Budget)' : (isBudgetAlert ? '(Caution 80%)' : '(Safe)')}
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min(burnRate, 100)}%`,
                    backgroundColor: isOverBudget ? colors.expense : (isBudgetAlert ? colors.warning : colors.primary)
                  }
                ]}
              />
            </View>
          </View>

          {/* Tab Switcher: Add Form vs Expense List */}
          <View style={styles.tabSwitcher}>
            <TouchableOpacity
              style={[
                styles.tabBtn,
                showForm && styles.tabBtnActive,
                showForm && { backgroundColor: colors.primary }
              ]}
              onPress={() => setShowForm(true)}
            >
              <Ionicons
                name="add-circle"
                size={16}
                color={showForm ? '#FFFFFF' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  { color: showForm ? '#FFFFFF' : colors.textSecondary }
                ]}
              >
                + Add Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabBtn,
                !showForm && styles.tabBtnActive,
                !showForm && { backgroundColor: colors.primary }
              ]}
              onPress={() => setShowForm(false)}
            >
              <Ionicons
                name="list"
                size={16}
                color={!showForm ? '#FFFFFF' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  { color: !showForm ? '#FFFFFF' : colors.textSecondary }
                ]}
              >
                View Items ({expenses.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Mode: Inline Add Expense */}
          {showForm ? (
            <View style={styles.formSection}>
              {/* Expense Title Input */}
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                EXPENSE TITLE / DESCRIPTION
              </Text>
              <View style={[styles.inputRow, clayInput]}>
                <Ionicons name="pricetag-outline" size={18} color={colors.textTertiary} />
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  placeholder="e.g. Starbucks, Groceries, Electricity"
                  placeholderTextColor={colors.textTertiary}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              {/* Expense Amount Input */}
              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 12 }]}>
                AMOUNT (PKR)
              </Text>
              <View style={[styles.inputRow, clayInput]}>
                <Text style={[styles.currencyPrefix, { color: colors.expense }]}>Rs.</Text>
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  keyboardType="numeric"
                  placeholder="1200"
                  placeholderTextColor={colors.textTertiary}
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>

              {/* Category Pills */}
              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 12 }]}>
                SELECT CATEGORY
              </Text>
              <View style={styles.categoryWrap}>
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryChip,
                        {
                          backgroundColor: isSelected ? cat.bg : colors.surfaceSubtle,
                          borderColor: isSelected ? cat.color : colors.border,
                          borderWidth: isSelected ? 1.5 : 1
                        }
                      ]}
                      onPress={() => setCategory(cat.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={cat.icon}
                        size={15}
                        color={isSelected ? cat.color : colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.categoryChipText,
                          {
                            color: isSelected ? cat.color : colors.textSecondary,
                            fontWeight: isSelected ? '700' : '500'
                          }
                        ]}
                      >
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
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

              {/* Action Button: Save Expense */}
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  { backgroundColor: colors.expense }
                ]}
                onPress={handleAddExpense}
                disabled={isAdding}
                activeOpacity={0.85}
              >
                {isAdding ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="add-circle" size={18} color="#FFFFFF" />
                    <Text style={styles.saveBtnText}>Add Expense Record</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            /* List Mode: Inline Expense Items */
            <View style={styles.itemsListContainer}>
              {expenses.length === 0 ? (
                <View style={styles.emptyItemsBox}>
                  <Ionicons name="receipt-outline" size={36} color={colors.textTertiary} />
                  <Text style={[styles.emptyItemsTitle, { color: colors.textSecondary }]}>
                    No expenses recorded yet
                  </Text>
                  <Text style={[styles.emptyItemsSub, { color: colors.textTertiary }]}>
                    Tap "+ Add Expense" above to record your first spending.
                  </Text>
                </View>
              ) : (
                expenses.map((item) => {
                  const catConfig = CATEGORIES.find(c => c.id === item.category) || CATEGORIES[6];
                  const isDeleting = deletingId === item.id;

                  return (
                    <View
                      key={item.id}
                      style={[
                        styles.expenseItemRow,
                        { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }
                      ]}
                    >
                      {/* Icon */}
                      <View style={[styles.itemIconBox, { backgroundColor: catConfig.bg }]}>
                        <Ionicons name={catConfig.icon} size={18} color={catConfig.color} />
                      </View>

                      {/* Title & Date */}
                      <View style={styles.itemMeta}>
                        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
                          {item.title || item.name}
                        </Text>
                        <Text style={[styles.itemDate, { color: colors.textTertiary }]}>
                          {item.date} • {item.category}
                        </Text>
                      </View>

                      {/* Amount & Actions */}
                      <View style={styles.itemRightWrap}>
                        <Text style={[styles.itemAmount, { color: colors.expense }]}>
                          -{formatCurrency(item.amount)}
                        </Text>

                        <View style={styles.itemActions}>
                          {onEditExpense && (
                            <TouchableOpacity
                              style={styles.actionIconBtn}
                              onPress={() => onEditExpense(item)}
                              accessibilityLabel="Edit expense"
                            >
                              <Ionicons name="pencil" size={14} color={colors.primary} />
                            </TouchableOpacity>
                          )}

                          <TouchableOpacity
                            style={styles.actionIconBtn}
                            onPress={() => handleDeleteExpense(item.id, item.title)}
                            disabled={isDeleting}
                            accessibilityLabel="Delete expense"
                          >
                            {isDeleting ? (
                              <ActivityIndicator size="small" color={colors.expense} />
                            ) : (
                              <Ionicons name="trash-outline" size={15} color={colors.expense} />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    marginBottom: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4
  },
  headerTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14
  },
  iconCoin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2
  },
  headerTextGroup: {
    flex: 1
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap'
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  accordionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  amountText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  expandedContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1
  },
  budgetStatusBar: {
    padding: 12,
    borderRadius: 14,
    marginBottom: 14
  },
  statusBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  statusBarTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  statusBarValue: {
    fontSize: 11,
    fontWeight: '700'
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    marginBottom: 16
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6
  },
  tabBtnActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '700'
  },
  formSection: {
    marginTop: 2
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
    gap: 8,
    backgroundColor: '#F8FAFC'
  },
  currencyPrefix: {
    fontSize: 15,
    fontWeight: '700'
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    padding: 0
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
    marginBottom: 14
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    gap: 6
  },
  categoryChipText: {
    fontSize: 11
  },
  feedbackBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center'
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  itemsListContainer: {
    marginTop: 4
  },
  emptyItemsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 6
  },
  emptyItemsTitle: {
    fontSize: 14,
    fontWeight: '700'
  },
  emptyItemsSub: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  expenseItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
    gap: 12
  },
  itemIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemMeta: {
    flex: 1
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700'
  },
  itemDate: {
    fontSize: 11,
    marginTop: 2
  },
  itemRightWrap: {
    alignItems: 'flex-end',
    gap: 4
  },
  itemAmount: {
    fontSize: 13,
    fontWeight: '700'
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  actionIconBtn: {
    padding: 4
  }
});
