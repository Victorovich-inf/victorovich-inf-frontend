import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import LoadingScreen from '../components/LoadingScreen';
import {PATH_AUTH} from "../paths";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    // if (pathname !== requestedLocation) {
    //   setRequestedLocation(pathname);
    // }
    // return <Navigate to={PATH_AUTH.login} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
