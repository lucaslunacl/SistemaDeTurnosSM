import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Formulario from './component/Formulario';
import Inicio from './component/Inicio';
import Agendar from './component/Agendar';
import Turnos  from './component/Turnos';
import Registrar from './component/Registrar';
function App() {
  const estilo = {
    width: '75%',
    margin: '0 auto',
    marginTop: '15px',
    backgroundColor: 'blue',
  };
  return (
    <Router>
      <Switch>
        <Route path='/Registrar'>
           <Registrar></Registrar>
        </Route>
      <Route path='/Turnos'>
          <Turnos></Turnos>
        </Route>
        <Route path='/Agendar'>
          <Agendar></Agendar>
        </Route>
        <Route path='/inicio'>
          <Inicio/>
        </Route>
        <Route path='/'>
          <div style={estilo} className='header shadow p-3 mb-5 bg-white rounded '>
            <h1 className='text-center'>Gestión de Turnos - SM </h1>
          </div>
          <div className='row mx-auto'>
            <div className='col'>
              <Formulario></Formulario>
            </div>

          </div>
        </Route>

      </Switch>
    </Router>

  );
}

export default App;
