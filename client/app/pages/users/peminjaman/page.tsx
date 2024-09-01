'use client'
import React,{useState, useCallback, useEffect, useMemo} from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loading from '../../../components/Loading'
import Image from "next/image";
import Sidebar from "../../../components/sidebar/SidebarUserPeminjaman";
import Navbar from "../../../components/navbar/NavbarUserPeminjaman";
import Pelindo from "../../../assets/image/logo SPMT.png";
import axios from "axios";
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
 } from "@nextui-org/react";
import { MdOutlineSearch, MdOutlineShoppingCart, MdOutlineBackHand } from "react-icons/md";
import ModalAddLoan from "../../../components/modal/modalAddLoanItem"
import ModalReturnLoan from "../../../components/modal/modalReturnLoanItem"
import { useRouter } from "next/navigation";

// export const metadata = {
//     title: "Halaman Stok Barang",
//     description: "Halaman Semua List Stok barang"
// }
interface DataLoan{
    status: string;
    id: number;
    name: string;
    items: any;
    users: any;
    specification: string;
    merk: string;
    unit: string;
    location: string;
    status_user:boolean;
    amount: number;
    amount_recent: number;
    return_amount: number;
    number_of_taken: number;
    number_of_loan: number;
    created_at: Date;
    updated_at?: Date;
  }
  
  const columns = [
    {
      key: "name",
      label: "Nama Barang",
    },
    {
      key: "specification",
      label: "Spesifikasi",
    },
    {
      key: "merk",
      label: "Merk",
    },
    // {
    //   key: "unit",
    //   label: "Satuan",
    // },
    {
      key: "location",
      label: "Lokasi",
    },
    {
      key: "total_recent",
      label: "Jumlah Tersedia",
    },
    {
      key: "total_loan",
      label: "Jumlah Peminjaman",
    },
    {
      key: "return_amoun",
      label: "Jumlah Dikembalikan",
    },
    {
      key: "status",
      label: "Status"
    },
    {
      key: "action",
      label: "Aksi",
    },
  ];
  

export default function Peminjaman(){
    const [filterValue, setFilterValue] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [dataLoan, setDataLoan] = useState<DataLoan[]>([])
    const [countDataLoan, setCountDataLoan] = useState<number>(0)
    const [countDataTaken, setCountDataTaken] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const hasSearchFilter = Boolean(filterValue);
    const [modalLoanOpen, setModalLoanOpen] = useState<boolean>(false)
    // const [modalEditOpen, setModalEditOpen] = useState<boolean>(false)
    const [modalReturnLoanOpen, setModalReturnLoanOpen] = useState<boolean>(false)
    const [modalId, setModalId] = useState<number>(0)
    const [modalItemId, setModalItemId] = useState<number>(0)
    const [modalName, setModalName] = useState<string>("")
    // const [modalUnit, setModalUnit] = useState<string>("")
    const [modalSpecification, setModalSpecification] = useState<string>("")
    const router = useRouter()
    
    const handleRefresh = () => {
      window.location.reload();
  };

    
    const openModalAddLoan = (id:string,item_id:number) => {
        setModalId(parseInt(id))
        setModalItemId(item_id)
        setModalLoanOpen(true);
    };

    const closeModalLoan = () => {
        setModalLoanOpen(false);
    };

    const openModalReturnLoan = (id:string,item_id:number) => {
        setModalId(parseInt(id))
        setModalItemId(item_id)
        setModalReturnLoanOpen(true);
    };

    const closeModalReturnLoan = () => {
        setModalReturnLoanOpen(false);
    };


    // const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDataLoan = async() =>{
      setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/getloanbyuser",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_loans} = response.data            
            if (response.status === 204) {
              setCountDataLoan(0)
              setDataLoan([])
            }
            else{
              setCountDataLoan(data_loans.length)
              setDataLoan(data_loans)
            }
        } catch (error:any) {
            console.log("error");
        }
        finally{
          setLoading(false)
        }
    }
    const handleDataTaken = async() =>{
      setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get("https://jstockop-teknik-server.vercel.app/gettakenbyuser",{
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            });
            const {data_takens} = response.data            
            if (response.status === 204) {
              setCountDataTaken(0)
            }
            else{
              setCountDataTaken(data_takens.length)
            }
        } catch (error:any) {
            console.log("error");
        }
        finally{
          setLoading(false)
        }
    }
    // const handleDataItem = async() =>{
    //   setLoading(true)
    //     try {
    //         const token = localStorage.getItem('token')
    //         const response = await axios.get("http://localhost:8000/getallitem",{
    //             headers:{
    //                 "Authorization" : `Bearer ${token}`
    //             }
    //         });
    //         const {data_items} = response.data            
    //         if (response.status === 204) {
    //           setDataItem([])
    //         }
    //         else{
    //           setDataItem(data_items)
    //         }
    //     } catch (error:any) {
    //         console.log("error");
    //     }
    //     finally{
    //       setLoading(false)
    //     }
    // }
        
    const filteredItems = useMemo(() => {
      let filteredItems = [...dataLoan]
  
      if (hasSearchFilter) {
          filteredItems = filteredItems.filter((item) =>
          item.items.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }

      return filteredItems;
      
    }, [page, dataLoan, filterValue]);
    
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    
    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
    
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

    const onClear = useCallback(()=>{
        setFilterValue("")
        setPage(1)
      },[])

      const onSearchChange = useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);

      const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);

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
                <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                  Next
                </Button>
              </div>
            </div>
          )},[ filterValue,
            page,
            pages,
            onSearchChange,
            onRowsPerPageChange,
            dataLoan.length,
            hasSearchFilter]);        
      
      useEffect(() => { 
        // handleDataItem()
        handleDataLoan()
        handleDataTaken()
      }, [modalLoanOpen, modalReturnLoanOpen]);
    
    return(
        <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
        {/* {loading ? <Loading />: */}
        <>   
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
                    <p className="text-4xl font-black mb-2">
                        Peminjaman
                    </p>
                    <div className="flex justify-between gap-3 mb-3">
                    <Input
                        isClearable
                        className="w-3/12 sm:max-w-[44%] border-2 border-gray-400 rounded-xl"
                        placeholder="Cari peminjaman..."
                        startContent={<MdOutlineSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                        />
                        <ModalAddLoan isOpen={modalLoanOpen} onClose={closeModalLoan} id={modalId} itemId={modalItemId} />
                        <ModalReturnLoan isOpen={modalReturnLoanOpen} onClose={closeModalReturnLoan} id={modalId} itemId={modalItemId} />
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {dataLoan.length} item</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                        >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        </select>
                    </label>
                    </div>
                    {/* {dataItem ?   */}
                    <div className="rounded-lg bg-[#EAEAEA] mb-3 py-2 px-5 w-full h-[29rem]">
                      {pages != 0 ?
                        <Table
                        aria-label="Tabel Barang"
                        isHeaderSticky
                        bottomContent={bottomContent}
                        bottomContentPlacement="outside"
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
                                <TableCell>{item.items.name}</TableCell>
                                <TableCell>{item.items.specification}</TableCell>
                                <TableCell>{item.items.merk}</TableCell>
                                {/* <TableCell>{item.items.unit}</TableCell> */}
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.items.total_recent} {item.items.unit}</TableCell>
                                <TableCell>{item.amount} {item.items.unit}</TableCell>
                                <TableCell>{item.return_amount} {item.items.unit}</TableCell>
                                {item.status_user ? <TableCell>Menunggu Approve</TableCell> :<TableCell>Aktif</TableCell>}
                                {item.status_user ? <TableCell>
                                    <Button isDisabled disabled className="p-1" size="sm" color="primary" variant="bordered" startContent={<MdOutlineShoppingCart/>} onClick={() =>openModalAddLoan(item.id.toString(),item.items.id)}>Pinjam</Button>
                                    <Button isDisabled disabled className="p-1 ml-2" size="sm" color="secondary" variant="bordered" startContent={<MdOutlineBackHand/>} onClick={() =>openModalReturnLoan(item.id.toString(),item.items.id)}>Kembalikan</Button>
                                </TableCell>:
                                item.items.total_recent == 0 ?
                                <TableCell>
                                  <Button isDisabled disabled className="p-1" size="sm" color="primary" variant="bordered" startContent={<MdOutlineShoppingCart/>} onClick={() =>openModalAddLoan(item.id.toString(),item.items.id)}>Pinjam</Button>
                                  <Button className="p-1 ml-2" size="sm" color="secondary" variant="bordered" startContent={<MdOutlineBackHand/>} onClick={() =>openModalReturnLoan(item.id.toString(),item.items.id)}>Kembalikan</Button>
                                </TableCell>:
                                <TableCell>
                                  <Button className="p-1" size="sm" color="primary" variant="bordered" startContent={<MdOutlineShoppingCart/>} onClick={() =>openModalAddLoan(item.id.toString(),item.items.id)}>Pinjam</Button>
                                  <Button className="p-1 ml-2" size="sm" color="secondary" variant="bordered" startContent={<MdOutlineBackHand/>} onClick={() =>openModalReturnLoan(item.id.toString(),item.items.id)}>Kembalikan</Button>
                                </TableCell>}
                                
                            </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      : <div className="w-full h-full grid place-items-center text-xl font-bold">Tidak Ada Peminjaman
                        </div>
                      }
                    
                    </div>
                    {/* : <></>} */}
                </div>
            </div>
            </>
          {/* } */}
        </>
    )
}