import {createSelector, createSlice, current} from '@reduxjs/toolkit'
import axios from "axios";
import {API_URL, IO_URL} from "../../common/constants/url";
import { io } from 'socket.io-client';
import {errorHandler} from "../../utils/error-handler";

const initialState = {
    conversations: [],
    usersLoading: false,
    messagesLoading: false,
    sendAudioLoading: false,
    recognizeLoading: false
}

const socket = io(IO_URL, {
    extraHeaders: {
        ['x-access-token']: localStorage.getItem('token') || ''
    }
})

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage(state, action) {
            const { text, to, from, voice } = action.payload;
            const converseIndex = current(state.conversations).findIndex((c) => c.user.public_id === to);
            if (converseIndex >= 0) {
                state.conversations[converseIndex].messages = [
                    ...state.conversations[converseIndex].messages,
                    {
                        from,
                        to,
                        text,
                        voice
                    }
                ]
                socket.emit('json', {
                    text,
                    to,
                    voice
                })
            }
        },
        usersLoading(state, _action) {
            state.usersLoading = true
        },
        usersReceived(state, action) {
            state.usersLoading = false
            state.conversations = action.payload
        },
        sendAudioLoading(state, _action) {
            state.sendAudioLoading = true
        },
        sendAudioReceived(state, _action) {
            state.sendAudioLoading = false
        },
        messagesLoading(state, _action) {
            state.messagesLoading = true
        },
        messagesReceived(state, action) {
            state.messagesLoading = false
            const { userId, messages } = action.payload
            const converseIndex = current(state.conversations).findIndex((c) => c.user.public_id === userId);
            if (converseIndex >= 0) {
                state.conversations[converseIndex].messages = messages
            }
        },
        addReceivedMessage(state, action) {
            const { text, from, to, voice } = action.payload;
            const converseIndex = current(state.conversations).findIndex((c) => c.user.public_id === from);
            if (converseIndex >= 0) {
                state.conversations[converseIndex].messages = [
                    ...state.conversations[converseIndex].messages,
                    {
                        from,
                        to,
                        text,
                        voice
                    }
                ]
            }
        },
        addSentMessage(state, action) {
            const { text, from, to, voice } = action.payload;
            const converseIndex = current(state.conversations).findIndex((c) => c.user.public_id === to);
            if (converseIndex >= 0) {
                state.conversations[converseIndex].messages = [
                    ...state.conversations[converseIndex].messages,
                    {
                        from,
                        to,
                        text,
                        voice
                    }
                ]
            }
        }
    },
})

export const {
    usersLoading,
    usersReceived,
    messagesLoading,
    messagesReceived,
    sendMessage,
    addReceivedMessage,
    sendAudioLoading,
    sendAudioReceived,
    addSentMessage
} = chatSlice.actions

export const socketConnect = () => (dispatch) => {
    socket.connect()
    socket.on('message', (msg) => {
        console.log('!! msg: ', msg);

        dispatch(addReceivedMessage(msg))
    })
    socket.on('connect', () => {
        console.log('!! CONNECTED');
        socket.emit('connected')
    })
}

export const fetchUsers = () => async (dispatch) => {
    dispatch(usersLoading())
    try {
        const response = await axios.get(`${API_URL}/api/users`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(usersReceived(response.data.map((user) => ({
            user,
            messages: []
        }))))
    } catch (error) {
        errorHandler(error)
    }
}

export const fetchMessages = (userId) => async (dispatch) => {
    dispatch(messagesLoading())
    try {
        const response = await axios.get(`${API_URL}/api/message?user_id=${userId}`, {
            headers: {
                ['x-access-token']: localStorage.getItem('token')
            }
        })
        dispatch(messagesReceived({
            messages: response.data,
            userId
        }))
    } catch(error) {
        errorHandler(error)
    }
}

export const sendAudioAsync = (url, to, from) => async (dispatch) => {
    dispatch(sendAudioLoading())
    // dispatch(addSentMessage({
    //     from,
    //     to,
    //     voice: url
    // }))
    try {
        const fileResponse = await axios.get(url, {
            responseType: 'blob'
        })
        const file = new File([fileResponse.data], 'speech');
        const fd = new FormData();
        fd.append('voice', file);
        const urlResponse = await axios.post(`${API_URL}/api/messages/voice`, fd, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        dispatch(sendMessage({
            to,
            from,
            voice: urlResponse.data
        }))
        dispatch(sendAudioReceived())
    } catch(error) {
        errorHandler(error)
    }
}

const selectChat = (state) => state.chat;
const selectUsersLoading = createSelector([selectChat], chat => chat.usersLoading);
const selectUsers = createSelector([selectChat], chat =>
    chat.conversations.map((converse) => converse.user)
);
const selectConverse = (userId) => createSelector([selectChat], chat => {
    const converse = chat.conversations.find(c => c.user.public_id === userId);
    if (converse) {
        return converse;
    }
});
const selectMessagesByUser = (userId) => createSelector([selectConverse(userId)], converse => {
    if (converse) {
        return converse.messages;
    }
});
const selectUserInfo = (userId) => createSelector([selectConverse(userId)], converse => {
    if (converse) {
        return converse.user;
    }
});

export { selectChat, selectUsersLoading, selectUsers, selectMessagesByUser, selectUserInfo };

export default chatSlice.reducer


