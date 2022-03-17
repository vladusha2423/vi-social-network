import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    groupsLoading: false,
    groups: [],
    groupMessagesLoading: false,
    groupMessages:[],
}


//Reducer
export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        groupsLoading(state, _action) {
            state.groupsLoading = true
        },
        groupsReceived(state, action) {
            state.groupsLoading = false
            state.groups = action.payload
        },
    }
})

// Actions
export const { groupsLoading, groupsReceived } = groupsSlice.actions



export const fetchGroups = () => async (dispatch) => {
    dispatch(groupsLoading())
    try {
        const response = await axios.get(`${API_URL}/api/groups`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(groupsReceived(response.data))
    } catch (error) {
        errorHandler(error)
    }
}


// Selectors
const selectGroupsState = (state) => state.groups;
const selectGroups = createSelector([selectGroupsState], (groups) => {
    console.log(groups)
    return groups.groups
    }
);

export { selectGroupsState, selectGroups};

export default groupsSlice.reducer

