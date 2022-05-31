import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import Inicio from './Inicio';
import TimePicker from 'react-time-picker';
import { async } from '@firebase/util';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import Alert from 'react-bootstrap/Alert'

function Agendar() {
    const estilo = {
        width: '50%',
        margin: '0 auto',
        marginTop: '50px',
    };
    const store = getFirestore();
    const [cliente, setCliente] = useState('');
    const [telefono, setTelefono] = useState('');
    const [promo, setPromo] = useState('');
    const [servicio, setServicio] = useState('');
    const [fecha, setFecha] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [turno, setTurno] = useState('10:00');
    const [error, setError] = useState(false);
    const nCliente = {
        nombre: cliente,
        tel: telefono,
        promocion: promo,
        servicio: servicio,
        fecha: fecha,
        turno: turno,
    };

    const agendar = async (e) => {
        e.preventDefault();
        if (cliente == '' || telefono == '' || promo == '' || fecha == '' || turno == '') {
            setError(true);
        } else {
            try {

                const data = await addDoc(collection(store, 'agenda'), { nCliente });
                console.log('Agregado', data.id);
                setAlerta(true);

            } catch (error) {
                console.log(error);
            }

            setCliente('');
            setTelefono('');
            setPromo('');
            setServicio('');
            setFecha('');
            setTurno('');
            setTimeout(() => {
                setAlerta(false);
            }, 3000);
        }

    };

    return (

        <div>
            <Inicio />
            <div style={estilo}>
                {
                    alerta ?
                        <Alert variant="primary">
                            <span>Turno Agregado</span>
                        </Alert>
                        :
                        <span></span>
                }
            </div>
            <div style={estilo}>
                <Form onSubmit={agendar}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre del Cliente</Form.Label>
                        <Form.Control value={cliente} type="text" placeholder="Por Ej: Sonia" onChange={(e) => { setCliente(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Número de Telefono</Form.Label>
                        <Form.Control value={telefono} type="text" placeholder="Por Ej: 3816548834" onChange={(e) => { setTelefono(e.target.value) }} />
                    </Form.Group>
                    <div className='row'>
                        <div className='col'>
                            <Form.Select value={promo} aria-label="Default select example" onChange={(e) => { setPromo(e.target.value) }}>
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
                        <Form.Control value={fecha} type="date" name="duedate" placeholder="Fecha" onChange={(e) => { setFecha(e.target.value) }} />
                    </Form.Group>


                    <br></br>
                    <TimePicker className='mb-2' onChange={setTurno} value={turno} />
                    <br></br>
                    <div>
                        {
                            error ?
                                <div><Alert variant="danger">
                                    <span>ERROR! Faltan completar campos</span>
                                </Alert></div>
                                :
                                <span></span>

                        }
                    </div>
                    <Button type="submit" >Agendar Turno</Button>

                </Form>
            </div>
        </div>



    );
}

export default Agendar