'use client'
import React,{useState, FormEvent} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyModal = ({ isOpen, onClose, id, username,itemname,merk,specification,totaltaken,unit,location,takenTime }:any) => {
    const [loading,setLoading] = useState<boolean>(false)
    
    const handleSubmit = async() => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post("http://localhost:8000/createfinishedtaken",{
              id,
              username,
              itemname,
              merk,
              specification,
              totaltaken,
              unit,
              location,
              takenTime,      
          },{headers:{
              "Authorization" : `Bearer ${token}`
          }});
        
            const {data_finishedtaken_created} = response.data           
            onClose()
            toast.success(`Item ${data_finishedtaken_created[0].item_name} ${data_finishedtaken_created[0].specification} Berhasil Di Approve Dan Ditambahkan Ke History!`);
            
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
              <ModalHeader className="flex flex-col gap-5">Approve Pengambilan {username}</ModalHeader>
                <ModalBody>
                    Apakah anda ingin melakukan approve pengambilan item {itemname} {specification} atas nama {username} ?   
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Tutup
                    </Button>
                    <Button disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Mengapprove data...' : 'Approve Data'}
                    </Button>
                </ModalFooter>
            </>
        </ModalContent>
        }
      </Modal>
    );
};

export default MyModal;