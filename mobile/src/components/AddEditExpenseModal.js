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
import { palette } from '../theme/colors';

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

export default function AddEditExpenseModal({ visible, onClose, editingExpense }) {
  const { summary, addExpense, editExpense } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

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

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: editingExpense ? colors.primaryLight : colors.expenseLight }
                ]}
              >
                <Ionicons
                  name={editingExpense ? 'pencil-outline' : 'add-outline'}
                  size={18}
                  color={editingExpense ? colors.primary : colors.expense}
                />
              </View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
            {/* Field 1: Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>EXPENSE NAME</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                <Ionicons name="create-outline" size={16} color={colors.textTertiary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  placeholder="e.g. Electricity Bill, Groceries"
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
              <View style={[styles.inputBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                <Text style={[styles.currencyPrefix, { color: colors.textSecondary }]}>Rs.</Text>
                <TextInput
                  style={[styles.amountInput, { color: colors.text }]}
                  keyboardType="numeric"
                  placeholder="8000"
                  placeholderTextColor={colors.textTertiary}
                  value={amountStr}
                  onChangeText={setAmountStr}
                />
              </View>
            </View>

            {/* Live Balance Warning Banner (Validation Rule Requirement) */}
            {isExceeding && (
              <View style={[styles.warningBox, { backgroundColor: colors.warningLight, borderColor: colors.warning }]}>
                <Ionicons name="warning" size={16} color={colors.warning} />
                <View style={styles.warningContent}>
                  <Text style={[styles.warningTitle, { color: colors.warning }]}>Balance Exceeded Warning</Text>
                  <Text style={[styles.warningText, { color: colors.text }]}>
                    This expense of Rs. {numAmount.toLocaleString()} exceeds your remaining balance (Rs.{' '}
                    {effectiveAvailable.toLocaleString()}) by Rs. {deficitAmount.toLocaleString()}.
                  </Text>
                  <Text style={[styles.policyNotice, { color: colors.textSecondary }]}>
                    ℹ️ Trainee Policy: Allowed with warning to record unexpected expenses.
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
                  const iconName = CATEGORY_ICONS[cat] || 'pricetag-outline';

                  return (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setCategory(cat)}
                      style={[
                        styles.catChip,
                        {
                          backgroundColor: isSelected ? colors.primaryLight : colors.surfaceSubtle,
                          borderColor: isSelected ? colors.primary : colors.borderSubtle
                        }
                      ]}
                    >
                      <Ionicons
                        name={iconName}
                        size={12}
                        color={isSelected ? colors.primary : colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.catChipText,
                          {
                            color: isSelected ? colors.primary : colors.textSecondary,
                            fontWeight: isSelected ? '700' : '500'
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
              <View style={[styles.inputBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
                <Ionicons name="calendar-outline" size={16} color={colors.textTertiary} style={styles.inputIcon} />
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
              <View style={[styles.errorBox, { backgroundColor: colors.expenseLight }]}>
                <Ionicons name="alert-circle-outline" size={14} color={colors.expense} />
                <Text style={[styles.errorText, { color: colors.expense }]}>{errorText}</Text>
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.cancelBtn, { borderColor: colors.border }]}
              disabled={isSubmitting}
            >
              <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitBtn,
                { backgroundColor: editingExpense ? colors.primary : colors.expense }
              ]}
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
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  closeBtn: {
    padding: 4
  },
  formScroll: {
    maxHeight: 400
  },
  inputGroup: {
    marginBottom: 14
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 6
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  inputIcon: {
    marginRight: 8
  },
  currencyPrefix: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    padding: 0
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    padding: 0
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14
  },
  warningContent: {
    flex: 1
  },
  warningTitle: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2
  },
  warningText: {
    fontSize: 11,
    lineHeight: 15
  },
  policyNotice: {
    fontSize: 10,
    marginTop: 4,
    fontStyle: 'italic'
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1
  },
  catChipText: {
    fontSize: 11
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 8,
    marginBottom: 14
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600'
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600'
  },
  submitBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700'
  }
});
