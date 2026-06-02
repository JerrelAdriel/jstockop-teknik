'use client'
import React,{useState, useCallback, useEffect, useMemo} from "react"
import Image from "next/image";
import Sidebar from "../../../components/sidebar/SidebarPeminjaman";
import Navbar from "../../../components/navbar/NavbarPeminjaman";
import Pelindo from "../../../assets/image/logo SPMT.png"
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
 } from "@nextui-org/react";
 import { MdHistory } from "react-icons/md";
 import { FaCircle } from "react-icons/fa6";
 import ModalApprove from "../../../components/modal/modalApproveLoan"
import dayjs from "dayjs";
import 'dayjs/locale/id';
import { DUMMY_LOANS, DUMMY_TAKEN, isDummyToken } from "../../../dummyData";
dayjs.locale('id')

interface DataLoan {
    id: number;
    users: any;
    items: any;
    amount: number;
    amount_recent: number;
    unit: number;
    location: string;
    return_amount: number;
    status_user: boolean;
    loan_time: Date;
    return_time: Date;
    created_at: Date;
}
const columns = [
    {
      key: "username",
      label: "Peminjam",
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
      label: "Jumlah Total",
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
      key: "loan_time",
      label: "Waktu Peminjaman",
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

export default function Peminjaman(){
    const [filterValue, setFilterValue] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [dataLoan, setDataLoan] = useState<DataLoan[]>([])
    const [countDataLoan, setCountDataLoan] = useState<number>(0)
    const [countDataTaken, setCountDataTaken] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [modalApproveOpen, setModalApproveOpen] = useState<boolean>(false)
    const [modalItem, setModalItem] = useState<[]>([])
    const [id, setId] = useState<number>(0)
    const [username, setUsername] = useState<string>("")
    const [itemName, setItemName] = useState<string>("")
    const [specification, setSpecification] = useState<string>("")
    const [amount, setAmount] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [returnAmount, setReturnAmount] = useState<number>(0)
    const [loanTime, setLoanTime] = useState<Date>()
    const [returnTime, setReturnTime] = useState<Date>()

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleDataLoan = async() =>{
      setLoading(true)
      const token = localStorage.getItem('token')
      // Demo mode: pakai dummy data
      if (isDummyToken(token)) {
        setDataLoan(DUMMY_LOANS as any);
        setCountDataLoan(DUMMY_LOANS.length);
        setLoading(false);
        return;
      }
        try {
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getallloan",{
                headers:{ "Authorization" : `Bearer ${token}` }
            });
            const {data_loans} = response.data
            if (response.status === 204) { setDataLoan([]) }
            else{ setDataLoan(data_loans); setCountDataLoan(data_loans.length) }
        } catch (error:any) {
            // Fallback ke dummy kalau API tidak tersedia
            setDataLoan(DUMMY_LOANS as any);
            setCountDataLoan(DUMMY_LOANS.length);
        }
        finally{ setLoading(false) }
    }
    const handleDataTaken = async() =>{
      setLoading(true)
      const token = localStorage.getItem('token')
      if (isDummyToken(token)) {
        setCountDataTaken(DUMMY_TAKEN.length);
        setLoading(false);
        return;
      }
        try {
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getalltaken",{
                headers:{ "Authorization" : `Bearer ${token}` }
            });
            const {data_takens} = response.data
            if (response.status === 204) { setCountDataTaken(0) }
            else{ setCountDataTaken(data_takens.length) }
        } catch (error:any) {
            setCountDataTaken(DUMMY_TAKEN.length);
        }
        finally{ setLoading(false) }
    }

    const openModalApprove = (item:any) => {
      setId(item.id)
      setUsername(item.users.username)
      setItemName(item.items.name)
      setSpecification(item.items.specification)
      setAmount(item.amount)
      setUnit(item.unit)
      setLocation(item.location)
      setReturnAmount(item.return_amount)
      setLoanTime(item.loan_time)
      setReturnTime(item.return_time)
      setModalApproveOpen(true);
    };

    const closeModalApprove = () => {  
        setModalApproveOpen(false);
        setPage(1)
    };

    const pages = Math.ceil(dataLoan.length / rowsPerPage);
    
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage; 
      const end = start + rowsPerPage;
      return dataLoan.slice(start, end);
    }, [page, dataLoan, rowsPerPage]);
    
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
          dataLoan.length,]);

          useEffect(() => { 
            handleDataLoan()
            handleDataTaken()
          }, [modalApproveOpen]);

    return(
        <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
            {/* Sidebar */}
            <div className="flex flex-col items-center justify-between bg-gradient-to-b from-slate-50 to-slate-100 p-4 h-screen w-64 border-r border-slate-200 shadow-sm">
                <div className="w-full">
                    <div className="flex justify-center mb-6">
                        <Image className="w-40" src={Pelindo} alt="Logo SPMT" />
                    </div>
                    <Sidebar amountDataLoan={countDataLoan} amountDataTaken={countDataTaken} />
                </div>
                <Button onClick={handleRefresh} className="w-full" variant="flat" color="primary">REFRESH</Button>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                {/* Top Navbar */}
                <div className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
                    <Navbar />
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-auto p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="text-3xl font-black text-slate-800">Peminjaman</p>
                            <p className="text-sm text-slate-500 mt-1">Kelola permintaan peminjaman alat & barang teknik</p>
                        </div>
                        <Button as={Link} href="/pages/admin/history-peminjaman" variant="ghost" color="primary" size="md">
                            <MdHistory size={18}/>History Peminjaman
                        </Button>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Peminjaman</p>
                            <p className="text-2xl font-black text-blue-600">{countDataLoan}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Sedang Berlangsung</p>
                            <p className="text-2xl font-black text-amber-600">{dataLoan.filter(d => d.status_user === false).length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Selesai</p>
                            <p className="text-2xl font-black text-emerald-600">{dataLoan.filter(d => d.amount === d.return_amount && d.return_amount > 0).length}</p>
                        </div>
                    </div>

                    <ModalApprove isOpen={modalApproveOpen} onClose={closeModalApprove} id={id} username={username} itemname={itemName} specification={specification} amount={amount} unit={unit} location={location} returnAmount={returnAmount} loanTime={loanTime} returnTime={returnTime} />

                    {/* Table card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                      {pages != 0 ?
                        <Table
                            aria-label="Tabel peminjaman"
                            isHeaderSticky
                            bottomContent={bottomContent}
                            bottomContentPlacement="outside"
                            classNames={{ wrapper: "max-h-[450px] shadow-none" }}
                            topContentPlacement="outside"
                        >
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.key} align="center">
                                        {column.label}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody emptyContent={"No items found"} items={items}>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell><span className="font-medium">{item.users.username}</span></TableCell>
                                        <TableCell>{item.items.name}</TableCell>
                                        <TableCell><span className="text-slate-500 text-xs">{item.items.specification}</span></TableCell>
                                        <TableCell>{item.amount} {item.unit}</TableCell>
                                        <TableCell>{item.amount_recent} {item.unit}</TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell>{item.return_amount} {item.unit}</TableCell>
                                        <TableCell>{dayjs(item.loan_time).format('DD MMM YYYY, HH:mm')}</TableCell>
                                        <TableCell>{item.return_time ? dayjs(item.return_time).format('DD MMM YYYY, HH:mm') : "-"}</TableCell>
                                        <TableCell><FaCircle color={item.status_user === false ? "#dc2626" : "#16a34a"} size={12}/></TableCell>
                                        {item.amount == item.return_amount && item.return_amount > 0 ?
                                            <TableCell><Button size="sm" color="primary" onClick={() => openModalApprove(item)}>Approve</Button></TableCell> :
                                            <TableCell><Button size="sm" color="primary" isDisabled>Approve</Button></TableCell>}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        : <div className="w-full h-64 grid place-items-center text-xl font-bold text-slate-500">Tidak Ada Peminjaman</div>
                      }
                    </div>
                </div>
            </div>
        </>
    )
}