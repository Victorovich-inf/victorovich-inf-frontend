import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH, PATH_NO_AUTH } from '../paths';


export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_NO_AUTH.app} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
