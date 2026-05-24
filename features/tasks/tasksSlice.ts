import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  dueAt: string;
  completed: boolean;
};

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (_state, action: PayloadAction<Task[]>) => action.payload,
  },
});

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
