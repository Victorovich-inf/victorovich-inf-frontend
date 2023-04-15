import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import LoginPage from './pages/auth/LoginPage';
import Page404 from './pages/Page404';
import CreateUser from './pages/User/Create';
import CreateCourse from './pages/Courses/Create';
import DashboardAppPage from './pages/DashboardAppPage';
import OrderPage from './pages/OrderPage';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';
import RegisterPage from './pages/auth/RegisterPage';
import CoursesPageAdmin from './pages/Courses/CoursesPageAdmin';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'courses', element: <CoursesPageAdmin /> },
        { path: 'courses/add', element: <CreateCourse /> },
        { path: 'orders', element: <OrderPage /> },
        { path: 'user/add', element: <CreateUser /> },
        { path: 'user/:id', element: <CreateUser /> },
        { path: 'user/:id/view', element: <CreateUser /> },
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
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
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
