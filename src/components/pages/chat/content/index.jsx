import React, {useMemo} from 'react';
import 'antd/dist/antd.css';
import { Input} from 'antd';
import {Message} from "./message";
import {useState} from "react";
import {useRef} from "react";
import {useEffect} from "react";
import {API_URL} from "../../../../common/constants/url";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {fetchMessages, selectMessagesByUser, selectUserInfo, sendMessage} from "../../../../store/chat/chat.slice";
import {useDispatch, useSelector} from "react-redux";
import {selectMyInfo} from "../../../../store/auth/auth.slice";


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

    return (
        <div className="chat">
            <div className="messages" id="msgs" ref={msgRef}>
                {messages && messages.map((message, index) => {
                    return(
                        <Message key={index} message={message}/>
                    )
                })}
            </div>
            <div className="input_area">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Send"
                    size="large"
                    value={msgValue}
                    onSearch={onSearch}
                    onChange={(e) => {setMsgValue(e.target.value)}}
                />
            </div>
        </div>
    );
}
