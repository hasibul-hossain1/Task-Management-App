import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  dueAt: text().notNull(),
  completed: integer({ mode: "boolean" }).notNull().default(false),
});
