import React, {useCallback, useMemo} from 'react';
import 'antd/dist/antd.css';
import { Input} from 'antd';
import {Message} from "./message";
import {useState} from "react";
import {useRef} from "react";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {
    fetchMessages,
    selectMessagesByUser,
    selectUserInfo,
    sendAudioAsync,
    sendMessage
} from "../../../../store/chat/chat.slice";
import {useDispatch, useSelector} from "react-redux";
import {selectMyInfo} from "../../../../store/auth/auth.slice";
import Record from "../../../record/record.component";
import {SendOutlined} from "@ant-design/icons";

const { Search } = Input;

export const ChatContent = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const to = useMemo(() => {
        return location.search.slice(1);
    }, [location]);

    const rawMessages = useSelector(selectMessagesByUser(to))
    const userInfo = useSelector(selectUserInfo(to))
    const me = useSelector(selectMyInfo)

    const messages = useMemo(() => {
        if (!rawMessages || !me || !userInfo) {
            return [];
        }
        return rawMessages.map((msg) => {

            return {
                name: msg.from === me.public_id ? me.name : userInfo.name,
                text: msg.text,
                voice: msg.voice,
                mine: msg.from === me.public_id
            }
        })
    }, [rawMessages, userInfo, to]);

    useEffect(() => {
        if (!to) {
            return;
        }
        dispatch(fetchMessages(to))
    }, [to]);

    const msgRef = useRef(null)

    const [msgValue, setMsgValue] = useState("")

    const onSearch = text => {
        if(text !== "") {
            dispatch(sendMessage({
                text,
                to,
                from: me.public_id
            }))
            // console.log({
            //     text,
            //     to,
            //     from: me.public_id
            // })
            msgRef.current.scrollTo(0, msgRef.current.scrollHeight)
            setMsgValue("")
            console.log(msgRef.current.scrollHeight)
        }
    };

    useEffect(() => {
        msgRef.current.scrollTo(0,msgRef.current.scrollHeight)
    }, [messages])

    const handleAudio = useCallback((file) => {
        dispatch(sendAudioAsync(file, to, me.public_id))
    }, [dispatch, me, to]);

    return (
        <div className="chat">
            <div className="messages" id="msgs" ref={msgRef}>
                {messages && messages.map((message, index) => {
                    return(
                        <Message key={index} message={message}/>
                    )
                })}
            </div>
            <div className="chat__input-area">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton={<SendOutlined />}
                    size="large"
                    value={msgValue}
                    onSearch={onSearch}
                    onChange={(e) => {setMsgValue(e.target.value)}}
                />
                <Record onAudio={handleAudio} />
            </div>
        </div>
    );
}
