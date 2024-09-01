'use client'
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Gudang from "../assets/image/gudang.jpg"
import Pelindo from "../assets/image/logo SPMT.png"
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@nextui-org/react";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { toast } from 'react-toastify';

require("dotenv").config()
const { URL } = process.env

export default function Login(){

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')  
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    
    const router = useRouter();
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // const handlePasswordChange = (value:any) => {
    //     setPassword(value); 
    //     console.log(password);
        
        
    //     setMaskedPassword('*'.repeat(value.length)); 
    //     console.log(maskedPassword);
        

    // };

    const handleLogin = async(event:FormEvent<HTMLFormElement>) =>{
        setLoading(true)
        event.preventDefault()
        
        try {
            const response = await axios.post("https://jstockop-teknik-server.vercel.app/login",{
                username,
                password
            });
            const { data_token, data_user } = response.data
            localStorage.setItem('token', data_token)
            if (data_user.role === "admin") {
                toast.success(`Login Berhasil`);
                setTimeout(() => {
                    router.push('/pages/admin/dashboard')
                  }, 200);  
            }
            else{
                toast.success(`Login Berhasil`);
                setTimeout(() => {
                    router.push('/pages/users/home');
                  }, 200);
            } 
        } catch (error:any) {
            toast.error(error.response.data.message);
            
            // const errorMessage = error.response.data.message
            // x("Error login:",errorMessage);  
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="relative grid grid-cols-2 h-screen overflow-hidden">
            <div className="relative left-column m-5">
                <div>
                    <Image className="float-right w-4/6 h-28"/*h-24 kalau pake Pelindo asli*/ src={Pelindo} alt="Pelindo Image"></Image>
                </div>               
                <div className="teks-gudang relative mx-20 clear-both">
                    <p className="float-left tracking-wide text-5xl mt-10 mb-0">
                        <span className="font-normal mr-1">Gudang</span>
                        <span className="font-black ml-1">Teknik</span>
                    </p>
                    <p className="float-right tracking-wide text-5xl mt-0">
                        <span className="font-normal mr-1">Branch</span> 
                        <span className="font-black ml-1">Belawan</span>
                    </p>
                </div>
                <div className="form-input pt-5 clear-both">
                    <form onSubmit={handleLogin}>
                        <div className="ml-40 mb-5 ">
                            <label htmlFor="username" className="block mb-1 text-lg font-bold ">
                                Username
                            </label>
                            <div>
                                <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-9/12 rounded-lg bg-slate-200 border-black py-2.5 pl-4 pr-4 placeholder:text-gray-400"
                                placeholder="Masukkan Username"
                                />
                            </div>
                        </div>
                        <div className="ml-40">
                            <label htmlFor="password" className="block mb-1 text-lg font-bold">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                type={showPassword ? "text": "password"}
                                name="password"
                                id="password"   
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="m-0 block w-9/12 rounded-lg bg-slate-200 border-black py-2.5 pl-4 pr-4 placeholder:text-gray-400"
                                placeholder="Masukkan Password"
                                />
                                <Button isIconOnly size="sm" variant="light" className="absolute inset-y-0 right-36 flex items-center h-full "
                                onClick={() =>toggleShowPassword()}>{showPassword ?<BiSolidShow size={20}/>:<BiSolidHide size={20}/>}</Button> 
                            </div>
                        </div>
                        <button className="float-right mt-8 mr-36 block w-24 h-8 rounded-md bg-[#0E73A7] tracking-wide text-white text-md font-bold" type="submit" name="submit">
                            {loading ? <Spinner /> : 'Login'}
                        </button>
                    </form>
                    <div className="clear-both">
                        <p className="flex justify-center items-center mt-32">
                            <span className="font-light mr-1">Lupa Password?</span>
                            <a href="https://wa.me/6281262059002" className="ml-1 text-blue-600 hover:underline underline-offset-2" target="_blank" rel="noopener noreferrer" >Hubungi Admin</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative right-column m-5">
                <Image className="rounded-lg size-full" src={Gudang} priority={true} alt="Gudang"></Image>
            </div>
        </div>
    )
}