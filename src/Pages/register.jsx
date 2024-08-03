import React from 'react'
import { Input, Button, Form, notification, Row, Col } from "antd";
import { useForm } from 'antd/es/form/Form';
import { registerAPI } from '../services/apiservices';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values);

        //call api
        const res = await registerAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )
        if (res.data) {
            notification.success({
                message: "Register",
                description: "Register user successfully"
            })
            navigate('/login')
        } else {
            notification.error({
                message: "Register user failed",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <>
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                <Row justify={"center"}>
                    <Col xs={6} sm={7} md={8} lg={9} xl={8}>
                        <Form.Item
                            label="Full name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={6} sm={7} md={8} lg={9} xl={8}>
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
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={6} sm={7} md={8} lg={9} xl={8}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={6} sm={7} md={8} lg={9} xl={8}>
                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[{
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: 'Wrong format!'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={6} sm={7} md={8} lg={9} xl={8}>
                        <div>
                            <Button onClick={() => form.submit()} type="primary">Register</Button>
                            {/* <Button onClick={() => form.getFieldsValue()} type="primary">Test</Button> */}
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Register