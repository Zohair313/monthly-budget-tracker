import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard, getClayButton, getClayInput, getClayPill } from '../theme/colors';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function SetIncomeModal({ visible, onClose }) {
  const { selectedMonth, selectedYear, incomeData, updateIncome } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.dark;
  const clayCard = getClayCard(themeMode);
  const clayButton = getClayButton(themeMode, colors.primary, colors.primaryDark);
  const clayInput = getClayInput(themeMode);
  const clayPill = getClayPill(themeMode);

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
        <View style={[styles.modalCard, clayCard]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: colors.incomeLight,
                    borderTopColor: 'rgba(255, 255, 255, 0.45)',
                    borderBottomColor: colors.incomeDark
                  }
                ]}
              >
                <Ionicons name="wallet-outline" size={20} color={colors.income} />
              </View>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Set Monthly Income</Text>
                <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                  {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
                </Text>
              </View>
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

          {/* Quick Explanatory Note */}
          <View
            style={[
              styles.infoBanner,
              clayPill,
              {
                backgroundColor: colors.surfaceSubtle,
                borderRadius: 14
              }
            ]}
          >
            <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            <Text style={[styles.infoBannerText, { color: colors.textSecondary }]}>
              Setting your income will automatically recalculate your remaining balance for {MONTH_NAMES[selectedMonth - 1]}.
            </Text>
          </View>

          {/* Amount Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>INCOME AMOUNT (PKR / RS)</Text>
            <View style={[styles.inputBox, clayInput]}>
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

          {/* Actions */}
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
              style={[styles.submitBtn, clayButton]}
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
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
  modalSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    marginBottom: 18
  },
  infoBannerText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16
  },
  inputGroup: {
    marginBottom: 18
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
  currencyPrefix: {
    fontSize: 16,
    fontWeight: '800',
    marginRight: 6
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    padding: 0
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
    gap: 12
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
