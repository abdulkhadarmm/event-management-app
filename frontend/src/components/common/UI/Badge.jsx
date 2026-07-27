import React from 'react';
import { designTokens } from '../../../theme/designTokens';

/**
 * Custom luxury pill badge component consuming designTokens.
 */
export const Badge = ({ children, variant = 'gold' }) => {
  const styles = {
    gold: {
      background: designTokens.colors.accentLight,
      color: designTokens.colors.textPrimary,
      border: `1px solid ${designTokens.colors.border}`,
    },
    dark: {
      background: designTokens.colors.primary,
      color: designTokens.colors.textOnDark,
      border: 'none',
    },
    white: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: designTokens.colors.textOnDark,
      border: '1px solid rgba(255, 255, 255, 0.4)',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: designTokens.radii.badge,
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontFamily: designTokens.typography.fontBody,
        ...styles[variant],
      }}
    >
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: designTokens.colors.accent }} />
      {children}
    </span>
  );
};
