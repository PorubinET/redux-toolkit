
import {
    getTasks,
} from "../../src/services/taskServices";


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const taskLoad = createAsyncThunk('todos/load',
    async function() {
        const response = await getTasks()
        const data = response.data
        return data
    }
)

// Then, handle actions in your reducers:
export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    extraReducers: (builder) => {
        builder.addCase(taskLoad.fulfilled, (state, action) => {
            state.todos.push(...action.payload)
        })
    },
})


export default todoSlice.reducer




























// // import {
// //     LOAD_TASK,
// //     CREATE_TASK,
// //     FILTER_TASK,
// //     UPDATE_TEXT,
// //     UPDATE_DESC,
// //     DELETE_TASK,
// //     DELETE_TASK_ALL,
// //     COMPLETED_ALL_TASK,
// //     UPDATE_CHECK_TASK
// // } from "../redux/types";

// import {
//     getTasks,
//     // updateTasks,
//     // updateTask,
//     // updateCheck,
//     // deleteTask,
//     // deleteTaskAll
// } from "../../src/services/taskServices";
// import { createSlice } from '@reduxjs/toolkit'



// export const todoSlice = createSlice({
//     name: 'todos',
//     initialState: {
//         todos: [],
//     },

//     reducers: {
//         taskLoad: (state, action) => {
//             state.todos.push(action.payload)
//         },
//     },
// })

// export const getTodoAsync = (todos) => async (dispatch) => {
//     try {
//       const response = taskLoad({todos});
//       dispatch(taskLoad('asdsad'));
//     } catch (err) {
//       throw new Error(err);
//     }
//   };


// export const { taskLoad } = todoSlice.actions;
// export default todoSlice.reducer