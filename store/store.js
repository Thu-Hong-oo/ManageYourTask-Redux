// src/store.js
import { configureStore } from '@reduxjs/toolkit';//Đây là một hàm của Redux Toolkit để tạo store
import tasksReducer from '../slices/taskSlide'; // Adjust the path accordingly

const store = configureStore({
    reducer: {
        tasks: tasksReducer, // Thêm reducer cho slice tasks
        // tasks Đây là tên key trong state mà sẽ chứa dữ liệu từ tasksReducer
    },
});

export default store;
