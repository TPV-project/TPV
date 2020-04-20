import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { Error } from 'mongoose';
import { BsPencil, BsTrash } from 'react-icons/bs';

const UsuariosLista = props => (
  <tr>
    <td>{props.usuarios.nombre}</td>
    <td>{props.usuarios.apellidos}</td>
    <td>{props.usuarios.username}</td>
    <td>{props.usuarios.rol}</td>
    <td>{props.usuarios.activo}</td>
    <td><Link to={"/editar/usuario/"+props.usuarios._id}><BsPencil/></Link> | <a href="#" onClick={()=> {props.deleteUser(props.usuarios._id)}}><BsTrash/></a></td>
  </tr>
)

export default class ListUser extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = { usuarios: [] }
  }

  componentDidMount() {
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
    <div className="container">
      <div className="jumbotron jumbotron-fluid border-bottom border-info">
        <div className="container">
          <h1 className="display-4 text-center">Usuarios</h1>
          <p className="lead text-center">Crea, modifica o elimina usuarios</p>
        </div>
      </div>
      <a href="http://localhost:3001/crear/usuario" type="button" className="btn btn-info btn-lg">Añadir usuario</a>
      <br/>
      <br/>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Nombre de usuario</th>
              <th scope="col">Rol</th>
              <th scope="col">Activo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.userList()}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}
