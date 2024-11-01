// src/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://67073081a0e04071d2295c97.mockapi.io/ToDoApp';

// Async thunk to fetch tasks from the API
export const fetchTasksStart = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return await response.json(); // Return the tasks
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTaskSuccess: (state, action) => {
            state.data.push(action.payload);
        },
        editTaskSuccess: (state, action) => {
            const index = state.data.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        deleteTaskSuccess: (state, action) => {
            state.data = state.data.filter(task => task.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksStart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasksStart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchTasksStart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addTaskSuccess, editTaskSuccess, deleteTaskSuccess } = tasksSlice.actions;
export default tasksSlice.reducer;
