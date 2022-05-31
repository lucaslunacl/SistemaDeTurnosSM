import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Inicio from './Inicio';

import TimePicker from 'react-time-picker';

import { collection, deleteDoc, getDocs, doc, getDoc } from "firebase/firestore";
import Table from 'react-bootstrap/Table'
import { store } from '../firebaseconfig'
import { async } from '@firebase/util';
import { AiOutlineClose, AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
function Turnos() {
    const estilo = {
        width: '90%',
        margin: '0 auto',

    };
    const [user, setuser] = useState([]);
    const [editar, seteditar] = useState(false);
    const [buscar, setBuscar] = useState('');
    useEffect(() => {
        const getAgenda = async () => {

            const { docs } = await getDocs(collection(store, 'agenda'));
            const nArray = docs.map(item => ({ id: item.id, ...item.data() }));
            setuser(nArray);
            console.log(nArray)
        }
        getAgenda();
    }, [])

    const borrarTurno = async (id) => {
        try {
            await deleteDoc(doc(store, 'agenda', id));
            const { docs } = await getDocs(collection(store, 'agenda')); // se vuelve a colocar lo del'GET AGENDA' para recargar la lista
            const nArray = docs.map(item => ({ id: item.id, ...item.data() }));
            setuser(nArray);
        } catch (error) {
            console.log(error);
        }
    }
    const actualizar = async (id) => {
        seteditar(true);

        const docRef = doc(store, "agenda", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }


    useEffect(() => {
        const cerrar = () =>{
            if (user.length === 0) {
                seteditar(false)
    
            } else {
                
    
            }
        }
        cerrar();
        
    })
    const cerrarModal = () =>{
        seteditar(false);
    }


    return (
        <div>
            <Inicio />
            <div style={estilo}>


                <div className='table-responsive' >
                    <Table striped bordered hover size="sm" className='mx-auto' >
                        <thead>
                            <tr>

                                <th scope='col' className='text-center'>Cliente</th>
                                <th scope='col' className='text-center'>Telefono</th>
                                <th scope='col' className='text-center'>Servicio</th>
                                <th scope='col' className='text-center'>Fecha</th>
                                <th scope='col' className='text-center'>Horario</th>
                                <th scope='col' className='text-center' colSpan={2}> Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.length !== 0 ? (

                                    user.map(item => (



                                        <tr key={item.id}>

                                            <td className='text-center'>{item.nCliente.nombre}</td>
                                            <td className='text-center'>{item.nCliente.tel}</td>
                                            <td className='text-center'>{item.nCliente.promocion}</td>

                                            <td className='text-center'>{item.nCliente.fecha}</td>
                                            <td className='text-center'>{item.nCliente.turno}</td>

                                            <td className='text-center'><Button onClick={(id) => { actualizar(item.id) }} className='btn btn-warning btn-sm'><AiFillEdit />EDITAR</Button></td>
                                            <td className='text-center' onClick={(id) => { borrarTurno(item.id) }}><Button className='btn btn-danger btn-sm'><AiOutlineClose />BORRAR</Button></td>



                                        </tr>



                                    ))




                                )

                                    :
                                    <tr>
                                        <td colSpan={7} className="text-center"> NO HAY TURNOS AGENDADOS</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>
                {editar ?
                    <Modal.Dialog >
                        <Modal.Header >
                            <Modal.Title>Editar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form >
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre del Cliente</Form.Label>
                                    <Form.Control type="text" placeholder="Por Ej: Sonia" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Número de Telefono</Form.Label>
                                    <Form.Control type="text" placeholder="Por Ej: 3816548834" />
                                </Form.Group>
                                <div className='row'>
                                    <div className='col'>
                                        <Form.Select aria-label="Default select example" >
                                            <option>--- Servicio ---</option>
                                            <option value="Limpieza de Cutis">Limpieza de Cutis</option>
                                            <option value="Depilación">Depilación</option>
                                            <option value="Ondulación y Tinte">Ondulación y Tinte</option>
                                            <option value="Promo 1">Promo 1</option>
                                            <option value="Promo 2">Promo 2</option>
                                            <option value="Promo 3">Promo 3</option>
                                            <option value="Ninguna">Ninguna</option>
                                        </Form.Select>
                                    </div>



                                </div>
                                <br></br>
                                <Form.Group controlId="duedate">
                                    <Form.Control type="date" name="duedate" placeholder="Fecha" />
                                </Form.Group>


                                <br></br>
                                <TimePicker className='mb-2' />
                                <br></br>
                                <div>

                                </div>
                                <Modal.Footer>
                                    <Button type="submit" >Actualizar Turno</Button>
                                    <Button className='btn btn-danger' onClick={cerrarModal} >Cancelar</Button>

                                </Modal.Footer>
                            </Form>
                        </Modal.Body>

                    </Modal.Dialog>
                    :
                    <span></span>
                }
            </div>
        </div >
    )
}

export default Turnos
