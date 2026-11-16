import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { palette } from '../theme/colors';

import Header from '../components/Header';
import MonthSelector from '../components/MonthSelector';
import SummaryCards from '../components/SummaryCards';
import BudgetAlertBanner from '../components/BudgetAlertBanner';
import MonthComparisonCard from '../components/MonthComparisonCard';
import CategoryBreakdown from '../components/CategoryBreakdown';
import ExpenseList from '../components/ExpenseList';

import SetIncomeModal from '../components/SetIncomeModal';
import AddEditExpenseModal from '../components/AddEditExpenseModal';
import ServerConfigModal from '../components/ServerConfigModal';
import ExportModal from '../components/ExportModal';

export default function HomeScreen() {
  const { themeMode } = useAuth();
  const colors = palette[themeMode];
  const { isLoading, refresh, errorMessage, clearError } = useBudget();

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState(null);

  // Modal States
  const [showSetIncome, setShowSetIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showServerConfig, setShowServerConfig] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleOpenEdit = (expense) => {
    setEditingExpense(expense);
    setShowAddExpense(true);
  };

  const handleCloseExpenseModal = () => {
    setShowAddExpense(false);
    setEditingExpense(null);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header with User Info, Theme Toggle, Server Config & Logout */}
      <Header onOpenSettings={() => setShowServerConfig(true)} />

      {/* Network or General Error Notice */}
      {errorMessage && (
        <View style={[styles.errorNotice, { backgroundColor: colors.expenseLight, borderColor: colors.expense }]}>
          <Ionicons name="cloud-offline-outline" size={16} color={colors.expense} />
          <Text style={[styles.errorNoticeText, { color: colors.expense }]} numberOfLines={2}>
            {errorMessage}
          </Text>
          <TouchableOpacity onPress={clearError} style={styles.errorCloseBtn}>
            <Ionicons name="close" size={16} color={colors.expense} />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Month Selector (F9) */}
        <MonthSelector />

        {/* 3 Summary Cards (F8, F2, F4) */}
        <SummaryCards onOpenSetIncome={() => setShowSetIncome(true)} />

        {/* Budget Alert Banner (Bonus & Warnings) */}
        <BudgetAlertBanner />

        {/* Month Comparison Card (Bonus) */}
        <MonthComparisonCard />

        {/* Category Breakdown Bar & Filters (Bonus) */}
        <CategoryBreakdown
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Quick Export Action Bar */}
        <View style={styles.utilityBar}>
          <TouchableOpacity
            style={[styles.exportPill, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setShowExport(true)}
          >
            <Ionicons name="share-outline" size={13} color={colors.textSecondary} />
            <Text style={[styles.exportPillText, { color: colors.textSecondary }]}>Export Statement (CSV)</Text>
          </TouchableOpacity>
        </View>

        {/* Expense Table / List (F5, F6, F7) */}
        <ExpenseList
          activeCategory={activeCategory}
          onAddExpense={() => {
            setEditingExpense(null);
            setShowAddExpense(true);
          }}
          onEditExpense={handleOpenEdit}
        />
      </ScrollView>

      {/* Floating Action Button for Quick Add */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary, shadowColor: colors.shadow }]}
        onPress={() => {
          setEditingExpense(null);
          setShowAddExpense(true);
        }}
        accessibilityLabel="Add New Expense"
      >
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modals */}
      <SetIncomeModal visible={showSetIncome} onClose={() => setShowSetIncome(false)} />

      <AddEditExpenseModal
        visible={showAddExpense}
        onClose={handleCloseExpenseModal}
        editingExpense={editingExpense}
      />

      <ServerConfigModal visible={showServerConfig} onClose={() => setShowServerConfig(false)} />

      <ExportModal visible={showExport} onClose={() => setShowExport(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  mainScroll: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 80
  },
  errorNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8
  },
  errorNoticeText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 15
  },
  errorCloseBtn: {
    padding: 2
  },
  utilityBar: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  exportPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1
  },
  exportPillText: {
    fontSize: 11,
    fontWeight: '600'
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6
  }
});
