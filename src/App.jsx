import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from './components/context/auth.contex'
import Footer from './components/layout/footer'
import Header from './components/layout/header'
import { getAccountAPI } from './services/apiservices'
import { Spin } from 'antd'
function App() {
  const [count, setCount] = useState(0)
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext)

  const delay = (miliSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, miliSeconds)
    })
  }

  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    await delay(1000)
    if (res.data) {
      setUser(res.data.user)
      console.log("Account data: ", res.data)
    }
    setIsAppLoading(false)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <>
      {
        isAppLoading === true ?
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
            <Spin />

          </div>
          :
          <>
            <Header />
            <div className='body content'>
              <Outlet />
            </div>
            <Footer />
          </>
      }
    </>
  )
}

export default App
