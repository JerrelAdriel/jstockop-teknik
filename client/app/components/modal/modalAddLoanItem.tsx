import React,{useState, FormEvent} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyModal = ({ isOpen, onClose, id, itemId }:any) => {

    const [loading,setLoading] = useState<boolean>(false)
    const [amount, setAmount] = useState(0)
    const [location, setLocation] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`https://jstockop-teknik-server.vercel.app/updateaddloan/${id}`,{
                item_id:itemId,
                amount          
            },{headers:{
                "Authorization" : `Bearer ${token}`
            }});
            const { data_item_updated, loan_updated} = response.data
            onClose()
            toast.success(`${loan_updated[0].loan_amount} ${data_item_updated[0].unit} Item ${data_item_updated[0].name} ${data_item_updated[0].merk} ${data_item_updated[0].specification} Berhasil Dipinjam!`);
        } catch (error) {
            toast.error("Error Ketika Melakukan Peminjaman");
        } finally{
            setLoading(false)
        }
    }

    return (
        <Modal 
        isOpen={isOpen} 
        placement="top-center"
        onClose={onClose}
      >
        {loading ? <Spinner />: 
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-5">Tambah Peminjaman</ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                    <Input
                    autoFocus
                    label="Jumlah Barang"
                    //   placeholder="Nama Barang"
                    type="number"
                    variant="bordered"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required isRequired
                    />
                    {/* <Input
                    label="Lokasi"
                    //   placeholder="Spesifikasi"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setLocation(e.target.value)}
                    required isRequired
                    /> */}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Tutup
                    </Button>
                    <Button type="submit" disabled={loading}>
                            {loading ? 'Menambah barang peminjaman...' : 'Pinjam barang'}
                    </Button>
                </ModalFooter>
              </form>
            </>
        </ModalContent>
        }
      </Modal>
    );
};

export default MyModal;