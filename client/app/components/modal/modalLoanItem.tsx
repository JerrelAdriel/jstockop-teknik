import React,{useState, FormEvent} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyModal = ({ isOpen, onClose, itemId, unit, name, specification, merk }:any) => {

    const [loading,setLoading] = useState<boolean>(false)
    const [amount, setAmount] = useState(0)
    const [location, setLocation] = useState<string>('')

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post("http://localhost:8000/createloan",{
                item_id:itemId,
                amount,
                unit,
                location          
            },{headers:{
                "Authorization" : `Bearer ${token}`
            }});
            const {data_item, data_loan_update_created} = response.data
            onClose()
            toast.success(`${data_loan_update_created[0].loan_amount} Item ${data_item[0].name} ${data_item[0].merk} ${data_item[0].specification} Berhasil Dipinjam!`);
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
              <ModalHeader className="flex flex-col gap-5">Pinjam Baru {name} {specification} {merk}</ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                    <Input
                    autoFocus
                    label="Jumlah Barang"
                    //   placeholder="Nama Barang"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required isRequired
                    />
                    <Input
                    label="Keterangan"
                    //   placeholder="Spesifikasi"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setLocation(e.target.value)}
                    required isRequired
                    />
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