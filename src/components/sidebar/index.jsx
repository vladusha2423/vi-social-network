import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import {useEffect} from "react";
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import {Avatar} from "../common/avatar/avatar";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectUsers, socketConnect} from "../../store/chat/chat.slice";

const { Sider } = Layout;

export const SideBar = () => {
    const navigate = useNavigate();

    const users = useSelector(selectUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(socketConnect())
        dispatch(fetchUsers())
    }, [])

    // useEffect(() => {
    //     if (!users.length) {
    //         return;
    //     }
    //     setSelectedKey(users[0]?.public_id || '')
    // }, [users]);

    const [selectedKey, setSelectedKey] = React.useState('')

    useEffect(() => {
        console.log(selectedKey)
        navigate(`/chats?${selectedKey}`)
    },[selectedKey])

    const onCLickMenu = (key) => {
        setSelectedKey(key)
    }

    return (
            <Sider width={400} className="site-layout-background">
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        users.map((i) => {
                        return(
                            <Menu.Item
                                className="chat-sidebar__item"
                                key={i.public_id}
                                onClick={() => {onCLickMenu(i.public_id)}}
                            >
                                <div className="chat-sidebar__item-content">
                                    <Avatar width={40} email={i.email} />
                                    <h4 style={{marginBottom: '0'}}>{i.name}</h4>
                                </div>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </Sider>
    );
}
