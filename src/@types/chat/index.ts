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