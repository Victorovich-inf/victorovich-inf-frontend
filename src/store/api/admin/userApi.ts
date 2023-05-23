import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BodyFilter, MessageResponse } from '../../../@types/schema';
import { PaginationUserData, ParseXLSXData, UserCreateData } from '../../../@types/user';
import { ErrorValidation, showErrors, showMessage } from '../../../utils/errors';
import { NotificationData } from '../../../@types/notifications';
import { AchievementsData, StaticsData } from '../../../@types/achievements';

const apiBase =
  async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_API_URL + '/',
      headers: {
        token: `${localStorage.getItem('accessToken')}`
      }
    })(
      args,
      api,
      extraOptions
    )

    if (result.error?.status === 401 || result.error?.status === 404 || result.error?.status === 403 || result.error?.status === 400) {
      showErrors(result as ErrorValidation)
    } else { // @ts-ignore
      if (result?.data?.message) {
        // @ts-ignore
        showMessage(result?.data?.message as string)
      }
    }

    return result
  }

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<MessageResponse, UserCreateData>({
      query: (data) => ({
        url: "/user/admin/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/user/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['User']
    }),
    parseXLSX: builder.mutation<MessageResponse, ParseXLSXData>({
      query: (data) => ({
        url: `/user/admin/parse-xlsx`,
        method: "POST",
        body: data,
        headers: {
          Accept: 'multipart/form-data',
          token: `${localStorage.getItem('accessToken')}`
        }
      }),
      invalidatesTags: ['User']
    }),
    ban: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/user/admin/${id}/ban`,
        method: "PATCH",
      }),
      invalidatesTags: ['User']
    }),
    makeСurator: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/user/admin/${id}/make-curator`,
        method: "PATCH",
      }),
      invalidatesTags: ['User']
    }),
    removeСurator: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/user/admin/${id}/remove-curator`,
        method: "PATCH",
      }),
      invalidatesTags: ['User']
    }),
    unban: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/user/admin/${id}/unban`,
        method: "PATCH",
      }),
      invalidatesTags: ['User']
    }),
    getAll: builder.query<PaginationUserData, BodyFilter>({
      query: (data) => ({
        url: "/user/admin/query",
        method: "POST",
        body: data,
      }),
      providesTags: ['User'],
    }),
    getNotifications: builder.query<NotificationData[], void>({
      query: (data) => ({
        url: "/user/notifications",
        method: "GET",
        body: data,
      }),
      providesTags: ['User'],
    }),
    getAchievements: builder.query<{
      statics: StaticsData,
      achievements: AchievementsData
    }, void>({
      query: (data) => ({
        url: "/user/achievements",
        method: "GET",
        body: data,
      }),
      providesTags: ['User'],
    })
  }),
  baseQuery: apiBase
})

export const {
  useRegisterMutation,
  useGetAllQuery,
  useDeleteUserMutation,
  useBanMutation,
  useUnbanMutation,
  useMakeСuratorMutation,
  useRemoveСuratorMutation,
  useParseXLSXMutation,
  useGetNotificationsQuery,
  useGetAchievementsQuery
} = userApi
