import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { fetchAllBooks } from '../../services/apiservices'
import BookForm from './book.form'
import BookTable from './book.table'

const Book = () => {
    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [loadingTable, setLoadingTable] = useState(false)


    const loadBooks = useCallback(async () => {
        setLoadingTable(true)
        const res = await fetchAllBooks(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false)
    }, [current, pageSize])

    useEffect(() => {
        loadBooks()
    }, [loadBooks])

    return (
        <div style={{ padding: "20px" }}>
            <BookForm loadBooks={loadBooks} />
            <BookTable
                dataBooks={dataBooks}
                loadBooks={loadBooks}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadingTable={loadingTable}
                setLoadingTable={setLoadingTable}
            />

        </div>
    )
}

export default Book