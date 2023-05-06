import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BodyFilter,
  MessageResponse,
  MessageResponseCourse,
  MessageResponseCourseUpload,
} from '../../../@types/schema';
import { ErrorValidation, showErrors, showMessage } from '../../../utils/errors';
import { CourseCreateData, CourseData, PaginationCourseData, ProgressData, UploadData } from '../../../@types/course';
import { LessonCreateData, LessonEditData } from '../../../@types/lesson';
import { TaskCreateData, TaskEditData, TaskEditFormData } from '../../../@types/task';
import { Content } from '../../../@types/editor';
import { PaginationUserData } from '../../../@types/user';

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

export const curatorApi = createApi({
  reducerPath: 'curatorApi',
  tagTypes: ['OneCourse'],
  endpoints: (builder) => ({
    addToCourse: builder.mutation<MessageResponse, { courseId: string, userId: string }>({
      query: (data) => ({
        url: `/curator/${data.courseId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['OneCourse']
    }),
    getAllCurators: builder.query<PaginationUserData, { courseId: string }>({
      query: (data) => ({
        url: "/curator/all/query",
        method: "POST",
        body: data,
      }),
    })
  }),
  baseQuery: apiBase
})

export const {
  useGetAllCuratorsQuery
} = curatorApi
