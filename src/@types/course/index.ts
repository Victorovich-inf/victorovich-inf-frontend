import { LessonData } from '../lesson';

export interface CourseCreateData {
  name: string;
  description: string;
  dateStart: Date;
  cost: number;
  free: boolean;
  file: File | null;
}

export interface CourseData {
  cost: string
  createdAt: string
  dateStart: string
  description: string
  id: number
  logo: string
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
