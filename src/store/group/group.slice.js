import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    groupLoading: false,
    group: [],
}


//Reducer
export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        groupLoading(state, _action) {
            state.groupLoading = true
        },
        groupReceived(state, action) {
            state.groupLoading = false
            state.group = action.payload
        },
    }
})

// Actions
export const { groupLoading, groupReceived } = groupSlice.actions



export const fetchGroup = (search_id) => async (dispatch) => {
    dispatch(groupLoading())
    try {
        const response = await axios.get(`${API_URL}/api/groups/${search_id}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(groupReceived(response.data))
    } catch (error) {
        errorHandler(error)
    }
}


// Selectors
const selectGroupState = (state) => state.group;
const selectGroup = createSelector([selectGroupState], (group) => {
        console.log(group)
        return group.group
    }
);

export { selectGroupState, selectGroup};

export default groupSlice.reducer

