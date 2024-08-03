import { Button, Result } from 'antd'
import React, { useContext } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { AuthContext } from '../components/context/auth.contex'

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext)

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }

    return (<Result
        status="403"
        title="403"
        subTitle={"Bạn cần đăng nhập để có thể sử dụng"}
        extra={
            <Button type="primary">
                <Link to="/">
                    <span>Back to Home</span>
                </Link>
            </Button>}
    />)
}

export default PrivateRoute