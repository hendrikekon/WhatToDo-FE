import { ERROR_DELETING_TODO, ERROR_FETCHING_TODOS, ERROR_POSTING_TODO, ERROR_UPDATING_TODO, START_DELETING_TODO, START_FETCHING_TODOS, START_POSTING_TODO, START_UPDATING_TODO, SUCCESS_DELETING_TODO, SUCCESS_FETCHING_TODOS, SUCCESS_POSTING_TODO, SUCCESS_UPDATING_TODO } from './constants'

const statusList = {
    idle: 'idle',
    process: 'process',
    success:'success',
    error: 'error'
};

const initialState = {
    data:[],
    status: statusList.idle
};

export default function todosReducer(state = initialState, {type, payload}) {
    switch (type) {
        case START_FETCHING_TODOS:
            return {...state, status: statusList.process};
        case SUCCESS_FETCHING_TODOS:
            return {...state, status: statusList.success, data: payload};
        case ERROR_FETCHING_TODOS:
            return {...state, status: statusList.error};
        case START_POSTING_TODO:
            return { ...state, status: statusList.process };
        case SUCCESS_POSTING_TODO:
            return { ...state, status: statusList.success, data: [...state.data, payload] };
        case ERROR_POSTING_TODO:
            return { ...state, status: statusList.error };
        case START_DELETING_TODO:
            return { ...state, status: statusList.process };        
        case SUCCESS_DELETING_TODO:
            return { ...state, status: statusList.success, data: state.data.filter((todo) => todo._id !== payload) };
        case ERROR_DELETING_TODO:
            return { ...state, status: statusList.error };
        case START_UPDATING_TODO:
            return { ...state, status: statusList.process };
        case SUCCESS_UPDATING_TODO:
            return {...state, todos: state.todos.map((todo) => todo._id === payload._id ? payload : todo),};
        case ERROR_UPDATING_TODO:
            return { ...state, status: statusList.error };
        default:
            return state;
    }
};