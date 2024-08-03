import React from 'react'
import { useEffect, useState } from 'react';
import { Input, notification, Modal, InputNumber, Select } from "antd";
import { handleUploadFile, updateBookAPI } from '../../services/apiservices';


const UpdateBookModal = (props) => {
    const { loadBooks, dataBookUpdate, setDataBookUpdate, isUpdateBookModalOpen, setIsUpdateBookModalOpen } = props
    const [thumbnail, setThumbnail] = useState(null)
    const [preview, setPreview] = useState(null)

    const [id, setId] = useState("")
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")

    const onChangeCustome = (string, value) => {
        if (string === "Price") {
            setPrice(value)
            console.log(price)
        } else {
            setQuantity(value)
        }
    }

    const updateBookFunction = async (newBookImage) => {
        const resBook = await updateBookAPI(id, newBookImage, mainText, author, price, quantity, category)
        console.log({ id, newBookImage, mainText, author, price, quantity, category })
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

    const handleOk = async () => {
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
        await updateBookFunction(newThumbnail)

    };

    const handleCancel = () => {
        resetDataBookUpdate()
        setIsUpdateBookModalOpen(false);
    };

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

    const resetDataBookUpdate = () => {
        setId("")
        setThumbnail(null)
        setPreview(null)
        setMainText("")
        setAuthor("")
        setPrice(0)
        setQuantity(0)
        setCategory("")
        setDataBookUpdate(null)
    }

    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            setId(dataBookUpdate._id)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`)
            setMainText(dataBookUpdate.mainText)
            setAuthor(dataBookUpdate.author)
            setPrice(dataBookUpdate.price)
            setQuantity(dataBookUpdate.quantity)
            setCategory(dataBookUpdate.category)
        }
    }, [dataBookUpdate])

    return (
        <Modal title="Update book Modal"
            open={isUpdateBookModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={true}
            okText="Save Update"
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                <div>
                    <span>Id</span>
                    <Input disabled value={id} />
                </div>
                <div>
                    <span>Upload Thumbnail</span>

                    {preview &&
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    style={{ objectFit: 'contain', marginBottom: "10px", width: '100%', height: '200px', alignItems: 'center' }}
                                    src={preview}
                                    alt="Book_Image"
                                />
                                {/* <span>{thumbnail.name}</span> */}
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
                        }} htmlFor="btnUpdate">Update Book Image
                        </label>
                        <input
                            type="file"
                            hidden id='btnUpdate'
                            onChange={(e) => handleUploadBookImage(e)}
                            onClick={(event) => event.target.value = null}
                        />
                    </div>
                </div>

                <div>
                    <span>Main text</span>
                    <Input onChange={(event) => setMainText(event.target.value)} value={mainText} />
                </div>
                <div>
                    <span>Author</span>
                    <Input onChange={(event) => setAuthor(event.target.value)} value={author} />
                </div>
                <div>
                    <span>Price</span>
                    <InputNumber style={{ width: '100%' }} onChange={(value) => onChangeCustome("Price", value)} value={price} />
                </div>
                <div>
                    <span>Quantity</span>
                    <InputNumber style={{ width: '100%' }} onChange={(value) => onChangeCustome("Quantity", value)} value={quantity} />
                </div>
                <div>
                    <span>Category</span>
                    <Select
                        style={{ width: "100%", marginTop: "10px" }}
                        placeholder="Select a category"
                        optionFilterProp="label"
                        value={category}
                        onChange={(value) => { setCategory(value) }}
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
                </div>

            </div>
        </Modal>
    )
}

export default UpdateBookModal