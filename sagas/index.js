// sagas/index.js
import { all } from 'redux-saga/effects';
import taskSagas from './taskSagas';// saga để lắng nghe action fetchTasks

export default function* rootSaga() {
  yield all([taskSagas()]);//// Khởi động tất cả các saga
}
