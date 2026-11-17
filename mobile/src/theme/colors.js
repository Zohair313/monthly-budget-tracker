export const palette = {
  // Light Theme: Unified Executive Ceramic Slate (Apple / Revolut / Stripe Financial Standard)
  light: {
    name: 'light',
    // Universal Unified Canvas
    background: '#F8FAFC',           // Entire screen background (Consistent top to bottom)
    sheetBackground: '#F8FAFC',      // Seamless matching sheet
    topHeaderBg: '#F8FAFC',
    
    // Elevated Cards & Surfaces
    surface: '#FFFFFF',              // Pure crisp elevated white card
    surfaceSubtle: '#F1F5F9',        // Soft tactile mist
    surfaceHover: '#E2E8F0',
    border: '#E2E8F0',               // Hairline crisp border
    borderSubtle: '#F1F5F9',
    
    // Executive Balance Card (Hero Obsidian Navy)
    brandCard: '#0F172A',            // Midnight Obsidian Card
    brandCardHighlight: '#1E293B',
    brandCardBorder: 'rgba(255, 255, 255, 0.12)',
    
    // Typography
    text: '#0F172A',                 // Deep obsidian slate
    textWhite: '#FFFFFF',
    textSecondary: '#475569',
    textTertiary: '#94A3B8',
    textMuted: '#CBD5E1',
    
    // Brand Accent
    primary: '#4F46E5',              // Royal Indigo
    primaryDark: '#3730A3',
    primaryLight: 'rgba(79, 70, 229, 0.08)',
    
    // Financial Metrics
    income: '#10B981',               // Emerald Mint
    incomeDark: '#059669',
    incomeLight: 'rgba(16, 185, 129, 0.08)',
    incomeSurface: '#ECFDF5',
    incomeBorder: '#A7F3D0',
    
    expense: '#EF4444',              // Crimson Rose
    expenseDark: '#DC2626',
    expenseLight: 'rgba(239, 68, 68, 0.08)',
    expenseSurface: '#FEF2F2',
    expenseBorder: '#FECDD3',
    
    warning: '#F59E0B',              // Amber Caution
    warningDark: '#D97706',
    warningLight: 'rgba(245, 158, 11, 0.08)',
    warningSurface: '#FFFBEB',
    warningBorder: '#FDE68A',
    
    info: '#0284C7',
    infoDark: '#0369A1',
    infoLight: 'rgba(2, 132, 199, 0.08)',
    
    // Action Tiles
    tileMint: '#10B981',
    tileMintBg: '#ECFDF5',
    tileMintBorder: '#A7F3D0',
    
    tileCoral: '#EF4444',
    tileCoralBg: '#FEF2F2',
    tileCoralBorder: '#FECDD3',
    
    tileViolet: '#4F46E5',
    tileVioletBg: '#EEF2FF',
    tileVioletBorder: '#C7D2FE',
    
    tileCyan: '#0284C7',
    tileCyanBg: '#F0F9FF',
    tileCyanBorder: '#BAE6FD',
    
    // Bottom Dock
    dockBg: '#0F172A',
    dockActive: '#4F46E5',
    dockInactive: '#94A3B8',
    
    shadow: '#0F172A',
    cardShadow: '#64748B'
  },

  // Dark Theme: Midnight Obsidian & Luminous Sapphire (Linear / Mercury Dark Standard)
  dark: {
    name: 'dark',
    background: '#0B0F19',           // Seamless Midnight Obsidian
    sheetBackground: '#0B0F19',
    topHeaderBg: '#0B0F19',
    
    surface: '#1E293B',              // Elevated Slate Card
    surfaceSubtle: '#161F30',
    surfaceHover: '#334155',
    border: '#334155',
    borderSubtle: '#1E293B',
    
    brandCard: '#111827',            // Midnight Card with subtle rim
    brandCardHighlight: '#1F2937',
    brandCardBorder: 'rgba(255, 255, 255, 0.15)',
    
    text: '#F8FAFC',
    textWhite: '#FFFFFF',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    textMuted: '#475569',
    
    primary: '#6366F1',              // Luminous Indigo
    primaryDark: '#4F46E5',
    primaryLight: 'rgba(99, 102, 241, 0.15)',
    
    income: '#34D399',               // Neon Mint
    incomeDark: '#10B981',
    incomeLight: 'rgba(52, 211, 153, 0.12)',
    incomeSurface: 'rgba(52, 211, 153, 0.10)',
    incomeBorder: 'rgba(52, 211, 153, 0.3)',
    
    expense: '#FB7185',              // Neon Rose
    expenseDark: '#F43F5E',
    expenseLight: 'rgba(251, 113, 133, 0.12)',
    expenseSurface: 'rgba(251, 113, 133, 0.10)',
    expenseBorder: 'rgba(251, 113, 133, 0.3)',
    
    warning: '#FBBF24',
    warningDark: '#F59E0B',
    warningLight: 'rgba(251, 191, 36, 0.12)',
    warningSurface: 'rgba(251, 191, 36, 0.10)',
    warningBorder: 'rgba(251, 191, 36, 0.3)',
    
    info: '#38BDF8',
    infoDark: '#0284C7',
    infoLight: 'rgba(56, 189, 248, 0.12)',
    
    tileMint: '#34D399',
    tileMintBg: 'rgba(52, 211, 153, 0.12)',
    tileMintBorder: 'rgba(52, 211, 153, 0.25)',
    
    tileCoral: '#FB7185',
    tileCoralBg: 'rgba(251, 113, 133, 0.12)',
    tileCoralBorder: 'rgba(251, 113, 133, 0.25)',
    
    tileViolet: '#818CF8',
    tileVioletBg: 'rgba(129, 140, 248, 0.12)',
    tileVioletBorder: 'rgba(129, 140, 248, 0.25)',
    
    tileCyan: '#38BDF8',
    tileCyanBg: 'rgba(56, 189, 248, 0.12)',
    tileCyanBorder: 'rgba(56, 189, 248, 0.25)',
    
    dockBg: '#111827',
    dockActive: '#6366F1',
    dockInactive: '#64748B',
    
    shadow: '#000000',
    cardShadow: '#000000'
  }
};

export const getClayCard = (themeMode = 'light') => {
  const isDark = themeMode === 'dark';
  return {
    backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
    borderColor: isDark ? '#334155' : '#E2E8F0',
    borderWidth: 1,
    shadowColor: isDark ? '#000000' : '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.35 : 0.06,
    shadowRadius: 12,
    elevation: 3
  };
};

export const getClayButton = (themeMode = 'light', variant = 'primary') => {
  const isDark = themeMode === 'dark';
  let bg = isDark ? '#6366F1' : '#4F46E5';
  let shadow = isDark ? '#4F46E5' : '#3730A3';
  
  if (variant === 'income') {
    bg = isDark ? '#059669' : '#10B981';
    shadow = '#047857';
  } else if (variant === 'expense') {
    bg = isDark ? '#E11D48' : '#EF4444';
    shadow = '#BE123C';
  }
  
  return {
    backgroundColor: bg,
    shadowColor: shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  };
};

export const getClayInput = (themeMode = 'light') => {
  const isDark = themeMode === 'dark';
  return {
    backgroundColor: isDark ? '#161F30' : '#F8FAFC',
    borderColor: isDark ? '#334155' : '#E2E8F0',
    borderWidth: 1
  };
};

export const getClayPill = (themeMode = 'light') => {
  const isDark = themeMode === 'dark';
  return {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: isDark ? '#334155' : '#E2E8F0'
  };
};

export const categoryColors = {
  Food: { color: '#EF4444', bg: '#FEF2F2', icon: 'fast-food' },
  Bills: { color: '#F59E0B', bg: '#FFFBEB', icon: 'flash' },
  Travel: { color: '#0284C7', bg: '#F0F9FF', icon: 'car-sport' },
  Shopping: { color: '#8B5CF6', bg: '#F5F3FF', icon: 'bag-handle' },
  Health: { color: '#10B981', bg: '#ECFDF5', icon: 'medkit' },
  Entertainment: { color: '#EC4899', bg: '#FDF2F8', icon: 'game-controller' },
  General: { color: '#64748B', bg: '#F1F5F9', icon: 'cube' }
};
