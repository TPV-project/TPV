import React, { Component } from 'react';
import axios from 'axios';

export default class CrearProducto extends Component {
    constructor(props) {
        super(props);

        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangePrecioLlevar = this.onChangePrecioLlevar.bind(this);
        this.onChangePrecioBarra = this.onChangePrecioBarra.bind(this);
        this.onChangeCategoria = this.onChangeCategoria.bind(this);
        this.onChangeCocina = this.onChangeCocina.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nombre: '',
            precio_llevar: 0,
            precio_barra: 0,
            cocina: false,
            categoria: '',
            categorias: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/categoria')
            .then(response => {
            if(response.data.length > 0) {
                this.setState({
                categorias: response.data.map(categoria => categoria.nombre),
                categoria: response.data[0].nombre
                })
            }
            })
        }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    onChangePrecioLlevar(e) {
        this.setState({
            precio_llevar: e.target.value
        });
    }

    onChangePrecioBarra(e) {
        this.setState({
            precio_barra: e.target.value
        });
    }

    onChangeCategoria(e) {
        this.setState({
            categoria: e.target.value
        });
    }

    onChangeCocina(e) {
        this.setState({
            cocina: e.target.checked
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const producto = {
            nombre: this.state.nombre,
            precio_llevar: this.state.precio_llevar,
            precio_barra: this.state.precio_barra,
            cocina: this.state.cocina,
            categoria: this.state.categoria
        }

        axios.post('http://localhost:3000/api/products', producto)
            .then(res => console.log(res.data));

        this.setState({
            nombre: '',
            precio_llevar: 0,
            precio_barra: 0,
            cocina: false,
            categoria: ''
        });

        window.location = '/productos';
    }

    render(){
        return(
            <div>
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <h1>
                Usuarios
                <small>Añade un usuario</small>
                </h1>
                <ol className="breadcrumb">
                <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>   
                <li><i className="fa fa-book" /> Catálogo</li>
                <li><a href="/productos"><i className="fa fa-list" /> Productos</a></li>
                <li className="active">Añadir producto</li>
                </ol>
            </section>
            <section className="content">
            <div className="box">
            <div className="box-body">
              <div className="row">
                <form onSubmit={this.onSubmit} className="mt-3">
                    <div className="form-group col-xs-12">
                        <label>Nombre del producto: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.nombre}
                        onChange={this.onChangeNombre}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Precio para llevar: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.precio_llevar}
                        onChange={this.onChangePrecioLlevar}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Precio para barra: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.precio_barra}
                        onChange={this.onChangePrecioBarra}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Categoria: </label>
                        <select
                          required
                          className="form-control custom-select"
                          value={this.state.categoria}
                          onChange={this.onChangeCategoria}>
                          {
                            this.state.categorias.map(function(categoria) {
                              return <option
                                key={categoria}
                                value={categoria}>{categoria}
                                </option>;
                            })
                          }
                        </select>
                    </div>
                    <div className="form-group col-xs-6">
                      <div className="row col-xs-12">
                        <label>Comanda para cocina: </label>
                      </div>
                      <div className="row col-xs-12">
                        <input
                        className="ml-2"
                        type="checkbox"
                        value={this.state.cocina}
                        onClick={this.onChangeCocina}
                        />
                      </div>
                    </div>
                    <div className="form-group col-xs-12">
                        <input type="submit" value="Crear" className="btn btn-success"/>
                        <a href="http://localhost:3001/productos" type="button" className="btn btn-danger ml-3">Cancelar</a>
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
