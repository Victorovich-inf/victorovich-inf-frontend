import { CourseData } from './course';

type MessageResponse = {
  message: string,
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
  }
}

export type {MessageResponse, BodyFilter, MessageResponseCourse, MessageResponseCourseUpload}
