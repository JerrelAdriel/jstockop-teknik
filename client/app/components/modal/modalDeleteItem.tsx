'use client'
import React,{useState, FormEvent} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyModal = ({ isOpen, onClose, id, nameItem, spesificationItem }:any) => {

    const [loading,setLoading] = useState<boolean>(false)

    const handleSubmit = async() => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(`https://jstockop-teknik-server.vercel.app/deleteitem/${id}`,{
                headers:{
                "Authorization" : `Bearer ${token}`
            }
        });
        
            const {data_deleted} = response.data
            onClose()
            toast.success(`Item ${data_deleted[0].name} ${data_deleted[0].specification} Berhasil Dihapus!`);
            
        } catch (error) {
            toast.error("There was an error submitting your information.");
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
              <ModalHeader className="flex flex-col gap-5">Hapus Data</ModalHeader>
                <ModalBody>
                    Apakah anda ingin menghapus item {nameItem} {spesificationItem} ?   
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Tutup
                    </Button>
                    <Button disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Menghapus data...' : 'Hapus Data'}
                    </Button>
                </ModalFooter>
            </>
        </ModalContent>
        }
      </Modal>
    );
};

export default MyModal;