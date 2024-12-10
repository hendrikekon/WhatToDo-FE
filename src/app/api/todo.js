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