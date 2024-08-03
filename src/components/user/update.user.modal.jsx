import React, { useState } from 'react'
import { Input, notification, Modal } from "antd";
import axios from 'axios';
import { updateUserAPI } from '../../services/apiservices';
import { useEffect } from 'react';
const UpdateUserModal = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props
    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const resetData = () => {
        setIsModalUpdateOpen(false)
        setId("")
        setFullName("")
        setDataUpdate(null)
    }

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phoneNumber)
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Update user successfully"
            })
            await loadUser()
            handleCancel()
            // await loadUser()
        } else {
            notification.error({
                message: "Error update User",
                description: JSON.stringify(res.message)
            })
        }
    }

    const handleCancel = () => {
        setIsModalUpdateOpen(false);
        resetData()
    };

    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.fullName)
            setId(dataUpdate._id)
            setPhoneNumber(dataUpdate.phone)
        }
    }, [dataUpdate])

    return (
        <Modal title="Update User Modal"
            open={isModalUpdateOpen}
            onOk={handleSubmitBtn}
            onCancel={handleCancel}
            maskClosable={false}
            okText="Save">
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>Full name</span>
                    <Input onChange={(event) => setFullName(event.target.value)} value={fullName} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input onChange={(event) => setPhoneNumber(event.target.value)} value={phoneNumber} />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUserModal