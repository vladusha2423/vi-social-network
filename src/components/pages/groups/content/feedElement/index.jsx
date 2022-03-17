import React, {useState} from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
export const FeedElement = (state) => {



    let states = state.state

    return (
        <div className="feed_element">
            <div className="feed_element">
                <div className="feed_element_msg_author">{states.title}</div>
                <div className="feed_element_msg_text">{states.text}</div>
            </div>

        </div>
    );
}
