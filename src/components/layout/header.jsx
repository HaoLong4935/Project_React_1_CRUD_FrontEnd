import React, { useEffect } from 'react'
import { Menu, message } from "antd";
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined, SettingOutlined, AliwangwangFilled, AliwangwangOutlined, LoginOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Children } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.contex';
import { logouAPI } from '../../services/apiservices';
const Header = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogout = async () => {
        const res = await logouAPI()
        if (res.data) {
            //Clear data 
            localStorage.removeItem("access_token")
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Log out success")
            navigate("/login")
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,
        },
        (!user.id &&
        {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            icon: <LoginOutlined />,
            key: 'login',
        }
        ),

        {
            label: `Welcome ${user.fullName}`,
            key: 'settting',
            icon: <AliwangwangOutlined />,
            children: [
                (
                    user.id && {
                        label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
                        key: 'logout',
                    }
                )
            ]
        }
    ];

    const [current, setCurrent] = useState('users');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {
        if (location && location.pathname) {
            const aallRoutes = ["users", "books"]
            const currentRoute = aallRoutes.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            } else {
                setCurrent("home")
            }
        }
    }, [location])

    //anchor
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal" items={items}
        />
    )
}

export default Header