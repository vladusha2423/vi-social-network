import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectUsers} from "../../../store/users/users.slice";
import {fetchpersonalPage, selectpersonalPage} from "../../../store/personal_page/personal_page.slice";

export const PersonalArea = (message) => {
    //
    // const dispatch = useDispatch();
    // const personal_info = useSelector(selectpersonalPage);
    //
    // useEffect(() => {
    //     dispatch(fetchpersonalPage())
    // },[])
    //
    // useEffect(() => {
    //     console.log(personal_info)
    // },[personal_info])
        return (
            <div className="personal_area">
                <div className="personal_area_container">
                    <div className="personal_area_user_card">
                        <div className="user">
                            <div className="user_logo"></div>
                            <div className="user_name">vlados</div>
                            <div className="user_email">pisos</div>
                            <div className="user_id">v rotos</div>
                        </div>
                    </div>
                </div>
            </div>
        )

}