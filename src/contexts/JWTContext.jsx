import { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import { isValidToken, setSession } from '../utils/jwt';
import { getMy, loginAction, register } from '../store/actions/authActions';
import {auth, init, logout, RELOAD, setUser} from "../store/reducers/userReducer";
import { useSocketContext } from '../utils/context/SocketContext';


const initialState = {
  isInitialized: false,
};


const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const dispatch = useDispatch()

  const {socket} = useSocketContext()

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await getMy();
          const { user } = response;
          await dispatch(setUser(user));

          await dispatch(auth());
          dispatch(init())
        } else {
          await logoutFunc();
          dispatch(init())
        }
      } catch (err) {
        await logoutFunc();
        dispatch(init())
      }
      finally {
        dispatch(init())
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    await loginAction({email, password});
  };

  const logoutFunc = async () => {
    setSession(null);
    localStorage.removeItem('accessToken')
    socket.disconnect();
    dispatch(logout());
    dispatch(RELOAD())
  };

  return (
    <AuthContext.Provider
      value={{
        method: 'jwt',
        login,
        logout: logoutFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
