import { CourseData } from './course';
import { UserData } from './user';

type MessageResponse = {
  message: string,
}

type MessageResponseUser = {
  message: string,
  user: UserData
}

type ChatWithCuratorResponse = {
  roomId: number,
}

type MessageResponseCourse = {
  message: string,
  data: CourseData
}

type MessageResponseCourseUpload = {
  message: string,
  filePath: string
}

type BodyFilter = {
  paging: {
    skip: number,
    take: number
  },
  filter?: any
}

export type {MessageResponse, BodyFilter, MessageResponseCourse, MessageResponseCourseUpload, ChatWithCuratorResponse, MessageResponseUser}
