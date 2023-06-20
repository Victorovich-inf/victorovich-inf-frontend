import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  MessageResponse,
} from '../../../@types/schema';
import { ErrorValidation, showErrors, showMessage } from '../../../utils/errors';
import { CourseData, ProgressData } from '../../../@types/course';

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

    if (result.error?.status === 401 || result.error?.status === 404 || result.error?.status === 403 || result.error?.status === 400 || result.error?.status === 500) {
      showErrors(result as ErrorValidation)
    } else { // @ts-ignore
      if (result?.data?.message) {
        // @ts-ignore
        showMessage(result?.data?.message as string)
      }
    }

    return result
  }

export const paidCourseApi = createApi({
  reducerPath: 'paidCourseApi',
  tagTypes: ['Course', 'OneCourse'],
  endpoints: (builder) => ({
    getOnePaid: builder.query<CourseData, string>({
      query: (id) => ({
        url: `/buy-course/${id}`,
        method: "GET",
      }),
      providesTags: ['OneCourse']
    }),
    updateProgress: builder.mutation<MessageResponse, ProgressData>({
      query: (data) => ({
        url: `/buy-course/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['OneCourse']
    }),
    checkCurator: builder.mutation<MessageResponse, { courseId: string, lessonId: string, userId: string, taskId: string, correctly: boolean }>({
      query: (data) => ({
        url: `/buy-course/curator-check`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ['OneCourse']
    }),
    resetWinningStreak: builder.mutation<void, void>({
      query: (data) => ({
        url: `/buy-course/reset`,
        method: "DELETE",
      }),
    }),
    answerFile: builder.mutation<void, { taskId: string, link: string }>({
      query: (data) => ({
        url: `/task/answer-file/`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ['OneCourse']
    }),
    answerFileAgain: builder.mutation<void, { taskId: string, link: string }>({
      query: (data) => ({
        url: `/task/answer-file-again/`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ['OneCourse']
    })
  }),
  baseQuery: apiBase
})

export const {
  useGetOnePaidQuery, useUpdateProgressMutation, useResetWinningStreakMutation, useAnswerFileMutation, useCheckCuratorMutation, useAnswerFileAgainMutation
} = paidCourseApi
