import React, { Component } from 'react';
import axios from 'axios';
import { Content, Row, Box, Col } from 'adminlte-2-react';
import '../../App.css'
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleOnChangeUserName = this.handleOnChangeUserName.bind(this);
    this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      usuarios: [],
      username: '',
      password: ''
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3000/api/usuario')
      .then(response => {
        if (response.data.length > 0) {
          console.log(response.data);
          this.setState({
            usuarios: response.data,
          })
        } else {
          //window.location = '/usuarios';
        }
      })
  }
  handleOnChangeUserName(e) {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  };


  onSubmit(e) {
    e.preventDefault();
  
    console.log('submit')
    const datosLogin = {
      username: this.state.username,
      password: this.state.password,
    };
    for (let i = 0; i < this.state.usuarios.length; i++) {
      if (datosLogin.username == this.state.usuarios[i].username && datosLogin.password == this.state.usuarios[i].password) {
        window.location = '/usuarios';
        console.log('LOGUEADO')
      } else {
        this.setState({
          usuarios: [],
          username: '',
          password: '',
        });
      }

    }
  }


  render() {
    return (
      <div className="login-box">
        <div className="login-box-body">
          <p className="login-box-msg">PINCHOS LOGIN</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group has-feedback">
              <input
                required
                type="text"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleOnChangeUserName}
              />
            </div>
            <div className="form-group has-feedback">
              <input
                required
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleOnChangePassword}
              />
            </div>
            <div className="row">
              <div className="col-xs-8">

              </div>
              <div className="col-xs-4">
                {/* <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button> */}
                <div className="form-group">
                  <input type="submit" className="btn btn-success" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  }
}
