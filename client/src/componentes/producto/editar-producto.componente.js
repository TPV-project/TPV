import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class EditarProducto extends Component {
    constructor(props) {
        super(props);

        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangePrecioLlevar = this.onChangePrecioLlevar.bind(this);
        this.onChangePrecioBarra = this.onChangePrecioBarra.bind(this);
        this.onChangeCocina = this.onChangeCocina.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nombre: '',
            precio_llevar: 0,
            precio_barra: 0,
            cocina: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/products/'+this.props.match.params.id)
            .then(response => {
              document.getElementById('cocina').checked = response.data.cocina;
              this.setState({
                nombre: response.data.nombre,
                precio_llevar: response.data.precio_llevar,
                precio_barra: response.data.precio_barra,
                cocina: response.data.cocina
              })
            })
            .catch((error) => {
                console.log(error);
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
          cocina: this.state.cocina
        }

        axios.put('http://localhost:3000/api/products/'+this.props.match.params.id, producto)
            .then(res => console.log(res.data));

            window.location.href = "/producto"
    }

    render() {
        return (
            <div>
                <h1 className="mt-3">Editar producto</h1>
                <form onSubmit={this.onSubmit} className="mt-3">
                    <div className="form-group">
                        <label>Nombre del producto: </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.nombre}
                            onChange={this.onChangeNombre}
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio para llevar: </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.precio_llevar}
                            onChange={this.onChangePrecioLlevar}
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio para barra: </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.precio_barra}
                            onChange={this.onChangePrecioBarra}
                        />
                    </div>
                    <div className="form-group">
                        <label>Comanda para cocina: </label>
                        <input
                            className="ml-2"
                            type="checkbox"
                            id='cocina'
                            value={this.state.cocina}
                            onClick={this.onChangeCocina}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Modificar" className="btn btn-info" />
                        <a href="http://localhost:3001/producto" type="button" className="btn btn-danger ml-3">Cancelar</a>
                    </div>
                </form>
            </div>
        )
    }
}
