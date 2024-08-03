import React, { useState } from 'react'
import { notification, Table, Tag, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import ViewUserModal from './view.user.modal';
import { deleteAUser } from '../../services/apiservices';

const UserTable = (props) => {
    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataView, setDataView] = useState(null)

    const handleDelete = async (_id) => {
        //Delete method
        const res = await deleteAUser(_id)
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete user successfully"
            })
            await loadUser()
        } else {
            notification.error({
                message: "Error delete User",
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (paginnation, filters, sorter, extra) => {
        console.log("current", current)
        if (paginnation && paginnation.current) {
            if (paginnation.current != current) {
                setCurrent(+paginnation.current)
                // setPageSize(pageSize)
            }
        }

        if (paginnation && paginnation.pageSize) {
            if (paginnation.pageSize != +pageSize) {
                setPageSize(paginnation.pageSize)
            }
        }
        console.log("Log ra on change data: ", { paginnation, filters, sorter, extra })
    }

    const columns = [
        {
            title: 'STT',
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
            render: (_, record) => (
                <>
                    <a onClick={() => {
                        setDataView(record)
                        setIsModalViewOpen(true)
                    }}>{record._id}</a>
                </>
            ),
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                //Biến record này là từng data trong cái dataUsers
                <>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined onClick={() => {
                            setDataUpdate(record) // Lấy data hiện tại của record
                            setIsModalUpdateOpen(true)
                        }} style={{ cursor: "pointer", color: "orange" }} />
                        <Popconfirm
                            placement="left"
                            title="You sure my nigga"
                            description="Nigga , you gon delete this right"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                // console.log("Record for delete is: ", record._id);
                                handleDelete(record._id)
                            }}
                        >
                            <DeleteOutlined onClick={() => {
                                setIsModalDeleteOpen(true)
                            }} style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>

                </>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: false,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]}</div>) }
                    }
                }
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserModal
                isModalViewOpen={isModalViewOpen}
                setIsModalViewOpen={setIsModalViewOpen}
                dataView={dataView}
                setDataView={setDataView}
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable