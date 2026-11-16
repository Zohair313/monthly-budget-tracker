export const palette = {
  // Dark Theme (Obsidian / Space Black) - inspired by Stripe / Linear
  dark: {
    name: 'dark',
    background: '#0B0D14',
    backgroundSecondary: '#121520',
    surface: '#171B29',
    surfaceSubtle: '#1F2437',
    surfaceHover: '#262D42',
    border: '#2B3248',
    borderSubtle: '#1E2333',
    
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    textMuted: '#475569',
    
    primary: '#3B82F6',
    primaryHover: '#2563EB',
    primaryLight: 'rgba(59, 130, 246, 0.15)',
    
    // Status colors
    income: '#10B981',       // Emerald
    incomeLight: 'rgba(16, 185, 129, 0.14)',
    expense: '#F43F5E',      // Rose Red
    expenseLight: 'rgba(244, 63, 94, 0.14)',
    warning: '#F59E0B',      // Amber
    warningLight: 'rgba(245, 158, 11, 0.14)',
    info: '#06B6D4',
    infoLight: 'rgba(6, 182, 212, 0.14)',
    
    shadow: '#000000',
    cardBorder: 'rgba(255, 255, 255, 0.08)'
  },

  // Light Theme (Editorial Ceramic / Clean Slate)
  light: {
    name: 'light',
    background: '#F8FAFC',
    backgroundSecondary: '#F1F5F9',
    surface: '#FFFFFF',
    surfaceSubtle: '#F8FAFC',
    surfaceHover: '#F1F5F9',
    border: '#E2E8F0',
    borderSubtle: '#EDF2F7',
    
    text: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#64748B',
    textMuted: '#94A3B8',
    
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: 'rgba(37, 99, 235, 0.1)',
    
    // Status colors
    income: '#059669',
    incomeLight: 'rgba(5, 150, 105, 0.1)',
    expense: '#E11D48',
    expenseLight: 'rgba(225, 29, 72, 0.1)',
    warning: '#D97706',
    warningLight: 'rgba(217, 119, 6, 0.1)',
    info: '#0891B2',
    infoLight: 'rgba(8, 145, 178, 0.1)',
    
    shadow: '#64748B',
    cardBorder: 'rgba(0, 0, 0, 0.06)'
  }
};

export const categoryColors = {
  Food: { bg: '#FEF3C7', text: '#B45309', darkBg: 'rgba(245, 158, 11, 0.2)', darkText: '#FBBF24', icon: 'fast-food' },
  Bills: { bg: '#E0E7FF', text: '#4338CA', darkBg: 'rgba(99, 102, 241, 0.2)', darkText: '#818CF8', icon: 'receipt' },
  Travel: { bg: '#CCFBF1', text: '#0F766E', darkBg: 'rgba(20, 184, 166, 0.2)', darkText: '#2DD4BF', icon: 'airplane' },
  Shopping: { bg: '#FCE7F3', text: '#BE185D', darkBg: 'rgba(236, 72, 153, 0.2)', darkText: '#F472B6', icon: 'cart' },
  Health: { bg: '#DCFCE7', text: '#15803D', darkBg: 'rgba(34, 197, 94, 0.2)', darkText: '#4ADE80', icon: 'fitness' },
  Entertainment: { bg: '#EDE9FE', text: '#6D28D9', darkBg: 'rgba(168, 85, 247, 0.2)', darkText: '#C084FC', icon: 'film' },
  Education: { bg: '#FEF9C3', text: '#A16207', darkBg: 'rgba(234, 179, 8, 0.2)', darkText: '#FACC15', icon: 'school' },
  General: { bg: '#F1F5F9', text: '#475569', darkBg: 'rgba(148, 163, 184, 0.2)', darkText: '#CBD5E1', icon: 'pricetag' }
};
