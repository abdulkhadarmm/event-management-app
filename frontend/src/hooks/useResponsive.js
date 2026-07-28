import { Grid } from 'antd';

const { useBreakpoint } = Grid;

/**
 * Custom React hook wrapping Ant Design Grid breakpoint detection.
 * Provides responsive flags for mobile, tablet, and desktop viewports.
 */
export const useResponsive = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // < 768px
  const isTablet = screens.md && !screens.lg; // 768px - 991px
  const isDesktop = screens.lg; // >= 992px

  return {
    screens,
    isMobile,
    isTablet,
    isDesktop,
    showMobileMenu: !screens.lg, // Show mobile/tablet drawer menu on screens under 992px
  };
};
