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
  const colors = palette[themeMode] || palette.light;
  const clayPill = getClayPill(themeMode);
  const { isLoading, refresh, errorMessage, clearError } = useBudget();

  // Active Category Filter & View Toggles
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

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

      {/* 1. Header (Reference image top violet bar with grid, month pill, avatar) */}
      <Header onOpenSettings={() => setShowServerConfig(true)} />

      {/* Network or General Error Notice */}
      {errorMessage && (
        <View
          style={[
            styles.errorNotice,
            clayPill,
            {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
            tintColor="#FFFFFF"
            colors={['#FFFFFF']}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Top Violet Section: 3D Clay Bank Card & 4 Colorful Action Tiles (Reference image) */}
        <SummaryCards
          onOpenSetIncome={() => setShowSetIncome(true)}
          onOpenAddExpense={() => {
            setEditingExpense(null);
            setShowAddExpense(true);
          }}
          onToggleCategoryBreakdown={() => setShowCharts(!showCharts)}
          onOpenExport={() => setShowExport(true)}
        />

        {/* 3. Bottom White/Porcelain Curved Clay Sheet (Reference image curved white body) */}
        <View
          style={[
            styles.porcelainSheet,
            {
              backgroundColor: colors.sheetBackground,
              borderTopColor: colors.clayBorderTop
            }
          ]}
        >
          {/* Subtle curved drag handle at top of sheet */}
          <View style={styles.sheetHandleWrap}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
          </View>

          {/* Budget Alert Banner (When >= 80% or Deficit) */}
          <BudgetAlertBanner />

          {/* Month Comparison Card */}
          <MonthComparisonCard />

          {/* 3D Vertical Bar Chart & Category Filters (Reference image Screen 2) */}
          {showCharts && (
            <CategoryBreakdown
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />
          )}

          {/* "Recent" Transactions / Expenses List (Reference image Screen 1 bottom) */}
          <ExpenseList
            activeCategory={activeCategory}
            onAddExpense={() => {
              setEditingExpense(null);
              setShowAddExpense(true);
            }}
            onEditExpense={handleOpenEdit}
          />
        </View>
      </ScrollView>

      {/* 4. Floating Violet Bottom Navigation Bar (Exact reference image dock) */}
      <View
        style={[
          styles.bottomDock,
          {
            backgroundColor: colors.brandVioletDark,
            borderTopColor: 'rgba(255, 255, 255, 0.35)',
            borderBottomColor: colors.brandVioletDeep
          }
        ]}
      >
        {/* Nav 1: Home */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowCharts(false)}>
          <Ionicons name="home" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Nav 2: Charts / Analytics */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowCharts(!showCharts)}>
          <Ionicons
            name="pie-chart"
            size={22}
            color={showCharts ? '#FFD166' : 'rgba(255, 255, 255, 0.7)'}
          />
        </TouchableOpacity>

        {/* Center Raised 3D Clay Button (Reference image floating puck) */}
        <TouchableOpacity
          style={[
            styles.dockCenterPuck,
            {
              backgroundColor: colors.primary,
              borderTopColor: 'rgba(255, 255, 255, 0.70)',
              borderLeftColor: 'rgba(255, 255, 255, 0.40)',
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

        {/* Nav 4: Export Statement */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowExport(true)}>
          <Ionicons name="document-text" size={22} color="rgba(255, 255, 255, 0.7)" />
        </TouchableOpacity>

        {/* Nav 5: Settings */}
        <TouchableOpacity style={styles.dockItem} onPress={() => setShowServerConfig(true)}>
          <Ionicons name="settings" size={22} color="rgba(255, 255, 255, 0.7)" />
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
    paddingBottom: 90
  },
  errorNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8
  },
  errorNoticeText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 15
  },
  errorCloseBtn: {
    padding: 2
  },
  porcelainSheet: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderTopWidth: 2.5,
    paddingTop: 12,
    minHeight: 500,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8
  },
  sheetHandleWrap: {
    alignItems: 'center',
    paddingVertical: 8
  },
  sheetHandle: {
    width: 44,
    height: 5,
    borderRadius: 2.5
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 2,
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10
  },
  dockItem: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dockCenterPuck: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginTop: -28,
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.40,
    shadowRadius: 10,
    elevation: 8
  }
});
