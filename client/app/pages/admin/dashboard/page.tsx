'use client'
import Image from "next/image";
import Sidebar from "../../../components/sidebar/SidebarDashboard"
import Navbar from "../../../components/navbar/NavbarDashboard"
import Pelindo from "../../../assets/image/logo SPMT.png"
import Avatar from "../../../assets/image/avatar.png"
import { MdWarning, MdOutlineStorage, MdOutlineShoppingCart, MdOutlineBackHand } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { Button, Link, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React, {useEffect, useState} from "react"
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs";
import 'dayjs/locale/id';
dayjs.locale('id')

interface DataItem {
    id: number;
    name: string;
    users: any;
    items: any;
    specification: string;
    merk: string;
    unit: string;
    init_amount: number;
    total_recent: number;
    number_of_taken: number;
    number_of_loan: number;
    created_at: Date;
    updated_at?: Date;
  }

  
interface DataLoan {
    id: number;
    user_name: string;
    item_name: string;
    specification: string;
    amount: number;
    unit: string;
    location: string;
    return_amount: number;
    loan_time: Date;
    return_time: Date;
    created_at: Date;
  }
  interface DataTaken {
    id: number;
    user_name: any;
    item_name: any;
    name: any;
    unit: number;
    location: string;
    total_taken: number;
    status: string;
    taken_time: Date;
    created_at: Date;
  }

  interface DataUser {
    id: number;
    username: string;
    role: string;
  }

  const columnsLoan = [
    {
      key: "username",
      label: "Peminjam",
    },
    {
      key: "itemname",
      label: "Barang",
    },
    {
      key: "amount",
      label: "Jumlah",
    },
    {
      key: "loantime",
      label: "Waktu Peminjaman",
    },
    {
      key: "returntime",
      label: "Waktu Pengembalian",
    },
  ];

  const columnsTaken = [
    {
      key: "username",
      label: "Pengambil",
    },
    {
      key: "itemname",
      label: "Barang",
    },
    {
      key: "amount",
      label: "Jumlah",
    },
    {
      key: "time",
      label: "Waktu Pengambilan",
    },
    {
      key: "returntime",
      label: "Waktu Pengembalian",
    },
  ];

  const columnsStock = [
    {
      key: "name",
      label: "Nama",
    },
    {
      key: "specification",
      label: "Spesifikasi",
    },
    {
      key: "total_recent",
      label: "Sisa barang",
    },
  ];

export default function Dashboard(){
    // const [dataItem, setDataItem] = useState<DataItem[]>([])
    const [dataItemLow, setDataItemLow] = useState<DataItem[]>([])
    const [dataItemAmount, setDataItemAmount] = useState<number>(0)
    const [dataLoan, setDataLoan] = useState<DataLoan[]>([])
    const [dataTaken, setDataTaken] = useState<DataTaken[]>([])
    const [dataUser, setDataUser] = useState<DataUser[]>([])
    const [amountLoan, setAmountLoan] = useState<number>(0)
    const [amountTaken, setAmountTaken] = useState<number>(0)
    // const [dataItemMenipis, setDataItemMenipis] = useState<DataUser[]>([]))
  
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleDataItem = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:8000/getallitem",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_items, data_items_low} = response.data
            if (data_items_low === undefined) {
                setDataItemLow([])
            }
            else{
                setDataItemLow(data_items_low)
            }
            // setDataItem(data_items)
            setDataItemAmount(data_items.length)
        } catch (error:any) {
            console.log("error");
        }
    }

    const handleDataLoan = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:8000/getallloan",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_loans} = response.data
            if(data_loans === undefined){
                setAmountLoan(0)
            }
            else{
                setAmountLoan(data_loans.length)
            }
        } catch (error:any) {
            console.log("error");
        }
    }
    const handleDataTaken = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:8000/getalltaken",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            
            const {data_takens} = response.data
            if(data_takens === undefined){
                setAmountTaken(0)
            }
            else{
                setAmountTaken(data_takens.length)
            }
            
        } catch (error:any) {
            console.log("error");
        }
    }
    const handleDataLoanUpdate = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:8000/getallfinishedloan",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            
            const {data_loans} = response.data
            if(data_loans === undefined){
                setDataLoan([])
            }
            else{
                setDataLoan(data_loans)
            }
            
        } catch (error:any) {
            console.log("error");
        }
    }
    const handleDataTakenUpdate = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:8000/getallfinishedtaken",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            
            const {data_takens} = response.data
            if(data_takens === undefined){
                setDataTaken([])
            }
            else{
                setDataTaken(data_takens)
            }
            
        } catch (error:any) {
            console.log("error");
        }
    }

    const handleDataUser = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("http://localhost:8000/getrolestaff",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            
            const {data_users} = response.data
            console.log(data_users);
            
            if(data_users === undefined){
                setDataUser([])
            }
            else{
                setDataUser(data_users)
            }
        } catch (error:any) {
            console.log("error");
        }
    }

    useEffect(() => {
        handleDataItem()
        handleDataLoanUpdate()
        handleDataTakenUpdate()
        handleDataUser()
        handleDataLoan()
        handleDataTaken()
      }, []);
    return(
        <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
            <div className=" flex flex-col items-center justify-between bg-[#EFEFEF] p-3 h-full">
                <div>
                <Image className="w-56" src={Pelindo} alt="Gambar Pelindo"></Image>
                <Sidebar amountDataLoan={amountLoan} amountDataTaken={amountTaken} />
                </div>
                <Button onClick={handleRefresh} className="w-28 items-center" variant="light" color="primary">REFRESH</Button>
            </div>  
            <div className="relative bg-primary-400 p-2 w-full h-screen">
                <div className="flex items-center justify-between rounded-lg bg-[#EFEFEF] w-full h-24 p-5">
                    <Navbar />
                </div>
                <div className="overflow-hidden rounded-lg bg-[#F2F2F2] px-20 py-2 mt-2 w-full h-[38rem]">
                    <p className="text-4xl font-black mb-1">
                        Dashboard
                    </p>
                    <div className="rounded-lg bg-[#EAEAEA] mb-1 py-6 px-5 w-full h-32">
                        {/* <p className="text-xl font-bold">
                            Hari Ini
                        </p> */}
                        <div className="flex justify-around text-center">                     
                            <Button as={Link} href="/pages/admin/barang" className="flex gap-2 justify-center p-2 border-solid border-4 border-[#0E73A7] rounded-lg bg-[#ffffff] w-48 h-20">
                                <div>
                                    <MdOutlineStorage color="#15A7E7" size={50} />
                                </div>
                                <div>
                                    <p className="text-sm font-light">
                                        Jumlah Barang
                                    </p>
                                    <div className="text-2xl font-black">
                                        {dataItemAmount}
                                    </div>
                                </div>
                            </Button>
                            <Button as={Link} href="/pages/admin/peminjaman" className="flex justify-center p-2 border-solid border-4 border-[#0E73A7] rounded-lg bg-[#ffffff] w-48 h-20">
                                <div>
                                    <MdOutlineShoppingCart color="#15A7E7" size={50}/>
                                </div>
                                <div>
                                    <p className="text-sm font-light">
                                        Jumlah Peminjaman
                                    </p>
                                    <div className="text-2xl font-black">
                                        {amountLoan}
                                    </div>
                                </div>
                            </Button>
                            <Button as={Link} href="/pages/admin/pengambilan" className="flex justify-center p-2 border-solid border-4 border-[#0E73A7] rounded-lg bg-[#ffffff] w-48 h-20">
                                <div>
                                    <MdOutlineBackHand color="#15A7E7" size={47} />
                                </div>
                                <div>
                                    <p className="text-sm font-light">
                                        Jumlah Pengambilan
                                    </p>
                                    <div className="text-2xl font-black">
                                        {amountTaken}
                                    </div>
                                </div>
                            </Button>    
                        </div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#EAEAEA] mb-1 w-full h-54">
                        <div className="flex justify-around text-center">
                            <div>
                                <p className="text-2xl font-black mb-2">
                                    Peminjaman Terbaru
                                </p>
                                <div className="p-2 rounded-lg bg-[#ffffff] w-full">
                                    <Table className="h-36" aria-label="Table Loan">
                                        <TableHeader columns = {columnsLoan}>
                                            {(column => <TableColumn key={column.key}>{column.label}</TableColumn>)}
                                        </TableHeader>
                                        <TableBody emptyContent={"No items found"}>
                                            {dataLoan.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.user_name ? item.user_name : "User Tidak Ada"}</TableCell>
                                                <TableCell>{item.item_name ? item.item_name : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>{dayjs(item.loan_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>
                                                <TableCell>{dayjs(item.return_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end items-center">
                                    <Link href="/pages/admin/peminjaman">Lihat Selengkapnya<FaArrowRightLong className="ml-2 mt-1" color="#4994f5" /></Link>  
                                </div> 
                            </div>
                            <div>
                                <p className="text-2xl font-black mb-2">
                                    Pengambilan Terbaru
                                </p>
                                <div className="p-2 rounded-lg bg-[#ffffff] w-full">
                                <Table className="h-36" aria-label="Table Taken">
                                        <TableHeader columns = {columnsTaken}>
                                            {(column => <TableColumn key={column.key}>{column.label}</TableColumn>)}
                                        </TableHeader>
                                        <TableBody emptyContent={"No items found"}>
                                            {dataTaken.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.user_name ? item.user_name : "User Tidak Ada"}</TableCell>
                                                <TableCell>{item.item_name ? item.item_name : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.total_taken}</TableCell>
                                                <TableCell>{dayjs(item.taken_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>
                                                <TableCell>{dayjs(item.taken_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end items-center">
                                    <Link href="/pages/admin/pengambilan">Lihat Selengkapnya<FaArrowRightLong className="ml-2 mt-1" color="#4994f5" /></Link>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between rounded-lg w-full h-44">
                        <div className="p-2 rounded-lg text-center bg-[#EAEAEA] w-[34rem] h-full">
                            <p className="text-2xl font-black mb-3">
                                Officer/Staff
                            </p>
                                <div className="grid grid-cols-3 gap-2">
                                {dataUser.map((item) => (
                                    <div key={item.id} className="flex gap-5 rounded-xl justify-center items-center border-md bg-[#ffffff] w-full">
                                        <Image src={Avatar} alt="Gambar officer" className="w-14 h-11"></Image>
                                        <div>
                                            <div className="text-lg font-bold">{item.username}</div>
                                            <div>{item.role}</div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                        </div>
                        <div className="p-2 rounded-lg bg-[#EAEAEA] w-[34rem] h-full">
                            <div className="flex items-center">
                                <MdWarning color="#FF0000" size={25}/>
                                <p className="text-2xl font-black ml-2">
                                    Stock Menipis
                                </p>
                            </div>
                                <div className="p-2 rounded-lg bg-[#ffffff] w-full">
                                    {/* <div className="grid grid-cols-3 items-center justify-center text-center h-full"> */}
                                    <Table className="h-28" aria-label="Table Loan">
                                        <TableHeader columns = {columnsStock}>
                                            {(column => <TableColumn key={column.key}>{column.label}</TableColumn>)}
                                        </TableHeader>
                                        <TableBody emptyContent={"No items found"}>
                                            {dataItemLow.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.specification}</TableCell>
                                                <TableCell>{`${item.total_recent+" "+item.unit}`}</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                        {/* <Image src={Pelindo} className="" alt="Image Stock"></Image>
                                        <div>{item.name}</div>
                                        <div>
                                            <p>Sisa Stock</p> {item.total_recent}</div> */}
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}