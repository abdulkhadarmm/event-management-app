import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { designTokens } from '../../../theme/designTokens';

/**
 * EventEasy Brand Text Logo Component displaying crisp, high-impact sans-serif typography.
 */
export const Logo = ({ variant = 'dark' }) => {
  const isLight = variant === 'light';

  return (
    <Link
      to={ROUTES.HOME}
      style={{
        textDecoration: 'none',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <span
        style={{
          fontFamily: designTokens.typography.fontDisplay,
          fontSize: '26px',
          fontWeight: '800',
          letterSpacing: '-0.75px',
          color: isLight ? designTokens.colors.textOnDark : designTokens.colors.textPrimary,
          lineHeight: '1.0',
        }}
      >
        Event<span style={{ color: designTokens.colors.accent }}>Easy</span>
      </span>
      <span
        style={{
          fontFamily: designTokens.typography.fontBody,
          fontSize: '9.5px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: isLight ? 'rgba(255, 255, 255, 0.75)' : designTokens.colors.textSecondary,
          fontWeight: '700',
          marginTop: '4px',
        }}
      >
        EVENT ARCHITECTURE & PLATFORM
      </span>
    </Link>
  );
};
