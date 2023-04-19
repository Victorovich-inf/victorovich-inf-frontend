import { Content } from "../content";

export interface TaskData {
  lessonId: number
  createdAt: string
  id: number
  name: string
  updatedAt: string;
  Content: Content
}

export interface TaskCreateData {
  name: string;
  lessonId: number;
}
