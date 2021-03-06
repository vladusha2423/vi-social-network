import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import "./style.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Avatar} from "../common/avatar/avatar";
import {useDispatch, useSelector} from "react-redux";
import {fetchMyUserInfo, selectMyInfo} from "../../store/auth/auth.slice";

const { Header } = Layout;

export const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const me = useSelector(selectMyInfo);

    useEffect(() => {
        if (!localStorage.getItem('token') && !(location.pathname.includes('/auth') || location.pathname.includes('/registry'))) {
            navigate('/auth')
        }
        dispatch(fetchMyUserInfo())
    }, [dispatch, navigate])

    useEffect(() => {
        console.log('!! location: ', location);
    }, [location]);

    if (location.pathname.includes('/auth') || location.pathname.includes('/registry')) {

        return <></>
    }

    return (
        <Layout>
            <Header className="header">
                <h2 className="header__title">VI Social Network</h2>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/me']}
                    selectedKeys={[location.pathname]}
                    className="nav_menu"
                >
                    <Menu.Item key="/me"><Link to="/me">Моя страница</Link></Menu.Item>
                    <Menu.Item key="/chats"><Link to="/chats">Чаты</Link></Menu.Item>
                    <Menu.Item key="/users"><Link to="/users">Пользователи</Link></Menu.Item>
                    <Menu.Item key="/groups"><Link to="/groups">Каналы</Link></Menu.Item>
                </Menu>
                <Link to="/me">
                    {me && (
                        <Avatar
                            width={40}
                            email={me.email}
                            className="header__avatar"
                        />
                    )}
                </Link>
            </Header>
        </Layout>
    );
}
