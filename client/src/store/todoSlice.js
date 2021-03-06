import {
    getTasks,
    // addTask,
    updateTasks,
    updateTask,
    updateCheck,
    deleteTask,
    deleteTaskAll
} from "../../src/services/taskServices";


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const taskLoad = createAsyncThunk(
    'todos/load',
    async function () {
        try {
            const response = await getTasks()
            const data = await response.data;
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }

    }
)

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        filter: 'all'
    },
    reducers: {
        createTask(state, action) {
            state.todos.push(action.payload)
        },   
        updateFilter(state, action) {
            state.filter = action.payload
        },
    },

    extraReducers: (builder) => {
        builder   
        .addCase(taskLoad.fulfilled, (state, action) => {
            state.todos = action.payload;
        })
        .addCase(inputDelete.fulfilled, (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload)
        })
        .addCase(updateText.fulfilled, (state, action) => {
            console.log(action)
            state.todos = state.todos.map(todo => ({ ...todo, text: todo._id === action.payload._id ? action.payload.input: todo.text}))
        })
        .addCase(updateChecker.fulfilled, (state, action) => {
            console.log(action)
            state.todos = state.todos.map(todo => ({ ...todo, done: todo._id !== action.payload._id ? todo.done : !todo.done }))
        })
        .addCase(completedAll.fulfilled, (state, action) => {
            console.log(action)
            state.todos.every(todo => todo.done) ? state.todos.map(todo => todo.done = !todo.done) : state.todos.map(todo => todo.done = true)
        })
        .addCase(deleteAll.fulfilled, (state, action) => {
            console.log(action)
            state.todos = state.todos.filter(todo => !todo.done) 
        })
    }
})

export const {
    createTask,
    updateFilter,
} = todoSlice.actions

export default todoSlice.reducer;



 export const inputDelete = createAsyncThunk(
    'users/inputDelete',
    async (_id) => {
        try {
            const res = await deleteTask(_id); 
            console.log(res)
            if(res.status === 200)  {
                return _id
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const updateText = createAsyncThunk(
    'users/updateText',
    async (payload) => {
        try {
            const res = await updateTask(payload._id, {text: payload.input})
            if(res.status === 200)  {
                return { _id: payload._id, input: payload.input}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )
  
  export const updateDesc = createAsyncThunk(
    'users/updateDesc',
    async (payload) => {
        try {
            console.log(payload, 'users/updateDesc');
            const res = await updateTask(payload._id, {desc: payload.input})
            if(res.status === 200)  {
                return {payload}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const updateChecker = createAsyncThunk(
    'users/updateChecker',
    async (payload) => {
        try {
            const res = await updateCheck(payload._id, {done: !payload.done})
            if(res.status === 200)  {
                return { _id: payload._id, done: payload.done}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const completedAll = createAsyncThunk(
    'users/completedAll',
    async (payload) => {
        console.log(payload, "completedAll")
        try {
            if(payload){
                console.log(payload, "true")
                const res = await updateTasks({done: false});
                if(res.status === 200)  {
                    return { done: payload}
                }
            }
            else{
                console.log(payload, "false")
                const res = await updateTasks({done: true})
                if(res.status === 200)  {
                    return { done: payload}
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }
  )

  export const deleteAll = createAsyncThunk(
    'users/deleteAll',
    async (payload) => {
        try {
            console.log(payload, 'users/deleteAll');
            const res = await deleteTaskAll(payload)
            if(res.status === 200)  {
                return {payload}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )
  
  export const updateDate = createAsyncThunk(
    'users/updateDate',
    async (payload) => {
        try {
            console.log(payload, 'users/updateDate');
            const res = await updateTask(payload._id, {date: payload.time})
            if(res.status === 200)  {
                return {payload}
            }
        } catch (error) {
            console.log(error)
        }
    }
  )

  



