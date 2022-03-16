import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    personalPageLoading: false,
    personal_page: []
}


//Reducer
export const personalPageSlice = createSlice({
    name: 'personal_page',
    initialState,
    reducers: {
        personalPageLoading(state, _action) {
            state.personalPageLoading = true
        },
        personalPageReceived(state, action) {
            state.personalPageLoading = false
            state.personal_page = action.payload
        },
    }
})

// Actions
export const { personalPageLoading, personalPageReceived } = personalPageSlice.actions


export const fetchPersonalPage = (search_id) => async (dispatch) => {
    dispatch(personalPageLoading())
    try {
        const response = await axios.get(`${API_URL}/api/users/${search_id}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(personalPageReceived(response.data))
    } catch (error) {
        errorHandler(error)
    }
}


// Selectors
const selectPersonalPageState = (state) => state.personal_page;
const selectPersonalPage = createSelector([selectPersonalPageState], personal_page =>
    personal_page.personal_page
);

export { selectPersonalPageState, selectPersonalPage};

export default personalPageSlice.reducer
