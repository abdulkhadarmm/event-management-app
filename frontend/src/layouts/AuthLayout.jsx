import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../components/common/Navbar/Logo';
import { designTokens } from '../theme/designTokens';

/**
 * Authentication Layout centering login form with Warm Ivory backdrop consuming designTokens.
 */
export const AuthLayout = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: designTokens.colors.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <Logo variant="dark" />
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: designTokens.colors.surface,
          borderRadius: designTokens.radii.modal,
          padding: '40px 32px',
          boxShadow: designTokens.shadows.card,
          border: `1px solid ${designTokens.colors.border}`,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
