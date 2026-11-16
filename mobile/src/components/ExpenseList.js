import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, categoryColors } from '../theme/colors';

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

const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return `Rs. ${num.toLocaleString('en-US')}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

export default function ExpenseList({ onEditExpense, onAddExpense, activeCategory }) {
  const { expenses, deleteExpense } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Filter expenses by search query and active category filter
  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory = !activeCategory || exp.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !searchQuery.trim() || exp.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (item) => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${item.name}" (${formatCurrency(item.amount)})?\n\nThis amount will be automatically restored to your remaining balance.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(item.id);
            } catch (err) {
              Alert.alert('Error', err.message || 'Failed to delete expense.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Section Header: "Recent Transactions" */}
      <View style={styles.headerRow}>
        <View style={styles.titleArea}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
          <View style={[styles.countBadge, { backgroundColor: colors.surfaceSubtle }]}>
            <Text style={[styles.countBadgeText, { color: colors.textSecondary }]}>
              {filteredExpenses.length}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.actionIconBtn, { backgroundColor: colors.surfaceSubtle }]}
            onPress={() => setShowSearch(!showSearch)}
            accessibilityLabel="Search expenses"
          >
            <Ionicons name="search" size={15} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onAddExpense}
            style={[styles.addBtnPill, { backgroundColor: colors.primary }]}
          >
            <Ionicons name="add" size={15} color="#FFFFFF" />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Clean Search Input Bar */}
      {showSearch && (
        <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={16} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Transaction List */}
      {filteredExpenses.length === 0 ? (
        <View style={[styles.emptyContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.emptyIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
            <Ionicons name="receipt-outline" size={30} color={colors.textTertiary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            {expenses.length === 0 ? 'No transactions yet' : 'No matching results'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {expenses.length === 0
              ? 'Tap "+ Add" above to record your first monthly expense.'
              : 'Try searching with a different term.'}
          </Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {filteredExpenses.map((item) => {
            const cat = item.category || 'General';
            const catConfig = categoryColors[cat] || categoryColors.General;
            const catColor = catConfig.color;
            const catBg = catConfig.bg;
            const iconName = CATEGORY_ICONS[cat] || 'pricetag-outline';

            return (
              <View
                key={item.id}
                style={[
                  styles.transactionCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border
                  }
                ]}
              >
                {/* Left: Clean Squircle Icon Badge */}
                <View style={[styles.iconBadge, { backgroundColor: catBg }]}>
                  <Ionicons name={iconName} size={20} color={catColor} />
                </View>

                {/* Middle: Title, Date, Category */}
                <View style={styles.infoCol}>
                  <Text style={[styles.transactionTitle, { color: colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text style={[styles.metaDate, { color: colors.textTertiary }]}>
                      {formatDate(item.date)}
                    </Text>
                    <View style={styles.metaDot} />
                    <Text style={[styles.metaCategory, { color: catColor }]}>
                      {cat}
                    </Text>
                  </View>
                </View>

                {/* Right: Amount & Actions */}
                <View style={styles.amountCol}>
                  <Text style={[styles.amountText, { color: colors.expense }]}>
                    -{formatCurrency(item.amount)}
                  </Text>

                  <View style={styles.actionGroup}>
                    <TouchableOpacity
                      onPress={() => onEditExpense(item)}
                      style={[styles.miniBtn, { backgroundColor: colors.surfaceSubtle }]}
                      accessibilityLabel={`Edit ${item.name}`}
                    >
                      <Ionicons name="pencil" size={11} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDelete(item)}
                      style={[styles.miniBtn, { backgroundColor: colors.expenseLight }]}
                      accessibilityLabel={`Delete ${item.name}`}
                    >
                      <Ionicons name="trash-outline" size={11} color={colors.expense} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 40
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700'
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  actionIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addBtnPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 10
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    padding: 0
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 4
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16
  },
  listContainer: {
    gap: 10
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  infoCol: {
    flex: 1,
    marginRight: 8
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 3
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  metaDate: {
    fontSize: 11,
    fontWeight: '500'
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 3
  },
  metaCategory: {
    fontSize: 11,
    fontWeight: '700'
  },
  amountCol: {
    alignItems: 'flex-end'
  },
  amountText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 4
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  miniBtn: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
