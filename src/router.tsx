import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { OverviewPage } from './pages/OverviewPage';
import { TrendPage } from './pages/TrendPage';
import { CasesPage } from './pages/CasesPage';
import { ActionPage } from './pages/ActionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/overview" replace />
      },
      {
        path: 'overview',
        element: <OverviewPage />
      },
      {
        path: 'trend',
        element: <TrendPage />
      },
      {
        path: 'cases',
        element: <CasesPage />
      },
      {
        path: 'action',
        element: <ActionPage />
      }
    ]
  }
]);
