import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/User/UserPage';
import LoginPage from './pages/auth/LoginPage';
import Page404 from './pages/Page404';
import CreateUser from './pages/User/Create';
import CreateCourse from './pages/Courses/Create';
import EditCourse from './pages/Courses/Edit';
import SettingsUser from './pages/User/Settings';
import DashboardAppPage from './pages/DashboardAppPage';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';
import RegisterPage from './pages/auth/RegisterPage';
import CoursesPageAdmin from './pages/Courses/CoursesPageAdmin';
import CoursesPage from './pages/Courses/CoursesPage';
import CoursesDetailsPage from './pages/Courses/Details';
import ChatPage from './pages/Chat/ChatPage';
import ChatPageWithId from './pages/Chat/ChatPageWithId';
import CoursesChatPageWithId from './pages/Courses/CoursesChatPageWithId';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import ConfirmPage from './pages/auth/ConfirmPage';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: [
        { element: <Navigate to='/dashboard/app' />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'courses-admin', element: <CoursesPageAdmin /> },
        { path: 'courses', element: <CoursesPage /> },
        { path: 'courses-admin/add', element: <CreateCourse /> },
        { path: 'chats', element: <ChatPage /> },
        { path: 'settings', element: <SettingsUser /> },
        { path: 'chats/:idCourse/:id', element: <ChatPageWithId /> },
        { path: 'user/add', element: <CreateUser /> },
        { path: 'user/:id', element: <CreateUser /> },
        { path: 'user/:id/view', element: <CreateUser /> },
      ],
    },
    {
      path: '/dashboard',
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: [
        { element: <Navigate to='/dashboard/app' />, index: true },
        { path: 'courses-admin/:id/edit', element: <EditCourse /> },
        { path: 'courses/:id/details', element: <CoursesDetailsPage /> },
        { path: 'courses/:idCourse/chat/:id', element: <CoursesChatPageWithId /> },
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
        {
          path: 'reset',
          element: (
            <GuestGuard>
              <PasswordResetPage />
            </GuestGuard>
          ),
        },
        {
          path: 'confirm',
          element: (
            <GuestGuard>
              <ConfirmPage />
            </GuestGuard>
          ),
        },
        { path: 'login', element: <LoginPage /> },
      ],
    },
    {
      path: 'main',
      element: <GuestGuard><DashboardLayout /></GuestGuard>,
      children: [
        { element: <Navigate to='/main/app' />, index: true },
        { path: 'app', element: <CoursesPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to='/dashboard/app' />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to='/404' /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    },
  ]);
}
