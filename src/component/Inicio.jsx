import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import logo from '../img/LOGO-SM.svg';
import logo2 from '../img/LOGO-SM.png';
import { Link } from 'react-router-dom';
function Inicio() {
    const estilos = {
        border: '1px solid black',
        borderRadius: '5px',
        color: 'white',
        boxShadow: '7px 8px 20px -2px rgba(22,240,57,0.36)',
        fontSize: '.7em',


    }
    const alertaa = {
        margin: '0 auto',
        width: '80%',
        marginTop: '5px',
    };
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/inicio">
                        
                        SM Depilación
                    </Navbar.Brand>
                    <Nav.Link style={estilos} className='mx-auto' href="/Turnos">Turnos</Nav.Link>
                    <Nav.Link style={estilos} className='mx-auto' href="/Agendar">Agendar Turno</Nav.Link>

                </Container>
            </Navbar>

            <Alert variant="success" style={alertaa}>
                <Alert.Heading className='text-center'>Sistema de Turnos SM Depilacion</Alert.Heading>
                <p>
                    2 Modulos: Agendar Turnos y Ver Turnos
                </p>
                <p><strong>Se deben completar todos los campos del formulario para poder agendar turno</strong></p>
                <hr />
                <p className="mb-0">
                    
                </p>
            </Alert>
            <br></br>
        </div>
        

    )
}

export default Inicio
