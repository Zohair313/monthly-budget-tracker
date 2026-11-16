import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard, getClayButton, getClayInput, getClayPill } from '../theme/colors';

const CATEGORIES = [
  'General', 'Food', 'Bills', 'Travel', 'Shopping', 'Health', 'Entertainment', 'Education'
];

const CATEGORY_ICONS = {
  Food: 'restaurant-outline',
  Bills: 'receipt-outline',
  Travel: 'car-outline',
  Shopping: 'bag-handle-outline',
  Health: 'medkit-outline',
  Entertainment: 'film-outline',
  Education: 'book-outline',
  General: 'pricetag-outline'
};

const CATEGORY_COLORS = {
  Food: '#F59E0B',
  Bills: '#6366F1',
  Travel: '#14B8A6',
  Shopping: '#EC4899',
  Health: '#10B981',
  Entertainment: '#8B5CF6',
  Education: '#EAB308',
  General: '#64748B'
};

const CATEGORY_DARK_COLORS = {
  Food: '#B45309',
  Bills: '#4338CA',
  Travel: '#0F766E',
  Shopping: '#BE185D',
  Health: '#047857',
  Entertainment: '#6D28D9',
  Education: '#A16207',
  General: '#334155'
};

export default function AddEditExpenseModal({ visible, onClose, editingExpense }) {
  const { summary, addExpense, editExpense } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.dark;
  const clayCard = getClayCard(themeMode);
  const clayInput = getClayInput(themeMode);
  const clayPill = getClayPill(themeMode);

  const [name, setName] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [category, setCategory] = useState('General');
  const [date, setDate] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible) {
      setErrorText('');
      if (editingExpense) {
        setName(editingExpense.name || '');
        setAmountStr(String(editingExpense.amount || ''));
        setCategory(editingExpense.category || 'General');
        setDate(editingExpense.date ? editingExpense.date.split('T')[0] : new Date().toISOString().split('T')[0]);
      } else {
        setName('');
        setAmountStr('');
        setCategory('General');
        setDate(new Date().toISOString().split('T')[0]);
      }
    }
  }, [visible, editingExpense]);

  // Balance warning calculation
  const currentRemaining = summary.remaining_balance || 0;
  const numAmount = parseFloat(amountStr) || 0;
  const effectiveAvailable = editingExpense
    ? currentRemaining + (parseFloat(editingExpense.amount) || 0)
    : currentRemaining;

  const isExceeding = numAmount > 0 && numAmount > effectiveAvailable;
  const deficitAmount = numAmount - effectiveAvailable;

  const handleSubmit = async () => {
    setErrorText('');

    if (!name || name.trim().length === 0) {
      setErrorText('Expense name is required.');
      return;
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorText('Expense amount must be a positive number greater than 0.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingExpense) {
        await editExpense(editingExpense.id, {
          name: name.trim(),
          amount: numAmount,
          category,
          date
        });
      } else {
        await addExpense({
          name: name.trim(),
          amount: numAmount,
          category,
          date
        });
      }
      onClose();
    } catch (err) {
      setErrorText(err.message || 'Failed to save expense.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const btnBg = editingExpense ? colors.primary : colors.expense;
  const btnBottom = editingExpense ? colors.primaryDark : colors.expenseDark;
  const submitButtonClay = getClayButton(themeMode, btnBg, btnBottom);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={[styles.modalCard, clayCard]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: editingExpense ? colors.primaryLight : colors.expenseLight,
                    borderTopColor: 'rgba(255, 255, 255, 0.45)',
                    borderBottomColor: editingExpense ? colors.primaryDark : colors.expenseDark
                  }
                ]}
              >
                <Ionicons
                  name={editingExpense ? 'pencil-outline' : 'add-outline'}
                  size={20}
                  color={editingExpense ? colors.primary : colors.expense}
                />
              </View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.closeBtn,
                {
                  backgroundColor: colors.surfaceSubtle,
                  borderTopColor: colors.clayBorderTop,
                  borderBottomColor: colors.clayBorderBottom
                }
              ]}
            >
              <Ionicons name="close" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
            {/* Field 1: Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>EXPENSE NAME</Text>
              <View style={[styles.inputBox, clayInput]}>
                <Ionicons name="pricetag-outline" size={18} color={colors.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  placeholder="e.g. Grocery Shopping, Electric Bill"
                  placeholderTextColor={colors.textTertiary}
                  value={name}
                  onChangeText={setName}
                  autoFocus={!editingExpense}
                />
              </View>
            </View>

            {/* Field 2: Amount */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>AMOUNT (PKR / RS)</Text>
              <View style={[styles.inputBox, clayInput]}>
                <Text style={[styles.currencyPrefix, { color: colors.textSecondary }]}>Rs.</Text>
                <TextInput
                  style={[styles.amountInput, { color: colors.expense }]}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.textTertiary}
                  value={amountStr}
                  onChangeText={setAmountStr}
                />
              </View>
            </View>

            {/* Over-budget Warning Notice */}
            {isExceeding && (
              <View
                style={[
                  styles.warningBox,
                  clayPill,
                  {
                    backgroundColor: colors.warningLight,
                    borderBottomColor: colors.warningDark,
                    borderRadius: 14
                  }
                ]}
              >
                <Ionicons name="warning" size={18} color={colors.warning} />
                <View style={styles.warningContent}>
                  <Text style={[styles.warningTitle, { color: colors.warning }]}>
                    Expense Exceeds Remaining Balance
                  </Text>
                  <Text style={[styles.warningText, { color: colors.textSecondary }]}>
                    Adding this will put your monthly budget in deficit by Rs. {deficitAmount.toLocaleString()}.
                  </Text>
                  <Text style={[styles.policyNotice, { color: colors.textTertiary }]}>
                    Policy: Allowed with warning. Balance will update automatically.
                  </Text>
                </View>
              </View>
            )}

            {/* Field 3: Category Chips */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>CATEGORY</Text>
              <View style={styles.categoryWrap}>
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat;
                  const catColor = CATEGORY_COLORS[cat] || colors.primary;
                  const catDarkColor = CATEGORY_DARK_COLORS[cat] || colors.primaryDark;
                  const iconName = CATEGORY_ICONS[cat] || 'pricetag-outline';

                  return (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={[
                        styles.catChip,
                        clayPill,
                        isSelected
                          ? {
                              backgroundColor: catColor,
                              borderTopColor: 'rgba(255, 255, 255, 0.45)',
                              borderBottomColor: catDarkColor
                            }
                          : {
                              backgroundColor: colors.surfaceSubtle
                            }
                      ]}
                    >
                      <Ionicons
                        name={iconName}
                        size={13}
                        color={isSelected ? '#FFFFFF' : catColor}
                      />
                      <Text
                        style={[
                          styles.catChipText,
                          {
                            color: isSelected ? '#FFFFFF' : colors.text,
                            fontWeight: isSelected ? '800' : '600'
                          }
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Field 4: Date */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>DATE (YYYY-MM-DD)</Text>
              <View style={[styles.inputBox, clayInput]}>
                <Ionicons name="calendar-outline" size={18} color={colors.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  placeholder="2026-11-16"
                  placeholderTextColor={colors.textTertiary}
                  value={date}
                  onChangeText={setDate}
                />
              </View>
            </View>

            {errorText.length > 0 && (
              <View
                style={[
                  styles.errorBox,
                  clayPill,
                  {
                    backgroundColor: colors.expenseLight,
                    borderBottomColor: colors.expenseDark
                  }
                ]}
              >
                <Ionicons name="alert-circle-outline" size={14} color={colors.expense} />
                <Text style={[styles.errorText, { color: colors.expense }]}>{errorText}</Text>
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.cancelBtn,
                clayPill,
                {
                  backgroundColor: colors.surfaceSubtle
                }
              ]}
              disabled={isSubmitting}
            >
              <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.submitBtn, submitButtonClay]}
              disabled={isSubmitting}
            >
              <Text style={styles.submitBtnText}>
                {isSubmitting ? 'Saving...' : editingExpense ? 'Update Expense' : 'Save Expense'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    maxHeight: '90%',
    padding: 22
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderTopWidth: 1.5,
    borderBottomWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formScroll: {
    maxHeight: 420
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginBottom: 6
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  inputIcon: {
    marginRight: 10
  },
  currencyPrefix: {
    fontSize: 16,
    fontWeight: '800',
    marginRight: 6
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    padding: 0
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    padding: 0
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    marginBottom: 16
  },
  warningContent: {
    flex: 1
  },
  warningTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 3
  },
  warningText: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16
  },
  policyNotice: {
    fontSize: 10,
    marginTop: 4,
    fontStyle: 'italic'
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  catChipText: {
    fontSize: 12
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14
  },
  errorText: {
    fontSize: 11,
    fontWeight: '700'
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700'
  },
  submitBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  }
});
