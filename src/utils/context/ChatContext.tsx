import React from "react";
import { ChatData, MessagesData } from '../../@types/chat';

interface ChatContextProps {
   roomId?: number | null;
   activeChat?: ChatData;
  messages?: MessagesData[];
  selectedMessage: MessagesData | null;
  handleSelectMessage: (el: MessagesData | null) => void;
  handleDeleteMessage: () => void;
}

const ChatContext = React.createContext<ChatContextProps | null>(null);

const ChatContextProvider = ChatContext.Provider

const useChatContext = () => {
    const data = React.useContext(ChatContext)

    if (!data) {
        throw new Error(`Невозможно использовать useChatContext вне CourseEditProvider`)
    }

    return data;
}

export {ChatContextProvider, useChatContext}
