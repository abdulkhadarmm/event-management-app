import React from 'react';
import { Drawer, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../../store/useUIStore';
import { useAuth } from '../../../hooks/useAuth';
import { NAV_ITEMS } from '../../../constants/navigation';
import { ROUTES } from '../../../constants/routes';
import { Logo } from './Logo';
import { designTokens } from '../../../theme/designTokens';

/**
 * MobileMenu component rendering responsive navigation drawer consuming designTokens.
 */
export const MobileMenu = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    closeMobileMenu();
    navigate(path);
  };

  return (
    <Drawer
      title={<Logo variant="dark" />}
      placement="right"
      onClose={closeMobileMenu}
      open={isMobileMenuOpen}
      width={280}
      styles={{ body: { padding: '16px 0', background: designTokens.colors.bg } }}
    >
      <Menu mode="vertical" selectable={false} style={{ borderRight: 'none', background: 'transparent' }}>
        {NAV_ITEMS.map((item) => (
          <Menu.Item key={item.path} onClick={() => handleNavClick(item.path)}>
            <span style={{ color: designTokens.colors.textPrimary, fontWeight: '500' }}>{item.label}</span>
          </Menu.Item>
        ))}
      </Menu>

      <div style={{ padding: '24px 16px' }}>
        {isAuthenticated ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button
              type="primary"
              block
              onClick={() => handleNavClick(ROUTES.ADMIN_DASHBOARD)}
              style={{ background: designTokens.colors.primary, borderRadius: designTokens.radii.pill }}
            >
              Dashboard
            </Button>
            <Button danger block onClick={() => { logout(); closeMobileMenu(); }}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            type="primary"
            block
            style={{
              background: designTokens.colors.primary,
              borderRadius: designTokens.radii.pill,
              height: '46px',
              fontWeight: '600',
            }}
            onClick={() => handleNavClick(ROUTES.CONTACT)}
          >
            Inquire Event
          </Button>
        )}
      </div>
    </Drawer>
  );
};
