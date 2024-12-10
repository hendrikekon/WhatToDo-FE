import React, { useEffect } from "react";
import { fetchTodos } from "../../app/features/Todo/actions";
import { useDispatch, useSelector } from "react-redux";
import './index.css';


const Home = ({isLoggedIn}) => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.data);
    const isLoading = useSelector(state => state.todos.status) === 'process';
    const noTodosFound = useSelector(state => state.todos.noProductsFound);
    const token = useSelector(state => state.auth.token || null);

    useEffect(() => {
        if(isLoggedIn && token){
            dispatch(fetchTodos(token));
        }
    }, [dispatch, isLoggedIn, token]);

    return (
        <div className="todos-container">
            <div className="todos-page">
                <div className="todos-list">
                    {isLoggedIn ? (
                        isLoading ? (
                            <div className="loader"></div>
                        ) : noTodosFound || todos.length === 0 ? (
                            <p className="no-todos-message">No Products Found</p>
                        ) : todos.length > 0 ? (
                            todos.map((todo) => (
                                <div className="card-data" key={todo._id}>
                                    <div className="todo-item">
                                        <input
                                            type="checkbox"
                                            className="todo-checkbox"
                                            defaultChecked={todo.done}
                                        />
                                        <h3 className="data-name">{todo.name}</h3>
                                    </div>
                                    <p className="data-created">
                                        Created at: {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }).format(new Date(todo.createdAt))}
                                    </p>
                                    <p className="data-updated">
                                        Updated at: {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }).format(new Date(todo.updatedAt))}
                                    </p>

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
                    <input type="text" placeholder="Add Todo..." />
                    <button type="submit" className="btn-todos">Add</button>
                </div>
            </div>
        </div>
    );
}

export default Home;