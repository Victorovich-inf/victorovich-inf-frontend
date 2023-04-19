import { ContentData } from '../editor';

export interface Content {
  createdAt: string
  id: number
  lessonId?: number
  taskId?: number
  updatedAt: string
  content: ContentData[]
}