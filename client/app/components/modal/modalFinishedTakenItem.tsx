'use client'
import React,{useState, FormEvent} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyModal = ({ isOpen, onClose, id, amountrecent, nameitem, specificationitem, merkitem, unititem }:any) => {

    const [loading,setLoading] = useState<boolean>(false)
    
    const handleSubmit = async() => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`http://localhost:8000/updatefinishedtaken/${id}`,{
                status_user : true
            },
                {
                headers:{
                "Authorization" : `Bearer ${token}`
            }
        });
            console.log(response);
            
            const {data_finishedtaken_created} = response.data
            onClose()
            toast.success(`Pengambilan ${data_finishedtaken_created[0].amount_recent} ${data_finishedtaken_created[0].unit} Item ${nameitem} ${specificationitem} ${merkitem} Menunggu Approve!`);
            
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
              <ModalHeader className="flex flex-col gap-5">Selesaikan Pengambilan</ModalHeader>
                <ModalBody>
                    Apakah anda ingin menyelesaikan pengambilan {amountrecent} {unititem} {nameitem} {merkitem} {specificationitem} ?   
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Tidak
                    </Button>
                    <Button disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Memproses data...' : 'Ya'}
                    </Button>
                </ModalFooter>
            </>
        </ModalContent>
        }
      </Modal>
    );
};

export default MyModal;