import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useBudget } from '../context/BudgetContext';
import { palette } from '../theme/colors';

import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import BudgetAlertBanner from '../components/BudgetAlertBanner';
import MonthComparisonCard from '../components/MonthComparisonCard';
import CategoryBreakdown from '../components/CategoryBreakdown';
import ExpenseList from '../components/ExpenseList';
import IncomeAccordion from '../components/IncomeAccordion';
import ExpenseAccordion from '../components/ExpenseAccordion';

import SetIncomeModal from '../components/SetIncomeModal';
import AddEditExpenseModal from '../components/AddEditExpenseModal';
import ServerConfigModal from '../components/ServerConfigModal';
import ExportModal from '../components/ExportModal';

export default function HomeScreen() {
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const isDark = themeMode === 'dark';
  const { isLoading, refresh, errorMessage, clearError } = useBudget();

  // Active Category Filter & View Toggles
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

  // Accordion State: 'income' | 'expense' | null
  const [expandedAccordion, setExpandedAccordion] = useState(null);

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
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* 1. Seamless Top Header */}
      <Header onOpenSettings={() => setShowServerConfig(true)} />

      {/* Network or General Error Notice */}
      {errorMessage && (
        <View style={styles.errorNotice}>
          <Ionicons name="cloud-offline-outline" size={15} color="#EF4444" />
          <Text style={styles.errorNoticeText} numberOfLines={2}>
            {errorMessage}
          </Text>
          <TouchableOpacity onPress={clearError} style={styles.errorCloseBtn}>
            <Ionicons name="close" size={15} color="#EF4444" />
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
        {/* 2. Executive Balance Card & Action Tiles */}
        <SummaryCards
          onOpenSetIncome={() => setShowSetIncome(true)}
          onOpenAddExpense={() => setShowAddExpense(true)}
          onToggleCategoryBreakdown={() => setShowCharts(!showCharts)}
          onOpenExport={() => setShowExport(true)}
        />

        {/* 3. Main Budget Content Area */}
        <View style={[styles.mainContentSheet, { backgroundColor: colors.background }]}>
          {/* Budget Alert Banner */}
          <BudgetAlertBanner />

          {/* 4. Primary Interactive Clay Accordions (Income & Expense) */}
          <View style={styles.accordionsSection}>
            <View style={styles.accordionsHeaderRow}>
              <Text style={[styles.accordionsMainTitle, { color: colors.text }]}>
                Budget Breakdown
              </Text>
              <Text style={[styles.accordionsSubtitle, { color: colors.textSecondary }]}>
                Tap to expand & record
              </Text>
            </View>

            {/* Income Accordion */}
            <IncomeAccordion
              isExpanded={expandedAccordion === 'income'}
              onToggle={() => setExpandedAccordion(expandedAccordion === 'income' ? null : 'income')}
            />

            {/* Expense Accordion */}
            <ExpenseAccordion
              isExpanded={expandedAccordion === 'expense'}
              onToggle={() => setExpandedAccordion(expandedAccordion === 'expense' ? null : 'expense')}
              onEditExpense={handleOpenEdit}
            />
          </View>

          {/* Month Comparison Card */}
          <MonthComparisonCard />

          {/* Analytics Bar Chart & Category Filters */}
          {showCharts && (
            <CategoryBreakdown
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />
          )}

          {/* Recent Transactions List */}
          <ExpenseList
            activeCategory={activeCategory}
            onAddExpense={() => {
              setExpandedAccordion('expense');
            }}
            onEditExpense={handleOpenEdit}
          />
        </View>
      </ScrollView>

      {/* 4. Sleek Floating Bottom Dock with Real Icons & Labels */}
      <View
        style={[
          styles.bottomDock,
          {
            backgroundColor: colors.dockBg,
            borderColor: isDark ? '#1E293B' : 'rgba(255, 255, 255, 0.15)'
          }
        ]}
      >
        {/* Nav 1: All Data / Overview ("Saara Data Dekhe") */}
        <TouchableOpacity
          style={styles.dockItem}
          onPress={() => {
            setShowCharts(false);
            setActiveCategory(null);
          }}
          accessibilityLabel="Overview / All Data"
        >
          <Ionicons
            name="home"
            size={20}
            color={!showCharts ? '#FFFFFF' : colors.dockInactive}
          />
          <Text
            style={[
              styles.dockLabel,
              { color: !showCharts ? '#FFFFFF' : colors.dockInactive }
            ]}
          >
            Data
          </Text>
        </TouchableOpacity>

        {/* Nav 2: Analytics ("Analytics / Charts") */}
        <TouchableOpacity
          style={styles.dockItem}
          onPress={() => setShowCharts(!showCharts)}
          accessibilityLabel="Analytics & Charts"
        >
          <Ionicons
            name="bar-chart"
            size={20}
            color={showCharts ? '#10B981' : colors.dockInactive}
          />
          <Text
            style={[
              styles.dockLabel,
              { color: showCharts ? '#10B981' : colors.dockInactive }
            ]}
          >
            Charts
          </Text>
        </TouchableOpacity>

        {/* Center Raised Action Button: Add ("Add Kare") */}
        <TouchableOpacity
          style={[styles.dockCenterBtn, { backgroundColor: colors.primary }]}
          onPress={() => {
            setShowAddExpense(true);
          }}
          accessibilityLabel="Add New Expense"
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Nav 4: Statement / Report ("Report") */}
        <TouchableOpacity
          style={styles.dockItem}
          onPress={() => setShowExport(true)}
          accessibilityLabel="Export Statement"
        >
          <Ionicons
            name="document-text"
            size={20}
            color={colors.dockInactive}
          />
          <Text style={[styles.dockLabel, { color: colors.dockInactive }]}>
            Report
          </Text>
        </TouchableOpacity>

        {/* Nav 5: Settings ("Setting") */}
        <TouchableOpacity
          style={styles.dockItem}
          onPress={() => setShowServerConfig(true)}
          accessibilityLabel="Settings"
        >
          <Ionicons
            name="settings"
            size={20}
            color={colors.dockInactive}
          />
          <Text style={[styles.dockLabel, { color: colors.dockInactive }]}>
            Setting
          </Text>
        </TouchableOpacity>
      </View>

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
    flex: 1
  },
  mainScroll: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 95
  },
  errorNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    gap: 8
  },
  errorNoticeText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
    lineHeight: 15
  },
  errorCloseBtn: {
    padding: 2
  },
  mainContentSheet: {
    paddingTop: 4
  },
  accordionsSection: {
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 10
  },
  accordionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12
  },
  accordionsMainTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  accordionsSubtitle: {
    fontSize: 12,
    fontWeight: '500'
  },
  bottomDock: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    height: 64,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 10
  },
  dockItem: {
    width: 52,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  dockLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.2
  },
  dockCenterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginTop: -20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6
  }
});
