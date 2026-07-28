import React, { useState, useEffect } from 'react';
import { Layout, Button, Avatar, Dropdown, Input, Drawer } from 'antd';
import {
  DashboardOutlined,
  MailOutlined,
  AppstoreOutlined,
  DollarOutlined,
  BgColorsOutlined,
  CameraOutlined,
  LogoutOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  BellOutlined,
  DownOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { Logo } from '../components/common/Navbar/Logo';
import { AdminSettingsModal } from '../features/admin/settings/AdminSettingsModal';
import { useResponsive } from '../hooks/useResponsive';

const { Header, Sider, Content } = Layout;

/**
 * Admin Layout component matching Bordio-style dashboard design:
 * Fully responsive across mobile, tablet, and desktop viewports.
 * Uses a sleek collapsible sidebar on desktop and a smooth slide-out drawer menu on mobile devices (< 992px).
 */
export const AdminLayout = () => {
  const { isMobile, isTablet } = useResponsive();
  const isSmallScreen = isMobile || isTablet;

  const [collapsed, setCollapsed] = useState(isSmallScreen);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    }
  }, [isSmallScreen]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const navItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      key: '/admin/enquiries',
      icon: <MailOutlined />,
      label: 'Enquiries',
      path: '/admin/enquiries',
    },
    {
      key: '/admin/subscribers',
      icon: <UsergroupAddOutlined />,
      label: 'Subscribers',
      path: '/admin/subscribers',
    },
    {
      key: '/admin/event-types',
      icon: <AppstoreOutlined />,
      label: 'Event Categories',
      path: '/admin/event-types',
    },
    {
      key: '/admin/packages',
      icon: <DollarOutlined />,
      label: 'Packages',
      path: '/admin/packages',
    },
    {
      key: '/admin/themes',
      icon: <BgColorsOutlined />,
      label: 'Design Themes',
      path: '/admin/themes',
    },
    {
      key: '/admin/gallery',
      icon: <CameraOutlined />,
      label: 'Celebrations',
      path: '/admin/gallery',
    },
    {
      key: ROUTES.HOME,
      icon: <HomeOutlined />,
      label: 'Public Website',
      path: ROUTES.HOME,
    },
  ];

  const displayName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Administrator'
    : 'Administrator';

  const userRole = user?.roles?.[0]?.replace('ROLE_', '') || 'Administrator';
  const userEmail = user?.email || 'admin@eventeasy.com';

  const userMenuItems = [
    {
      key: 'profile-header',
      label: (
        <div style={{ padding: '4px 8px' }}>
          <div style={{ fontWeight: '700', color: '#1E293B', fontSize: '14px' }}>{displayName}</div>
          <div style={{ color: '#64748B', fontSize: '12px', marginTop: '2px' }}>{userEmail}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#F1F5F9', color: '#475569', fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px', marginTop: '6px' }}>
            <SafetyCertificateOutlined style={{ color: '#7C3AED' }} /> {userRole}
          </div>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'settings',
      icon: <SettingOutlined style={{ color: '#7C3AED' }} />,
      label: <span style={{ fontWeight: '600', color: '#0F172A' }}>Account Settings</span>,
      onClick: () => setIsSettingsOpen(true),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined style={{ color: '#EF4444' }} />,
      label: <span style={{ color: '#EF4444', fontWeight: '600' }}>Sign Out</span>,
      onClick: handleLogout,
    },
  ];

  const renderNavMenuList = (isDrawer = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isCollapsedMode = !isDrawer && collapsed;

        return (
          <div
            key={item.key}
            onClick={() => {
              navigate(item.path);
              if (isDrawer) setMobileDrawerOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: isCollapsedMode ? '12px' : '12px 20px',
              justifyContent: isCollapsedMode ? 'center' : 'flex-start',
              borderRadius: '30px',
              cursor: 'pointer',
              background: isActive
                ? 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)'
                : 'transparent',
              color: isActive ? '#FFFFFF' : '#6B7280',
              fontWeight: isActive ? '600' : '500',
              fontSize: '14px',
              transition: 'all 0.2s ease-in-out',
              boxShadow: isActive ? '0 6px 16px rgba(124, 58, 237, 0.35)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>
            {(!isCollapsedMode || isDrawer) && <span>{item.label}</span>}
          </div>
        );
      })}
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#F4F5F9', overflowX: 'hidden' }}>
      {/* Mobile Slide-Out Drawer Navigation (< 768px) */}
      <Drawer
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        width={260}
        styles={{ body: { padding: '20px 16px', background: '#FFFFFF' } }}
      >
        <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
          <Logo variant="dark" />
        </div>
        {renderNavMenuList(true)}
      </Drawer>

      {/* Desktop / Tablet Sidebar (hidden on mobile, collapsible on tablet) */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={240}
          collapsedWidth={72}
          style={{
            background: '#FFFFFF',
            borderRight: '1px solid #E5E7EB',
            padding: '16px 8px',
          }}
        >
          {/* Brand Logo Header */}
          <div style={{ padding: '12px 12px 28px 12px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            {collapsed ? (
              <img
                src="/favicon.svg"
                alt="EventEasy"
                style={{
                  width: '36px',
                  height: '36px',
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(ROUTES.HOME)}
              />
            ) : (
              <Logo variant="dark" />
            )}
          </div>

          {/* Navigation Items */}
          {renderNavMenuList(false)}
        </Sider>
      )}

      <Layout style={{ background: '#F4F5F9', minWidth: 0, flex: 1 }}>
        {/* Top Navigation Header Bar */}
        <Header
          style={{
            padding: isMobile ? '0 16px' : '0 32px',
            background: '#F4F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                if (isMobile) {
                  setMobileDrawerOpen(true);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              style={{ fontSize: '18px', color: '#374151', flexShrink: 0 }}
            />

            {/* Bordio Style Top Search Bar */}
            <Input
              placeholder={isMobile ? 'Search...' : 'Search events, clients, enquiries...'}
              prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
              style={{
                width: isMobile ? '100%' : 320,
                maxWidth: isMobile ? '180px' : '320px',
                borderRadius: '30px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                padding: '6px 14px',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px', flexShrink: 0 }}>
            {/* Notification Icon */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                flexShrink: 0,
              }}
            >
              <BellOutlined style={{ color: '#374151', fontSize: '15px' }} />
            </div>

            {/* Executive User Profile Badge Dropdown */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  background: '#FFFFFF',
                  padding: isMobile ? '4px 8px' : '6px 16px 6px 8px',
                  borderRadius: '30px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Avatar
                  size={32}
                  icon={<UserOutlined style={{ fontSize: '15px' }} />}
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                    boxShadow: '0 2px 6px rgba(124, 58, 237, 0.3)',
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />

                {!isMobile && (
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1.2' }}>
                    <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '13px' }}>
                      {displayName}
                    </span>
                    <span style={{ color: '#64748B', fontSize: '11px', fontWeight: '500' }}>
                      {userRole}
                    </span>
                  </div>
                )}

                <DownOutlined style={{ color: '#94A3B8', fontSize: '10px' }} />
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Dashboard Main Workspace Area */}
        <Content style={{ padding: isMobile ? '16px' : '0 32px 32px 32px', background: '#F4F5F9', overflowX: 'hidden' }}>
          <Outlet />
        </Content>

        {/* Admin Account & Security Settings Modal */}
        <AdminSettingsModal
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
