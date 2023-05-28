import React,{useEffect} from 'react'
import { Route, Routes } from "react-router-dom"
import AdminLoginPage from '../page/Admin/AdminLogin'
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from 'react-cookie'
import {AdminActions} from "../store/AdminAthu"
import AdminHome from '../page/Admin/AdminHome'
import AdminCreate from '../page/Admin/AdminCreate'
function Admin() {

  const [cookies, setCookie] = useCookies(['jwt']);
  let Admin = useSelector(state => { return state.Admin.AdminToken })
    const dispatch = useDispatch()


    useEffect(() => {
      if (Object.keys(cookies).length > 0) {
        
        dispatch(AdminActions.AddAdmin({token: cookies?.jwt?.Admintoken}))
      }
    }, [])
    

  return (
    <div>
      <Routes>
        <Route path="/" element={Admin? <AdminHome/> :<AdminLoginPage/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={Admin? <AdminHome/> :<AdminLoginPage/>} />
      </Routes>
            <Routes>
        <Route path="/createuser"  element={Admin? <AdminCreate/> :<AdminLoginPage/>}/>
       
      </Routes>

    </div>
  )
}

export default Admin
