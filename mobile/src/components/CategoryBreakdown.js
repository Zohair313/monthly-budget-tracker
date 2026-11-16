import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, getClayCard, getClayPill } from '../theme/colors';

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

export default function CategoryBreakdown({ onSelectCategory, activeCategory }) {
  const { categoryBreakdown, summary } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.dark;
  const clayCard = getClayCard(themeMode);
  const clayPill = getClayPill(themeMode);

  const totalExpense = summary.total_expense || 0;
  const categories = Object.keys(categoryBreakdown);

  if (categories.length === 0 || totalExpense === 0) {
    return null;
  }

  return (
    <View style={[styles.container, clayCard]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.headerIconCoin,
              {
                backgroundColor: colors.primaryLight,
                borderTopColor: 'rgba(255, 255, 255, 0.45)',
                borderBottomColor: colors.primaryDark
              }
            ]}
          >
            <Ionicons name="pie-chart-outline" size={14} color={colors.primary} />
          </View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Category Breakdown</Text>
        </View>
        <Text style={[styles.headerRight, { color: colors.textSecondary }]}>
          {categories.length} {categories.length === 1 ? 'category' : 'categories'}
        </Text>
      </View>

      {/* Debossed Segmented Distribution Bar */}
      <View
        style={[
          styles.segmentedBar,
          {
            backgroundColor: colors.surfaceSubtle,
            borderTopColor: themeMode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(148,163,184,0.4)',
            borderBottomColor: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)'
          }
        ]}
      >
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
                  backgroundColor: barColor,
                  borderTopColor: 'rgba(255, 255, 255, 0.4)',
                  borderBottomColor: CATEGORY_DARK_COLORS[cat] || colors.primaryDark
                }
              ]}
            />
          );
        })}
      </View>

      {/* Clay Category Pills Slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
        <TouchableOpacity
          onPress={() => onSelectCategory(null)}
          style={[
            styles.clayPillBtn,
            clayPill,
            activeCategory === null
              ? {
                  backgroundColor: colors.primary,
                  borderTopColor: 'rgba(255, 255, 255, 0.45)',
                  borderBottomColor: colors.primaryDark
                }
              : {
                  backgroundColor: colors.surfaceSubtle
                }
          ]}
        >
          <Text
            style={[
              styles.pillText,
              {
                color: activeCategory === null ? '#FFFFFF' : colors.textSecondary,
                fontWeight: activeCategory === null ? '800' : '600'
              }
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
          const catDarkColor = CATEGORY_DARK_COLORS[cat] || colors.primaryDark;
          const isSelected = activeCategory === cat;

          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelectCategory(isSelected ? null : cat)}
              style={[
                styles.clayPillBtn,
                clayPill,
                isSelected
                  ? {
                      backgroundColor: catColor,
                      borderTopColor: 'rgba(255, 255, 255, 0.45)',
                      borderBottomColor: catDarkColor
                    }
                  : {
                      backgroundColor: colors.surfaceSubtle
                    }
              ]}
            >
              {!isSelected && <View style={[styles.dot, { backgroundColor: catColor }]} />}
              <Ionicons
                name={iconName}
                size={13}
                color={isSelected ? '#FFFFFF' : catColor}
                style={styles.pillIcon}
              />
              <Text
                style={[
                  styles.pillText,
                  {
                    color: isSelected ? '#FFFFFF' : colors.text,
                    fontWeight: isSelected ? '800' : '600'
                  }
                ]}
              >
                {cat}
              </Text>
              <Text
                style={[
                  styles.pillPercent,
                  {
                    color: isSelected ? 'rgba(255, 255, 255, 0.85)' : colors.textTertiary
                  }
                ]}
              >
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
    marginTop: 12,
    padding: 16
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerIconCoin: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2
  },
  headerRight: {
    fontSize: 11,
    fontWeight: '600'
  },
  segmentedBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 14,
    borderWidth: 1.5
  },
  segment: {
    height: '100%',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5
  },
  pillsScroll: {
    gap: 8
  },
  clayPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    gap: 5
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
    fontSize: 12
  },
  pillPercent: {
    fontSize: 10,
    fontWeight: '700'
  }
});
