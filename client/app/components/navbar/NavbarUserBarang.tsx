'use client'
import React from "react";
import { Avatar, AvatarIcon } from "@nextui-org/avatar";
import { MdOutlineStorage } from "react-icons/md";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Navbar(){
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/pages/login');
      };
    return(
        <>
        <div className="flex items-center">
            <MdOutlineStorage size={20}/>
            <p className="ml-2">
             Daftar Barang
            </p>
        </div>
        <div>
        <Dropdown>
            <DropdownTrigger>
                <button>
                    <Avatar
                        icon={<AvatarIcon />}
                        classNames={{
                        base: "bg-gradient-to-br from-[#ffffff] to-[#15A7E7]",
                        icon: "text-black/80",
                        }}
                    />
                </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem onClick={handleLogout} key="logout">Logout</DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </div>
        </>
    )
}