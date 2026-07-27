import { Grid } from 'antd';

const { useBreakpoint } = Grid;

/**
 * Custom React hook wrapping Ant Design Grid breakpoint detection.
 */
export const useResponsive = () => {
  const screens = useBreakpoint();
  return {
    screens,
    isMobile: !screens.md,
    isTablet: screens.md && !screens.lg,
    isDesktop: screens.lg,
  };
};
