import {createSlice} from "@reduxjs/toolkit"


type Task = {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    completed: boolean
}


const initialState: Task[] = []

const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        addTask:(state,action)=>{
            state.push(action.payload)
        }
    }
})


export default taskSlice.reducer