import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ChatWithCuratorResponse,
  MessageResponse,
} from '../../../@types/schema';
import { ErrorValidation, showErrors, showMessage } from '../../../utils/errors';
import { PaginationUserData, UserData } from '../../../@types/user';
import { ChatData, PaginationChatData, PaginationMessagesData } from '../../../@types/chat';
import { useSelector } from 'react-redux';
import { getUserData } from '../../reducers/userReducer';
import { getUserFromLocalStorage } from '../../../utils/jwt';

const apiBase =
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_API_URL + '/',
      headers: {
        token: `${localStorage.getItem('accessToken')}`,
      },
    })(
      args,
      api,
      extraOptions,
    );

    if (result.error?.status === 401 || result.error?.status === 404 || result.error?.status === 403 || result.error?.status === 400 || result.error?.status === 500) {
      showErrors(result as ErrorValidation);
    } else { // @ts-ignore
      if (result?.data?.message) {
        // @ts-ignore
        showMessage(result?.data?.message as string);
      }
    }

    return result;
  };

export const chatApi = createApi({
  reducerPath: 'chatApi',
  tagTypes: ['Chats', 'Messages'],
  endpoints: (builder) => {
    return ({
      createChatWithCurator: builder.mutation<ChatWithCuratorResponse, { curatorId: string, courseId: string }>({
        query: (data) => ({
          url: `/chat/withCurator`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Chats'],
      }),
      getMessagesFromRoom: builder.query<PaginationMessagesData, string>({
        query: (id) => ({
          url: `/chat/room/${id}`,
          method: 'GET',
        }),
        providesTags: ['Messages'],
      }),
      getChats: builder.query<PaginationChatData, void>({
        query: (data) => ({
          url: `/chat/`,
          method: 'GET',
        }),
        transformResponse: (response: PaginationChatData, meta, arg) => {
          const userData: UserData = getUserFromLocalStorage();

          const userId = userData.id;

          const count = response.count as number;

          // @ts-ignore
          const data: ChatData[] = response.rows.map(el => {
            if (el.user1Id === +userId) {
              return {
                ...el,
                user: { ...el.user2 },
              };
            } else if (el.user2Id === +userId) {
              return {
                ...el,
                user: { ...el.user1 },
              };
            }
          });

          return { count, rows: data };
        },
        providesTags: ['Chats'],
      }),
    });
  },
  baseQuery: apiBase,
});

export const {
  useCreateChatWithCuratorMutation, useGetChatsQuery, useGetMessagesFromRoomQuery
} = chatApi;
