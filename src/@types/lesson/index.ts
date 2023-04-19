import { Content } from '../content';
import { TaskData } from '../task';

export interface LessonData {
  courseId: number
  createdAt: string
  id: number
  name: string
  updatedAt: string;
  Tasks: TaskData[];
  Content: Content
}

export interface LessonCreateData {
  name: string;
  courseId: number;
}

