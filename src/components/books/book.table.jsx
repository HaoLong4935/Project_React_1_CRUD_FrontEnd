import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { Table, Popconfirm, notification } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteABook, fetchAllBooks } from '../../services/apiservices';
import UpdateBookModal from './book.update.modal';
import BookUpdateUncontrol from './book.update.uncontrol';
import ViewBookDetails from './book.view.modal';

const BookTable = (props) => {
    const { loadBooks, dataBooks, current, pageSize, total, setCurrent, setPageSize, loadingTable, setLoadingTable } = props
    const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState(false)
    const [isUpdateBookModalOpenUnconTrolled, setIsUpdateBookModalOpenUnconTrolled] = useState(false)
    const [isViewBookOpen, setIsViewBookOpen] = useState(false)
    const [dataBook, setDataBook] = useState(null)
    const [dataBookUpdate, setDataBookUpdate] = useState(null)

    const handleDelete = async (_id) => {
        //Delete method
        const res = await deleteABook(_id)
        if (res.data) {
            notification.success({
                message: "Delete Book",
                description: "Delete book successfully"
            })
            await loadBooks()
        } else {
            notification.error({
                message: "Error delete Book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a onClick={() => {
                            setDataBook(record)
                            setIsViewBookOpen(true)
                            console.log("Data book view :", dataBook)
                        }}>{record._id}</a>
                    </>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Acition',
            key: 'acition',
            render: (_, record) => (
                <>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <EditOutlined
                            style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => {
                                setDataBookUpdate(record)
                                setIsUpdateBookModalOpen(true)
                            }}
                        />
                        <FormOutlined
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => {
                                setDataBookUpdate(record)
                                setIsUpdateBookModalOpenUnconTrolled(true)
                            }} />
                        <Popconfirm
                            placement="left"
                            title="You sure you want to delete this book"
                            description="For sure bruh"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                handleDelete(record._id)
                            }}
                        >
                            <DeleteOutlined onClick={() => {
                            }} style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>
                </>
            )
        },
    ];

    const onChange = (paginnation, filters, sorter, extra) => {
        if (paginnation && paginnation.current) {
            if (paginnation.current != current) {
                setCurrent(+paginnation.current)
            }
        }

        if (paginnation && paginnation.pageSize) {
            if (paginnation.pageSize != +pageSize) {
                setPageSize(+paginnation.pageSize)
            }
        }
    }

    return (
        <>
            <Table
                dataSource={dataBooks}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total}</div>) }
                    }
                }
                onChange={onChange}
                loading={loadingTable}
            />
            <ViewBookDetails
                dataBook={dataBook}
                isViewBookOpen={isViewBookOpen}
                setIsViewBookOpen={setIsViewBookOpen}
            />
            <UpdateBookModal
                loadBooks={loadBooks}
                dataBookUpdate={dataBookUpdate}
                setDataBookUpdate={setDataBookUpdate}
                isUpdateBookModalOpen={isUpdateBookModalOpen}
                setIsUpdateBookModalOpen={setIsUpdateBookModalOpen}
            />
            <BookUpdateUncontrol
                loadBooks={loadBooks}
                dataBookUpdate={dataBookUpdate}
                setDataBookUpdate={setDataBookUpdate}
                isUpdateBookModalOpenUnconTrolled={isUpdateBookModalOpenUnconTrolled}
                setIsUpdateBookModalOpenUnconTrolled={setIsUpdateBookModalOpenUnconTrolled}
            />
        </>
    );
}

export default BookTable