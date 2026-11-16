export const palette = {
  // Light Clay Fintech Theme (Fine-tuned to match reference image)
  light: {
    name: 'light',
    // Rich, luminous Dribbble violet canvas
    brandViolet: '#755FE2',
    brandVioletDark: '#5B44D4',
    brandVioletLight: '#8F7CF6',
    brandVioletDeep: '#452EBE',
    
    // Bottom Porcelain Sheet
    background: '#755FE2',
    sheetBackground: '#F7F8FD',       // Ultra-clean, fresh porcelain sheet
    surface: '#FFFFFF',              // Pure white puffy clay cards
    surfaceSubtle: '#F0F3FA',
    surfaceHover: '#E9EDF7',
    border: '#E8ECF5',
    borderSubtle: '#F1F4FA',
    
    text: '#171435',                 // Deep midnight violet text
    textWhite: '#FFFFFF',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    textMuted: '#CBD5E1',
    
    primary: '#755FE2',
    primaryDark: '#553DD4',
    primaryLight: 'rgba(117, 95, 226, 0.12)',
    
    // 4 Candy-Clay Action Tiles (Reference image: Mint, Coral, Violet, Cyan)
    tileMint: '#34D399',
    tileMintBg: '#ECFDF5',
    tileMintDark: '#059669',
    
    tileCoral: '#FF758F',
    tileCoralBg: '#FFF1F2',
    tileCoralDark: '#E11D48',
    
    tileViolet: '#8F7CF6',
    tileVioletBg: '#F5F3FF',
    tileVioletDark: '#6D54E8',
    
    tileCyan: '#38BDF8',
    tileCyanBg: '#F0F9FF',
    tileCyanDark: '#0284C7',
    
    // Status colors
    income: '#10B981',
    incomeDark: '#047857',
    incomeLight: 'rgba(16, 185, 129, 0.12)',
    incomeSurface: '#ECFDF5',
    incomeBorder: '#A7F3D0',
    
    expense: '#F43F5E',
    expenseDark: '#BE123C',
    expenseLight: 'rgba(244, 63, 94, 0.12)',
    expenseSurface: '#FFF1F2',
    expenseBorder: '#FECDD3',
    
    warning: '#F59E0B',
    warningDark: '#B45309',
    warningLight: 'rgba(245, 158, 11, 0.12)',
    warningSurface: '#FFFBEB',
    warningBorder: '#FDE68A',
    
    info: '#06B6D4',
    infoDark: '#0E7490',
    infoLight: 'rgba(6, 182, 212, 0.12)',
    
    shadow: '#452EBE',
    cardShadow: '#8B98AD',
    
    clayBorderTop: 'rgba(255, 255, 255, 1.0)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.90)',
    clayBorderRight: 'rgba(170, 182, 200, 0.30)',
    clayBorderBottom: 'rgba(170, 182, 200, 0.50)',
    clayShadowColor: '#8C9BB0'
  },

  // Dark Clay Fintech Theme
  dark: {
    name: 'dark',
    brandViolet: '#543FC7',
    brandVioletDark: '#3C29A6',
    brandVioletLight: '#7A67EE',
    brandVioletDeep: '#261875',
    
    background: '#131124',
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
    
    primary: '#8572FF',
    primaryDark: '#553DE0',
    primaryLight: 'rgba(133, 114, 255, 0.22)',
    
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
    incomeSurface: '#0E271F',
    incomeBorder: '#16533F',
    
    expense: '#FB7185',
    expenseDark: '#E11D48',
    expenseLight: 'rgba(251, 113, 133, 0.20)',
    expenseSurface: '#2B121C',
    expenseBorder: '#5B192F',
    
    warning: '#FBBF24',
    warningDark: '#D97706',
    warningLight: 'rgba(251, 191, 36, 0.20)',
    warningSurface: '#2B1D0B',
    warningBorder: '#5E3D12',
    
    info: '#38BDF8',
    infoDark: '#0284C7',
    infoLight: 'rgba(56, 189, 248, 0.20)',
    
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
  Food: { bg: '#FFF1F2', darkBg: '#38161E', color: '#FF637E', darkColor: '#BE123C', icon: 'restaurant-outline' },
  Bills: { bg: '#F5F3FF', darkBg: '#251D42', color: '#8B5CF6', darkColor: '#6D28D9', icon: 'receipt-outline' },
  Travel: { bg: '#ECFDF5', darkBg: '#0F2C29', color: '#10B981', darkColor: '#047857', icon: 'car-outline' },
  Shopping: { bg: '#FDF2F8', darkBg: '#351629', color: '#EC4899', darkColor: '#BE185D', icon: 'bag-handle-outline' },
  Health: { bg: '#ECFDF5', darkBg: '#0E2F23', color: '#059669', darkColor: '#047857', icon: 'medkit-outline' },
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
    borderRightWidth: 1,
    borderBottomWidth: 3.5,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: theme === 'dark' ? 0.5 : 0.16,
    shadowRadius: 14,
    elevation: 4
  };
};

export const getClayButton = (theme = 'light', baseColor = '#755FE2', bottomColor = '#553DD4') => {
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
    shadowOpacity: 0.32,
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
    borderRightWidth: 1,
    borderBottomWidth: 2.5,
    borderTopColor: c.clayBorderTop,
    borderLeftColor: c.clayBorderLeft,
    borderRightColor: c.clayBorderRight,
    borderBottomColor: c.clayBorderBottom,
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
    elevation: 2
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
    borderTopColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(160, 174, 192, 0.40)',
    borderLeftColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(160, 174, 192, 0.30)',
    borderRightColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.95)',
    borderBottomColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 1.0)',
    shadowColor: c.clayShadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2
  };
};
