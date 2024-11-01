import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_URL = 'https://67073081a0e04071d2295c97.mockapi.io/ToDoApp';

// Tạo async thunk để lấy danh sách todo
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data; // Trả về dữ liệu
});

// Tạo async thunk để thêm todo
export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data; // Trả về todo mới
});

// Tạo async thunk để cập nhật todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data; // Trả về todo đã cập nhật
});

// Tạo async thunk để xóa todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Trả về id đã xóa
});

// Tạo slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload; // Cập nhật danh sách todos
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Xử lý lỗi
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload); // Thêm todo mới vào danh sách
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload; // Cập nhật todo
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Xóa todo
      });
  },
});

export const { } = todoSlice.actions; // Nếu có action nào được tạo, có thể xuất ở đây
export default todoSlice.reducer; // Xuất reducer để sử dụng trong store
