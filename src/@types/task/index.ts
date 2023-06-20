import { Content } from "../content";
import { LessonData } from '../lesson';
import { UserData } from '../user';

export interface TaskAnswerFiles {
  createdAt: string
  id: number
  link: string
  taskId: number
  updatedAt: string
  userId: number
  wrong: boolean
  user: UserData
}

export interface TaskData {
  lessonId: number
  createdAt: string
  id: number
  name: string
  updatedAt: string;
  Content: Content;
  Lesson: LessonData;
  TaskAnswerFiles: TaskAnswerFiles[];
  answer: string;
  prompt: string;
  taskSolutionText: string;
  taskSolutionFile: string;
  index: number;
  answerFile: boolean;
  public: boolean;
}

export interface TaskCreateData {
  name: string;
  lessonId: number;
  maxIndex: number;
}

export interface TaskEditData {
  id?: string;
  name: string;
  answer: string;
  prompt: string;
  index?: number;
  taskSolutionText: string;
  file: File | null;
  answerFile: boolean;
  public: boolean;
}

export interface TaskEditFormData {
  data: TaskEditData,
  id: string
}
