import React from 'react';
import { AppProviders } from './providers';
import { AppRoutes } from './routes';

export const App: React.FC = () => (
  <AppProviders>
    <AppRoutes />
  </AppProviders>
);
