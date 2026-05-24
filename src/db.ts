import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

const expo = SQLite.openDatabaseSync("tasks.db", {
  enableChangeListener: true,
});

export const db = drizzle(expo);
