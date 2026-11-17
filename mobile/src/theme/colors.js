export const palette = {
  // Light Theme: Tactile Clay Lilac & Executive Porcelain (Reference Dribbble / Claymorphism Standard)
  light: {
    name: 'light',
    // Executive Brand Canvas
    brandViolet: '#6C52EE',          // Vibrant Purple/Lilac Canvas
    brandVioletDark: '#563CC5',      // Deep Lilac
    brandVioletLight: '#856EFF',     // Soft Lilac Highlight
    brandVioletDeep: '#3F2B96',
    
    // Backgrounds & Surfaces
    background: '#6C52EE',           // Top header canvas
    sheetBackground: '#F8F9FD',      // Pristine porcelain ceramic
    surface: '#FFFFFF',              // Pure pristine white card
    surfaceSubtle: '#F3F4F8',        // Soft tactile mist
    surfaceHover: '#EBEFF5',
    border: '#E8ECF2',               // Hairline soft border
    borderSubtle: '#F1F4F8',
    
    // Typography
    text: '#1E1B4B',                 // Deep slate purple
    textWhite: '#FFFFFF',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    textMuted: '#CBD5E1',
    
    primary: '#6C52EE',
    primaryDark: '#563CC5',
    primaryLight: 'rgba(108, 82, 238, 0.08)',
    
    // Professional Financial Action Tiles (Squircle Clay Badges)
    tileMint: '#10B981',
    tileMintBg: '#D1FAE5',
    tileMintBorder: '#A7F3D0',
    
    tileCoral: '#F43F5E',
    tileCoralBg: '#FFE4E6',
    tileCoralBorder: '#FECDD3',
    
    tileViolet: '#8B5CF6',
    tileVioletBg: '#EDE9FE',
    tileVioletBorder: '#DDD6FE',
    
    tileCyan: '#06B6D4',
    tileCyanBg: '#CFFAFE',
    tileCyanBorder: '#BAE6FD',
    tileCyanBorder: '#BAE6FD',
    
    // Status colors
    income: '#059669',               // Emerald
    incomeDark: '#047857',
    incomeLight: 'rgba(5, 150, 105, 0.08)',
    incomeSurface: '#ECFDF5',
    incomeBorder: '#A7F3D0',
    
    expense: '#E11D48',              // Crimson Rose
    expenseDark: '#9F1239',
    expenseLight: 'rgba(225, 29, 72, 0.08)',
    expenseSurface: '#FFF1F2',
    expenseBorder: '#FECDD3',
    
    warning: '#D97706',              // Amber
    warningDark: '#92400E',
    warningLight: 'rgba(217, 119, 6, 0.08)',
    warningSurface: '#FFFBEB',
    warningBorder: '#FDE68A',
    
    info: '#0284C7',
    infoDark: '#0369A1',
    infoLight: 'rgba(2, 132, 199, 0.08)',
    
    shadow: '#0F172A',
    cardShadow: '#64748B',
    
    // Sleek, refined tactile elevation
    clayBorderTop: '#FFFFFF',
    clayBorderLeft: '#FFFFFF',
    clayBorderRight: '#E2E8F0',
    clayBorderBottom: '#E2E8F0',
    clayShadowColor: '#0F172A'
  },

  // Dark Theme: Midnight Obsidian & Luminous Indigo (Linear / Mercury Dark Standard)
  dark: {
    name: 'dark',
    brandViolet: '#3730A3',
    brandVioletDark: '#1E1B4B',
    brandVioletLight: '#4F46E5',
    brandVioletDeep: '#0F0E1E',
    
    background: '#0B0F19',
    sheetBackground: '#0F172A',
    surface: '#1E293B',
    surfaceSubtle: '#334155',
    surfaceHover: '#475569',
    border: '#334155',
    borderSubtle: '#1E293B',
    
    text: '#F8FAFC',
    textWhite: '#FFFFFF',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    textMuted: '#475569',
    
    primary: '#6366F1',
    primaryDark: '#4F46E5',
    primaryLight: 'rgba(99, 102, 241, 0.15)',
    
    tileMint: '#10B981',
    tileMintBg: '#064E3B',
    tileMintBorder: '#047857',
    
    tileCoral: '#F43F5E',
    tileCoralBg: '#881337',
    tileCoralBorder: '#BE123C',
    
    tileViolet: '#818CF8',
    tileVioletBg: '#312E81',
    tileVioletBorder: '#4338CA',
    
    tileCyan: '#38BDF8',
    tileCyanBg: '#0C4A6E',
    tileCyanBorder: '#0284C7',
    
    income: '#10B981',
    incomeDark: '#047857',
    incomeLight: 'rgba(16, 185, 129, 0.15)',
    incomeSurface: '#064E3B',
    incomeBorder: '#047857',
    
    expense: '#F43F5E',
    expenseDark: '#BE123C',
    expenseLight: 'rgba(244, 63, 94, 0.15)',
    expenseSurface: '#881337',
    expenseBorder: '#BE123C',
    
    warning: '#F59E0B',
    warningDark: '#B45309',
    warningLight: 'rgba(245, 158, 11, 0.15)',
    warningSurface: '#78350F',
    warningBorder: '#92400E',
    
    info: '#38BDF8',
    infoDark: '#0284C7',
    infoLight: 'rgba(56, 189, 248, 0.15)',
    
    shadow: '#000000',
    cardShadow: '#000000',
    
    clayBorderTop: 'rgba(255, 255, 255, 0.12)',
    clayBorderLeft: 'rgba(255, 255, 255, 0.08)',
    clayBorderRight: 'rgba(0, 0, 0, 0.3)',
    clayBorderBottom: 'rgba(0, 0, 0, 0.4)',
    clayShadowColor: '#000000'
  }
};

export const categoryColors = {
  Food: { bg: '#FFF1F2', darkBg: '#38161E', color: '#E11D48', darkColor: '#FB7185', icon: 'restaurant-outline' },
  Bills: { bg: '#EEF2FF', darkBg: '#251D42', color: '#4F46E5', darkColor: '#818CF8', icon: 'receipt-outline' },
  Travel: { bg: '#ECFDF5', darkBg: '#0F2C29', color: '#059669', darkColor: '#34D399', icon: 'car-outline' },
  Shopping: { bg: '#FDF2F8', darkBg: '#351629', color: '#DB2777', darkColor: '#F472B6', icon: 'bag-handle-outline' },
  Health: { bg: '#ECFDF5', darkBg: '#0E2F23', color: '#059669', darkColor: '#34D399', icon: 'medkit-outline' },
  Entertainment: { bg: '#FAF5FF', darkBg: '#2D1B44', color: '#7C3AED', darkColor: '#A78BFA', icon: 'film-outline' },
  Education: { bg: '#FEFCE8', darkBg: '#332E0E', color: '#CA8A04', darkColor: '#FACC15', icon: 'book-outline' },
  General: { bg: '#F1F5F9', darkBg: '#1E2333', color: '#475569', darkColor: '#94A3B8', icon: 'pricetag-outline' }
};

// Professional Clean Tactile Style Generators
export const getClayCard = (theme = 'light') => {
  const c = palette[theme] || palette.light;
  return {
    backgroundColor: c.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.border,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: theme === 'dark' ? 0.35 : 0.06,
    shadowRadius: 12,
    elevation: 3
  };
};

export const getClayButton = (theme = 'light', baseColor = '#4F46E5', bottomColor = '#3730A3') => {
  return {
    backgroundColor: baseColor,
    borderRadius: 14,
    shadowColor: baseColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  };
};

export const getClayPill = (theme = 'light') => {
  const c = palette[theme] || palette.light;
  return {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: c.border,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme === 'dark' ? 0.2 : 0.04,
    shadowRadius: 4,
    elevation: 1
  };
};

export const getClayInput = (theme = 'light') => {
  const c = palette[theme] || palette.light;
  return {
    backgroundColor: c.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: c.border,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1
  };
};
