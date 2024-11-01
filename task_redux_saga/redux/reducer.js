import {
  SET_NAME,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from './actions';

const initialState = {
  name: '',
  todos: [],
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.payload, error: null };
    case FETCH_TODOS_FAILURE:
      return { ...state, error: action.payload };
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case DELETE_TODO:
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
    default:
      return state;
  }
};

export default todoReducer;
