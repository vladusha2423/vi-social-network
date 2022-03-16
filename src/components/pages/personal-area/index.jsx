import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectUsers} from "../../../store/users/users.slice";
import {fetchPersonalPage, selectPersonalPage} from "../../../store/personal_page/personal_page.slice";
import {Avatar} from "../../common/avatar/avatar";
import {useLocation} from "react-router-dom";

export const PersonalArea = (message) => {

    const location = useLocation()
    const dispatch = useDispatch();
    const personal_info = useSelector(selectPersonalPage);

    useEffect(() => {
        let search_id = "me"
        if(location.search)
            search_id = location.search.slice(1)
        dispatch(fetchPersonalPage(search_id))
    },[])

    useEffect(() => {
        console.log(personal_info)
    },[personal_info])

        return (
            <div className="personal_area">
                <div className="personal_area_container">
                    <div className="personal_area_user_card">
                        <div className="user">
                            <div className="user_logo">
                                <Avatar width={150} email={personal_info.email} />
                            </div>
                            <div className="user_name">{personal_info.name}</div>
                            <div className="user_email">{personal_info.email}</div>
                            <div className="user_id">{personal_info.public_id}</div>
                        </div>
                    </div>
                </div>
            </div>
        )

}