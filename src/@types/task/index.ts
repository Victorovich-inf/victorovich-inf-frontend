export interface TaskData {
  lessonId: number
  createdAt: string
  id: number
  name: string
  updatedAt: string
}

export interface TaskCreateData {
  name: string;
  lessonId: number;
}
