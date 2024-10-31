// sagas/taskSagas.js // Sagas với Redux Saga
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '../slices/taskSlide';

const API_BASE_URL = 'https://67073081a0e04071d2295c97.mockapi.io/ToDoApp';

function* fetchTasks() {
  try {
    const response = yield call(fetch, API_BASE_URL);
    const data = yield response.json();
    yield put(fetchTasksSuccess(data));
  } catch (error) {
    yield put(fetchTasksFailure(error.toString()));
  }
}

function* addTask(action) {
  try {
    const response = yield call(fetch, API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield response.json();
    yield put(addTaskSuccess(data));
  } catch (error) {
    yield put(addTaskFailure(error.toString()));
  }
}

function* editTask(action) {
  try {
    const response = yield call(fetch, `${API_BASE_URL}/${action.payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield response.json();
    yield put(editTaskSuccess(data));
  } catch (error) {
    yield put(editTaskFailure(error.toString()));
  }
}

function* deleteTask(action) {
  try {
    yield call(fetch, `${API_BASE_URL}/${action.payload}`, {
      method: 'DELETE',
    });
    yield put(deleteTaskSuccess(action.payload));
  } catch (error) {
    yield put(deleteTaskFailure(error.toString()));
  }
}

// Watcher Saga
function* taskSagas() {
  yield takeLatest(fetchTasksRequest.type, fetchTasks); // Lắng nghe action fetchTasksRequest
  yield takeLatest(addTaskRequest.type, addTask);
  yield takeLatest(editTaskRequest.type, editTask);
  yield takeLatest(deleteTaskRequest.type, deleteTask);
}

export default taskSagas;
