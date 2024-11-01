import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './reducer';
import watchFetchTodos from './sagas';

// Khởi tạo middleware cho saga
const sagaMiddleware = createSagaMiddleware();

// Tạo store và apply middleware
const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));

// Chạy saga
sagaMiddleware.run(watchFetchTodos);

export default store;



// // src/redux/store.js
// import { createStore } from 'redux';
// import rootReducer from './reducer';

// const store = createStore(rootReducer);

// export default store;