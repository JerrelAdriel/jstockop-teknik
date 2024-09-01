import React from "react"
import Login from "../../../components/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Halaman Login",
    description: "Halaman Login User"
}
export default function LoginPage(){
    return(
        <div>
            <ToastContainer position="top-right" autoClose={6000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
            <Login />
        </div>
    )
}   