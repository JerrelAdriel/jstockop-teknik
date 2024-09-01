'use client'
import Image from "next/image";
import Sidebar from "../../../components/sidebar/SidebarUserHome"
import Navbar from "../../../components/navbar/NavbarUserHome"
import Pelindo from "../../../assets/image/logo SPMT.png"
import Avatar from "../../../assets/image/avatar.png"
import { MdWarning, MdOutlineStorage, MdOutlineShoppingCart, MdOutlineBackHand } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { Button, Link, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React, {useEffect, useState} from "react"
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
    users: any;
    items: any;
    merk: string;
    specification: string;
    amount: number;
    amount_recent: number;
    unit: string;
    location: string;
    return_amount: number;
    loan_time: Date;
    return_time: Date;
    created_at: Date;
  }
  interface DataTaken {
    id: number;
    users: any;
    items: any;
    name: any;
    amount_recent: number;
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
    // {
    //   key: "username",
    //   label: "Peminjam",
    // },
    {
      key: "itemname",
      label: "Barang",
    },
    {
      key: "specification",
      label: "Spesifikasi",
    },
    {
      key: "merk",
      label: "Merk",
    },
    {
      key: "location",
      label: "Lokasi",
    },
    {
      key: "amount",
      label: "Jumlah",
    },
    {
      key: "loantime",
      label: "Waktu Peminjaman",
    },
    // {
    //   key: "returntime",
    //   label: "Waktu Pengembalian",
    // },
  ];

  const columnsTaken = [
    // {
    //   key: "username",
    //   label: "Pengambil",
    // },
    {
        key: "itemname",
        label: "Barang",
      },
      {
        key: "specification",
        label: "Spesifikasi",
      },
      {
        key: "merk",
        label: "Merk",
      },
      {
        key: "location",
        label: "Lokasi",
      },
      {
        key: "amount",
        label: "Jumlah",
      },
      {
        key: "takentime",
        label: "Waktu Pengambilan",
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
      key: "merk",
      label: "Merk",
    },
    {
      key: "unit",
      label: "Satuan",
    },
    {
      key: "total_recent",
      label: "Jumlah Barang",
    },

  ];

export default function Home(){
    const [dataItem, setDataItem] = useState<DataItem[]>([])
    // const [dataItemLow, setDataItemLow] = useState<DataItem[]>([])
    const [dataItemAmount, setDataItemAmount] = useState<number>(0)
    const [dataLoan, setDataLoan] = useState<DataLoan[]>([])
    const [dataTaken, setDataTaken] = useState<DataTaken[]>([])
    const [dataUser, setDataUser] = useState<DataUser[]>([])
    const [currentUser, setCurrentUser] = useState([])
    const [amountLoan, setAmountLoan] = useState<number>(0)
    const [amountTaken, setAmountTaken] = useState<number>(0)
    // const [dataItemMenipis, setDataItemMenipis] = useState<DataUser[]>([]))
    
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleCurrentUser = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getcurrentuser",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_user} = response.data
            setCurrentUser(data_user.username)
        } catch (error:any) {
            console.log("error");
        }
    }

    const handleDataItem = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getallitem",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_items} = response.data
            if(data_items === undefined){
                setDataItem([])
                setDataItemAmount(0)
            }
            else{
                setDataItem(data_items)
                setDataItemAmount(data_items.length)
            }
            
        } catch (error:any) {
            console.log("error");
        }
    }

    const handleDataLoan = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getloanbyuser",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_loans} = response.data
            if(data_loans === undefined){
                setAmountLoan(0)
                setDataLoan([])
            }
            else{
                setAmountLoan(data_loans.length)
                setDataLoan(data_loans)
            }
        } catch (error:any) {
            console.log("error");
        }
    }
    const handleDataTaken = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/gettakenbyuser",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            
            const {data_takens} = response.data
            if(data_takens === undefined){
                setAmountTaken(0)
                setDataTaken([])
            }
            else{
                setAmountTaken(data_takens.length)
                setDataTaken(data_takens)
            }
            
        } catch (error:any) {
            console.log("error");
        }
    }
    // const handleDataLoanUpdate = async() =>{
    //     try {
    //         const token = localStorage.getItem('token')
    //         const response = await axios.get("http://localhost:8000/getallfinishedloan",{
    //             headers:{
    //                 "Authorization" : `Bearer ${token}`
    //             }
    //         });
            
    //         const {data_loans} = response.data
    //         if(data_loans === undefined){
    //             setDataLoan([])
    //         }
    //         else{
    //             setDataLoan(data_loans)
    //         }
            
    //     } catch (error:any) {
    //         console.log("error");
    //     }
    // }
    // const handleDataTakenUpdate = async() =>{
    //     try {
    //         const token = localStorage.getItem('token')
    //         const response = await axios.get("http://localhost:8000/getalltakenupdate",{
    //             headers:{
    //                 "Authorization" : `Bearer ${token}`
    //             }
    //         });
            
    //         const {data_takens} = response.data
    //         if(data_takens === undefined){
    //             setDataTaken([])
    //         }
    //         else{
    //             setDataTaken(data_takens)
    //         }
            
    //     } catch (error:any) {
    //         console.log("error");
    //     }
    // }

    // const handleDataUser = async() =>{
    //     try {
    //         const token = localStorage.getItem('token')
    //         const response = await axios.get("http://localhost:8000/getroleofficer",{
    //             headers:{
    //                 "Authorization" : `Bearer ${token}`
    //             }
    //         });
            
    //         const {data_users} = response.data
    //         setDataUser(data_users)
    //     } catch (error:any) {
    //         console.log("error");
    //     }
    // }

    useEffect(() => {
        handleDataItem()
        // handleDataLoanUpdate()
        // handleDataTakenUpdate()
        // handleDataUser()
        handleDataLoan()
        handleDataTaken()
        handleCurrentUser()
      }, []);
    return(
        <>
            <div className="flex flex-col items-center justify-between bg-[#EFEFEF] p-3 h-full">
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
                <div className="overflow-hidden rounded-lg bg-[#F2F2F2] px-20 py-1 mt-2 w-full h-[38rem]">
                    <p className="text-4xl font-black mb-3">
                        Halo, Selamat Datang {currentUser}!
                    </p>
                    <div className="rounded-lg bg-[#EAEAEA] mb-1 py-2 px-1 w-full h-24">
                        {/* <p className="text-xl font-bold">
                            Hari Ini
                        </p> */}
                        <div className="flex justify-around text-center">                     
                            <Button as={Link} href="/pages/users/barang" className="flex gap-2 justify-center p-2 border-solid border-4 border-[#0E73A7] rounded-lg bg-[#ffffff] w-50 h-20">
                                <div>
                                    <MdOutlineStorage color="#15A7E7" size={50} />
                                </div>
                                <div>
                                    <p className="text-sm font-light">
                                        Jumlah Barang Tersedia
                                    </p>
                                    <div className="text-2xl font-black">
                                        {dataItemAmount}
                                    </div>
                                </div>
                            </Button>
                            <Button as={Link} href="/pages/users/peminjaman" className="flex justify-center p-2 border-solid border-4 border-[#0E73A7] rounded-lg bg-[#ffffff] w-50 h-20">
                                <div>
                                    <MdOutlineShoppingCart color="#15A7E7" size={50}/>
                                </div>
                                <div>
                                    <p className="text-sm font-light">
                                        Peminjaman Belum Selesai
                                    </p>
                                    <div className="text-2xl font-black">
                                        {amountLoan}
                                    </div>
                                </div>
                            </Button>
                            <Button as={Link} href="/pages/users/pengambilan" className="flex justify-center p-2 border-solid border-4 border-[#0E73A7] rounded-lg bg-[#ffffff] w-50 h-20">
                                <div>
                                    <MdOutlineBackHand color="#15A7E7" size={47} />
                                </div>
                                <div>
                                    <p className="text-sm font-light">
                                        Pengambilan Belum Selesai
                                    </p>
                                    <div className="text-2xl font-black">
                                        {amountTaken}
                                    </div>
                                </div>
                            </Button>    
                        </div>
                    </div>
                    <div className="bg-[#EAEAEA] rounded-lg w-full mb-1 h-56 px-3 py-2">
                        <p className="text-2xl font-black mb-2 text-center">
                                    Daftar Barang Yang Tersedia
                                </p>
                                <div className="p-2 rounded-lg bg-[#ffffff] w-full">
                                    <Table className="h-32" aria-label="Table Loan">
                                        <TableHeader columns = {columnsStock}>
                                            {(column => <TableColumn align="center" key={column.key}>{column.label}</TableColumn>)}
                                        </TableHeader>
                                        <TableBody emptyContent={"No items found"}>
                                            {dataItem.map((item) => (
                                            <TableRow key={item.id}>
                                                {/* <TableCell>{item.users ? item.users.username : "User Tidak Ada"}</TableCell> */}
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.specification}</TableCell>
                                                <TableCell>{item.merk}</TableCell>
                                                <TableCell>{item.unit}</TableCell>
                                                <TableCell>{item.total_recent}</TableCell>
                                                {/* <TableCell>{dayjs(item.loan_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell> */}
                                                {/* <TableCell>{dayjs(item.return_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell> */}
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end items-center">
                                    <Link href="/pages/users/barang">Lihat Selengkapnya<FaArrowRightLong className="ml-2 mt-1" color="#4994f5" /></Link>  
                                </div> 
                    </div>
                    <div className="p-1 rounded-lg bg-[#EAEAEA] mb-1 w-full h-auto">
                        <div className="flex justify-around text-center">
                            <div>
                                <p className="text-2xl font-black mb-2">
                                    Peminjaman Belum Selesai
                                </p>
                                <div className="p-2 rounded-lg bg-[#ffffff] w-full">
                                    <Table className="h-32" aria-label="Table Loan">
                                        <TableHeader  columns = {columnsLoan}>
                                            {(column => <TableColumn key={column.key}>{column.label}</TableColumn>)}
                                        </TableHeader>
                                        <TableBody emptyContent={"No items found"}>
                                            {dataLoan.map((item) => (
                                            <TableRow key={item.id}>
                                                {/* <TableCell>{item.users ? item.users.username : "User Tidak Ada"}</TableCell> */}
                                                <TableCell>{item.items ? item.items.name : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.items ? item.items.specification : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.items ? item.items.merk : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.location}</TableCell>
                                                <TableCell>{item.amount_recent}</TableCell>
                                                <TableCell>{dayjs(item.loan_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>
                                                {/* <TableCell>{dayjs(item.return_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell> */}
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end items-center">
                                    <Link href="/pages/users/peminjaman">Lihat Selengkapnya<FaArrowRightLong className="ml-2 mt-1" color="#4994f5" /></Link>  
                                </div> 
                            </div>
                            <div>
                                <p className="text-2xl font-black mb-2">
                                    Pengambilan Belum Selesai
                                </p>
                                <div className="p-2 rounded-lg bg-[#ffffff] w-full">
                                <Table className="h-32" aria-label="Table Taken">
                                        <TableHeader columns = {columnsTaken}>
                                            {(column => <TableColumn key={column.key}>{column.label}</TableColumn>)}
                                        </TableHeader>
                                        <TableBody emptyContent={"No items found"}>
                                            {dataTaken.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.items ? item.items.name : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.items ? item.items.specification : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.items ? item.items.merk : "Barang Tidak Ada"}</TableCell>
                                                <TableCell>{item.location}</TableCell>
                                                <TableCell>{item.amount_recent}</TableCell>
                                                <TableCell>{dayjs(item.taken_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>
                                                {/* <TableCell>{dayjs(item.taken_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell> */}
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end items-center">
                                    <Link href="/pages/users/pengambilan">Lihat Selengkapnya<FaArrowRightLong className="ml-2 mt-1" color="#4994f5" /></Link>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}