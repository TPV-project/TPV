import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Productos
import EditarProducto from "./componentes/producto/editar-producto.componente";
import CrearProducto from "./componentes/producto/crear-producto.componente";
import Base from "./componentes/home.componente"
import ListarProducto from './componentes/producto/listar-producto.componente';

//Usuarios
import ListarUsuario from "./componentes/usuario/listar-usuario.componente";
import CrearUsuario from "./componentes/usuario/crear-usuario.componente";
import EditarUsuario from "./componentes/usuario/editar-usuario.componente";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <a className="nav-link" href="http://localhost:3001/">Inicio</a>
        <a className="nav-link" href="http://localhost:3001/producto">Productos</a>
        <a className="nav-link" href="#">Caja</a>
        <a className="nav-link" href="http://localhost:3001/usuario">Usuarios</a>
      </nav>
      <div className="container">
        <Route path="/" exact component={Base} />
        <Route path="/producto" exact component={ListarProducto} />
        <Route path="/editar/producto/:id" exact component={EditarProducto} />
        <Route path="/crear/producto" exact component={CrearProducto} />
        <Route path="/usuario" component={ListarUsuario} />
        <Route path="/crear/usuario" component={CrearUsuario} />
        <Route path="/editar/usuario/:id" component={EditarUsuario} />
      </div>
    </Router>
  );
}

export default App;
