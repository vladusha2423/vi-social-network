import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    myGroupsLoading: false,
    myGroups: [],
}


//Reducer
export const myGroupsSlice = createSlice({
    name: 'myGroups',
    initialState,
    reducers: {
        myGroupsLoading(state, _action) {
            state.myGroupsLoading = true
        },
        myGroupsReceived(state, action) {
            state.myGroupsLoading = false
            state.myGroups = action.payload
        },
    }
})

// Actions
export const { myGroupsLoading, myGroupsReceived } = myGroupsSlice.actions



export const fetchMyGroups = () => async (dispatch) => {
    dispatch(myGroupsLoading())
    try {
        const response = await axios.get(`${API_URL}/api/groups/me`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(myGroupsReceived(response.data))
    } catch (error) {
        errorHandler(error)
    }
}


// Selectors
const selectMyGroupsState = (state) => state.myGroups;
const selectMyGroups = createSelector([selectMyGroupsState], (myGroups) => {
        console.log(myGroups)
        return myGroups.myGroups
    }
);

export { selectMyGroupsState, selectMyGroups};

export default myGroupsSlice.reducer