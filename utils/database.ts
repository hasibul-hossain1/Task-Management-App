import { db } from "@/src/db";
import { tasksTable } from "@/src/tasks/schema";
import type { Task } from "@/features/tasks/tasksSlice";
import { eq, sql } from "drizzle-orm";

type CreateTaskInput = Pick<Task, "title" | "description" | "dueAt">;

export const databaseUtils = {
  createTask: async (task: CreateTaskInput) => {
    return db.insert(tasksTable).values(task);
  },
  toggleTaskCompletion: async (taskId: number) => {
    return db
      .update(tasksTable)
      .set({
        completed: sql`NOT ${tasksTable.completed}`,
      })
      .where(eq(tasksTable.id, taskId));
  },
  clearCompletedTasks: async () => {
    return db.delete(tasksTable).where(eq(tasksTable.completed, true));
  },
};
