import {USER_LOGIN, USER_LOGOUT, SET_PROFILE} from './constants';
import { loginUser, logoutUser, getProfile, updateProfileApi } from '../../api/auth';

export const userLogin = (payload) => ({
    type: USER_LOGIN,
    payload,
})

export const userLogout = () => ({
    type: USER_LOGOUT
})

export const setProfile = (payload) => ({
    type: SET_PROFILE,
    payload,
})

export const performLogin = (credentials) => async (dispatch) =>{
        try {
            const response = await loginUser(credentials);
            const { user, token } = response.data;
            localStorage.setItem('auth', JSON.stringify({ user, token }));
            dispatch(userLogin({ user, token }));
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    
};

export const performLogout = () => {
    return async (dispatch) => {
        try {
            await logoutUser();
            dispatch(userLogout());
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
};

export const fetchProfile = () => {
    return async ( dispatch ) =>{
        try {
            const response = await getProfile();
            dispatch(setProfile(response.data))
        } catch (error) {
            console.error('Fetch profile error', error);
        }
    }
}

// export const updateProfile = (id, data) => async (dispatch) => {
//     try {
//         console.log('Updating profile id: ', id);
//         console.log('Updating profile Data: ', data);
//         const response = await updateProfileApi(id, data);
//         dispatch(setProfile(response.data));
//     } catch (error) {
//         console.error('Profile update error', error);
//         throw error;
//     }
// };