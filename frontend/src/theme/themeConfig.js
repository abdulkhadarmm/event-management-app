import { designTokens } from './designTokens';

/**
 * Ant Design 5 Theme Token Configurator mapping global designTokens for modern SaaS event theme.
 */
export const themeConfig = {
  token: {
    // Primary Colors & Base Surfaces
    colorPrimary: designTokens.colors.primary,
    colorLink: designTokens.colors.accent,
    colorLinkHover: designTokens.colors.accentHover,
    colorBgBase: designTokens.colors.bg,
    colorBgContainer: designTokens.colors.surface,
    colorTextBase: designTokens.colors.textPrimary,
    colorTextSecondary: designTokens.colors.textSecondary,
    colorBorder: designTokens.colors.border,
    colorBorderSecondary: designTokens.colors.borderSubtle,

    // Global Typography
    fontFamily: designTokens.typography.fontBody,
    fontSize: 15,
    lineHeight: 1.6,

    // Radii & Geometry
    borderRadius: 14,
    borderRadiusLG: 20,
    borderRadiusSM: 10,

    // Feedback States
    colorSuccess: designTokens.colors.success,
    colorWarning: designTokens.colors.warning,
    colorError: designTokens.colors.error,
  },

  components: {
    Button: {
      borderRadius: 9999, // Pill shape
      controlHeight: 46,
      controlHeightLG: 52,
      fontWeight: 600,
      fontFamily: designTokens.typography.fontBody,
      colorPrimary: designTokens.colors.primary,
      colorPrimaryHover: designTokens.colors.primaryHover,
    },
    Card: {
      borderRadiusLG: 20,
      colorBgContainer: designTokens.colors.surface,
      colorBorderSecondary: designTokens.colors.border,
      boxShadowSecondary: designTokens.shadows.card,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 46,
      colorBorder: designTokens.colors.border,
    },
    Select: {
      borderRadius: 12,
      controlHeight: 46,
    },
    Modal: {
      borderRadiusLG: 24,
    },
    Drawer: {
      colorBgContainer: designTokens.colors.surface,
    },
    Table: {
      borderRadius: 16,
      colorBgContainer: designTokens.colors.surface,
    },
    Tag: {
      borderRadiusSM: 9999,
    },
  },
};
