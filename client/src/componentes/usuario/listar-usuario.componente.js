import React, { Component } from 'react';
import axios from 'axios';
//Iconos
import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

import '../../App.css'

const UsuariosLista = props => (
  <tr>
    <td>{props.usuarios.nombre}</td>
    <td>{props.usuarios.apellidos}</td>
    <td>{props.usuarios.username}</td>
    <td>{props.usuarios.rol}</td>
    <td>{props.usuarios.activo}</td>
    <td><a className="btn btn-app" title={"Editar "+props.usuarios.username} href={"/editar/usuario/"+props.usuarios._id}><Editar/></a><a href="fake_url" className="btn btn-app" title={"Eliminar "+props.usuarios.username} onClick={()=> {props.deleteUser(props.usuarios._id)}}><Eliminar/></a></td>
  </tr>
)

export default class ListarUsuario extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = { usuarios: [] }
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = 'js/table.js';
    script.async = true;

    document.body.appendChild(script);

    axios.get('http://localhost:3000/api/usuario')
      .then(response => {
        this.comprobarActivo(response)
        this.setState({ usuarios: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //Comprueba si el elemento activo es true o false y lo muestra en la tabla como Sí o No
  comprobarActivo(response) {
    for(var i = 0;i<response.data.length;i++){
      if(response.data[i]['activo']) {
        response.data[i]['activo'] = 'Sí';
      } else {
        response.data[i]['activo'] = 'No';
      }
    }
  }

  deleteUser(id) {
    axios.delete('http://localhost:3000/api/usuario/'+id)
      .then(res => console.log(res.data));
    this.setState({
      usuarios: this.state.usuarios.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.usuarios.map(currentUser => {
      return <UsuariosLista usuarios={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
    })
  }

  render() {
    return (
      <div>
      <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
          <h1>
          Usuarios
          <small>Gestiona los usuarios de la aplicación</small>
          </h1>
          <ol className="breadcrumb">
          <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>          
          <li className="active">Usuarios</li>
          </ol>
      </section>
      {/* Main content */}
      <section className="content">
          <div className="row">
          <div className="col-xs-12">
              <div className="box">
              <div className="box-header">
              <a href="/crear/usuario" type="button" className="btn bg-purple">Añadir usuario</a>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                  <table id="datatable" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Nombre de usuario</th>
                        <th>Rol</th>
                        <th>Activo</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.userList()}                    
                    </tbody>
                  </table>
                </div>
                <div className="box-footer">
                  
                </div>
                {/* /.box-body */}
                </div>
                {/* /.box */}
            </div>
            {/* /.col */}
            </div>
            {/* /.row */}
        </section>
        {/* /.content */}
        </div>

        </div>
    )
  }
}
