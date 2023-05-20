import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContextProvider } from '../utils/context/SocketContext';
import { io } from 'socket.io-client';
import { getUserData } from '../store/reducers/userReducer';


function SocketProvider({ children }: { children: ReactNode }) {
  const user = useSelector(getUserData);
  let [socket, setSocket] = useState(io(process.env.REACT_APP_API_URL as string));

  useEffect(() => {
    if (user?.id) {
      setSocket(io(process.env.REACT_APP_API_URL as string, {
        query: {
          userId: user?.id,
        },
      }))
    }
  }, [user]);

  return (
    <SocketContextProvider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContextProvider>
  );
}

export { SocketProvider };
