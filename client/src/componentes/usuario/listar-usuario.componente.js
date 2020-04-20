import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
      <div>
          <h1 className="mt-3">Lista de usuarios</h1>
          <table className="table mt-3">
            <thead className="thead-dark">
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
        <a href="http://localhost:3001/crear/usuario" type="button" className="btn btn-danger mt-2">Añadir usuario</a>
      </div>
    )
  }
}
