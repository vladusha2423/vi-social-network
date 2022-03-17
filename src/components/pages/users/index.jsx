import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, selectUsers} from "../../../store/users/users.slice";
import {registerAsync, selectMyInfo} from "../../../store/auth/auth.slice";
import {User} from "./user"
export const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchUsers())
    },[])

    return (
        <div className="users">
            <div className="users_container">
                {users.map((i) => {
                    return <User state={i}/>
                })}
            </div>
        </div>
    )

}