'use client'
import React,{useState, useCallback, useEffect, useMemo} from "react"
import Image from "next/image";
import Sidebar from "../../../components/sidebar/SidebarHistoryPengambilan";
import Navbar from "../../../components/navbar/NavbarHistoryPengambilan";
import Pelindo from "../../../assets/image/logo SPMT.png"
import axios from "axios";
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
 } from "@nextui-org/react";
 import { IoMdArrowBack } from "react-icons/io";
 import { RiFileExcel2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import * as XLSX from 'xlsx';

// If Using dayjs (Format Timestamp)
import dayjs from "dayjs";
import 'dayjs/locale/id';
dayjs.locale('id')

interface DataTaken {
    id: number;
    user_name: string;
    item_name: string;
    merk:string,
    specification: string;
    total_taken: number;
    unit: number;
    location: string;
    return_amount: number;
    // taken_time: Date;
    taken_time: string
    // return_time: Date;
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
      key: "merk",
      label: "Merk",
    },
    {
      key: "specification",
      label: "Spesifikasi",
    },
    {
      key: "total_taken",
      label: "Total pengambilan",
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
      key: "taken_time",
      label: "Waktu Pengambilan",
    },
  ];

export default function Pengambilan(){
    const [filterValue, setFilterValue] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [dataTaken, setDataTaken] = useState<DataTaken[]>([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleRefresh = () => {
        window.location.reload();
    };

    // const handleDataTaken = async() =>{
    //   setLoading(true)
    //     try {
    //         const token = localStorage.getItem('token')
    //         const response = await axios.get("http://localhost:8000/getallfinishedtaken",{
    //             headers:{
    //                 "Authorization" : `Bearer ${token}`
    //             }
    //         });
    //         const {data_takens} = response.data            
    //         if (response.status === 204) {
    //           setDataTaken([])
    //         }
    //         else{
    //           setDataTaken(data_takens)
    //         }
    //     } catch (error:any) {
    //         console.log("error");
    //     }
    //     finally{
    //       setLoading(false)
    //     }
    // }

    const handleDataTakenByDate = async() =>{
      setLoading(true)
        try {
            const token = localStorage.getItem('token')
            
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getallfinishedtakenbydate",
              {headers:{"Authorization" : `Bearer ${token}`}, 
              params:{
                start_date: startDate,
                end_date: endDate
              }
              });
              
            const {data_takens} = response.data            
            if (response.status === 204) {
              setDataTaken([])
            }
            else{
              setDataTaken(data_takens)
            }
        } catch (error:any) {
            console.log(error);
        }
        finally{
          setLoading(false)
        }
    }

    const goBack = () => {
      router.back();
    };

    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(dataTaken);
      ws['A1'].v = 'Nama Pengambil';
      ws['B1'].v = 'Nama Barang';
      ws['C1'].v = 'Merk';
      ws['D1'].v = 'Spesifikasi';
      ws['E1'].v = 'Total Pengambilan';
      ws['F1'].v = 'Satuan';
      ws['G1'].v = 'Keterangan';
      ws['H1'].v = 'Waktu Pengambilan';
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
      
      const uri = 'data:application/octet-stream;base64,' + wbout;
      const link = document.createElement('a');
      link.href = uri;
      link.download = 'Form Pengambilan.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
            // handleDataTaken()
            handleDataTakenByDate()
          }, []);

    return(
        <>
            <div className=" flex flex-col items-center justify-between bg-[#EFEFEF] p-3 h-full">
                <div>
                <Image className="w-56" src={Pelindo} alt="Gambar Pelindo"></Image>
                <Sidebar />
                </div>
                <Button onClick={handleRefresh} className="w-28 items-center" variant="light" color="primary">REFRESH</Button>
            </div>  
            <div className="relative bg-primary-400 p-2 w-full h-screen">
                <div className="flex items-center justify-between rounded-lg bg-[#EFEFEF] w-full h-24 p-5">
                    <Navbar />
                </div>
                <div className="overflow-hidden rounded-lg bg-[#F2F2F2] px-20 py-2 mt-2 w-full h-[38rem]">
                    <p className="text-4xl font-black mb-6">
                        History Pengambilan
                    </p>
                    <div className="flex justify-between items-center">
                      <Button onClick={goBack} className="mb-2 p-3" ><IoMdArrowBack size={15} />Back</Button>
                      <div className="flex items-center">
                      <Input
                          className="ml-2"
                          type="date"
                          label="Dari Tanggal"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          placeholder="Start Date"
                        />
                        <Input
                          className="ml-2"
                          type="date"
                          label="Sampai Tanggal"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          placeholder="End Date"
                        />
                         <Button className="ml-2"  color="primary" onClick={handleDataTakenByDate}>Cari </Button>
                      </div>
                    <div className="flex items-center">
                        <Button className="ml-2 p-2" onClick={exportToExcel} ><RiFileExcel2Line size={20} />Excel </Button>
                    </div>
                    </div>
                    <div className="rounded-lg bg-[#EAEAEA] mb-3 py-2 px-5 w-full h-[29rem]">
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
                                <TableCell>{item.user_name}</TableCell>
                                <TableCell>{item.item_name}</TableCell>
                                <TableCell>{item.merk}</TableCell>
                                <TableCell>{item.specification}</TableCell>
                                <TableCell>{item.total_taken} {item.unit}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.taken_time}</TableCell>
                                {/* <TableCell>{dayjs(item.taken_time).format('DD MMMM YYYY, HH:mm WIB')}</TableCell>            */}
                            </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      : <div className="w-full h-full grid place-items-center text-xl font-bold">Tidak Ada Riwayat Pengambilan
                        </div>
                      }
                    
                    </div>
                </div>
            </div>
        </>
    )
}