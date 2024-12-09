import axios from "axios";
import config from "../../config";

export const getTodos = async() => {
    try {
        const todos = await axios.get(`${config.apiBaseUrl}/api/todos`);
        return todos.data.data;
    } catch (error) {
        console.error('Error fetching Todos', error);
        throw error
    }
}