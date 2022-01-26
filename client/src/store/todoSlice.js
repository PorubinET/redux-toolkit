import {
    getTasks,
    addTask,
    updateTasks,
    updateTask,
    updateCheck,
    deleteTask,
    deleteTaskAll
} from "../../src/services/taskServices";


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Получаю payload
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

// Then, handle actions in your reducers:
export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        filter: 'all'
    },
    extraReducers: {
        [taskLoad.fulfilled]: (state, action) => {
            state.todos = action.payload;
        },
    },
    reducers: {
        createTask(state, action) {
            state.todos.push(action.payload)
        },   
        inputDelete(state, action) {
            deleteTask(action.payload);
            state.todos = [...state.todos].filter(todo => todo._id !== action.payload) 
        },
        updateText(state, action) {
            updateTask(action.payload._id, {text: action.payload.input})
            console.log(action.payload)
            state.todos = state.todos.map(todo => ({ ...todo, text: todo._id === action.payload._id ? action.payload.input: todo.text}))
        },




        updateChecker(state, action) {
            updateCheck(action.payload._id, !action.payload.done)

            state.todos = state.todos.map(todo => ({ ...todo, done: todo._id !== action.payload._id ? todo.done : !todo.done }))  
        },
        completedAll(state, action) {
            console.log(action.payload, "action.payload.done")
            if(action.payload){
                updateTasks({done: false});
            }
            else{
                updateTasks({done: true})
            }
            state.todos.every(todo => todo.done) ? state.todos.map(todo => todo.done = !todo.done) : state.todos.map(todo => todo.done = true)
        },
        deleteAll(state, action){
            deleteTaskAll()
            state.todos = [...state.todos].filter(todo => !todo.done) 
        },
        updateFilter(state, action) {
            state.filter = action.payload
        },
        updateDate(state, action) {
            console.log(action.payload.id)
            updateTask(action.payload.id, {date: action.payload.time})
        },
        updateDesc(state, action) {
            updateTask(action.payload._id, {desc: action.payload.input})
        }
    }
})


export const {
    createTask,
    updateChecker,
    updateFilter,
    updateText,
    inputDelete,
    completedAll,
    deleteAll,
    updateDate,
    updateDesc
} = todoSlice.actions


export default todoSlice.reducer;