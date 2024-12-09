import {configureStore} from '@reduxjs/toolkit';
import authMiddleware from './middleware/authMiddleware';
import AuthReducer from './features/Auth/reducer';
import todosReducer from './features/Todo/reducer';

const store = configureStore({
    reducer:{
        auth: AuthReducer,
        todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
})

export default store;