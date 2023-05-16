import React from "react";
import { ChatData, MessagesData } from '../../@types/chat';

interface ChatContextProps {
   roomId?: number | null;
   activeChat?: ChatData;
  messages?: MessagesData[];
}

const ChatContext = React.createContext<ChatContextProps | null>(null);

const CourseEditProvider = ChatContext.Provider

const useChatContext = () => {
    const data = React.useContext(ChatContext)

    if (!data) {
        throw new Error(`Невозможно использовать useChatContext вне CourseEditProvider`)
    }

    return data;
}

export {CourseEditProvider, useChatContext}
