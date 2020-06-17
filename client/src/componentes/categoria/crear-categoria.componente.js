import React, { Component } from 'react';
import axios from 'axios';

export default class CrearCategoria extends Component {
  constructor(props) {
    super(props);

    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nombre: ''
    }
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
    console.log(this.state.nombre);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.nombre);

    const categoria = {
      nombre: this.state.nombre
    }

    axios.post('http://localhost:3000/api/categoria', categoria)
      .then(res => console.log(res.data));

    this.setState({
      nombre: ''
    });

    window.location = '/categorias';
  }

  render() {
    return (
      <div>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1>
              Categoria
                <small>Añade una categoria</small>
            </h1>
            <ol className="breadcrumb">
              <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>
              <li><a href="/categorias"><i className="fa fa-tag" /> Categoria</a></li>
              <li className="active">Añadir categoria</li>
            </ol>
          </section>
          <section className="content">
            <div className="box">
              <div className="box-body">
                <div className="row">
                  <form onSubmit={this.onSubmit} className="mt-3">
                    <div className="form-group col-xs-12">
                      <label>Nombre: </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.nombre}
                        onChange={this.onChangeNombre}
                      />
                    </div>
                    <div className="form-group col-xs-12">
                      <div className="form-group">
                        <input type="submit" value="Crear" className="btn btn-success" />
                        <a href="http://localhost:3001/categorias" type="button" className="btn btn-danger ml-3">Cancelar</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
