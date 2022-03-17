import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";
import {authLoading, authSuccess} from "../auth/auth.slice";

const initialState = {
    groupMessagesLoading: false,
    sendPostLoading: false,
    groupMessages:[]
}


//Reducer
export const groupMessagesSlice = createSlice({
    name: 'groupMessages',
    initialState,
    reducers: {
        groupMessagesLoading(state, _action) {
            state.groupMessagesLoading = true
        },
        groupMessagesReceived(state, action) {
            state.groupMessagesLoading = false
            state.groupMessages = action.payload
        },
        addGroupMessage(state, action){
            state.groupMessages = [ ...state.groupMessages, action.payload]
        }
    }
})

// Actions
export const { groupMessagesLoading, groupMessagesReceived, addGroupMessage } = groupMessagesSlice.actions


export const fetchGroupMessages = (id) => async (dispatch) => {
    dispatch(groupMessagesLoading())
    try {
        const response = await axios.get(`${API_URL}/api/groups/${id}/posts`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(groupMessagesReceived(response.data))
    } catch (error) {
        errorHandler(error)
    }
}

// Thunk register async actions
export const sendPostAsync = (creds, id) => async (dispatch) => {

    try {
        const response = await axios.post(`${API_URL}/api/groups/${id}/posts`, creds,
            {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(addGroupMessage(response.data))

    } catch (error) {
        // errorHandler(error)
    }
}




// Selectors
const selectGroupMessagesState = (state) => state.groupMessages;
const selectGroupMessages = createSelector([selectGroupMessagesState], (groupMessages) => {
        console.log(groupMessages)
        return groupMessages.groupMessages
    }
);

export { selectGroupMessagesState, selectGroupMessages};

export default groupMessagesSlice.reducer
