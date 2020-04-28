import React, { Component } from 'react';
import axios from 'axios';
import { Content, Row, Box, Col } from 'adminlte-2-react';

import '../../App.css'

export default class CrearTicket extends Component {
    constructor(props) {
        super(props);

        this.onChangeListaProductos = this.onChangeListaProductos.bind(this);
        this.onChangeTotal = this.onChangeTotal.bind(this);
        this.onChangeFecha = this.onChangeFecha.bind(this);
        this.onChangeEfectivo = this.onChangeEfectivo.bind(this);
        this.onChangeCambio = this.onChangeCambio.bind(this);
        this.onChangeBarra = this.onChangeBarra.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            listaProductos: '',
            total: 0,
            fecha: '',
            efectivo: false,
            cambio: 0,
            barra: false

        }
    }

    onChangeListaProductos(e) {
        this.setState({
            listaProductos: e.target.value
        });
    }

    onChangeTotal(e) {
        this.setState({
            total: e.target.value
        });
    }

    onChangeFecha(e) {
        this.setState({
            fecha: e.target.value
        });
    }

    onChangeEfectivo(e) {
        this.setState({
            efectivo: e.target.checked
        });
    }

    onChangeCambio(e) {
        this.setState({
            cambio: e.target.value
        });
    }

    onChangeBarra(e) {
        this.setState({
            barra: e.target.checked
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const producto = {
            listaProductos: this.state.listaProductos,
            total: this.state.total,
            fecha: this.state.fecha,
            efectivo: this.state.efectivo,
            cambio: this.state.cambio,
            barra: this.state.barra
        }

        axios.post('http://localhost:3000/api/tickets', producto)
            .then(res => console.log(res.data));

        this.setState({
          listaProductos: '',
          total: 0,
          fecha: '',
          efectivo: false,
          cambio: 0,
          barra: false
        });
    }

    render(){
        return(
    <Content title="Catálogo" subTitle="Añadir ticket" browserTitle="Ticket">
      <Row>
        <Col xs={12}>
          <Box>
            <div className="box-header"></div>
            <div className="box-body">
              <div className="row">
                <form onSubmit={this.onSubmit} className="mt-3">
                    <div className="form-group col-xs-12">
                        <label>Lista de productos: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.listaProductos}
                        onChange={this.onChangeListaProductos}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Total: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.total}
                        onChange={this.onChangeTotal}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Fecha: </label>
                        <input
                        required
                        type="Date"
                        className="form-control"
                        value={this.state.fecha}
                        onChange={this.onChangeFecha}
                        />
                    </div>
                    <div className="form-group col-xs-12">
                      <div className="row col-xs-12">
                        <label>Efectivo: </label>
                      </div>
                      <div className="row col-xs-12">
                        <input
                        className="ml-2"
                        type="checkbox"
                        value={this.state.efectivo}
                        onClick={this.onChangeEfectivo}
                        />
                      </div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label>Cambio: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.cambio}
                        onChange={this.onChangeCambio}
                        />
                    </div>
                    <div className="form-group col-xs-12">
                      <div className="row col-xs-12">
                        <label>Barra: </label>
                      </div>
                      <div className="row col-xs-12">
                        <input
                        className="ml-2"
                        type="checkbox"
                        value={this.state.barra}
                        onClick={this.onChangeBarra}
                        />
                      </div>
                    </div>
                    <div className="form-group col-xs-12">
                        <input type="submit" value="Crear" className="btn btn-success"/>
                        <a href="http://localhost:3001/tickets" type="button" className="btn btn-danger ml-3">Cancelar</a>
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
