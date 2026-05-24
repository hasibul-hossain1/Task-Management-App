import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setTasks } from "@/features/tasks/tasksSlice";
import { db } from "@/src/db";
import { tasksTable } from "@/src/tasks/schema";
import type { AppDispatch } from "@/store/store";

export function TaskDatabaseSync() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: tasks } = useLiveQuery(db.select().from(tasksTable));

  useEffect(() => {
    dispatch(setTasks(tasks ?? []));
  }, [dispatch, tasks]);

  return null;
}
