import axios from "axios";
import config from "../../config";

export const getTodos = async(token) => {
    try {
        const todos = await axios.get(`${config.apiBaseUrl}/api/todos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return todos.data.data;
    } catch (error) {
        console.error('Error fetching Todos', error);
        throw error
    }
}

export const postTodo = async(token, data) => {
    try {
        return await axios.post(`${config.apiBaseUrl}/api/todos`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error Adding Todo', error);
        throw error;
    }
}

export const deleteTodo = async(token, id) => {
    try {
        const todos = await axios.delete(`${config.apiBaseUrl}/api/todos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return todos.data.data;
    } catch (error) {
        console.error('Error Deleting Todo', error);
        throw error;
    }
};

export const updateTodo = async(id, data, token) => {
    try {
        console.log('UpdateTodo Received: ', id, data, token);
        return await axios.patch(`${config.apiBaseUrl}/api/todos/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error Updating Todo:', error);
        throw error;
    }

};
