import React, { Component } from 'react';
import AdminLTE, { Sidebar, Content, Row, Col, Box, Button } from 'adminlte-2-react';

import Base from "./componentes/home.componente";
//Productos
import ListarProducto from './componentes/producto/listar-producto.componente';
import CrearProducto from "./componentes/producto/crear-producto.componente";
import EditarProducto from "./componentes/producto/editar-producto.componente";
//Usuarios
import ListarUsuario from "./componentes/usuario/listar-usuario.componente";
import CrearUsuario from "./componentes/usuario/crear-usuario.componente";
import EditarUsuario from "./componentes/usuario/editar-usuario.componente";

const { Item } = Sidebar;

class App extends Component {

  sidebar = [
    <Item key="dashboard" icon="fa-tachometer-alt" text="Panel de control" to="/" />,
    <Item key="catalogo" icon="fa-book-open" text="Catálogo" to="/productos" />,
    <Item key="contabilidad" icon="fa-briefcase" text="Contabilidad" to="#"/>,
    <Item key="usuarios" icon="fa-user" text="Usuarios" to="/usuarios" />,
    <Item key="ajustes" icon="fa-cogs" text="Ajustes" to="#" />
  ]

  render() {
    return (
      <AdminLTE title={["Mik", "Teck"]} titleShort={["M", "T"]} theme="purple" sidebar={this.sidebar}>
        //Componentes Usuarios
        <ListarUsuario path="/usuarios" />
        <CrearUsuario path="/crear/usuario" />
        <EditarUsuario path="/editar/usuario/:id" />
        //Copmponentes Productos
        <ListarProducto path="/productos" />
        <CrearProducto path="/crear/producto" />
        <EditarProducto path="/editar/producto/:id" />
      </AdminLTE>
    );
  }
}
export default App;
