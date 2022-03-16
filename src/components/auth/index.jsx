import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import {Button, Card, Form, Input} from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authAsync, selectAuthLoading, selectMyInfo} from "../../store/auth/auth.slice";

export const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const me = useSelector(selectMyInfo);
    const loading = useSelector(selectAuthLoading);

    useEffect(() => {
        if (!me || loading || !localStorage.getItem('token')) {
            return;
        }
        console.log('!! me: ', me);
        navigate('/')
    }, [me, loading])

    const onFinish = (values) => {
        dispatch(authAsync(values))
    };

    return (
       <div className="auth">
            <Card className="auth_login" title="Вход на сервис">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {/*<Input placeholder="input login" />*/}
                {/*<Input.Password*/}
                {/*    placeholder="input password"*/}
                {/*    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}*/}
                {/*/>*/}
                {/*<button className="auth_btn">Войти</button>*/}
            </Card>
       </div>
    );
}
