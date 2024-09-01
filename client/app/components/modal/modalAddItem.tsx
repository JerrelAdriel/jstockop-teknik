import React,{useState, FormEvent} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyModal = ({ isOpen, onClose }:any) => {

    const [loading,setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [specification, setSpecification] = useState<string>('')
    const [merk, setMerk] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [amount, setAmount] = useState(0)

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post("http://localhost:8000/createitem",{
                name,
                specification,
                merk,
                unit,
                init_amount:amount          
            },{headers:{
                "Authorization" : `Bearer ${token}`
            }});
            const {data_created} = response.data
            onClose()
            toast.success(`Item ${data_created[0].name} ${data_created[0].merk} ${data_created[0].specification} Berhasil Ditambahkan!`);
        } catch (error) {
            toast.error("Error Ketika Menambahkan Data");
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
              <ModalHeader className="flex flex-col gap-5">Tambah Data</ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                    <Input
                    autoFocus
                    label="Nama Barang"
                    //   placeholder="Nama Barang"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setName(e.target.value)}
                    required isRequired
                    />
                    <Input
                    label="Spesifikasi"
                    //   placeholder="Spesifikasi"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setSpecification(e.target.value)}
                    required isRequired
                    />
                    <Input
                    label="Merk"
                    //   placeholder="Merk"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setMerk(e.target.value)}
                    required isRequired
                    />
                    <Input
                    label="Satuan"
                    //   placeholder="Jenis"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setUnit(e.target.value)}
                    required isRequired
                    />
                    <Input
                    label="Jumlah Awal"
                    //   placeholder="Jumlah Awal"
                    type="number"
                    variant="bordered"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required isRequired
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Tutup
                    </Button>
                    <Button type="submit" disabled={loading}>
                            {loading ? 'Menambah data...' : 'Tambah Data'}
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