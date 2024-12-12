import {START_FETCHING_TODOS, ERROR_FETCHING_TODOS, SUCCESS_FETCHING_TODOS, START_POSTING_TODO, SUCCESS_POSTING_TODO, ERROR_POSTING_TODO, START_DELETING_TODO, SUCCESS_DELETING_TODO, ERROR_DELETING_TODO, START_UPDATING_TODO, SUCCESS_UPDATING_TODO, ERROR_UPDATING_TODO} from './constants';
import {deleteTodo, getTodos, postTodo, updateTodo} from '../../api/todo';
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

export const startPostingTodo = () => ({
    type: START_POSTING_TODO,
});

export const successPostingTodo = (todo) => ({
    type: SUCCESS_POSTING_TODO,
    payload: todo,
});

export const errorPostingTodo = (error) => ({
    type: ERROR_POSTING_TODO,
    payload: error.message,
});

export const startDeletingTodo = () => ({
    type: START_DELETING_TODO,
});

export const successDeletingTodo = (id) => ({
    type: SUCCESS_DELETING_TODO,
    payload: id,
});

export const errorDeletingTodo = (error) => ({
    type: ERROR_DELETING_TODO,
    payload: error.message,
});

export const startUpdatingTodo = () => ({
    type: START_UPDATING_TODO,
});

export const successUpdatingTodo = (todo) => ({
    type: SUCCESS_UPDATING_TODO,
    payload: todo,
});

export const errorUpdatingTodo = (error) => ({
    type: ERROR_UPDATING_TODO,
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

export const addTodo = (token, data) => {
    return async (dispatch) => {
        dispatch(startPostingTodo());
        try {
            // console.log('addTodo: ', data);
            const response = await postTodo(token, data);
            dispatch(successPostingTodo(response.data.data));
        } catch (error) {
            dispatch(errorPostingTodo(error));
        }
    };
};

export const removeTodo = (token, id) => {
    return async (dispatch) => {
        dispatch(startDeletingTodo());
        try {
            await deleteTodo(token, id);
            dispatch(successDeletingTodo(id));
        } catch (error) {
            dispatch(errorDeletingTodo(error));
        }
    };
};

export const changeTodo = (id, data, token) => {
    return async (dispatch) => {
        dispatch(startUpdatingTodo());
        try {
            const response = await updateTodo(id, token, data);
            dispatch(successUpdatingTodo(response.data.data));
        } catch (error) {
            dispatch(errorUpdatingTodo(error));
        }
    };
};
