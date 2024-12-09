import { ERROR_FETCHING_TODOS, START_FETCHING_TODOS, SUCCESS_FETCHING_TODOS } from './constants'

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
            return {...state, status: statusList.success, data: payload.data};
        case ERROR_FETCHING_TODOS:
            return {...state, status: statusList.error};
        default:
            return state;
    }
};