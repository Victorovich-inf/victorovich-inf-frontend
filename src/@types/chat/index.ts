import { UserData } from '../user';

export interface PaginationChatData {
  count: number,
  rows: ChatData[]
}

export interface ChatData {
  id?: string;
  user1Id: number;
  user2Id: number;
  createdAt: string;
  user1: UserData;
  user2: UserData;
  user?: UserData;
}

export interface PaginationMessagesData {
  count: number,
  rows: MessagesData[]
}

export interface MessagesData {
  id?: string;
  senderId: number,
  sender: UserData,
  recipientId: number,
  recipient: UserData,
  chatId: number,
  message: string,
  createdAt: string,
  image: string,
}