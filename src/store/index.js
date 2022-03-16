import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chat/chat.slice'
import authReducer from "./auth/auth.slice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        auth: authReducer
    },
})
