// src/recoil/toDoAPI.js
import axios from 'axios';

const API_URL = 'https://67073081a0e04071d2295c97.mockapi.io/ToDoApp'; 

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Trả về danh sách todos
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// Function to add a new todo
export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data; // Return newly created todo
};

// Function to update an existing todo
export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data; // Return updated todo
};

// Function to delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};


