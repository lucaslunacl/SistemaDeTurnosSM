import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebaseconfig';
function Registrar() {
    const estilo = {
        width: '50%',
        margin: '0 auto',
        marginTop: '50px',
    };

    const[user,setuser] = useState('');
    const[pass,setpass] = useState('');

    const reg =(e) =>{
        e.preventDefault();
        try {
            createUserWithEmailAndPassword(auth,user,pass);
            alert('Registrado con éxito');
            setpass('');
            setuser('')
        } catch (error) {
            alert('Error')
        }
    }
    return (
        <div style={estilo} className="cont">
            <Form onSubmit={reg}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="email" placeholder="User" onChange={(e) => {setuser(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e) => {setpass(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordarme" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Registrar
                </Button>
            </Form>
        </div>
    )
}

export default Registrar