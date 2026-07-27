import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { useUIStore } from '../../../store/useUIStore';
import { useResponsive } from '../../../hooks/useResponsive';
import { designTokens } from '../../../theme/designTokens';

/**
 * Luxury Navigation Header component.
 * Transparent over Homepage Hero Slider, transitioning smoothly to frosted white background on subpages and scroll.
 */
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { toggleMobileMenu } = useUIStore();
  const { isMobile } = useResponsive();

  const isHomePage = location.pathname === '/';
  const isFrosted = scrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isFrosted ? 'rgba(255, 255, 255, 0.94)' : 'transparent',
        backdropFilter: isFrosted ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isFrosted ? 'blur(16px)' : 'none',
        borderBottom: isFrosted ? '1px solid rgba(226, 232, 240, 0.8)' : 'none',
        boxShadow: isFrosted ? '0 4px 20px rgba(15, 23, 42, 0.05)' : 'none',
        padding: isFrosted ? '14px 0' : '20px 0',
      }}
    >
      <div
        style={{
          maxWidth: designTokens.spacing.containerMaxWidth,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo variant="dark" />

        {!isMobile && (
          <>
            <NavigationMenu scrolled={isFrosted} />
            <UserMenu />
          </>
        )}

        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: designTokens.colors.textPrimary, fontSize: '22px' }} />}
            onClick={toggleMobileMenu}
          />
        )}
      </div>

      <MobileMenu />
    </header>
  );
};
