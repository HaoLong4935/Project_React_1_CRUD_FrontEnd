import React, { useEffect, useState } from 'react'
import { Button, Modal, Input, InputNumber, notification, message, Select, Form, Row, Col } from 'antd';
import { createBookAPI, handleUploadFile } from '../../services/apiservices';
const BookForm = (props) => {
    const { loadBooks } = props
    const [isModalBook, setIsModalBookOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState(null)
    const [preview, setPreview] = useState(null)

    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")

    // Uncontrolled form sate
    const [form] = Form.useForm();
    const [isUncontrollModalOpen, setIsUncontrollModalOpen] = useState(false)

    const showModal = async () => {
        setIsModalBookOpen(true);
        // const res = await createBookAPI(thumbnail, mainText, author, price, quantity, category)
        // console.log("Data duoc gui di :", res)
    };

    const handleCreateBook = async () => {
        if (!thumbnail) {
            message.error("Please Choose an Image for the book")
            return
        }
        const resUpload = await handleUploadFile(thumbnail, "book")
        if (resUpload.data) {
            //Sucess
            const newThumbnail = resUpload.data.fileUploaded
            //Step 2: create book 
            const res = await createBookAPI(newThumbnail, mainText, author, price, quantity, category)
            if (res.data) {
                notification.success({
                    message: "Create Book",
                    description: "Create book successfully"
                })
                handleCancel()
                loadBooks()
            }
            else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(res.message)
                })
            }
        }
    };

    const handleCancel = () => {
        resetData()
        setIsModalBookOpen(false);
    };

    const resetData = () => {
        setThumbnail(null)
        setPreview(null)
        setMainText("")
        setAuthor("")
        setPrice(0)
        setQuantity(0)
        setCategory("")
    }

    const onChangeCustome = (string, value) => {
        if (string === "Price") {
            setPrice(value)
        } else {
            setQuantity(value)
        }
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

    const handleUncontrolledFinish = async (values) => {
        console.log('Success:', values);
        if (!thumbnail) {
            message.error("Please Choose an Image for the book")
            return
        }
        const resUpload = await handleUploadFile(thumbnail, "book")
        if (resUpload.data) {
            //Sucess
            const newThumbnail = resUpload.data.fileUploaded
            const { maintext, author, price, quantity, category } = values
            //Step 2: create book 
            const res = await createBookAPI(newThumbnail, maintext, author, price, quantity, category)
            if (res.data) {
                notification.success({
                    message: "Create Book",
                    description: "Create book successfully"
                })
                handleOnCancleUncontrolledForm()
                loadBooks()
            }
            else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(res.message)
                })
            }
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOnCancleUncontrolledForm = () => {
        setIsUncontrollModalOpen(false)
    }

    useEffect(() => {
        if (!isUncontrollModalOpen) {
            form.resetFields(['price', 'quantity']);
            form.setFieldsValue({ price: 0, quantity: 0 });
        }
    }, [isUncontrollModalOpen, form]);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "10px", alignItems: "center" }}>
                <h3 style={{ fontWeight: "bold", fontSize: "1.6rem" }}>Table book</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button onClick={showModal} type="primary">Create book</Button>
                    <Button danger onClick={() => { setIsUncontrollModalOpen(true) }} type="primary">Create book with Uncontrolled</Button>
                </div>
            </div>
            <Modal title="Create a Book"
                open={isModalBook}
                onOk={handleCreateBook}
                onCancel={handleCancel}
                okText="Create book"
                afterClose={resetData}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div>
                        <span>Upload Thumbnail</span>
                        {preview &&
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        style={{ objectFit: 'contain', marginBottom: "10px", width: '100%', height: '200px', alignItems: 'center' }}
                                        src={preview} alt="Book_Image"
                                    />
                                    <span>{thumbnail.name}</span>
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
                            }} htmlFor="btnUpload">Upload Book Image
                            </label>
                            <input
                                type="file"
                                hidden id='btnUpload'
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


            {/* UNCONTROLLED */}
            <Modal title="Uncontrolled create book modal"
                forceRender
                open={isUncontrollModalOpen} onCancel={() => { setIsUncontrollModalOpen(false) }}
                footer={[
                    <Button key="cancel" onClick={() => { handleOnCancleUncontrolledForm() }}>
                        Cancel
                    </Button>
                ]}
            >
                <div>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={handleUncontrolledFinish}
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
                                        <span>{thumbnail.name}</span>
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
                                }} htmlFor="btnUpload">Upload Book Image Uncontrolled
                                </label>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    hidden id='btnUpload'
                                    onChange={(e) => handleUploadBookImage(e)}
                                    onClick={(event) => event.target.value = null}
                                />
                            </div>
                        </div>

                        <Form.Item
                            label="Main text"
                            name="maintext"
                            rules={[{ required: true, message: 'Please input your book title!' }]}
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


                        {/* SUBMIT BUTTON */}
                        <Row justify={"center"}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Button block onClick={() => form.submit()} type="primary">Create book</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default BookForm