import React, { useEffect } from "react";
import { addTodo, changeTodo, fetchTodos, removeTodo } from "../../app/features/Todo/actions";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import Swal from 'sweetalert2';
import formatDate from "../../utils/DateFormat";


const Home = ({isLoggedIn}) => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.data);
    const isLoading = useSelector(state => state.todos.status) === 'process';
    const noTodosFound = useSelector(state => state.todos.noProductsFound);
    const token = useSelector(state => state.auth.token || null);
    const [newTodo, setNewTodo] = React.useState('');

    useEffect(() => {
        if(isLoggedIn && token){
            dispatch(fetchTodos(token));
        }
    }, [dispatch, isLoggedIn, token]);

    const handleAddTodo = () => {
        if (isLoggedIn && token) {
            const data = {
                name: newTodo,
                done: false,
            };
            console.log('Home: ', data);
            dispatch(addTodo(token, data));
            Swal.fire({
                title: 'Task Added!',
                text: 'Your task has been Added.',
                icon: 'success',
            });
            setNewTodo('');
        }
    };
    const handleDeleteTodo = async (id) => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the task.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });
    
        if (confirmed.isConfirmed) {
            dispatch(removeTodo(token, id));
            Swal.fire({
                title: 'Deleted!',
                text: 'Your task has been deleted.',
                icon: 'success',
            });
        } else {
            Swal.fire({
                title: 'Cancelled',
                text: 'Your task is safe.',
                icon: 'info',
            });
        }
    };

    const handleCheckboxChange = async (todo) => {
        const confirmed = await Swal.fire({
            title: `Mark task "${todo.name}" as ${!todo.done ? 'done' : 'not done'}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });
    
        if (confirmed.isConfirmed) {
            dispatch(changeTodo(todo._id, { done: !todo.done }, token));
            Swal.fire({
                title: 'Success!',
                text: `Task marked as ${!todo.done ? 'done' : 'not done'}, 
                Please check Status List.`,
                icon: 'success',
            });
        }
    };
    

    return (
        <div className="todos-container">
            <div className="todos-page">
                <div className="todos-list">
                    {isLoggedIn ? (
                        isLoading ? (
                            <div className="loader"></div>
                        ) : noTodosFound || todos.length === 0 ? (
                            <p className="no-todos-message">No Products Found</p>
                        ) : todos.filter(todo => !todo.done).length > 0 ? (
                            todos.filter(todo => !todo.done).map((todo) => (
                                <div className="card-data" key={todo._id}>
                                    <div className="todo-item">
                                        <input
                                            type="checkbox"
                                            className="todo-checkbox"
                                            checked={todo.done}
                                            onChange={() => handleCheckboxChange(todo)}
                                        />
                                        <h3 className="data-name">{todo.name}</h3>
                                        <p className="data-created">
                                            {formatDate(todo.createdAt)}
                                        </p>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteTodo(todo._id)}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                    
                                </div>
                            ))
                        ) : (
                            <p>No Todos Available</p>
                        )
                    ) : (
                        <p>You are not logged in</p>
                    )}
                </div>
                <div className="todos-input">
                    <input
                        type="text"
                        placeholder="Add Todo..."
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        />
                    <button onClick={handleAddTodo} type="submit" className="btn-todos">Add</button>
                </div>
            </div>
        </div>
    );
}

export default Home;