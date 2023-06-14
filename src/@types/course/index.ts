import { LessonData } from '../lesson';
import { File } from '../editor';
import { UserData } from '../user';

export interface CourseCreateData {
  name: string;
  description: string;
  dateStart: Date;
  cost: number;
  oldPrice: number;
  free: boolean;
  file: File | null;
}

export interface ProgressCourseUsers {
  courseUserId: number
  data: string
  id: number
}

export interface CourseUser {
  courseId: number
  createdAt: string
  id: number
  updatedAt: string
  buyed: boolean;
  curator: boolean;
  userId: number;
  ProgressCourseUsers: ProgressCourseUsers[]
}

export interface CuratorCourses {
  courseId: number
  createdAt: string
  id: number
  updatedAt: string
  userId: number;
  User: UserData
}

export interface CourseData {
  cost: string
  oldPrice: string
  createdAt: string
  dateStart: string
  description: string
  id: number
  logo: string
  CourseUsers: CourseUser[];
  CuratorCourses: CuratorCourses[];
  public: boolean
  free: boolean
  name: string
  updatedAt: string
  Lessons: LessonData[]

}

export interface UploadData {
  file: File
}

export interface PaginationCourseData {
  count: number,
  rows: CourseData[]
}

export interface CourseEditData {
  id?: string;
  name: string;
  description: string;
  dateStart: Date;
  cost: number;
  file: File | null;
  public: boolean;
  free: boolean;
}

export interface ProgressData {
  id: string;
  data: string;
  answer?: boolean;
}

export interface AnswerData {
  [key: string]: {
    viewed?: boolean;
    Tasks: { answer?: string, correctly: boolean, id: string}[]
  }
}

