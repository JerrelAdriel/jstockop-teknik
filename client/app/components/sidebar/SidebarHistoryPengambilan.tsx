import React from "react";
import { Button, Link } from "@nextui-org/react";
import { MdSpaceDashboard, MdOutlineStorage, MdOutlineShoppingCart, MdOutlineBackHand  } from "react-icons/md";


export default function Sidebar({amountDataLoan, amountDataTaken}:any){
    return(
        <div className="grid mt-5 grid-rows-4 justify-center text-left">
            <Button variant="light" as={Link} href="/pages/admin/dashboard" ><MdSpaceDashboard /> Dashboard</Button>
            <Button variant="light" as={Link} href="/pages/admin/barang"><MdOutlineStorage />Stok Barang</Button>
            <Button variant="light" as={Link} href="/pages/admin/peminjaman"><MdOutlineShoppingCart />Peminjaman</Button>
            <Button variant="solid" color="primary"><MdOutlineBackHand />Pengambilan</Button>
        </div>
    )
}