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

        // === DEMO MODE: dummy credentials untuk preview portofolio ===
        // admin / admin123 → login sebagai admin (tanpa backend)
        // user / user123  → login sebagai user
        if ((username === 'admin' && password === 'admin123') ||
            (username === 'user'  && password === 'user123')) {
            localStorage.setItem('token', 'dummy-admin-token-preview');
            toast.success(`Login Berhasil (Demo Mode)`);
            setTimeout(() => {
                router.push(username === 'admin' ? '/pages/admin/dashboard' : '/pages/users/home');
            }, 200);
            setLoading(false);
            return;
        }

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
            toast.error(error?.response?.data?.message || 'Login gagal. Coba demo: admin/admin123');
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {/* Left: Form */}
            <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-16">
                <div className="max-w-md mx-auto w-full">
                    <div className="flex justify-center lg:justify-start mb-8">
                        <Image className="w-36 sm:w-44 h-auto" src={Pelindo} alt="Pelindo SPMT" />
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                            Selamat Datang 👋
                        </h1>
                        <p className="text-slate-500 mt-2">
                            <span className="font-semibold">Gudang Teknik</span> · Branch Belawan
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-semibold text-slate-700">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-xl bg-white border border-slate-200 py-3 px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                placeholder="Masukkan username"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-slate-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text": "password"}
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-xl bg-white border border-slate-200 py-3 px-4 pr-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                    placeholder="Masukkan password"
                                />
                                <Button isIconOnly size="sm" variant="light"
                                    className="absolute inset-y-0 right-1 flex items-center h-full"
                                    onClick={() => toggleShowPassword()}>
                                    {showPassword ? <BiSolidShow size={20}/> : <BiSolidHide size={20}/>}
                                </Button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-3 mt-5 mb-5 text-sm text-blue-800 flex items-center gap-2">
                            <span className="text-base">💡</span>
                            <span><b>Demo:</b> admin / admin123</span>
                        </div>

                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 tracking-wide text-white font-bold shadow-lg shadow-blue-200 disabled:opacity-50 transition"
                            type="submit" name="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" color="white" /> : 'Login →'}
                        </button>
                    </form>

                    <p className="flex justify-center items-center mt-8 text-sm text-slate-500">
                        <span className="mr-1">Lupa Password?</span>
                        <a href="https://wa.me/6281262059002" className="ml-1 text-blue-600 hover:text-blue-700 font-semibold" target="_blank" rel="noopener noreferrer">Hubungi Admin</a>
                    </p>
                </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative hidden lg:block p-8">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                    <Image className="object-cover" src={Gudang} priority={true} fill alt="Gudang Teknik Belawan" sizes="50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h2 className="text-3xl font-black mb-2 drop-shadow-lg">
                            jStock
                        </h2>
                        <p className="text-lg opacity-90 drop-shadow">
                            Sistem manajemen stok modern untuk Gudang Teknik Pelabuhan Belawan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}