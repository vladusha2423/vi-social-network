import React, {useEffect, useMemo, useState} from 'react';
import 'antd/dist/antd.css';
import {FeedElement} from "./feedElement";
import "./style.scss"
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchGroupMessages,
    selectGroupMessages,
    sendPostAsync,
    subscribeAsync
} from "../../../../store/groupMessages/groupMessages.slice";
import {fetchGroup, selectGroup} from "../../../../store/group/group.slice";
import {selectMyInfo} from "../../../../store/auth/auth.slice";
import { Form, Input, InputNumber, Button } from 'antd';


export const GroupContent = () => {

    const location = useLocation()
    const dispatch = useDispatch();
    const feedMsgs = useSelector(selectGroupMessages);
    const group_info = useSelector(selectGroup);

    const me =  useSelector(selectMyInfo)

    const search_id = useMemo(() => {
        return location.search.slice(1);
    }, [location]);

    useEffect(() => {
        dispatch(fetchGroupMessages(search_id))
        dispatch(fetchGroup(search_id))
    },[dispatch, location, search_id])


    useEffect(() => {
        console.log(feedMsgs)
    },[feedMsgs])

    useEffect(() => {
        console.log(me)
    },[me])

    useEffect(() => {
        console.log(group_info)
    },[group_info])



    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    /* eslint-disable no-template-curly-in-string */

    const onFinish = (value) => {
        console.log(value)
        dispatch(sendPostAsync(value, group_info.public_id))
    }


    const onSubscribe = () => {
        dispatch(subscribeAsync(group_info.public_id))
    }
    if(location.search)
    return (
        <div className="feed">
            <div className="feed_info_card">
                <div className="feed_info_container">
                    <div className="feed_info_inline_container">
                        <h3 className="feed_info_name">{group_info.name}</h3>
                        {!group_info.subscribed &&
                             <Button onClick={() => {onSubscribe()}}>Подписаться</Button>
                        }
                        {group_info.subscribed &&
                            <Button disabled>Подписка оформлена</Button>
                        }
                    </div>
                    <p className="feed_info_description">{group_info.description}</p>
                </div>

                <Form {...layout} name="nest-messages" onFinish={onFinish} >
                    <Form.Item
                        name={"title"}
                        label="Заголовок"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={"text"}
                        label="Текст"
                        rules={[
                            {
                                required: true,
                            },
                    ]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Опубликовать
                        </Button>
                    </Form.Item>
                </Form>

            </div>
            <div className="feed_elements">
                {feedMsgs.map((i) => {
                    return(
                        <FeedElement state ={i}/>
                    )
                })}
            </div>
        </div>
    );
    else
        return (
            <></>
        )
}