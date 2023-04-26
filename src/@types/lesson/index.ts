import { Content } from '../content';
import { TaskData } from '../task';

export interface LessonData {
  courseId: number
  createdAt: string
  id: number
  name: string
  updatedAt: string;
  public: boolean;
  Tasks: TaskData[];
  Content: Content
}

export interface LessonCreateData {
  name: string;
  courseId: number;
}

export interface LessonEditData {
  id?: string;
  name: string;
  public: boolean;
}

