import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_TODOS_REQUEST,
  fetchTodosSuccess,
  fetchTodosFailure,ADD_TODO,DELETE_TODO,UPDATE_TODO
} from './actions';

// API URL
const API_URL = 'https://67073081a0e04071d2295c97.mockapi.io/ToDoApp';

// Worker saga: thực hiện các công việc lấy dữ liệu từ API
function* fetchTodos() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchTodosSuccess(response.data));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}
// Add todo
function* addTodoSaga(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(addTodoSuccess(response.data));
  } catch (error) {
    console.error('Add Todo failed', error);
  }
}

// Update todo
function* updateTodoSaga(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put(updateTodoSuccess(response.data));
  } catch (error) {
    console.error('Update Todo failed', error);
  }
}

// Delete todo
function* deleteTodoSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    console.error('Delete Todo failed', error);
  }
}


function* watchTodos() {
  yield takeEvery(FETCH_TODOS_REQUEST, fetchTodos);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(UPDATE_TODO, updateTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
 
}

export default watchTodos;
