import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chat/chat.slice'
import authReducer from "./auth/auth.slice";
import usersReducer from "./users/users.slice";
import personalPageReducer from "./personal_page/personal_page.slice";
import groupsReducer from "./groups/groups.slice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        auth: authReducer,
        users: usersReducer,
        personal_page: personalPageReducer,
        groups: groupsReducer
    },
})
