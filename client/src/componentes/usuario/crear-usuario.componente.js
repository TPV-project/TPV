import React, { Component } from 'react';
import axios from 'axios';
import { Content, Row, Box, Col} from 'adminlte-2-react';

import '../../App.css'

export default class CrearUsuario extends Component {
    constructor(props) {
        super(props);

        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeApellidos = this.onChangeApellidos.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRol = this.onChangeRol.bind(this);
        this.onChangeActivo = this.onChangeActivo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nombre: "",
            apellidos: "",
            username: "",
            password: "",
            rol: "",
            activo: true,
            roles: [],
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/rol").then((response) => {
            if (response.data.length > 0) {
                this.setState({
                    roles: response.data.map((rol) => rol.tipo),
                    rol: response.data[0].tipo,
                });
            }
        });
    }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value,
            username: this.state.nombre.charAt(0).toLowerCase() +
                this.state.apellidos.toLowerCase().replace(/\s/g, ""),
        });

    }

    onChangeApellidos(e) {
        this.setState({
            apellidos: e.target.value,
            username: this.state.nombre.charAt(0).toLowerCase() +
                this.state.apellidos.toLowerCase().replace(/\s/g, ""),
        });
    }

    onChangeUsername(e) {
        this.state.username = e;
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeRol(e) {
        this.setState({
            rol: e.target.value,
        });
    }

    onChangeActivo(e) {
        this.setState({
            activo: e.target.checked,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const usuario = {
          nombre: this.state.nombre,
          apellidos: this.state.apellidos,
          username: this.state.username,
          password: this.state.password,
          rol: this.state.rol,
          activo: this.state.activo
        }

        axios.post('http://localhost:3000/api/usuario', usuario)
            .then(res => console.log(res.data));

        window.location = '/usuarios';
    }

    asignaUsername(val) {
        this.state.username = val;
    }

    render(){
        return(
    <Content title="Usuarios" subTitle="Añadir usuario" browserTitle="Usuarios">
      <Row>
        <Col xs={12}>
          <Box>
            <div className="box-header"></div>
            <div className="box-body">
              <div className="row">
                <form onSubmit={this.onSubmit} className="mt-3">
                    <div className="form-group col-xs-6">
                        <label>Nombre: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.nombre}
                        onChange={this.onChangeNombre}
                        onBlur={this.onChangeUsername(this.state.nombre.charAt(0).toLowerCase()+this.state.apellidos.toLowerCase().replace(/\s/g, ''))}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Apellidos: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.apellidos}
                        onChange={this.onChangeApellidos}
                        onBlur={this.onChangeUsername(this.state.nombre.charAt(0).toLowerCase()+this.state.apellidos.toLowerCase().replace(/\s/g, ''))}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Nombre de usuario: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.username}
                        disabled
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Contraseña: </label>
                        <input
                        required
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Rol: </label>
                        <select
                          required
                          className="form-control custom-select"
                          value={this.state.rol}
                          onChange={this.onChangeRol}>
                          {
                            this.state.roles.map(function(rol) {
                              return <option
                                key={rol}
                                value={rol}>{rol}
                                </option>;
                            })
                          }
                        </select>
                    </div>
                    <div className="form-group col-xs-6">
                      <div className="row col-xs-12">
                        <label> Activo</label>
                      </div>
                      <div className="row col-xs-12">
                        <input
                        type="checkbox"
                        className="mr-2"
                        value={this.state.activo}
                        onChange={this.onChangeActivo}
                        defaultChecked
                        />
                      </div>
                    </div>
                    <div className="form-group col-xs-12">
                      <div className="form-group">
                          <input type="submit" value="Crear" className="btn btn-success"/>
                          <a href="http://localhost:3001/usuarios" type="button" className="btn btn-danger ml-3">Cancelar</a>
                      </div>
                    </div>
                </form>
              </div>
            </div>
          </Box>
        </Col>
      </Row>
    </Content>
        )
    }
}
