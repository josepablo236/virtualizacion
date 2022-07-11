import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Principal from './components/principal/Principal';
import Foto from './components/principal/Foto';
import SubirDescarga from './components/principal/SubirDescarga';
import Resultado from './components/resultado/Resultado';
import ImagenProvider from './context/ImagenContext';
import Login from './components/auth/Login.js';
import NuevaCuenta from './components/auth/NuevaCuenta';
import RutaPrivada from './components/rutas/RutaPrivada';
import Logueado from './components/principal/Logueado';
import Dashboard from './components/principal/Dashboard';

function App() {
  return (
    <ImagenProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Principal}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
          <RutaPrivada exact path="/home" component={Logueado}/>
          <RutaPrivada exact path="/dashboard" component={Dashboard}/>
          <RutaPrivada exact path="/tomar-foto" component={Foto}/>
          <RutaPrivada exact path="/subir-descarga" component={SubirDescarga}/>
          <RutaPrivada exact path="/resultado" component={Resultado}/>
        </Switch>
      </Router>
    </ImagenProvider>
  );
}

export default App;
