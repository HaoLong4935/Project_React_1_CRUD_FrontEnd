import React, { useEffect, useState } from 'react'
import { Input, notification, Modal, Button } from "antd";
import { handleUploadFile, updateUserAvatarAPI } from '../../services/apiservices';


const ViewUserModal = (props) => {
    const { isModalViewOpen, setIsModalViewOpen, dataView, setDataView, loadUser } = props
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const resetData = () => {
        setFullName("")
        setEmail("")
        setPassword("")
        setPhoneNumber("")
        setDataView(null)

        // Image
        setSelectedFile(null)
        setPreview(null)
        setIsModalViewOpen(false)
    }

    const handleCancel = () => {
        setIsModalViewOpen(false);
        resetData()
    };

    const handleUploadFileOnChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateUserAvatar = async () => {
        //uploadfile
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataView._id, dataView.fullName, dataView.phone);
            if (resUpdateAvatar.data) {
                handleCancel()
                loadUser()
                notification.success({
                    message: "Update user avatar",
                    description: "Update user avatar successfully"
                })
            } else {
                notification.error({
                    message: "Error update user avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
        console.log("Check upload ", resUpload)
        //update user
    }

    useEffect(() => {
        if (dataView) {
            console.log("Run view user")
            setFullName(dataView.fullName)
            setEmail(dataView.email)
            setPassword(dataView.password)
            setPhoneNumber(dataView.phone)
            console.log("View user data: ", dataView)
        }
    }, [dataView])
    return (
        <Modal title="View User Modal"
            open={isModalViewOpen}
            onCancel={handleCancel}
            onOk={handleCancel}
            maskClosable={false}
        >
            {dataView ?
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                style={{ objectFit: 'contain', width: '100%', height: '200px', alignItems: 'center' }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataView.avatar}`} alt="Avatar_Image"
                            />
                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        marginTop: '8px',
                                        fontWeight: '600',
                                        backgroundColor: '#1479fe',
                                        color: 'white',
                                        padding: '5px 20px',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                    }}
                                    htmlFor='btnUpload'>Upload Avatar</label>
                                <input
                                    type="file"
                                    hidden id='btnUpload'
                                    onChange={(e) => handleUploadFileOnChange(e)} />
                            </div>
                            {/* <Button type='primary'>Upload Avatar</Button> */}
                        </div>
                        <div>
                            <span>Full name</span>
                            <Input disabled value={fullName} />
                        </div>

                        <div>
                            <span>Email</span>
                            <Input disabled value={email} />
                        </div>
                        <div>
                            <span>Password</span>
                            <Input.Password disabled value={password} />
                        </div>
                        <div>
                            <span>Phone number</span>
                            <Input disabled value={phoneNumber} />
                        </div>
                        {preview &&
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        style={{ objectFit: 'contain', width: '100%', height: '200px', alignItems: 'center' }}
                                        src={preview} alt="Avatar_Image"
                                    />
                                </div>
                                <Button type='primary' onClick={() => handleUpdateUserAvatar()}>Save</Button>
                            </>
                        }
                    </div>
                </> : <p>Không có dữ liệu</p>
            }
        </Modal >
    )
}

export default ViewUserModal