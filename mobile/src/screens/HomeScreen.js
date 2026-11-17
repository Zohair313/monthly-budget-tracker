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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.brandViolet }]} edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.brandViolet}
      />

      {/* 1. Header on Royal Indigo Canvas */}
      <Header onOpenSettings={() => setShowServerConfig(true)} />

      {/* Network or General Error Notice */}
      {errorMessage && (
        <View style={styles.errorNotice}>
          <Ionicons name="cloud-offline-outline" size={15} color="#E11D48" />
          <Text style={styles.errorNoticeText} numberOfLines={2}>
            {errorMessage}
          </Text>
          <TouchableOpacity onPress={clearError} style={styles.errorCloseBtn}>
            <Ionicons name="close" size={15} color="#E11D48" />
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
            tintColor="#FFFFFF"
            colors={['#FFFFFF']}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Executive Card & Clean Squircle Quick Tiles */}
        <SummaryCards
          onOpenSetIncome={() => {
            setExpandedAccordion(prev => (prev === 'income' ? null : 'income'));
          }}
          onOpenAddExpense={() => {
            setExpandedAccordion(prev => (prev === 'expense' ? null : 'expense'));
          }}
          onToggleCategoryBreakdown={() => setShowCharts(!showCharts)}
          onOpenExport={() => setShowExport(true)}
        />

        {/* 3. Pristine Porcelain Sheet */}
        <View style={[styles.porcelainSheet, { backgroundColor: colors.sheetBackground }]}>
          {/* Subtle drag handle */}
          <View style={styles.sheetHandleWrap}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
          </View>

          {/* Budget Alert Banner */}
          <BudgetAlertBanner />

          {/* 4. Primary Interactive Clay Accordions (Income & Expense) */}
          <View style={styles.accordionsSection}>
            <View style={styles.accordionsHeaderRow}>
              <Text style={[styles.accordionsMainTitle, { color: colors.text }]}>
                Budget Breakdown
              </Text>
              <Text style={[styles.accordionsSubtitle, { color: colors.textSecondary }]}>
                Tap to expand, record & review
              </Text>
            </View>

            {/* Income Accordion (Clickable with smooth spring animation) */}
            <IncomeAccordion
              isExpanded={expandedAccordion === 'income'}
              onToggle={() => setExpandedAccordion(expandedAccordion === 'income' ? null : 'income')}
            />

            {/* Expense Accordion (Clickable with smooth spring animation) */}
            <ExpenseAccordion
              isExpanded={expandedAccordion === 'expense'}
              onToggle={() => setExpandedAccordion(expandedAccordion === 'expense' ? null : 'expense')}
              onEditExpense={handleOpenEdit}
            />
          </View>

          {/* Month Comparison Card */}
          <MonthComparisonCard />

          {/* Clean Analytics Bar Chart & Category Filters */}
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

      {/* 4. Sleek Floating Bottom Dock */}
      <View style={[styles.bottomDock, { backgroundColor: colors.brandVioletDark }]}>
        {/* Nav 1: Home */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowCharts(false)}>
          <Ionicons name="home" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Nav 2: Analytics */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowCharts(!showCharts)}>
          <Ionicons
            name="bar-chart"
            size={20}
            color={showCharts ? '#34D399' : 'rgba(255, 255, 255, 0.7)'}
          />
        </TouchableOpacity>

        {/* Center Raised Action Button */}
        <TouchableOpacity
          style={[styles.dockCenterBtn, { backgroundColor: colors.primary }]}
          onPress={() => {
            setEditingExpense(null);
            setShowAddExpense(true);
          }}
          accessibilityLabel="Add New Expense"
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Nav 4: Statement */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowExport(true)}>
          <Ionicons name="document-text" size={20} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>

        {/* Nav 5: Settings */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowServerConfig(true)}>
          <Ionicons name="settings" size={20} color="rgba(255, 255, 255, 0.7)" />
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
    paddingBottom: 88
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
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    gap: 8
  },
  errorNoticeText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#E11D48',
    lineHeight: 15
  },
  errorCloseBtn: {
    padding: 2
  },
  porcelainSheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 8,
    minHeight: 520,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8
  },
  sheetHandleWrap: {
    alignItems: 'center',
    paddingVertical: 8
  },
  sheetHandle: {
    width: 38,
    height: 4,
    borderRadius: 2
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
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 10
  },
  dockItem: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dockCenterBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: -22,
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
