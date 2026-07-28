import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../../constants/navigation';
import { designTokens } from '../../../theme/designTokens';
import { StarOutlined } from '@ant-design/icons';

/**
 * NavigationMenu component rendering crisp, prominent header menu links with AI badge support.
 * Enforces single-line white-space formatting to prevent multi-line text wrapping on tablet/desktop viewports.
 */
export const NavigationMenu = () => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'nowrap' }}>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            textDecoration: 'none',
            fontSize: '15px',
            fontFamily: designTokens.typography.fontBody,
            fontWeight: isActive ? '700' : '600',
            color: isActive ? designTokens.colors.accent : designTokens.colors.textPrimary,
            letterSpacing: '-0.2px',
            transition: 'all 0.2s ease',
            padding: '6px 0',
            borderBottom: isActive ? `2px solid ${designTokens.colors.accent}` : '2px solid transparent',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          })}
        >
          {item.label}
          {item.badge && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                color: '#FFFFFF',
                padding: '2px 7px',
                borderRadius: '12px',
                lineHeight: '1',
                boxShadow: '0 2px 6px rgba(124, 58, 237, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                whiteSpace: 'nowrap',
              }}
            >
              <StarOutlined style={{ fontSize: '9px' }} /> {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
