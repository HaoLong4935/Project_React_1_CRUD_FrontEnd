import React, { useContext } from 'react'
import { Input, Button, Form, notification, Row, Col, Divider, message } from "antd";
import { useForm } from 'antd/es/form/Form';
import { loginAPI } from '../services/apiservices';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { AuthContext } from '../components/context/auth.contex';

const Login = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            notification.success({
                message: "Login",
                description: "Login successfully"
            })
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/users")
        } else {
            notification.error({
                message: "Login failed",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }
    return (
        <>
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend>Login Page</legend>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        >

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{
                                    required: true,
                                    type: "regexp",
                                    pattern: new RegExp(/\d+/g),
                                    message: 'Wrong format!'
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input.Password onKeyDown={(e) => { if (e.key === "Enter") form.submit() }} />
                            </Form.Item>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <Link to="/"><ArrowLeftOutlined /> Go to homepage</Link>
                                    {/* <Button onClick={() => form.getFieldsValue()} type="primary">Test</Button> */}
                                </div>
                                <div>
                                    <Button loading={loading} onClick={() => form.submit()} type="primary">Login</Button>
                                    {/* <Button onClick={() => form.getFieldsValue()} type="primary">Test</Button> */}
                                </div>
                            </div>
                        </Form>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản?<Link to={"/register"}>Đăng ký tại đây</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>


        </>
    )
}

export default Login