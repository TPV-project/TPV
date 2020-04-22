import React, { Component } from 'react';
import { Content, Row, Box, Col } from 'adminlte-2-react';
import axios from 'axios';
//Iconos
import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';
//css
import '../../App.css'

const UsuariosLista = props => (
  <tr>
    <td>{props.usuarios.nombre}</td>
    <td>{props.usuarios.apellidos}</td>
    <td>{props.usuarios.username}</td>
    <td>{props.usuarios.rol}</td>
    <td>{props.usuarios.activo}</td>
    <td><a className="btn btn-app" title={"Editar "+props.usuarios.username} href={"/editar/usuario/"+props.usuarios._id}><Editar/></a><a href="#" className="btn btn-app" title={"Eliminar "+props.usuarios.username} onClick={()=> {props.deleteUser(props.usuarios._id)}}><Eliminar/></a></td>
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
  <Content title="Usuarios" subTitle="Gestiona los usuarios de la aplicación" browserTitle="Usuarios">
    <Row>
      <Col xs={12}>
        <Box>
          <div class="box-header"></div>
          <div class="box-body">
            <div class="row">
              <table className="table table-hover mt-3">
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
            </div>
          </div>
        </Box>
        <a href="/crear/usuario" type="button" className="btn bg-purple">Añadir usuario</a>
      </Col>
    </Row>
  </Content>
    )
  }
}
