import {START_FETCHING_TODOS, ERROR_FETCHING_TODOS, SUCCESS_FETCHING_TODOS} from './constants';
import {getTodos} from '../../api/todo';
import debounce from 'debounce-promise';

export const startFetchingTodos = () => ({
    type: START_FETCHING_TODOS,
});

export const successFetchingTodos = (todos) => ({
    type: SUCCESS_FETCHING_TODOS,
    payload: todos,
});

export const errorFetchingTodos = (error) => ({
    type: ERROR_FETCHING_TODOS,
    payload: error.message,
});

const debouncedFetchTodos = debounce(getTodos, 1000);

export const fetchTodos = (token) => {
    return async (dispatch) => {
        dispatch(startFetchingTodos());
        try {
            const todos = await debouncedFetchTodos(token);
            dispatch(successFetchingTodos(todos));
        } catch (error) {
            console.error("Error fetching todos:", error);
            dispatch(errorFetchingTodos(error));
        }
    };
};

