import React from "react";
import { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket
}

const SocketContext = React.createContext<SocketContextProps | null>(null);

const SocketContextProvider = SocketContext.Provider

const useSocketContext = () => {
    const data = React.useContext(SocketContext)

    if (!data) {
        throw new Error(`Невозможно использовать useSocketContext вне CourseEditProvider`)
    }

    return data;
}

export {SocketContextProvider, useSocketContext}
