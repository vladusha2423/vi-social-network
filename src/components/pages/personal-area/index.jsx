import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectUsers} from "../../../store/users/users.slice";
import {
    fetchPersonalPage,
    fetchUserStats,
    selectPersonalPage,
    selectStats
} from "../../../store/personal_page/personal_page.slice";
import {Avatar} from "../../common/avatar/avatar";
import {useLocation} from "react-router-dom";
import {Col, Row} from "antd";

export const PersonalArea = (message) => {

    const location = useLocation()
    const dispatch = useDispatch();
    const personal_info = useSelector(selectPersonalPage);
    const stats = useSelector(selectStats);

    useEffect(() => {
        let search_id = "me"
        if(location.search)
            search_id = location.search.slice(1)
        dispatch(fetchPersonalPage(search_id))
        dispatch(fetchUserStats(search_id))
    },[])

    useEffect(() => {
        console.log(personal_info)
    },[personal_info])

        return (
            <div className="personal-area">
                <div className="personal-area__container">
                    <div className="personal-area__card personal-area__card_user">
                        <Row align="middle">
                            <Col span={8}>
                                <Avatar
                                    width={150}
                                    className="user__logo"
                                    email={personal_info.email}
                                />
                            </Col>
                            <Col span={16}>
                                <h2 className="user__name">{personal_info.name}</h2>
                                <h2 className="user__email">{personal_info.email}</h2>
                                <p className="user__email">{personal_info.public_id}</p>
                            </Col>
                        </Row>
                        <Row>
                            <p className="user__description">{personal_info.description}</p>
                        </Row>
                        {/*<div className="user">*/}
                        {/*    <div className="user__logo">*/}
                        {/*        <Avatar width={150} email={personal_info.email} />*/}
                        {/*    </div>*/}
                        {/*    <div className="user__name">{personal_info.name}</div>*/}
                        {/*    <div className="user__email">{personal_info.email}</div>*/}
                        {/*    <div className="user__id">{personal_info.public_id}</div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="personal-area__stats">
                        <div className="personal-area__card personal-area__card_stat stat-card">
                            <h3 className="stat-card__title">
                                Отправленные сообщения
                            </h3>
                            <div className="stat-card__number">
                                {stats.sent_messages}
                            </div>
                        </div>
                        <div className="personal-area__card personal-area__card_stat stat-card">
                            <h3 className="stat-card__title">
                                Полученные сообщения
                            </h3>
                            <div className="stat-card__number">
                                {stats.received_messages}
                            </div>
                        </div>
                        <div className="personal-area__card personal-area__card_stat stat-card">
                            <h3 className="stat-card__title">
                                Лайков поставлено
                            </h3>
                            <div className="stat-card__number">
                                {stats.likes}
                            </div>
                        </div>
                        <div className="personal-area__card personal-area__card_stat stat-card">
                            <h3 className="stat-card__title">
                                Подписки на сообщества
                            </h3>
                            <div className="stat-card__number">
                                {stats.subscriptions}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

}
