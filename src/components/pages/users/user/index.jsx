import React from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import {Link} from "react-router-dom";
import {Avatar} from "../../../common/avatar/avatar";

export const User = (state) => {

    return (
        <Link to={"/user_page?" + state.state.public_id}>
            <div className="users_user_card">
                <div className="user">
                    <div className="user_logo">
                        <Avatar width={150} email={state.state.email} /></div>
                    <div className="user_name">{state.state.email}</div>
                    <div className="user_email">{state.state.name}</div>
                    <div className="user_id">{state.state.public_id}</div>
                </div>
            </div>
        </Link>
    )

}