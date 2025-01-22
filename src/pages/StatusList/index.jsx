import React, { useEffect, useState } from "react";
import Table from "../../components/TableDoneTrue";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../app/features/Todo/actions";


const StatusList = (isLoggedIn) => {
    // const [todos, setTodos] = useState([]);
    const token = useSelector(state => state.auth.token || null);
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.data);

    useEffect(() => {
        if(isLoggedIn && token){
            dispatch(fetchTodos(token));
        }
    }, [dispatch, isLoggedIn, token]);
        // console.log('todos: ', todos)
    return(
        <div className="StatusList-container">
            <h2>Task List</h2>
            <Table data={todos.filter(todo => todo.done)} filterDone={false} />
        </div>
    );
};

export default StatusList;