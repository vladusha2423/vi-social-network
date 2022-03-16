import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    userInfo: undefined,
    authLoading: false,
    userInfoLoading: false
}

//Reducer
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLoading(state, _action) {
            state.authLoading = true;
        },
        authSuccess(state, action) {
            const { user, token } = action.payload;
            state.userInfo = user;
            localStorage.setItem('token', token)
            state.authLoading = false;
        },
        myUserInfoLoading(state, _action) {
            state.userInfoLoading = true;
        },
        myUserInfoReceived(state, action) {
            state.userInfoLoading = false;
            state.userInfo = action.payload;
        }
    },
})

// Actions
export const { authLoading, authSuccess, myUserInfoLoading, myUserInfoReceived } = authSlice.actions

// Thunk async actions
export const authAsync = (creds) => async (dispatch) => {
    dispatch(authLoading())
    try {
        const formData = new FormData();
        formData.append('email', creds.email)
        formData.append('password', creds.password)
        const response = await axios.post(`${API_URL}/api/login`, formData)
        dispatch(authSuccess(response.data))
    } catch (error) {
        // errorHandler(error)
    }
}

export const fetchMyUserInfo = () => async (dispatch) => {
    dispatch(myUserInfoLoading())
    try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(myUserInfoReceived(response.data))
    } catch (error) {
        // errorHandler(error)
    }
}

// Selectors
const selectAuthState = (state) => state.auth;
const selectAuthLoading = createSelector([selectAuthState], auth => auth.authLoading);
const selectMyInfo = createSelector([selectAuthState], auth => auth.userInfo);

export { selectAuthState, selectAuthLoading, selectMyInfo};

export default authSlice.reducer


