import { LessonData } from '../lesson';

export interface CourseCreateData {
  name: string;
  description: string;
  dateStart: Date;
  cost: number;
  free: boolean;
  file: File | null;
}

export interface CourseUser {
  courseId: number
  createdAt: string
  id: number
  updatedAt: string
  userId: number
}

export interface CourseData {
  cost: string
  createdAt: string
  dateStart: string
  description: string
  id: number
  logo: string
  CourseUsers: CourseUser[];
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
  public: boolean;
  free: boolean;
}
