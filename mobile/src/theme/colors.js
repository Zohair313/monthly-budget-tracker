export const palette = {
  // Dark Clay Theme (Midnight Obsidian & Vivid Clay Accents)
  dark: {
    name: 'dark',
    background: '#0B0D17',
    backgroundSecondary: '#121624',
    surface: '#181D30',
    surfaceSubtle: '#212842',
    surfaceHover: '#2A3354',
    border: '#2C3558',
    borderSubtle: '#1C2237',
    
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    textMuted: '#475569',
    
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    primaryDark: '#3730A3',
    primaryLight: 'rgba(99, 102, 241, 0.22)',
    
    // Status colors
    income: '#10B981',       // Mint Clay
    incomeDark: '#047857',
    incomeLight: 'rgba(16, 185, 129, 0.20)',
    incomeSurface: '#0D231C',
    incomeBorder: '#0F513A',
    
    expense: '#F43F5E',      // Strawberry Rose Clay
    expenseDark: '#BE123C',
    expenseLight: 'rgba(244, 63, 94, 0.20)',
    expenseSurface: '#2B121C',
    expenseBorder: '#5E1B31',
    
    warning: '#F59E0B',      // Honey Amber Clay
    warningDark: '#B45309',
    warningLight: 'rgba(245, 158, 11, 0.20)',
    warningSurface: '#291C0B',
    warningBorder: '#543813',
    
    info: '#06B6D4',
    infoDark: '#0E7490',
    infoLight: 'rgba(6, 182, 212, 0.20)',
    
    shadow: '#000000',
    cardBorder: 'rgba(255, 255, 255, 0.14)',
    
    // Hero Balance Card Gradient/Clay styles
    heroHealthyBg: '#3730A3',
    heroHealthyBottom: '#1E1B4B',
    heroHealthyGleam: 'rgba(165, 180, 252, 0.35)',
    
    heroDeficitBg: '#9F1239',
    heroDeficitBottom: '#4C0519',
    heroDeficitGleam: 'rgba(253, 164, 175, 0.35)',
    
    heroWarningBg: '#92400E',
    heroWarningBottom: '#451A03',
    heroWarningGleam: 'rgba(253, 230, 138, 0.35)',

    // Claymorphism specific tokens
    clayBorderTop: 'rgba(255, 255, 255, 0.22)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.14)',
    clayBorderRight: 'rgba(0, 0, 0, 0.45)',
    clayBorderBottom: 'rgba(0, 0, 0, 0.65)',
    clayShadowColor: '#000000'
  },

  // Light Clay Theme (Airy Soft Pastel Ceramic & Vivid Clay Accents)
  light: {
    name: 'light',
    background: '#E6ECF5',
    backgroundSecondary: '#DBE3F0',
    surface: '#F4F7FC',
    surfaceSubtle: '#E5EDF8',
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
    primaryLight: 'rgba(79, 70, 229, 0.14)',
    
    // Status colors
    income: '#059669',
    incomeDark: '#047857',
    incomeLight: 'rgba(5, 150, 105, 0.14)',
    incomeSurface: '#ECFDF5',
    incomeBorder: '#A7F3D0',
    
    expense: '#E11D48',
    expenseDark: '#9F1239',
    expenseLight: 'rgba(225, 29, 72, 0.14)',
    expenseSurface: '#FFF1F2',
    expenseBorder: '#FECDD3',
    
    warning: '#D97706',
    warningDark: '#92400E',
    warningLight: 'rgba(217, 119, 6, 0.14)',
    warningSurface: '#FFFBEB',
    warningBorder: '#FDE68A',
    
    info: '#0891B2',
    infoDark: '#155E75',
    infoLight: 'rgba(8, 145, 178, 0.14)',
    
    shadow: '#6B7C96',
    cardBorder: 'rgba(255, 255, 255, 0.95)',
    
    // Hero Balance Card Gradient/Clay styles
    heroHealthyBg: '#4F46E5',
    heroHealthyBottom: '#312E81',
    heroHealthyGleam: 'rgba(199, 210, 254, 0.45)',
    
    heroDeficitBg: '#E11D48',
    heroDeficitBottom: '#881337',
    heroDeficitGleam: 'rgba(254, 205, 211, 0.45)',
    
    heroWarningBg: '#D97706',
    heroWarningBottom: '#78350F',
    heroWarningGleam: 'rgba(254, 240, 138, 0.45)',

    // Claymorphism specific tokens
    clayBorderTop: 'rgba(255, 255, 255, 1.0)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.90)',
    clayBorderRight: 'rgba(148, 163, 184, 0.40)',
    clayBorderBottom: 'rgba(148, 163, 184, 0.65)',
    clayShadowColor: '#6B7C96'
  }
};

export const categoryColors = {
  Food: { bg: '#FEF3C7', darkBg: 'rgba(245, 158, 11, 0.25)', color: '#F59E0B', darkColor: '#B45309', icon: 'fast-food' },
  Bills: { bg: '#E0E7FF', darkBg: 'rgba(99, 102, 241, 0.25)', color: '#6366F1', darkColor: '#4338CA', icon: 'receipt' },
  Travel: { bg: '#CCFBF1', darkBg: 'rgba(20, 184, 166, 0.25)', color: '#14B8A6', darkColor: '#0F766E', icon: 'airplane' },
  Shopping: { bg: '#FCE7F3', darkBg: 'rgba(236, 72, 153, 0.25)', color: '#EC4899', darkColor: '#BE185D', icon: 'cart' },
  Health: { bg: '#DCFCE7', darkBg: 'rgba(34, 197, 94, 0.25)', color: '#10B981', darkColor: '#047857', icon: 'fitness' },
  Entertainment: { bg: '#EDE9FE', darkBg: 'rgba(168, 85, 247, 0.25)', color: '#8B5CF6', darkColor: '#6D28D9', icon: 'film' },
  Education: { bg: '#FEF9C3', darkBg: 'rgba(234, 179, 8, 0.25)', color: '#EAB308', darkColor: '#A16207', icon: 'school' },
  General: { bg: '#F1F5F9', darkBg: 'rgba(148, 163, 184, 0.25)', color: '#64748B', darkColor: '#334155', icon: 'pricetag' }
};

// Claymorphism Style Generators
export const getClayCard = (theme = 'dark') => {
  const c = palette[theme] || palette.dark;
  return {
    backgroundColor: c.surface,
    borderRadius: 26,
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 4.5,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: theme === 'dark' ? 0.55 : 0.40,
    shadowRadius: 18,
    elevation: 9
  };
};

export const getClayButton = (theme = 'dark', baseColor = '#4F46E5', bottomColor = '#312E81') => {
  return {
    backgroundColor: baseColor,
    borderRadius: 20,
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 5,
    borderTopColor: 'rgba(255, 255, 255, 0.50)',
    borderLeftColor: 'rgba(255, 255, 255, 0.30)',
    borderRightColor: bottomColor,
    borderBottomColor: bottomColor,
    shadowColor: bottomColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.40,
    shadowRadius: 12,
    elevation: 8
  };
};

export const getClayPill = (theme = 'dark') => {
  const c = palette[theme] || palette.dark;
  return {
    borderRadius: 999,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3.5,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 7,
    elevation: 4
  };
};

export const getClayInput = (theme = 'dark') => {
  const c = palette[theme] || palette.dark;
  return {
    backgroundColor: c.surfaceSubtle,
    borderRadius: 18,
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderTopColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(148, 163, 184, 0.50)',
    borderLeftColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(148, 163, 184, 0.40)',
    borderRightColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.95)',
    borderBottomColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 1.0)',
    shadowColor: theme === 'dark' ? '#000000' : '#8FA0B8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2
  };
};
