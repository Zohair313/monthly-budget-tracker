import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from './Icon';
import { useBudget } from '../context/BudgetContext';
import { useAuth } from '../context/AuthContext';
import { palette, categoryColors, getClayCard, getClayPill } from '../theme/colors';

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

export default function CategoryBreakdown({ onSelectCategory, activeCategory }) {
  const { categoryBreakdown, summary } = useBudget();
  const { themeMode } = useAuth();
  const colors = palette[themeMode] || palette.light;
  const clayCard = getClayCard(themeMode);
  const clayPill = getClayPill(themeMode);

  const totalExpense = summary.total_expense || 0;
  const categories = Object.keys(categoryBreakdown);

  if (categories.length === 0 || totalExpense === 0) {
    return null;
  }

  // Calculate highest category for vertical chart normalization
  const maxAmount = Math.max(...categories.map((c) => categoryBreakdown[c] || 0), 1);

  return (
    <View style={[styles.container, clayCard]}>
      {/* Header (Reference image Screen 2 style) */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Outcome Transactions</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Category Distribution
          </Text>
        </View>

        <View
          style={[
            styles.totalBadge,
            clayPill,
            {
              backgroundColor: colors.surfaceSubtle
            }
          ]}
        >
          <Text style={[styles.totalBadgeText, { color: colors.primary }]}>
            Rs. {totalExpense.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* 3D Vertical Clay Pill Bar Chart (Screen 2 reference style) */}
      <View
        style={[
          styles.chartBox,
          {
            backgroundColor: themeMode === 'dark' ? '#181630' : '#F7F8FD',
            borderTopColor: colors.clayBorderTop,
            borderBottomColor: colors.clayBorderBottom
          }
        ]}
      >
        <View style={styles.barsContainer}>
          {categories.map((cat) => {
            const amount = categoryBreakdown[cat] || 0;
            const barHeightPct = Math.max(Math.round((amount / maxAmount) * 100), 18);
            const catConfig = categoryColors[cat] || categoryColors.General;
            const catColor = catConfig.color;
            const catDarkColor = catConfig.darkColor;
            const isSelected = activeCategory === cat;

            return (
              <TouchableOpacity
                key={cat}
                style={styles.barCol}
                onPress={() => onSelectCategory(isSelected ? null : cat)}
                accessibilityLabel={`${cat}: Rs. ${amount}`}
              >
                {/* Vertical 3D Clay Pill Bar */}
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.clayVerticalBar,
                      {
                        height: `${barHeightPct}%`,
                        backgroundColor: isSelected ? colors.primary : '#FF8095',
                        borderTopColor: 'rgba(255, 255, 255, 0.65)',
                        borderLeftColor: 'rgba(255, 255, 255, 0.40)',
                        borderRightColor: isSelected ? colors.primaryDark : '#E11D48',
                        borderBottomColor: isSelected ? colors.primaryDark : '#E11D48',
                        shadowColor: isSelected ? colors.primaryDark : '#E11D48'
                      }
                    ]}
                  />
                </View>

                {/* Day / Category Initial */}
                <Text
                  style={[
                    styles.barLabel,
                    {
                      color: isSelected ? colors.primary : colors.textSecondary,
                      fontWeight: isSelected ? '900' : '700'
                    }
                  ]}
                >
                  {cat.slice(0, 2).toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Category Pills Slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
        <TouchableOpacity
          onPress={() => onSelectCategory(null)}
          style={[
            styles.clayPillBtn,
            clayPill,
            activeCategory === null
              ? {
                  backgroundColor: colors.primary,
                  borderTopColor: 'rgba(255, 255, 255, 0.50)',
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
          const catConfig = categoryColors[cat] || categoryColors.General;
          const catColor = catConfig.color;
          const catDarkColor = catConfig.darkColor;
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
                      borderTopColor: 'rgba(255, 255, 255, 0.50)',
                      borderBottomColor: catDarkColor
                    }
                  : {
                      backgroundColor: colors.surfaceSubtle
                    }
              ]}
            >
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
    marginHorizontal: 20,
    marginTop: 14,
    padding: 18
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  headerLeft: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1
  },
  totalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  totalBadgeText: {
    fontSize: 12,
    fontWeight: '900'
  },
  chartBox: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderTopWidth: 2,
    borderBottomWidth: 3
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 120
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end'
  },
  barTrack: {
    width: 14,
    height: 95,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  clayVerticalBar: {
    width: 14,
    borderRadius: 7,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3
  },
  barLabel: {
    fontSize: 10,
    marginTop: 8
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
