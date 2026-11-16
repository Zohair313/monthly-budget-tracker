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
  const { expenses, deleteExpense, isLoading } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

  const [searchQuery, setSearchQuery] = useState('');

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
      {/* Section Header with Add Button and Search */}
      <View style={styles.headerRow}>
        <View style={styles.titleArea}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Expenses</Text>
          <View style={[styles.countTag, { backgroundColor: colors.surfaceSubtle }]}>
            <Text style={[styles.countTagText, { color: colors.textSecondary }]}>
              {filteredExpenses.length}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={onAddExpense}
          accessibilityLabel="Add New Expense"
        >
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      {expenses.length > 3 && (
        <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.borderSubtle }]}>
          <Ionicons name="search-outline" size={15} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search expenses by name..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Table / List View */}
      {filteredExpenses.length === 0 ? (
        <View style={[styles.emptyContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.emptyIconCircle, { backgroundColor: colors.surfaceSubtle }]}>
            <Ionicons name="receipt-outline" size={32} color={colors.textTertiary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            {expenses.length === 0 ? 'No expenses recorded' : 'No matching expenses'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {expenses.length === 0
              ? 'Tap "+ Add Expense" above to record your first expense for this month.'
              : 'Try clearing your search query or category filter.'}
          </Text>
          {expenses.length === 0 && (
            <TouchableOpacity
              style={[styles.emptyAddBtn, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}
              onPress={onAddExpense}
            >
              <Ionicons name="add-circle-outline" size={16} color={colors.primary} />
              <Text style={[styles.emptyAddBtnText, { color: colors.primary }]}>Add First Expense</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.listContainer}>
          {filteredExpenses.map((item, index) => {
            const iconName = CATEGORY_ICONS[item.category] || 'pricetag-outline';

            return (
              <View
                key={item.id || index}
                style={[
                  styles.expenseRow,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border
                  }
                ]}
              >
                {/* Left: Category Icon */}
                <View style={[styles.categoryIconWrap, { backgroundColor: colors.surfaceSubtle }]}>
                  <Ionicons name={iconName} size={18} color={colors.primary} />
                </View>

                {/* Center: Name & Date & Category */}
                <View style={styles.expenseInfo}>
                  <Text style={[styles.expenseName, { color: colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.expenseMeta}>
                    <Text style={[styles.expenseDate, { color: colors.textTertiary }]}>
                      {formatDate(item.date)}
                    </Text>
                    <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
                    <Text style={[styles.expenseCategory, { color: colors.textSecondary }]}>
                      {item.category || 'General'}
                    </Text>
                  </View>
                </View>

                {/* Right: Amount & Actions */}
                <View style={styles.expenseRight}>
                  <Text style={[styles.expenseAmount, { color: colors.expense }]}>
                    -{formatCurrency(item.amount)}
                  </Text>

                  <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                      onPress={() => onEditExpense(item)}
                      style={[styles.miniActionBtn, { backgroundColor: colors.surfaceSubtle }]}
                      accessibilityLabel={`Edit ${item.name}`}
                    >
                      <Ionicons name="pencil" size={13} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDelete(item)}
                      style={[styles.miniActionBtn, { backgroundColor: colors.expenseLight }]}
                      accessibilityLabel={`Delete ${item.name}`}
                    >
                      <Ionicons name="trash-outline" size={13} color={colors.expense} />
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
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 40
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
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
  countTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  countTagText: {
    fontSize: 11,
    fontWeight: '700'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10
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
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 6
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
    maxWidth: 240
  },
  emptyAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1
  },
  emptyAddBtnText: {
    fontSize: 13,
    fontWeight: '600'
  },
  listContainer: {
    gap: 8
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1
  },
  categoryIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  expenseInfo: {
    flex: 1,
    marginRight: 8
  },
  expenseName: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 3
  },
  expenseMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  expenseDate: {
    fontSize: 11
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: 6
  },
  expenseCategory: {
    fontSize: 11
  },
  expenseRight: {
    alignItems: 'flex-end'
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 4
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  miniActionBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
