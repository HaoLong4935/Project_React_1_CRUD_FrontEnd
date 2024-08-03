import React from 'react'
import UserForm from '../components/user/user.form'
import UserTable from '../components/user/user.table'
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchAllUsers } from '../services/apiservices';

const UserPage = () => {
    const [dataUsers, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [total, setTotal] = useState(99)

    const loadUser = async () => {
        const res = await fetchAllUsers(current, pageSize)
        if (res.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    useEffect(() => {
        loadUser()
    }, [current, pageSize]);

    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default UserPage