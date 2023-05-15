import { CourseData } from './course';

type MessageResponse = {
  message: string,
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

export type {MessageResponse, BodyFilter, MessageResponseCourse, MessageResponseCourseUpload, ChatWithCuratorResponse}
