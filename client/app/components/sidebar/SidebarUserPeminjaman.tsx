import React from "react";
import { Link, Button, Badge } from "@nextui-org/react";
import { MdHome , MdOutlineStorage, MdOutlineShoppingCart, MdOutlineBackHand  } from "react-icons/md";


export default function Sidebar({amountDataLoan,amountDataTaken}:any){
    return(
        <div className="grid mt-5 grid-rows-4 justify-center text-left">
            <Button className="justify-start" variant="light" as={Link} href="/pages/users/home"><MdHome  /> Home</Button>
            <Button className="justify-start" variant="light" as={Link} href="/pages/users/barang"><MdOutlineStorage />Daftar Barang</Button>
            <Badge content={amountDataLoan} ><Button className="justify-start" variant="solid" color="primary"><MdOutlineShoppingCart />Peminjaman</Button> </Badge>
            <Badge content={amountDataTaken} ><Button className="justify-start" variant="light" as={Link} href="/pages/users/pengambilan"><MdOutlineBackHand />Pengambilan</Button> </Badge>
        </div>
    )
}