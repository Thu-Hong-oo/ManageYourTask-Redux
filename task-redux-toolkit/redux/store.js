import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './toDoSlice'; 

const store = configureStore({
  reducer: {
    todos: todoReducer, // Thiết lập reducer cho todos
  },
});

export default store;
