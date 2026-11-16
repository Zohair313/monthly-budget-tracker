export const palette = {
  // Dark Clay Theme (Molded Obsidian Clay)
  dark: {
    name: 'dark',
    background: '#0E111B',
    backgroundSecondary: '#151926',
    surface: '#1B2133',
    surfaceSubtle: '#232B40',
    surfaceHover: '#2B354E',
    border: '#2C3652',
    borderSubtle: '#1F273B',
    
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    textMuted: '#475569',
    
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    primaryDark: '#3730A3',
    primaryLight: 'rgba(99, 102, 241, 0.18)',
    
    // Status colors
    income: '#10B981',       // Mint Clay
    incomeDark: '#047857',
    incomeLight: 'rgba(16, 185, 129, 0.18)',
    expense: '#F43F5E',      // Berry Rose Clay
    expenseDark: '#BE123C',
    expenseLight: 'rgba(244, 63, 94, 0.18)',
    warning: '#F59E0B',      // Honey Clay
    warningDark: '#B45309',
    warningLight: 'rgba(245, 158, 11, 0.18)',
    info: '#06B6D4',
    infoDark: '#0E7490',
    infoLight: 'rgba(6, 182, 212, 0.18)',
    
    shadow: '#06080F',
    cardBorder: 'rgba(255, 255, 255, 0.12)',
    
    // Claymorphism specific tokens
    clayBorderTop: 'rgba(255, 255, 255, 0.15)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.10)',
    clayBorderRight: 'rgba(0, 0, 0, 0.35)',
    clayBorderBottom: 'rgba(0, 0, 0, 0.50)',
    clayShadowColor: '#000000'
  },

  // Light Clay Theme (Warm Ceramic Slate Clay)
  light: {
    name: 'light',
    background: '#E8EDF5',
    backgroundSecondary: '#DDE5F0',
    surface: '#F4F7FC',
    surfaceSubtle: '#E6ECF6',
    surfaceHover: '#DCE4F0',
    border: '#CBD5E1',
    borderSubtle: '#E2E8F0',
    
    text: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#64748B',
    textMuted: '#94A3B8',
    
    primary: '#4F46E5',
    primaryHover: '#4338CA',
    primaryDark: '#312E81',
    primaryLight: 'rgba(79, 70, 229, 0.12)',
    
    // Status colors
    income: '#059669',
    incomeDark: '#047857',
    incomeLight: 'rgba(5, 150, 105, 0.12)',
    expense: '#E11D48',
    expenseDark: '#9F1239',
    expenseLight: 'rgba(225, 29, 72, 0.12)',
    warning: '#D97706',
    warningDark: '#92400E',
    warningLight: 'rgba(217, 119, 6, 0.12)',
    info: '#0891B2',
    infoDark: '#155E75',
    infoLight: 'rgba(8, 145, 178, 0.12)',
    
    shadow: '#7F91AB',
    cardBorder: 'rgba(255, 255, 255, 0.85)',
    
    // Claymorphism specific tokens
    clayBorderTop: 'rgba(255, 255, 255, 0.95)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.80)',
    clayBorderRight: 'rgba(148, 163, 184, 0.35)',
    clayBorderBottom: 'rgba(148, 163, 184, 0.55)',
    clayShadowColor: '#7B8DA6'
  }
};

export const categoryColors = {
  Food: { bg: '#FEF3C7', text: '#B45309', darkBg: 'rgba(245, 158, 11, 0.22)', darkText: '#FBBF24', icon: 'fast-food' },
  Bills: { bg: '#E0E7FF', text: '#4338CA', darkBg: 'rgba(99, 102, 241, 0.22)', darkText: '#818CF8', icon: 'receipt' },
  Travel: { bg: '#CCFBF1', text: '#0F766E', darkBg: 'rgba(20, 184, 166, 0.22)', darkText: '#2DD4BF', icon: 'airplane' },
  Shopping: { bg: '#FCE7F3', text: '#BE185D', darkBg: 'rgba(236, 72, 153, 0.22)', darkText: '#F472B6', icon: 'cart' },
  Health: { bg: '#DCFCE7', text: '#15803D', darkBg: 'rgba(34, 197, 94, 0.22)', darkText: '#4ADE80', icon: 'fitness' },
  Entertainment: { bg: '#EDE9FE', text: '#6D28D9', darkBg: 'rgba(168, 85, 247, 0.22)', darkText: '#C084FC', icon: 'film' },
  Education: { bg: '#FEF9C3', text: '#A16207', darkBg: 'rgba(234, 179, 8, 0.22)', darkText: '#FACC15', icon: 'school' },
  General: { bg: '#F1F5F9', text: '#475569', darkBg: 'rgba(148, 163, 184, 0.22)', darkText: '#CBD5E1', icon: 'pricetag' }
};

// Claymorphism Style Generators
export const getClayCard = (theme = 'dark') => {
  const c = palette[theme] || palette.dark;
  return {
    backgroundColor: c.surface,
    borderRadius: 24,
    borderWidth: 2,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: theme === 'dark' ? 0.45 : 0.35,
    shadowRadius: 16,
    elevation: 8
  };
};

export const getClayButton = (theme = 'dark', baseColor = '#4F46E5', bottomColor = '#312E81') => {
  return {
    backgroundColor: baseColor,
    borderRadius: 18,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 4,
    borderTopColor: 'rgba(255, 255, 255, 0.45)',
    borderLeftColor: 'rgba(255, 255, 255, 0.25)',
    borderRightColor: bottomColor,
    borderBottomColor: bottomColor,
    shadowColor: bottomColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6
  };
};

export const getClayPill = (theme = 'dark') => {
  const c = palette[theme] || palette.dark;
  return {
    borderRadius: 999,
    borderWidth: 1.5,
    borderBottomWidth: 2.5,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3
  };
};

export const getClayInput = (theme = 'dark') => {
  const c = palette[theme] || palette.dark;
  return {
    backgroundColor: c.surfaceSubtle,
    borderRadius: 16,
    borderWidth: 2,
    borderTopColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(148, 163, 184, 0.4)',
    borderLeftColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(148, 163, 184, 0.3)',
    borderRightColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
    borderBottomColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.95)'
  };
};
