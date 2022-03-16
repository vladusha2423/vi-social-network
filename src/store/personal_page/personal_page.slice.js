import {createSelector, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL} from "../../common/constants/url";
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    usersLoading: false,
    persopal_page: []
}


//Reducer
export const personalPageSlice = createSlice({
    name: 'persopal_page',
    initialState,
    reducers: {
        personalPageLoading(state, _action) {
            state.personalPageLoading = true
        },
        personalPageReceived(state, action) {
            state.personalPageLoading = false
            state.persopal_page = action.payload
        },
    }
})

// Actions
export const { personalPageLoading, personalPageReceived } = personalPageSlice.actions


export const fetchpersonalPage = () => async (dispatch) => {
    dispatch(personalPageLoading())
    try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
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
const selectpersonalPageState = (state) => state.persopal_page;
const selectpersonalPage = createSelector([selectpersonalPageState], persopal_page =>
    persopal_page.persopal_page
);

export { selectpersonalPageState, selectpersonalPage};

export default personalPageSlice.reducer
