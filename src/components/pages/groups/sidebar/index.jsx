import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu,  } from 'antd';
import {useEffect} from "react";
import "./style.scss"
import {useLocation, useNavigate} from 'react-router-dom';
import {Avatar} from "../../../common/avatar/avatar";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroups} from "../../../../store/groups/groups.slice";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {fetchMyGroups, selectMyGroups} from "../../../../store/myGroups/myGroups.slice";

const { Sider } = Layout;
const { SubMenu } = Menu;
export const SideBar = () => {

    const location = useLocation()
    const dispatch = useDispatch();
    const groups = useSelector(selectGroups);
    const myGroups = useSelector(selectMyGroups);
    const navigate = useNavigate()
    const [selectedKey, setSelectedKey] = useState(location.search.slice(1))

    useEffect(() => {
        console.log(location.pathname)
        // if(location.search)
        //     setSelectedKey(location.search.substring(1))
        dispatch(fetchGroups())
        dispatch(fetchMyGroups())
    },[])

    useEffect(() => {
        console.log(groups)
    },[groups])




    useEffect(() => {
        console.log(selectedKey)
        navigate(`/groups?${selectedKey}`)
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
                <SubMenu key="sub1" icon={<MailOutlined />} title="Подписки">
                {

                    myGroups.map((i) => {
                        return(

                            <Menu.Item
                                className="chat-sidebar__item"
                                key={i.public_id}
                                onClick={() => {onCLickMenu(i.public_id)}}
                            >
                                <div className="chat-sidebar__item-content">
                                    <Avatar width={40} email={i.owner.email} />
                                    <h4 style={{marginBottom: '0'}}>{i.name}</h4>
                                </div>
                            </Menu.Item>
                        )
                    })}
                </SubMenu>
                <SubMenu key="sub2" icon={<MailOutlined />} title="Все группы">
                    {

                        groups.map((i) => {
                            return(

                                <Menu.Item
                                    className="chat-sidebar__item"
                                    key={i.public_id}
                                    onClick={() => {onCLickMenu(i.public_id)}}
                                >
                                    <div className="chat-sidebar__item-content">
                                        <Avatar width={40} email={i.owner.email} />
                                        <h4 style={{marginBottom: '0'}}>{i.name}</h4>
                                    </div>
                                </Menu.Item>
                            )
                        })}
                </SubMenu>
            </Menu>
        </Sider>
    );
}
