import React from 'react'
import { Drawer } from 'antd';
const ViewBookDetails = (props) => {
    const { dataBook, isViewBookOpen, setIsViewBookOpen } = props

    const handleOnCancle = () => {
        setIsViewBookOpen(false)
    }
    return (
        <Drawer title="View Book Information"
            onClose={handleOnCancle}
            open={isViewBookOpen}
        >
            {dataBook ?
                <><div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <span>Title: </span>
                        <h1>{dataBook.mainText}</h1>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <span>Id: </span>
                        <p>{dataBook._id}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <span>Category: </span>
                        <p>{dataBook.category}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <span>Price: </span>
                        <p>{dataBook.price}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <span>Stock: </span>
                        <p>{dataBook.quantity}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <span>Sold: </span>
                        <p>{dataBook.sold}</p>
                    </div>
                    <div>
                        <span>Image: </span>
                        <img
                            style={{ objectFit: 'contain', width: '100%', height: '200px', alignItems: 'center' }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`} alt="Book_Image"
                        />
                    </div>
                </div>

                </>
                :
                <>There's no data about this book</>}
        </Drawer>
    )
}

export default ViewBookDetails