// src/recoil/toDoSelector.js
import { selector } from 'recoil';
import { todoListState } from './toDoAtom';
import { fetchTodos } from './toDoAPI';

// Selector để lấy todos từ API
export const fetchTodosSelector = selector({
  key: 'fetchTodosSelector',
  get: async () => {
    const todos = await fetchTodos(); // Fetch todos from API
    return todos; // Return the fetched todos
  },
});

// Selector để lọc todos đã hoàn thành
export const completedTodosState = selector({
  key: 'completedTodosState',
  get: ({ get }) => {
    const todos = get(todoListState);
    return todos.filter((todo) => todo.completed);
  },
});
