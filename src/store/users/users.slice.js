import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    usersLoading: false,
    users: []
}

//Reducer
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersLoading(state, _action) {
            state.usersLoading = true
        },
        usersReceived(state, action) {
            state.usersLoading = false
            state.users = action.payload
        },
    }
})

// Actions
export const { usersLoading, usersReceived } = usersSlice.actions


export const fetchUsers = () => async (dispatch) => {
    dispatch(usersLoading())
    try {
        const response = await axios.get(`${API_URL}/api/users`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(usersReceived(response.data))
    } catch (error) {
        errorHandler(error)
    }
}


// Selectors
const selectUsersState = (state) => state.users;
const selectUsers = createSelector([selectUsersState], users =>
    users.users
);

export { selectUsersState, selectUsers};

export default usersSlice.reducer
