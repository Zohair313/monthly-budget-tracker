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
  const clayCard = getClayCard(themeMode);
  const clayButton = getClayButton(themeMode, colors.primary, colors.primaryDark);
  const clayPill = getClayPill(themeMode);
  const clayInput = getClayInput(themeMode);

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
      {/* Section Header: "Recent" and "View All / Search" (Exact reference image style) */}
      <View style={styles.headerRow}>
        <View style={styles.titleArea}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent</Text>
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

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.searchToggleBtn}
            onPress={() => setShowSearch(!showSearch)}
            accessibilityLabel="Search expenses"
          >
            <Ionicons name="search" size={17} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onAddExpense} style={styles.viewAllBtn}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Debossed Clay Search Input (When toggled) */}
      {showSearch && (
        <View style={[styles.searchBox, clayInput]}>
          <Ionicons name="search-outline" size={17} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search recent transactions..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
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
            <Ionicons name="receipt-outline" size={34} color={colors.textTertiary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            {expenses.length === 0 ? 'No recent transactions' : 'No matching expenses'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            {expenses.length === 0
              ? 'Tap the Coral "Pay Bill" button above to record your first monthly transaction.'
              : 'Try clearing your search query or selecting "All" categories.'}
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
              <Ionicons name="add" size={18} color="#FFFFFF" />
              <Text style={styles.emptyAddBtnText}>Add Expense</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.listContainer}>
          {filteredExpenses.map((item) => {
            const cat = item.category || 'General';
            const catConfig = categoryColors[cat] || categoryColors.General;
            const catColor = catConfig.color;
            const catDarkColor = catConfig.darkColor;
            const catBg = catConfig.bg;
            const iconName = CATEGORY_ICONS[cat] || 'pricetag-outline';

            return (
              <View
                key={item.id}
                style={[
                  styles.clayExpenseRow,
                  clayCard,
                  {
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderRadius: 20
                  }
                ]}
              >
                {/* Left: 3D Rounded Square Icon Badge (Exact reference image icon style) */}
                <View
                  style={[
                    styles.categorySquareBadge,
                    {
                      backgroundColor: catBg,
                      borderTopColor: 'rgba(255, 255, 255, 0.90)',
                      borderLeftColor: 'rgba(255, 255, 255, 0.70)',
                      borderRightColor: catDarkColor,
                      borderBottomColor: catDarkColor,
                      shadowColor: catDarkColor
                    }
                  ]}
                >
                  <Ionicons name={iconName} size={22} color={catColor} />
                </View>

                {/* Middle: Title & Date (Reference image) */}
                <View style={styles.expenseInfo}>
                  <Text style={[styles.expenseName, { color: colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={[styles.expenseDate, { color: colors.textTertiary }]}>
                    {formatDate(item.date)}
                  </Text>
                </View>

                {/* Right: Amount in Coral/Red and Mini Action Buttons */}
                <View style={styles.expenseRight}>
                  <Text style={[styles.expenseAmount, { color: colors.expense }]}>
                    -${Number(item.amount).toLocaleString('en-US')}
                  </Text>

                  <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                      onPress={() => onEditExpense(item)}
                      style={[
                        styles.clayMiniActionBtn,
                        {
                          backgroundColor: colors.surfaceSubtle,
                          borderTopColor: colors.clayBorderTop,
                          borderBottomColor: colors.clayBorderBottom
                        }
                      ]}
                      accessibilityLabel={`Edit ${item.name}`}
                    >
                      <Ionicons name="pencil" size={11} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleDelete(item)}
                      style={[
                        styles.clayMiniActionBtn,
                        {
                          backgroundColor: colors.expenseLight,
                          borderTopColor: 'rgba(255, 255, 255, 0.40)',
                          borderBottomColor: colors.expenseDark
                        }
                      ]}
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
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4
  },
  countTag: {
    paddingHorizontal: 9,
    paddingVertical: 2
  },
  countTagText: {
    fontSize: 11,
    fontWeight: '800'
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  searchToggleBtn: {
    padding: 6
  },
  viewAllBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '800'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    marginTop: 4
  },
  emptyIconCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3
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
    maxWidth: 260
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
    fontWeight: '800'
  },
  listContainer: {
    gap: 10
  },
  clayExpenseRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categorySquareBadge: {
    width: 46,
    height: 46,
    borderRadius: 15,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 2
  },
  expenseInfo: {
    flex: 1,
    marginRight: 8
  },
  expenseName: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 3
  },
  expenseDate: {
    fontSize: 12,
    fontWeight: '600'
  },
  expenseRight: {
    alignItems: 'flex-end'
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 5
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  clayMiniActionBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
