import React from 'react';
import 'antd/dist/antd.css';
import {Layout} from "antd";
import {SideBar} from "./sidebar";
import {GroupContent} from "./content";
import "./style.scss"
const {Content} = Layout

export const Groups = () => {
    return (
        <Layout className="groups">
            <SideBar />
            <Content>
                <GroupContent />
            </Content>
        </Layout>
    );
}
