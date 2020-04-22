import React, { Component } from 'react';
import axios from 'axios';
import { Content, Row, Box, Col, Button } from 'adminlte-2-react';

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
    <Content title="Usuarios" subTitle="Editar usuario" browserTitle="Usuarios">
      <Row>
        <Col xs={12}>
          <Box>
            <div className="box-header"></div>
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
                    <div className="form-group col-xs-12">
                      <div className="row col-xs-12">
                        <label>Comanda para cocina:</label>
                      </div>
                      <div className="row col-xs-12">
                        <input
                            className="ml-2"
                            type="checkbox"
                            id='cocina'
                            value={this.state.cocina}
                            onClick={this.onChangeCocina}
                        />
                      </div>
                    </div>
                    <div className="form-group col-xs-12">
                        <input type="submit" value="Modificar" className="btn btn-primary mr-5" />
                        <a href="http://localhost:3001/productos" type="button" className="btn btn-danger ml-3">Cancelar</a>
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
