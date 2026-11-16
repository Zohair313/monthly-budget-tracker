import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ICON_MAP = {
  // Navigation & Chevrons
  'chevron-back': '‹',
  'chevron-forward': '›',
  'close': '✕',
  'close-circle': '✕',
  
  // Actions
  'add': '+',
  'add-circle-outline': '+',
  'pencil': '✎',
  'create-outline': '✎',
  'trash-outline': '🗑',
  'share-outline': '↗',
  'copy-outline': '📋',
  'checkmark': '✓',
  'checkmark-circle': '✓',
  'search-outline': '⌕',
  
  // Theme & Status
  'sunny-outline': '☀',
  'moon-outline': '☾',
  'warning': '⚠',
  'alert-circle': '⚠',
  'alert-circle-outline': '⚠',
  'notifications': '🔔',
  'hourglass-outline': '⏳',
  'radio-outline': '◉',
  'cloud-offline-outline': '⚡',
  
  // Finance & System
  'wallet': '💳',
  'wallet-outline': '💳',
  'receipt': '🧾',
  'receipt-outline': '🧾',
  'server-outline': '⚙',
  'settings-outline': '⚙',
  'log-out-outline': '⎋',
  'arrow-down-circle-outline': '↓',
  'arrow-up-circle-outline': '↑',
  'trending-up': '↗',
  'trending-down': '↘',
  'pie-chart-outline': '📊',
  'document-text-outline': '📄',
  'calendar-outline': '📅',
  'information-circle-outline': 'ⓘ',
  
  // Auth
  'person-outline': '👤',
  'mail-outline': '✉',
  'lock-closed-outline': '🔒',
  'eye-outline': '👁',
  'eye-off-outline': '⊘',
  'flash-outline': '⚡',
  
  // Categories
  'restaurant-outline': '🍲',
  'car-outline': '🚗',
  'bag-handle-outline': '🛍',
  'medkit-outline': '💊',
  'film-outline': '🎬',
  'book-outline': '📚',
  'pricetag-outline': '🏷',
  'pricetag': '🏷',
  'airplane': '✈',
  'cart': '🛒',
  'fitness': '🏃',
  'school': '🎓',
  'fast-food': '🍔'
};

export default function Icon({ name, size = 16, color = '#FFFFFF', style }) {
  const glyph = ICON_MAP[name] || '•';

  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <Text
        style={[
          styles.glyph,
          {
            fontSize: size * 0.9,
            color,
            lineHeight: size
          }
        ]}
      >
        {glyph}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  glyph: {
    textAlign: 'center',
    fontWeight: '700'
  }
});
