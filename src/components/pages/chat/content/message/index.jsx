import React from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import { Layout, Menu } from 'antd';

export const Message = (message) => {
    const msg = message.message
    if(msg.mine)
    return (
        <div className="message_my_container">
            <div className="message message_my">
                <div className="message_sender message_sender_my">{msg.name}</div>
                <p className="message_text message_text_my">{msg.text}</p>
            </div>
        </div>
    );
    else
        return (
            <div className="message_container">
                <div className="message">
                    <div className="message_sender">{msg.name}</div>
                    <p className="message_text">{msg.text}</p>
                </div>
            </div>
        )

}
