export interface AchievementsData {
  id: number
  correctTasks10: boolean,
  correctTasks25: boolean,
  correctTasks50: boolean,
  correctTasks100: boolean,
  correctTasksAll: boolean,
  completedTheory: boolean,
  completedCourse: boolean,
  winningStreak5: boolean,
  winningStreak10: boolean,
  winningStreak15: boolean,
  winningStreak25: boolean,
  userId: number,
}

export interface StaticsData {
  id: number
  userId: number,
  correctlyCompletedTasks: number,
  winningStreak: number,
}
