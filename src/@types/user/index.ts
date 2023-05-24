import { ReactNode } from 'react';
import { SubscriptionData } from '../subscription';

export interface UserCreateData {
  email: string;
}

export interface UserRegisterData {
  firstName: string;
  lastName: string;
  password: string;
}

export interface ParseXLSXData {
  file: File;
}

export interface UserData {
  id: number,
  firstName: string,
  email: string,
  lastName: string,
  role: number,
  banned: boolean,
  confirmationCode?: string,
  createdAt: string,
  updatedAt: string,
  Subscription: SubscriptionData,
  actions?: ReactNode
  access?: ReactNode
}

export interface PaginationUserData {
  count: number,
  rows: UserData[]
}
