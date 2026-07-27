import React from 'react';
import { designTokens } from '../../../theme/designTokens';

export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '28px',
        marginTop: '56px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '13px',
        fontFamily: designTokens.typography.fontBody,
      }}
    >
      <div>
        © {currentYear} <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>EventEasy</strong>. All rights reserved. Crafting extraordinary celebrations globally.
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <a href="#privacy" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="#terms" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>Terms of Service</a>
        <a href="#security" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>Security Policy</a>
      </div>
    </div>
  );
};
