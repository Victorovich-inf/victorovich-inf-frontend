import jwtDecode from 'jwt-decode';
import axios from './axios';

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  return true;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.token = accessToken;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.token;
  }
};

export { isValidToken, setSession };
