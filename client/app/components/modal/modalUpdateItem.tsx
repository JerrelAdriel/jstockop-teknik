import React,{useState, FormEvent, useEffect} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@nextui-org/react';
import axios from 'axios';
import Loading from '../Loading'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MyModal = ({ isOpen, onClose, id, nameItem, specificationItem, merkItem, unitItem, initamountItem, totalrecentItem, loanItem, takenItem }:any) => {

    // console.log(nameItem);
    // console.log(specificationItem);
    // console.log(merkItem);
    // console.log(unitItem);
    // console.log(initamountItem);
    // console.log(totalrecentItem);
    // console.log(loanItem);
    // console.log(takenItem);
    
    const [loading,setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>(nameItem)
    const [specification, setSpecification] = useState<string>(specificationItem)
    const [merk, setMerk] = useState<string>(merkItem);
    const [unit, setUnit] = useState<string>(unitItem);
    const [amount, setAmount] = useState<number>(initamountItem);
    const [totalRecent, setTotalRecent] = useState<number>(totalrecentItem)
    const [numberOfTaken, setNumberOfTaken] = useState<number>(takenItem)
    const [numberOfLoan, setNumberOfLoan] = useState<number>(loanItem)
    
    const [nameTitle, setNameTitle] = useState<string>('')
    const [specificationTitle, setSpecificationTitle] = useState<string>('')

    // const getItem = async() => {
    //     // e.preventDefault()
    //     setLoading(true)
    //     try {
    //         const token = localStorage.getItem('token')
    //         const response = await axios.get(`http://localhost:8000/getitem/${id}`,{headers:{
    //             "Authorization" : `Bearer ${token}`
    //         }});
    //         const {data_items} = response.data
    //         setName(data_items[0].name)
    //         setSpecification(data_items[0].specification)
    //         setMerk(data_items[0].merk)
    //         setUnit(data_items[0].unit)
    //         setAmount(data_items[0].init_amount)
    //         setTotalRecent(data_items[0].total_recent)
    //         setNumberOfTaken(data_items[0].number_of_taken)
    //         setNumberOfLoan(data_items[0].number_of_loan)
    //         setNameTitle(data_items[0].name)
    //         setSpecificationTitle(data_items[0].specification)

    //         // setDataItems(data_items[0])
            
    //     } catch (error) {
    //         toast.error("Error ketika mengambil data");
    //     } finally{
    //         setLoading(false)
    //     }
    // }
    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        console.log(name);
            console.log(specification);
            console.log(merk);
            console.log(unit);
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            
            
            // const response = await axios.put(`http://localhost:8000/updateitem/${id}`,{
            //     name : name,
            //     specification: specification,
            //     merk: merk,
            //     unit: unit,
            //     init_amount: initamountItem,
            //     total_recent: totalrecentItem,
            //     number_of_taken: loanItem,
            //     number_of_loan: takenItem        
            // },{headers:{
            //     "Authorization" : `Bearer ${token}`
            // }});
            // const {data_updated} = response.data
            onClose()
            // toast.success(`Item ${data_updated[0].name} Berhasil Diupdate!`);
            // setTimeout(() => {
            //     onClose()
            //   }, 500);
        } catch (error) {
            toast.error("Error Ketika Melakukan Update");
        } finally{
            setLoading(false)
        }
    }
    // useEffect(() => {
    //     {console.log(name)}
    //    }
    //    , [name]);
    return (
        <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />  
        {loading ? <Loading />:
        <Modal 
        isOpen={isOpen} 
        placement="top-center"
        // onClose={onClose}    
        >
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-5">Edit Data {nameTitle} {specificationTitle}</ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                    <Input
                    autoFocus
                    label="Nama Barang"
                    //   placeholder="Nama Barang"
                    defaultValue={nameItem}
                    type="text"
                    variant="bordered"
                    onChange={(e) => setName(e.target.value)}
                    required isRequired
                    /> 
                    <Input
                    label="Spesifikasi"
                    //   placeholder="Spesifikasi"
                    defaultValue={specificationItem}
                    type="text"
                    variant="bordered"
                    onChange={(e) => setSpecification(e.target.value)}
                    required isRequired
                    />
                    <Input
                    label="Merk"
                    //   placeholder="Merk"
                    defaultValue={merkItem}
                    type="text"
                    variant="bordered"
                    onChange={(e) => setMerk(e.target.value)}
                    required isRequired
                    />
                    <Input
                    label="Jenis"
                    //   placeholder="Jenis"
                    defaultValue={unitItem}
                    type="text"
                    variant="bordered"
                    onChange={(e) => setUnit(e.target.value)}
                    required isRequired
                    />
                    {/* <Input
                    label="Jumlah Awal"
                    //   placeholder="Jumlah Awal"
                    value={amount.toString()}
                    type="number"
                    variant="bordered"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required isRequired
                    /> */}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Tutup
                    </Button>
                    <Button type="submit" disabled={loading}>
                            {loading ? 'Mengupdate data...' : 'Update Data'}
                    </Button>
                </ModalFooter>
              </form>
            </>
        </ModalContent>
      </Modal>
        }
      </>
    )
}

export default MyModal;