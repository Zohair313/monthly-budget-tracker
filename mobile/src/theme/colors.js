export const palette = {
  // Light Clay Fintech Theme (Exact Dribbble Reference: Signature Violet & Porcelain White)
  light: {
    name: 'light',
    // Violet canvas for header and hero
    brandViolet: '#7B66FF',
    brandVioletDark: '#5E46EB',
    brandVioletLight: '#9483FF',
    brandVioletDeep: '#4932D8',
    
    // Bottom sheet
    background: '#7B66FF',           // Root container carries violet header
    sheetBackground: '#F4F6FC',      // Crisp, warm ceramic porcelain sheet
    surface: '#FFFFFF',
    surfaceSubtle: '#F0F3FA',
    surfaceHover: '#E8ECF5',
    border: '#E2E8F0',
    borderSubtle: '#EDF2F9',
    
    text: '#1E1B4B',                 // Deep midnight violet text
    textWhite: '#FFFFFF',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    textMuted: '#CBD5E1',
    
    primary: '#7B66FF',
    primaryDark: '#553DE0',
    primaryLight: 'rgba(123, 102, 255, 0.14)',
    
    // Quick Tile Accent Colors (from reference image)
    tileMint: '#48D597',
    tileMintBg: '#E8FBF2',
    tileMintDark: '#10B981',
    
    tileCoral: '#FF7B90',
    tileCoralBg: '#FFF0F2',
    tileCoralDark: '#E11D48',
    
    tileViolet: '#9483FF',
    tileVioletBg: '#F3F0FF',
    tileVioletDark: '#6C5CE7',
    
    tileCyan: '#4FD1C5',
    tileCyanBg: '#E6FFFA',
    tileCyanDark: '#0D9488',
    
    // Status colors
    income: '#10B981',
    incomeDark: '#047857',
    incomeLight: 'rgba(16, 185, 129, 0.14)',
    
    expense: '#F43F5E',
    expenseDark: '#BE123C',
    expenseLight: 'rgba(244, 63, 94, 0.14)',
    
    warning: '#F59E0B',
    warningDark: '#B45309',
    warningLight: 'rgba(245, 158, 11, 0.14)',
    
    shadow: '#4932D8',
    cardShadow: '#A0AEC0',
    
    clayBorderTop: 'rgba(255, 255, 255, 1.0)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.85)',
    clayBorderRight: 'rgba(160, 174, 192, 0.35)',
    clayBorderBottom: 'rgba(160, 174, 192, 0.60)',
    clayShadowColor: '#A0AEC0'
  },

  // Dark Clay Fintech Theme
  dark: {
    name: 'dark',
    brandViolet: '#5B48D9',
    brandVioletDark: '#3F2EA8',
    brandVioletLight: '#7E6EFF',
    brandVioletDeep: '#281B7E',
    
    background: '#141226',
    sheetBackground: '#0F0E1D',
    surface: '#1A182E',
    surfaceSubtle: '#22203A',
    surfaceHover: '#2A2847',
    border: '#2C294D',
    borderSubtle: '#1F1D38',
    
    text: '#FFFFFF',
    textWhite: '#FFFFFF',
    textSecondary: '#A0A0BA',
    textTertiary: '#70708C',
    textMuted: '#4F4E68',
    
    primary: '#8A78FF',
    primaryDark: '#553DE0',
    primaryLight: 'rgba(138, 120, 255, 0.22)',
    
    tileMint: '#34D399',
    tileMintBg: '#0F2F24',
    tileMintDark: '#059669',
    
    tileCoral: '#FB7185',
    tileCoralBg: '#351620',
    tileCoralDark: '#E11D48',
    
    tileViolet: '#A78BFA',
    tileVioletBg: '#27204A',
    tileVioletDark: '#7C3AED',
    
    tileCyan: '#38BDF8',
    tileCyanBg: '#102B3A',
    tileCyanDark: '#0284C7',
    
    income: '#34D399',
    incomeDark: '#059669',
    incomeLight: 'rgba(52, 211, 153, 0.20)',
    
    expense: '#FB7185',
    expenseDark: '#E11D48',
    expenseLight: 'rgba(251, 113, 133, 0.20)',
    
    warning: '#FBBF24',
    warningDark: '#D97706',
    warningLight: 'rgba(251, 191, 36, 0.20)',
    
    shadow: '#000000',
    cardShadow: '#000000',
    
    clayBorderTop: 'rgba(255, 255, 255, 0.18)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.12)',
    clayBorderRight: 'rgba(0, 0, 0, 0.45)',
    clayBorderBottom: 'rgba(0, 0, 0, 0.65)',
    clayShadowColor: '#000000'
  }
};

export const categoryColors = {
  Food: { bg: '#FFF0F2', darkBg: '#38161E', color: '#FB7185', darkColor: '#BE123C', icon: 'restaurant-outline' },
  Bills: { bg: '#F3F0FF', darkBg: '#251D42', color: '#8B5CF6', darkColor: '#6D28D9', icon: 'receipt-outline' },
  Travel: { bg: '#E6FFFA', darkBg: '#0F2C29', color: '#14B8A6', darkColor: '#0F766E', icon: 'car-outline' },
  Shopping: { bg: '#FDF2F8', darkBg: '#351629', color: '#EC4899', darkColor: '#BE185D', icon: 'bag-handle-outline' },
  Health: { bg: '#ECFDF5', darkBg: '#0E2F23', color: '#10B981', darkColor: '#047857', icon: 'medkit-outline' },
  Entertainment: { bg: '#FAF5FF', darkBg: '#2D1B44', color: '#A855F7', darkColor: '#7E22CE', icon: 'film-outline' },
  Education: { bg: '#FEFCE8', darkBg: '#332E0E', color: '#EAB308', darkColor: '#A16207', icon: 'book-outline' },
  General: { bg: '#F1F5F9', darkBg: '#1E2333', color: '#64748B', darkColor: '#334155', icon: 'pricetag-outline' }
};

// 3D Claymorphism Pill, Card and Button Generators
export const getClayCard = (theme = 'light') => {
  const c = palette[theme] || palette.light;
  return {
    backgroundColor: c.surface,
    borderRadius: 24,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 4,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: theme === 'dark' ? 0.5 : 0.28,
    shadowRadius: 14,
    elevation: 6
  };
};

export const getClayButton = (theme = 'light', baseColor = '#7B66FF', bottomColor = '#5E46EB') => {
  return {
    backgroundColor: baseColor,
    borderRadius: 18,
    borderTopWidth: 2.5,
    borderLeftWidth: 2,
    borderRightWidth: 1.5,
    borderBottomWidth: 4.5,
    borderTopColor: 'rgba(255, 255, 255, 0.55)',
    borderLeftColor: 'rgba(255, 255, 255, 0.35)',
    borderRightColor: bottomColor,
    borderBottomColor: bottomColor,
    shadowColor: bottomColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6
  };
};

export const getClayPill = (theme = 'light') => {
  const c = palette[theme] || palette.light;
  return {
    borderRadius: 999,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 3,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 3
  };
};

export const getClayInput = (theme = 'light') => {
  const c = palette[theme] || palette.light;
  return {
    backgroundColor: c.surfaceSubtle,
    borderRadius: 16,
    borderTopWidth: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 1.5,
    borderTopColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(160, 174, 192, 0.45)',
    borderLeftColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(160, 174, 192, 0.35)',
    borderRightColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.95)',
    borderBottomColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 1.0)',
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  };
};
