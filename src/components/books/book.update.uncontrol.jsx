import React from 'react'
import { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Row, Col, Button, notification } from 'antd';
import { handleUploadFile, updateBookAPI } from '../../services/apiservices';
const BookUpdateUncontrol = (props) => {
    const {
        loadBooks, dataBookUpdate, setDataBookUpdate,
        isUpdateBookModalOpenUnconTrolled
        , setIsUpdateBookModalOpenUnconTrolled
    } = props
    const [thumbnail, setThumbnail] = useState(null)
    const [preview, setPreview] = useState(null)
    const [form] = Form.useForm()

    const updateBookFunction = async (newBookImage, values) => {
        const { id, mainText, author, price, quantity, category } = values
        const resBook = await updateBookAPI(id, newBookImage, mainText, author, price, quantity, category)
        console.log("Uncontrolled updataBook Function", { id, newBookImage, mainText, author, price, quantity, category })
        if (resBook.data) {
            handleCancel()
            loadBooks()
            notification.success({
                message: "Update book",
                description: "Update book successfully"
            })
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resBook.message)
            })
        }
    }

    const handleSubmitButton = async (values) => {
        // TH1: Không có ảnh preview + không có file => return 
        if (!thumbnail && !preview) {
            notification.success({
                message: "Error update book",
                descriptions: "Please choose an image for the update"
            })
            return;
        }
        let newThumbnail = ""
        //TH2: Có ảnh preview và không có upload file => Không có update ảnh book
        if (!thumbnail && preview) {
            //Do Nothing 
            newThumbnail = dataBookUpdate.thumbnail
        }
        //TH3: Trường hợp có thumbnail mới và có upload file
        else {
            const resUpload = await handleUploadFile(thumbnail, "book")
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded

            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }
        await updateBookFunction(newThumbnail, values)
    }

    const handleUploadBookImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setThumbnail(null)
            setPreview(null)
            return
        }
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleCancel = () => {
        resetAllFields()
        setIsUpdateBookModalOpenUnconTrolled(false);
    };

    const resetAllFields = () => {
        form.resetFields()
        setDataBookUpdate(null)
        setThumbnail(null)
        setPreview(null)
    }

    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            form.setFieldsValue({
                id: dataBookUpdate._id,
                mainText: dataBookUpdate.mainText,
                author: dataBookUpdate.author,
                price: dataBookUpdate.price,
                quantity: dataBookUpdate.quantity,
                category: dataBookUpdate.category,
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`)
        }
    }, [dataBookUpdate])

    return (
        <Modal
            title="Uncontrolled update modal"
            open={isUpdateBookModalOpenUnconTrolled}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText="Save Update"
        >
            <div>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleSubmitButton}
                >
                    <div>
                        <span>Upload Thumbnail</span>
                        {preview &&
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        style={{ objectFit: 'contain', marginBottom: "10px", width: '100%', height: '200px', alignItems: 'center' }}
                                        src={preview} alt="Book_Image"
                                    />
                                </div>
                            </>
                        }
                        <div>
                            <label style={{
                                display: 'block',
                                marginTop: '8px',
                                fontWeight: '600',
                                backgroundColor: '#1479fe',
                                color: 'white',
                                textAlign: "center",
                                padding: '5px 20px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                marginBottom: "20px"
                            }} htmlFor="btnUploadUnControl">Upload Book Image Uncontrolled
                            </label>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                hidden id='btnUploadUnControl'
                                onChange={(e) => handleUploadBookImage(e)}
                                onClick={(event) => event.target.value = null}
                            />
                        </div>
                    </div>

                    <Form.Item
                        label="Id"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Main text"
                        name="mainText"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: 'Please input your book author!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your book price!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input your book stock quantity!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please input your book category!' }]}
                    >
                        <Select
                            style={{ width: "100%", marginTop: "10px" }}
                            placeholder="Select a category"
                            optionFilterProp="label"
                            options={[
                                {
                                    value: 'Arts',
                                    label: 'Arts',
                                },
                                {
                                    value: 'Business',
                                    label: 'Business',
                                },
                                {
                                    value: 'Comics',
                                    label: 'Comics',
                                },
                                {
                                    value: 'Cooking',
                                    label: 'Cooking',
                                },
                                {
                                    value: 'Entertainment',
                                    label: 'Entertainment',
                                },
                                {
                                    value: 'History',
                                    label: 'History',
                                },
                                {
                                    value: 'Music',
                                    label: 'Music',
                                },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default BookUpdateUncontrol