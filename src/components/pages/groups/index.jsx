import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from "antd";
import {SideBar} from "./sidebar";
import {ChatContent} from "./content";
import "./style.scss"
const {Content} = Layout

export const Groups = () => {
    return (
        <Layout className="chat">
            <SideBar />
            <Content>
                <ChatContent />
            </Content>
        </Layout>
    );
}
