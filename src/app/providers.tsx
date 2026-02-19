import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from './theme';
import { queryClient } from '@/lib/api/queryClient';
import { logger } from '@/lib/logger';
import { ErrorBoundary } from '@/components/shared';

const MSAL_CLIENT_ID = import.meta.env.VITE_MSAL_CLIENT_ID;

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init(): Promise<void> {
      try {
        if (MSAL_CLIENT_ID) {
          const { detectTeamsEnvironment } = await import('@/lib/teams');
          await detectTeamsEnvironment();

          const { PublicClientApplication } = await import('@azure/msal-browser');
          const { msalConfig } = await import('@/lib/auth');
          const msalInstance = new PublicClientApplication(msalConfig);
          await msalInstance.initialize();
          logger.info('MSAL initialized', 'Init');
        } else {
          logger.info('MSAL skipped — no VITE_MSAL_CLIENT_ID configured', 'Init');
        }
      } catch (error) {
        logger.warn('MSAL/Teams initialization skipped', 'Init', error);
      } finally {
        setIsReady(true);
      }
    }
    void init();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
