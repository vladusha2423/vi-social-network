import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Nav } from '../nav'
import { Chat } from "../pages/chat"
import {Auth} from "../auth"
import {PersonalArea} from "../pages/personal-area";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {RequireAuth} from "../common/require-auth/require-auth";
import {Registry} from "../registry";
import {Users} from "../pages/users";

export const Page = () => {
    return (
            <Layout>
                <Nav/>
                <Routes>
                    <Route path="/" exact element={(
                        <Navigate to="/me" />
                    )}/>
                    <Route path="/chats" element={(
                        <RequireAuth>
                            <Chat/>
                        </RequireAuth>
                    )}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/registry" element={<Registry/>}/>
                    <Route path="/me" element={(
                        <RequireAuth>
                            <PersonalArea/>
                        </RequireAuth>
                    )}/>
                </Routes>
            </Layout>
    );
}
