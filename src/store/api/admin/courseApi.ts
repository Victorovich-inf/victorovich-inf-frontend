import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BodyFilter,
  MessageResponse,
  MessageResponseCourse,
  MessageResponseCourseUpload,
} from '../../../@types/schema';
import { ErrorValidation, showErrors, showMessage } from '../../../utils/errors';
import { CourseCreateData, CourseData, CourseEditData, PaginationCourseData, UploadData } from '../../../@types/course';
import { LessonCreateData, LessonData, LessonEditData } from '../../../@types/lesson';
import { TaskCreateData, TaskEditFormData } from '../../../@types/task';
import { Content } from '../../../@types/editor';

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

export const courseApi = createApi({
  reducerPath: 'courseApi',
  tagTypes: ['Course', 'OneCourse', 'Search', 'Schedules'],
  endpoints: (builder) => ({
    create: builder.mutation<MessageResponseCourse, CourseCreateData>({
      query: (data) => ({
        url: '/course/admin/',
        method: 'POST',
        body: data,
        headers: {
          Accept: 'multipart/form-data',
          token: `${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['Course'],
    }),
    createLesson: builder.mutation<MessageResponse, LessonCreateData>({
      query: (data) => ({
        url: '/lesson/admin/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OneCourse'],
    }),
    editLesson: builder.mutation<MessageResponse, LessonEditData>({
      query: (data) => ({
        url: `/lesson/admin/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['OneCourse', 'Schedules'],
    }),
    deleteLesson: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/lesson/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OneCourse'],
    }),
    createTask: builder.mutation<MessageResponse, TaskCreateData>({
      query: (data) => ({
        url: '/task/admin/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OneCourse'],
    }),
    editTask: builder.mutation<MessageResponse, TaskEditFormData>({
      query: (data) => ({
        url: `/task/admin/${data.id}`,
        method: 'PUT',
        body: data.data,
        headers: {
          Accept: 'multipart/form-data',
          token: `${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['OneCourse'],
    }),
    deleteTask: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/task/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OneCourse'],
    }),
    getAllForUser: builder.query<PaginationCourseData, BodyFilter>({
      query: (data) => ({
        url: '/course/query',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Course'],
    }),
    searchCourse: builder.mutation<PaginationCourseData, BodyFilter>({
      query: (data) => ({
        url: '/course/query',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Search'],
    }),
    getAllForAdmin: builder.query<PaginationCourseData, BodyFilter>({
      query: (data) => ({
        url: '/course/admin/query',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Course'],
    }),
    getOne: builder.query<CourseData, string>({
      query: (id) => ({
        url: `/course/admin/${id}`,
        method: 'GET',
      }),
      providesTags: ['OneCourse'],
    }),
    getSchedules: builder.query<LessonData[], void>({
      query: (id) => ({
        url: `/course/schedules`,
        method: 'GET',
      }),
      providesTags: ['Schedules'],
    }),
    deleteCourse: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `/course/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
    uploadImage: builder.mutation<MessageResponseCourseUpload, UploadData>({
      query: (data) => ({
        url: `/course/admin/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    savePage: builder.mutation<MessageResponse, { data: Content, id: number }>({
      query: (data) => ({
        url: `/course/admin/${data.id}/save`,
        method: 'PUT',
        body: data,
      }),
    }),
    editCourse: builder.mutation<MessageResponse, { data: CourseEditData, id: string }>({
      query: (data) => ({
        url: `/course/admin/${data.id}`,
        method: 'PUT',
        body: data.data,
        headers: {
          Accept: 'multipart/form-data',
          token: `${localStorage.getItem('accessToken')}`,
        },
      }),
      invalidatesTags: ['OneCourse'],
    }),
    copyCourse: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `/course/admin/copy/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Course'],
    }),
    buyCourse: builder.mutation<MessageResponse, { id: string, buyed: boolean }>({
      query: (data) => ({
        url: `/buy-course/${data.id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    deleteFromCourse: builder.mutation<MessageResponse, { courseId: string, userId: string, id: string }>({
      query: (data) => ({
        url: `/curator/${data.id}`,
        method: 'DELETE',
        body: data
      }),
      invalidatesTags: ['OneCourse'],
    }),
    addToCourse: builder.mutation<MessageResponse, { courseId: string, userId: string }>({
      query: (data) => ({
        url: `/curator/${data.courseId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OneCourse'],
    }),
    addUserToCourse: builder.mutation<MessageResponse, { courseId: string, email: string; end: string }>({
      query: (data) => ({
        url: `/course/admin/add-user`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OneCourse'],
    }),
    editUserCourse: builder.mutation<MessageResponse, { courseId: string, userId: string; end: string }>({
      query: (data) => ({
        url: `/course/admin/edit-user`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OneCourse'],
    }),
    deleteUserFromCourse: builder.mutation<MessageResponse, {courseId: string, userId: string}>({
      query: (data) => ({
        url: `/course/admin/user/${data.courseId}`,
        method: 'DELETE',
        body: {userId: data.userId},
      }),
      invalidatesTags: ['OneCourse'],
    }),
  }),
  baseQuery: apiBase,
});

export const {
  useCreateMutation,
  useGetAllForAdminQuery,
  useGetAllForUserQuery,
  useGetOneQuery,
  useDeleteCourseMutation,
  useCreateLessonMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useDeleteLessonMutation,
  useSavePageMutation,
  useUploadImageMutation,
  useEditTaskMutation,
  useEditLessonMutation,
  useEditCourseMutation,
  useBuyCourseMutation,
  useAddToCourseMutation,
  useDeleteFromCourseMutation,
  useSearchCourseMutation,
  useGetSchedulesQuery,
  useCopyCourseMutation,
  useAddUserToCourseMutation,
  useEditUserCourseMutation,
  useDeleteUserFromCourseMutation,
} = courseApi;
