import React from 'react';
import { Button, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, DashboardOutlined, SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import { designTokens } from '../../../theme/designTokens';

/**
 * UserMenu component.
 * Renders Deep Charcoal Black pill CTA button for public visitors.
 * Renders user avatar dropdown for authenticated admins.
 */
export const UserMenu = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  if (!isAuthenticated) {
    return (
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={() => navigate(ROUTES.CONTACT)}
        style={{
          background: designTokens.colors.primary,
          color: designTokens.colors.textOnDark,
          borderColor: 'transparent',
          borderRadius: designTokens.radii.pill,
          height: '44px',
          padding: '0 24px',
          fontWeight: '600',
          fontSize: '14px',
          boxShadow: 'none',
        }}
      >
        Inquire Now
      </Button>
    );
  }

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Admin Dashboard',
      onClick: () => navigate(ROUTES.ADMIN_DASHBOARD),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <Avatar
          icon={<UserOutlined />}
          style={{ backgroundColor: designTokens.colors.primary, cursor: 'pointer' }}
        >
          {user?.firstName?.charAt(0)}
        </Avatar>
        <span style={{ color: designTokens.colors.textPrimary, fontSize: '14px', fontWeight: '500' }}>
          {user?.firstName || 'Admin'}
        </span>
      </div>
    </Dropdown>
  );
};
