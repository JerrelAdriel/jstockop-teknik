'use client'
import React,{useState, useCallback, useEffect, useMemo} from "react"
import Image from "next/image";
import Sidebar from "../../../components/sidebar/SidebarPengambilan";
import Navbar from "../../../components/navbar/NavbarPengambilan";
import Pelindo from "../../../assets/image/logo SPMT.png"
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
 } from "@nextui-org/react";
 import { MdHistory } from "react-icons/md";
 import { FaCircle } from "react-icons/fa6";
 import ModalApprove from "../../../components/modal/modalApproveTaken"
import dayjs from "dayjs";
import 'dayjs/locale/id';
dayjs.locale('id')

interface DataTaken {
    id: number;
    users: any;
    items: any;
    amount: number;
    amount_recent: number;
    unit: number;
    location: string;
    return_amount: number;
    status_user: boolean;
    taken_time: Date;
    return_time: Date;
    created_at: Date;
}
const columns = [
    {
      key: "username",
      label: "Pengambil",
    },
    {
      key: "itemname",
      label: "Barang",
    },
    {
      key: "specification",
      label: "Spesifikasi",
    },
    {
      key: "amount",
      label: "Jumlah Awal",
    },
    {
      key: "amount_recent",
      label: "Jumlah Sekarang",
    },
    // {
    //   key: "unit",
    //   label: "Satuan",
    // },
    {
      key: "description",
      label: "Keterangan",
    },
    {
      key: "return_amount",
      label: "Jumlah Pengembalian",
    },
    {
      key: "taken_time",
      label: "Waktu Pengambilan",
    },
    {
      key: "return_time",
      label: "Waktu Pengembalian",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "Aksi"
    }
  ];

export default function Pengambilan(){
    const [filterValue, setFilterValue] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [dataTaken, setDataTaken] = useState<DataTaken[]>([])
    const [countDataLoan, setCountDataLoan] = useState<number>(0)
    const [countDataTaken, setCountDataTaken] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [modalApproveOpen, setModalApproveOpen] = useState<boolean>(false)
    const [modalItem, setModalItem] = useState<[]>([])
    const [id, setId] = useState<number>(0)
    const [username, setUsername] = useState<string>("")
    const [itemName, setItemName] = useState<string>("")
    const [merk, setMerk] = useState<string>("")
    const [specification, setSpecification] = useState<string>("")
    const [totalTaken, setTotalTaken] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [returnAmount, setReturnAmount] = useState<number>(0)
    const [takenTime, setTakenTime] = useState<Date>()
    const [returnTime, setReturnTime] = useState<Date>()

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleDataTaken = async() =>{
      setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getalltaken",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_takens} = response.data            
            if (response.status === 204) {
              setDataTaken([])
            }
            else{
              setDataTaken(data_takens)
              setCountDataTaken(data_takens.length)
            }
        } catch (error:any) {
            console.log("error");
        }
        finally{
          setLoading(false)
        }
    }

    const handleDataLoan = async() =>{
      setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getallloan",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_loans} = response.data            
            if (response.status === 204) {
              setCountDataLoan(0)
            }
            else{
              setCountDataLoan(data_loans.length)
            }
        } catch (error:any) {
            console.log("error");
        }
        finally{
          setLoading(false)
        }
    }

    const openModalApprove = (item:any) => {
      setId(item.id)
      setUsername(item.users.username)
      setItemName(item.items.name)
      setMerk(item.items.merk)
      setSpecification(item.items.specification)
      setTotalTaken(item.amount_recent)
      setUnit(item.unit)
      setLocation(item.location)
      setTakenTime(item.taken_time)
      setModalApproveOpen(true);
    };

    const closeModalApprove = () => {  
        setModalApproveOpen(false);
        setPage(1)
    };

    const pages = Math.ceil(dataTaken.length / rowsPerPage);
    
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage; 
      const end = start + rowsPerPage;
      return dataTaken.slice(start, end);
    }, [page, dataTaken, rowsPerPage]);
    
    const onNextPage = useCallback(() => {
      if (page < pages) {
        setPage(page + 1);
      }
    }, [page, pages]);
  
    const onPreviousPage = useCallback(() => {
      if (page > 1) {
        setPage(page - 1);
      }
    }, [page]);

    const bottomContent = useMemo(() =>{
        return(
          <div className="py-2 px-2 flex justify-between items-center">
            
            <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
             />   

            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Previous
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" color="primary" onPress={onNextPage}>
                Next
              </Button>
            </div>
          </div>
        )},[ filterValue,
          page,
          pages,
          dataTaken.length,]);

          useEffect(() => { 
            handleDataTaken()
            handleDataLoan()
          }, [modalApproveOpen]);

    return(
        <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />   
            <div className=" flex flex-col items-center justify-between bg-[#EFEFEF] p-3 h-full">
                <div>
                <Image className="w-56" src={Pelindo} alt="Gambar Pelindo"></Image>
                <Sidebar amountDataLoan={countDataLoan} amountDataTaken={countDataTaken} />
                </div>
                <Button onClick={handleRefresh} className="w-28 items-center" variant="light" color="primary">REFRESH</Button>
            </div>   
            <div className="relative bg-primary-400 p-2 w-full h-screen">
                <div className="flex items-center justify-between rounded-lg bg-[#EFEFEF] w-full h-24 p-5">
                    <Navbar />
                </div>
                <div className="overflow-hidden rounded-lg bg-[#F2F2F2] px-20 py-2 mt-2 w-full h-[38rem]">
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-black mb-6">
                        Pengambilan
                    </p>
                    <Button as={Link} href="/pages/admin/history-pengambilan" variant="ghost" size="md"><MdHistory size={20}/>History Pengambilan</Button>
                  </div>
                    <ModalApprove isOpen={modalApproveOpen} onClose={closeModalApprove} id={id} username={username} itemname={itemName} merk={merk} specification={specification} totaltaken={totalTaken} unit={unit} location={location} takenTime={takenTime} />
                    <div className="rounded-lg bg-[#EAEAEA] mb-3 py-2 px-5 w-full h-[32rem]">
                      {pages != 0 ?
                        <Table
                        aria-label="Example table with custom cells, pagination and sorting"
                        isHeaderSticky
                        bottomContent={bottomContent}
                        bottomContentPlacement="outside"
                        // className="w-[65rem]"
                        classNames={{
                            wrapper: "max-h-[382px]",
                        }}
                        topContentPlacement="outside"
                        >
                        <TableHeader columns={columns}>
                            {(column) => (
                            <TableColumn
                                key={column.key}
                                align={"center"}
                                // allowsSorting={column.sortable}
                            >
                                {column.label}
                            </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody emptyContent={"No items found"} items={items}>
                            {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.users.username}</TableCell>
                                <TableCell>{item.items.name}</TableCell>
                                <TableCell>{item.items.specification}</TableCell>
                                <TableCell>{item.amount} {item.unit}</TableCell>
                                <TableCell>{item.amount_recent} {item.unit}</TableCell>
                                {/* <TableCell>{item.unit}</TableCell> */}
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.return_amount} {item.unit}</TableCell>
                                <TableCell>{dayjs(item.taken_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>
                                <TableCell>{item.return_time ? dayjs(item.return_time).format('DD MMMM YYYY, HH:mm WIB') : "-"}</TableCell>
                                {item.status_user === false ? <TableCell><FaCircle color="red"/></TableCell>: <TableCell><FaCircle color="green"/></TableCell>}
                                {item.status_user === true ? <TableCell><Button className="p-1" size="sm" color="primary" onClick={() =>openModalApprove(item)}>Approve</Button></TableCell> : 
                                <TableCell><Button className="p-1" size="sm" color="primary" isDisabled >Approve</Button></TableCell>}                    
                            </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      : <div className="w-full h-full grid place-items-center text-xl font-bold">Tidak Ada Pengambilan
                        </div>
                      }
                    
                    </div>
                </div>
            </div>
        </>
    )
}