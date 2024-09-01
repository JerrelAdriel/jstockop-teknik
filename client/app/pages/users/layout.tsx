'use client'
import React,{useEffect} from "react"
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginLayout({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const checkUser = async() =>{   
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get("http://localhost:8000/getcurrentuser",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const { data_user } = response.data
            if (data_user.role === "admin") {
                localStorage.removeItem('token')
                router.push('/pages/login')  
            }
        } catch (error:any) {
            console.log("error");  
        } 
    }
    useEffect(() => {
        
        if (typeof window !== 'undefined' ) {
            const token = localStorage.getItem('token');
            if (!token || token === null) {
                router.push('/pages/login');
            }
            else{
                checkUser()
            }
          }
      }, []);
    return(
        <div className="flex relative w-screen h-screen">
            {children} 
        </div>
    )
}