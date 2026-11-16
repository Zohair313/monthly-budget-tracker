import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { palette, getClayPill } from '../theme/colors';

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
  const colors = palette[themeMode] || palette.dark;
  const clayPill = getClayPill(themeMode);
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
        backgroundColor={colors.surface}
      />

      {/* Header with Clay Avatar, Theme Toggle, Server Config & Logout */}
      <Header onOpenSettings={() => setShowServerConfig(true)} />

      {/* Network or General Error Notice */}
      {errorMessage && (
        <View
          style={[
            styles.errorNotice,
            clayPill,
            {
              backgroundColor: colors.expenseLight,
              borderBottomColor: colors.expenseDark
            }
          ]}
        >
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
            style={[
              styles.exportPill,
              clayPill,
              {
                backgroundColor: colors.surface
              }
            ]}
            onPress={() => setShowExport(true)}
          >
            <Ionicons name="share-outline" size={13} color={colors.primary} />
            <Text style={[styles.exportPillText, { color: colors.text }]}>Export Statement (CSV)</Text>
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

      {/* Clay Floating Action Button (FAB) */}
      <TouchableOpacity
        style={[
          styles.clayFab,
          {
            backgroundColor: colors.primary,
            borderTopColor: 'rgba(255, 255, 255, 0.45)',
            borderLeftColor: 'rgba(255, 255, 255, 0.25)',
            borderRightColor: colors.primaryDark,
            borderBottomColor: colors.primaryDark,
            shadowColor: colors.primaryDark
          }
        ]}
        onPress={() => {
          setEditingExpense(null);
          setShowAddExpense(true);
        }}
        accessibilityLabel="Add New Expense"
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
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
    paddingBottom: 90
  },
  errorNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8
  },
  errorNoticeText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15
  },
  errorCloseBtn: {
    padding: 2
  },
  utilityBar: {
    marginHorizontal: 16,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  exportPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  exportPillText: {
    fontSize: 11,
    fontWeight: '700'
  },
  clayFab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8
  }
});
