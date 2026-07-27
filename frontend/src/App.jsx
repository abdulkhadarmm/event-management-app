import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import { themeConfig } from './theme/themeConfig';
import { AppRouter } from './routes/AppRouter';
import { ScrollToTop } from './components/common/UI/ScrollToTop';
import { useAuthStore } from './store/useAuthStore';

// Instantiate TanStack QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Root EventEasy Application component with Ant Design ConfigProvider, QueryClient, ScrollToTop, and AppRouter.
 */
export function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Check initial authentication token validity on app launch
    checkAuth();
  }, [checkAuth]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={themeConfig}>
          <BrowserRouter>
            <ScrollToTop />
            <AppRouter />
          </BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
