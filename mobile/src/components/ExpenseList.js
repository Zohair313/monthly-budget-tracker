import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, categoryColors, getClayCard, getClayButton, getClayPill, getClayInput } from '../theme/colors';

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

const CATEGORY_COLORS = {
  Food: '#F59E0B',
  Bills: '#6366F1',
  Travel: '#14B8A6',
  Shopping: '#EC4899',
  Health: '#10B981',
  Entertainment: '#8B5CF6',
  Education: '#EAB308',
  General: '#64748B'
};

const CATEGORY_DARK_COLORS = {
  Food: '#B45309',
  Bills: '#4338CA',
  Travel: '#0F766E',
  Shopping: '#BE185D',
  Health: '#047857',
  Entertainment: '#6D28D9',
  Education: '#A16207',
  General: '#334155'
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
  const colors = palette[themeMode] || palette.dark;
  const clayCard = getClayCard(themeMode);
  const clayButton = getClayButton(themeMode, colors.primary, colors.primaryDark);
  const clayPill = getClayPill(themeMode);
  const clayInput = getClayInput(themeMode);

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
          <View
            style={[
              styles.countTag,
              clayPill,
              {
                backgroundColor: colors.surfaceSubtle
              }
            ]}
          >
            <Text style={[styles.countTagText, { color: colors.textSecondary }]}>
              {filteredExpenses.length}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.addButton, clayButton]}
          onPress={onAddExpense}
          accessibilityLabel="Add New Expense"
        >
          <Ionicons name="add" size={17} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Debossed Clay Search Input */}
      {expenses.length > 3 && (
        <View style={[styles.searchBox, clayInput]}>
          <Ionicons name="search-outline" size={16} color={colors.textTertiary} />
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
        <View style={[styles.emptyContainer, clayCard]}>
          <View
            style={[
              styles.emptyIconCircle,
              {
                backgroundColor: colors.surfaceSubtle,
                borderTopColor: colors.clayBorderTop,
                borderBottomColor: colors.clayBorderBottom
              }
            ]}
          >
            <Ionicons name="receipt-outline" size={32} color={colors.textTertiary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            {expenses.length === 0 ? 'No expenses recorded' : 'No matching expenses'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {expenses.length === 0
              ? 'Tap "+ Add Expense" above to record your first expense for this month.'
              : 'Try selecting another category or clearing your search term.'}
          </Text>
          {expenses.length === 0 && (
            <TouchableOpacity
              onPress={onAddExpense}
              style={[
                styles.emptyAddBtn,
                clayButton,
                { marginTop: 16 }
              ]}
            >
              <Ionicons name="add-circle-outline" size={16} color="#FFFFFF" />
              <Text style={styles.emptyAddBtnText}>Add Expense Now</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.listContainer}>
          {filteredExpenses.map((item) => {
            const cat = item.category || 'General';
            const catColor = CATEGORY_COLORS[cat] || colors.primary;
            const catDarkColor = CATEGORY_DARK_COLORS[cat] || colors.primaryDark;
            const iconName = CATEGORY_ICONS[cat] || 'pricetag-outline';

            return (
              <View
                key={item.id}
                style={[
                  styles.clayExpenseRow,
                  clayCard,
                  {
                    padding: 14,
                    borderRadius: 20
                  }
                ]}
              >
                {/* Left: Tactile Clay Category Icon Coin */}
                <View
                  style={[
                    styles.categoryIconWrap,
                    {
                      backgroundColor: `${catColor}20`,
                      borderTopColor: 'rgba(255, 255, 255, 0.45)',
                      borderLeftColor: 'rgba(255, 255, 255, 0.25)',
                      borderRightColor: catDarkColor,
                      borderBottomColor: catDarkColor,
                      shadowColor: catDarkColor
                    }
                  ]}
                >
                  <Ionicons name={iconName} size={20} color={catColor} />
                </View>

                {/* Middle: Name, Date & Category */}
                <View style={styles.expenseInfo}>
                  <Text style={[styles.expenseName, { color: colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.expenseMeta}>
                    <Text style={[styles.expenseDate, { color: colors.textTertiary }]}>
                      {formatDate(item.date)}
                    </Text>
                    <View style={[styles.metaDot, { backgroundColor: colors.border }]} />
                    <View
                      style={[
                        styles.categoryPill,
                        clayPill,
                        {
                          backgroundColor: colors.surfaceSubtle,
                          paddingHorizontal: 7,
                          paddingVertical: 1
                        }
                      ]}
                    >
                      <Text style={[styles.expenseCategory, { color: catColor }]}>
                        {cat}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Right: Amount & Tactile Clay Actions */}
                <View style={styles.expenseRight}>
                  <Text style={[styles.expenseAmount, { color: colors.expense }]}>
                    -{formatCurrency(item.amount)}
                  </Text>

                  <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                      onPress={() => onEditExpense(item)}
                      style={[
                        styles.clayMiniActionBtn,
                        {
                          backgroundColor: colors.surfaceSubtle,
                          borderTopColor: colors.clayBorderTop,
                          borderLeftColor: colors.clayBorderLeft,
                          borderRightColor: colors.clayBorderRight,
                          borderBottomColor: colors.clayBorderBottom,
                          shadowColor: colors.clayShadowColor
                        }
                      ]}
                      accessibilityLabel={`Edit ${item.name}`}
                    >
                      <Ionicons name="pencil" size={13} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDelete(item)}
                      style={[
                        styles.clayMiniActionBtn,
                        {
                          backgroundColor: colors.expenseLight,
                          borderTopColor: 'rgba(255, 255, 255, 0.35)',
                          borderLeftColor: 'rgba(255, 255, 255, 0.2)',
                          borderRightColor: colors.expenseDark,
                          borderBottomColor: colors.expenseDark,
                          shadowColor: colors.expenseDark
                        }
                      ]}
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
    marginBottom: 12
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4
  },
  countTag: {
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  countTagText: {
    fontSize: 11,
    fontWeight: '800'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
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
    padding: 36,
    marginTop: 6
  },
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 250
  },
  emptyAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  emptyAddBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700'
  },
  listContainer: {
    gap: 10
  },
  clayExpenseRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3
  },
  expenseInfo: {
    flex: 1,
    marginRight: 8
  },
  expenseName: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 4
  },
  expenseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  expenseDate: {
    fontSize: 11,
    fontWeight: '500'
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: 4
  },
  categoryPill: {
    borderRadius: 8
  },
  expenseCategory: {
    fontSize: 10,
    fontWeight: '700'
  },
  expenseRight: {
    alignItems: 'flex-end'
  },
  expenseAmount: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 6
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  clayMiniActionBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  }
});
