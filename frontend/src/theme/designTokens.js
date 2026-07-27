/**
 * EventEasy Centralized Design System Tokens.
 * Styled after the modern SaaS Event Platform reference image:
 * Crisp typography (Plus Jakarta Sans & Outfit), clean light slate surfaces,
 * deep slate black (#0F172A), vibrant indigo accents (#6366F1), and pill-shaped modules.
 */
export const designTokens = {
  colors: {
    bg: '#FFFFFF',
    bgAlt: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceDark: '#0F172A',
    surfaceDarkAlt: '#0B0F17',
    primary: '#0F172A',
    primaryHover: '#1E293B',
    accent: '#6366F1',
    accentHover: '#4F46E5',
    accentLight: '#EEF2FF',
    accentGradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    textOnDark: '#FFFFFF',
    textOnDarkMuted: '#94A3B8',
    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    borderDark: 'rgba(255, 255, 255, 0.12)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    pillBg: '#F1F5F9',
    pillText: '#475569',
  },

  typography: {
    fontDisplay: "'Plus Jakarta Sans', 'Outfit', sans-serif",
    fontBody: "'Plus Jakarta Sans', 'Inter', sans-serif",
    heroTitle: 'clamp(2.5rem, 5vw, 4.25rem)',
    sectionTitle: 'clamp(2rem, 3.5vw, 2.75rem)',
    cardTitle: '1.25rem',
    bodyLarge: '1.125rem',
    bodyBase: '1rem',
    bodySmall: '0.875rem',
  },

  spacing: {
    sectionDesktop: '110px 24px',
    sectionTablet: '80px 20px',
    sectionMobile: '56px 16px',
    containerMaxWidth: '1240px',
  },

  radii: {
    pill: '9999px',
    card: '20px',
    button: '9999px',
    input: '12px',
    badge: '9999px',
    modal: '24px',
  },

  shadows: {
    subtle: '0 4px 20px rgba(15, 23, 42, 0.04)',
    hover: '0 16px 36px rgba(15, 23, 42, 0.08)',
    card: '0 8px 30px rgba(15, 23, 42, 0.06)',
    glow: '0 8px 24px rgba(99, 102, 241, 0.25)',
  },
};
