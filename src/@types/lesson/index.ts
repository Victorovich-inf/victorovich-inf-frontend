import { Content } from '../content';
import { TaskData } from '../task';
import { CourseData } from '../course';

export interface LessonData {
  courseId: number
  createdAt: string
  id: number
  name: string
  updatedAt: string;
  public: boolean;
  start: string;
  index: number;
  Tasks: TaskData[];
  Content: Content;
  Course?: CourseData;
}

export interface LessonCreateData {
  name: string;
  courseId: number;
  maxIndex: number;
}

export interface LessonEditData {
  id?: string;
  name: string;
  public: boolean;
  index: number;
  start: string;
}

