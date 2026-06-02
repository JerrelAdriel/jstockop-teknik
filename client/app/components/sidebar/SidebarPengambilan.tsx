import React from "react";
import { Button, Link } from "@nextui-org/react";
import { MdSpaceDashboard, MdOutlineStorage, MdOutlineShoppingCart, MdOutlineBackHand } from "react-icons/md";

function Counter({ value, color }: { value: number; color: 'primary' | 'warning' }) {
    if (!value) return null;
    const bg = color === 'primary' ? 'bg-blue-600' : 'bg-amber-500';
    return (
        <span className={`${bg} text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1.5 ml-auto`}>
            {value}
        </span>
    );
}

export default function Sidebar({ amountDataLoan, amountDataTaken }: any) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Button variant="light" as={Link} href="/pages/admin/dashboard" className="justify-start w-full" startContent={<MdSpaceDashboard size={20} />}>
                Dashboard
            </Button>
            <Button variant="light" as={Link} href="/pages/admin/barang" className="justify-start w-full" startContent={<MdOutlineStorage size={20} />}>
                Stok Barang
            </Button>
            <Button variant="light" as={Link} href="/pages/admin/peminjaman" className="justify-start w-full"
                startContent={<MdOutlineShoppingCart size={20} />}
                endContent={<Counter value={amountDataLoan} color="warning" />}>
                Peminjaman
            </Button>
            <Button variant="solid" color="primary" className="justify-start w-full"
                startContent={<MdOutlineBackHand size={20} />}
                endContent={<Counter value={amountDataTaken} color="primary" />}>
                Pengambilan
            </Button>
        </div>
    );
}
