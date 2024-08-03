import React from 'react'
import { useRouteError } from 'react-router-dom'
import { Button, Result } from 'antd';
const ErrorPage = () => {
    const error = useRouteError()
    // console.error(error)
    return (
        <Result
            status="404"
            title="404"
            subTitle={error.statusText || error.message}
            extra={<Button type="primary">Back to home</Button>}
        />
    )
}

export default ErrorPage