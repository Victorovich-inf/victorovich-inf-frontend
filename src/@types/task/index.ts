import { Content } from "../content";
import { LessonData } from '../lesson';

export interface TaskData {
  lessonId: number
  createdAt: string
  id: number
  name: string
  updatedAt: string;
  Content: Content;
  Lesson: LessonData;
  answer: string;
  prompt: string;
  taskSolutionText: string;
  taskSolutionFile: string;
  answerFile: boolean;
  public: boolean;
}

export interface TaskCreateData {
  name: string;
  lessonId: number;
}

export interface TaskEditData {
  id?: string;
  name: string;
  answer: string;
  prompt: string;
  taskSolutionText: string;
  file: File | null;
  answerFile: boolean;
  public: boolean;
}

export interface TaskEditFormData {
  data: TaskEditData,
  id: string
}
