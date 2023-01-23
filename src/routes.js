import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import CreateUser from './pages/User/CreateOrEdit';
import CreateOrder from './pages/Order/CreateOrEdit';
import ViewOrder from './pages/Order/View';
import ViewCertificate from './pages/Certificate/View';
import CreateOrderCertificate from './pages/Certificate/CreateOrEdit';
import DashboardAppPage from './pages/DashboardAppPage';
import OrderPage from './pages/OrderPage';
import CertificatePage from './pages/CertificatePage';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'orders', element: <OrderPage /> },
        { path: 'certificates', element: <CertificatePage /> },
        { path: 'certificates/add', element: <CreateOrderCertificate /> },
        { path: 'certificates/:id', element: <CreateOrderCertificate /> },
        { path: 'certificates/:id/:view', element: <ViewCertificate /> },
        { path: 'user/add', element: <CreateUser /> },
        { path: 'user/:id', element: <CreateUser /> },
        { path: 'user/:id/view', element: <CreateUser /> },
        { path: 'orders/add', element: <CreateOrder /> },
        { path: 'orders/:id', element: <CreateOrder /> },
        { path: 'orders/:id/view', element: <ViewOrder /> },
      ],
    },
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        { path: 'login', element: <LoginPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
