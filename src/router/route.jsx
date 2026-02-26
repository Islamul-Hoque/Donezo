import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../Layouts/RootLayout';
import Login from '../pages/Login/Login';
import DashboardHome from '../pages/DashboardHome/DashboardHome';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import RequireAuth from '../components/RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <RootLayout>
        <Login />
      </RootLayout>
    ),
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

// also provide default export for compatibility with certain
// imports or HMR situations where the named export might be lost
export default router;
