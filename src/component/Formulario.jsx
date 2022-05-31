import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseconfig';
import {useHistory} from 'react-router-dom';

function Formulario() {
  const historial = useHistory();
  const estilo = {
    width: '50%',
    margin: '0 auto',
    marginTop: '50px',
  };
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const logIn = (e) => {
    e.preventDefault();
      signInWithEmailAndPassword(auth, user, pass).then((r) =>{historial.push('/inicio')}).catch((error) =>{console.log(error.code)})
      
  
  };
  return (

    <div style={estilo} className="cont">
      <Form onSubmit={logIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="email" placeholder="User" onChange={(e) => { setuser(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" onChange={(e) => { setpass(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Recordarme" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
        
      </Form>
    </div>
  );
}
export default Formulario