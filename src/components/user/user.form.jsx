import React, { useState } from 'react'
import { Input, Button, notification, Modal } from "antd";
import axios from 'axios';
import { createUserAPI } from '../../services/apiservices';
const UserForm = (props) => {
    const { loadUser } = props
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resetData = () => {
        setFullName("")
        setEmail("")
        setPassword("")
        setPhoneNumber("")
        setIsModalOpen("")
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        resetData()
    };

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber)
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Create user successfully"
            })
            handleCancel()
            await loadUser()
        } else {
            notification.error({
                message: "Error create User",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <div className='user-form'>

            <div style={{ display: "flex", justifyContent: "space-between", margin: "10px", alignItems: "center" }}>
                <h3>Table Users</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Create User</Button>
            </div>
            <Modal title="Basic Modal"
                open={isModalOpen}
                onOk={handleSubmitBtn}
                onCancel={handleCancel}
                maskClosable={false}
                okText="Create user">
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div>
                        <span>Full name</span>
                        <Input onChange={(event) => setFullName(event.target.value)} value={fullName} />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input onChange={(event) => setEmail(event.target.value)} value={email} />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password onChange={(event) => setPassword(event.target.value)} value={password} />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input onChange={(event) => setPhoneNumber(event.target.value)} value={phoneNumber} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserForm