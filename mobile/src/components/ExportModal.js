import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette } from '../theme/colors';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ExportModal({ visible, onClose }) {
  const { selectedMonth, selectedYear, summary, expenses, categoryBreakdown } = useBudget();
  const { user, themeMode } = useAuth();
  const colors = palette[themeMode];

  const [copied, setCopied] = useState(false);

  // Generate CSV Data
  const generateCsv = () => {
    let csv = `Monthly Budget Tracker Report - ${MONTH_NAMES[selectedMonth - 1]} ${selectedYear}\n`;
    csv += `Generated for: ${user?.name || user?.email || 'User'}\n`;
    csv += `Total Income: Rs. ${summary.total_income || 0}\n`;
    csv += `Total Expense: Rs. ${summary.total_expense || 0}\n`;
    csv += `Remaining Balance: Rs. ${summary.remaining_balance || 0}\n\n`;

    csv += `Date,Expense Name,Category,Amount (Rs.)\n`;
    expenses.forEach((e) => {
      csv += `"${e.date}","${e.name.replace(/"/g, '""')}","${e.category || 'General'}",${e.amount}\n`;
    });

    return csv;
  };

  const csvContent = generateCsv();

  const handleCopy = () => {
    // For Web / React Native clipboard handling
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(csvContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      Alert.alert('CSV Ready', 'The CSV report has been generated. You can view or share the contents below.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <View style={[styles.iconWrap, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="document-text-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Export Report</Text>
                <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                  {MONTH_NAMES[selectedMonth - 1]} {selectedYear} Financial Statement
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Quick Metrics */}
          <View style={[styles.metricsBox, { backgroundColor: colors.surfaceSubtle }]}>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>INCOME</Text>
              <Text style={[styles.metricVal, { color: colors.income }]}>
                Rs. {(summary.total_income || 0).toLocaleString()}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>EXPENSE</Text>
              <Text style={[styles.metricVal, { color: colors.expense }]}>
                Rs. {(summary.total_expense || 0).toLocaleString()}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>BALANCE</Text>
              <Text style={[styles.metricVal, { color: colors.text }]}>
                Rs. {(summary.remaining_balance || 0).toLocaleString()}
              </Text>
            </View>
          </View>

          {/* CSV Preview */}
          <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>CSV FORMAT PREVIEW</Text>
          <ScrollView style={[styles.csvPreview, { backgroundColor: colors.background, borderColor: colors.borderSubtle }]}>
            <Text style={[styles.csvText, { color: colors.text }]}>{csvContent}</Text>
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={[styles.cancelBtn, { borderColor: colors.border }]}>
              <Text style={[styles.cancelBtnText, { color: colors.textSecondary }]}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCopy}
              style={[styles.copyBtn, { backgroundColor: colors.primary }]}
            >
              <Ionicons name={copied ? 'checkmark' : 'copy-outline'} size={14} color="#FFFFFF" />
              <Text style={styles.copyBtnText}>
                {copied ? 'Copied to Clipboard!' : 'Copy CSV Data'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    maxWidth: 440,
    maxHeight: '90%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  modalSubtitle: {
    fontSize: 11,
    marginTop: 1
  },
  closeBtn: {
    padding: 4
  },
  metricsBox: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    justifyContent: 'space-around'
  },
  metricItem: {
    alignItems: 'center'
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 2
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '800'
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 6
  },
  csvPreview: {
    maxHeight: 180,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 16
  },
  csvText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11,
    lineHeight: 16
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600'
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10
  },
  copyBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700'
  }
});
