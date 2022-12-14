import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import { PATH_DASHBOARD } from '../paths';
import { useNavigate } from 'react-router-dom';

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate(PATH_DASHBOARD.app.root);
  }

  return <>{children}</>;
}
