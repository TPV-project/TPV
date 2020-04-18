import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



import EditarProducto from "./componentes/editar-producto.componente";
import CrearProducto from "./componentes/crear-producto.componente";
import Base from "./componentes/home.componente"
import ListarProducto from './componentes/listar-producto.componente';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <a className="nav-link" href="http://localhost:3001/">Inicio</a>
        <a className="nav-link" href="http://localhost:3001/listar">Productos</a>
        <a className="nav-link" href="#">Caja</a>
        <a className="nav-link" href="#">Usuarios</a>
      </nav>
      <div className="container">
        Los pinchos de Canovellas
      </div>
      <div className="container">
        <Route path="/" exact component={Base} />
        <Route path="/listar" exact component={ListarProducto} />
        <Route path="/editar:id" exact component={EditarProducto} />
        <Route path="/crear" exact component={CrearProducto} />
      </div>
    </Router>
  );
}

export default App;
