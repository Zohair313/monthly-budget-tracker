import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function SetIncomeModal({ visible, onClose }) {
  const { selectedMonth, selectedYear, incomeData, updateIncome } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

  const [amountStr, setAmountStr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (visible) {
      setAmountStr(incomeData?.amount ? String(incomeData.amount) : '');
      setErrorText('');
    }
  }, [visible, incomeData]);

  const handleSubmit = async () => {
    setErrorText('');
    const num = parseFloat(amountStr);

    if (isNaN(num) || num < 0) {
      setErrorText('Please enter a valid non-negative income amount.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateIncome(num);
      onClose();
    } catch (err) {
      setErrorText(err.message || 'Failed to update income.');
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
              <View style={[styles.iconWrap, { backgroundColor: colors.incomeLight }]}>
                <Ionicons name="wallet-outline" size={18} color={colors.income} />
              </View>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Set Monthly Income</Text>
                <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                  {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Quick Explanatory Note */}
          <View style={[styles.infoBanner, { backgroundColor: colors.surfaceSubtle, borderColor: colors.borderSubtle }]}>
            <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            <Text style={[styles.infoBannerText, { color: colors.textSecondary }]}>
              Setting your income will automatically recalculate your remaining balance for {MONTH_NAMES[selectedMonth - 1]}.
            </Text>
          </View>

          {/* Amount Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>INCOME AMOUNT (PKR / RS)</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.surfaceSubtle, borderColor: colors.border }]}>
              <Text style={[styles.currencyPrefix, { color: colors.textSecondary }]}>Rs.</Text>
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                keyboardType="numeric"
                placeholder="100000"
                placeholderTextColor={colors.textTertiary}
                value={amountStr}
                onChangeText={setAmountStr}
                autoFocus
              />
            </View>
          </View>

          {errorText.length > 0 && (
            <View style={[styles.errorBox, { backgroundColor: colors.expenseLight }]}>
              <Ionicons name="alert-circle-outline" size={14} color={colors.expense} />
              <Text style={[styles.errorText, { color: colors.expense }]}>{errorText}</Text>
            </View>
          )}

          {/* Actions */}
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
              style={[styles.submitBtn, { backgroundColor: colors.primary }]}
              disabled={isSubmitting}
            >
              <Text style={styles.submitBtnText}>
                {isSubmitting ? 'Saving...' : 'Save Income'}
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
    maxWidth: 400,
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
  modalSubtitle: {
    fontSize: 12,
    marginTop: 1
  },
  closeBtn: {
    padding: 4
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16
  },
  infoBannerText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 15
  },
  inputGroup: {
    marginBottom: 16
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
  currencyPrefix: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    padding: 0
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
    gap: 10
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
