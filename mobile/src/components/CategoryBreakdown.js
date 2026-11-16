import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

export default function CategoryBreakdown({ onSelectCategory, activeCategory }) {
  const { categoryBreakdown, summary } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode];

  const totalExpense = summary.total_expense || 0;
  const categories = Object.keys(categoryBreakdown);

  if (categories.length === 0 || totalExpense === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Ionicons name="pie-chart-outline" size={16} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Category Breakdown</Text>
        </View>
        <Text style={[styles.headerRight, { color: colors.textSecondary }]}>
          {categories.length} {categories.length === 1 ? 'category' : 'categories'}
        </Text>
      </View>

      {/* Segmented Distribution Bar */}
      <View style={styles.segmentedBar}>
        {categories.map((cat) => {
          const amount = categoryBreakdown[cat] || 0;
          const pct = Math.max((amount / totalExpense) * 100, 2);
          const barColor = CATEGORY_COLORS[cat] || colors.primary;

          return (
            <View
              key={cat}
              style={[
                styles.segment,
                {
                  width: `${pct}%`,
                  backgroundColor: barColor
                }
              ]}
            />
          );
        })}
      </View>

      {/* Category Pills Slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
        <TouchableOpacity
          onPress={() => onSelectCategory(null)}
          style={[
            styles.pill,
            {
              backgroundColor: activeCategory === null ? colors.primaryLight : colors.surfaceSubtle,
              borderColor: activeCategory === null ? colors.primary : colors.borderSubtle
            }
          ]}
        >
          <Text
            style={[
              styles.pillText,
              { color: activeCategory === null ? colors.primary : colors.textSecondary, fontWeight: activeCategory === null ? '700' : '500' }
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {categories.map((cat) => {
          const amount = categoryBreakdown[cat] || 0;
          const pct = Math.round((amount / totalExpense) * 100);
          const iconName = CATEGORY_ICONS[cat] || 'pricetag-outline';
          const catColor = CATEGORY_COLORS[cat] || colors.primary;
          const isSelected = activeCategory === cat;

          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelectCategory(isSelected ? null : cat)}
              style={[
                styles.pill,
                {
                  backgroundColor: isSelected ? `${catColor}25` : colors.surfaceSubtle,
                  borderColor: isSelected ? catColor : colors.borderSubtle
                }
              ]}
            >
              <View style={[styles.dot, { backgroundColor: catColor }]} />
              <Ionicons name={iconName} size={12} color={catColor} style={styles.pillIcon} />
              <Text
                style={[
                  styles.pillText,
                  { color: isSelected ? colors.text : colors.textSecondary, fontWeight: isSelected ? '700' : '500' }
                ]}
              >
                {cat}
              </Text>
              <Text style={[styles.pillPercent, { color: isSelected ? colors.primary : colors.textTertiary }]}>
                {pct}%
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2
  },
  headerRight: {
    fontSize: 11
  },
  segmentedBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 12
  },
  segment: {
    height: '100%'
  },
  pillsScroll: {
    gap: 6
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  pillIcon: {
    marginLeft: 1
  },
  pillText: {
    fontSize: 11
  },
  pillPercent: {
    fontSize: 10,
    fontWeight: '600'
  }
});
