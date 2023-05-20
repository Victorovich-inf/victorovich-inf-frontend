import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/User/UserPage';
import LoginPage from './pages/auth/LoginPage';
import Page404 from './pages/Page404';
import CreateUser from './pages/User/Create';
import CreateCourse from './pages/Courses/Create';
import EditCourse from './pages/Courses/Edit';
import DashboardAppPage from './pages/DashboardAppPage';
import OrderPage from './pages/OrderPage';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';
import RegisterPage from './pages/auth/RegisterPage';
import CoursesPageAdmin from './pages/Courses/CoursesPageAdmin';
import CoursesPage from './pages/Courses/CoursesPage';
import CoursesDetailsPage from './pages/Courses/Details';
import EditorLayout from './layouts/dashboard/EditorLayout';
import ChatPage from './pages/Chat/ChatPage';
import ChatPageWithId from './pages/Chat/ChatPageWithId';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'courses-admin', element: <CoursesPageAdmin /> },
        { path: 'courses', element: <CoursesPage /> },
        { path: 'courses-admin/add', element: <CreateCourse /> },
        { path: 'orders', element: <OrderPage /> },
        { path: 'chats', element: <ChatPage /> },
        { path: 'chats/:id', element: <ChatPageWithId /> },
        { path: 'user/add', element: <CreateUser /> },
        { path: 'user/:id', element: <CreateUser /> },
        { path: 'user/:id/view', element: <CreateUser /> },
      ],
    },
    {
      path: '/dashboard',
      element: <AuthGuard><EditorLayout /></AuthGuard>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'courses-admin/:id/edit', element: <EditCourse /> },
        { path: 'courses/:id/details', element: <CoursesDetailsPage /> },
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
}
