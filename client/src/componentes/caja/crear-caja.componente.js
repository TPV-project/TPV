import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css'

export default class CrearCaja extends Component {


    constructor(props) {
        super(props);

        this.onChangeFecha = this.onChangeFecha.bind(this);
        this.onChangeCajaInicial = this.onChangeCajaInicial.bind(this);
        this.onChangeCajaFinal = this.onChangeCajaFinal.bind(this);
        this.onChangeSumaTarjeta = this.onChangeSumaTarjeta.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //var data = this.getFecha();
        let tempDate = new Date();
        var mes = tempDate.getMonth() + 1;
        var dia = tempDate.getDate();
        //let data = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();

        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;
        }

        let fechaDia = tempDate.getFullYear() + '-' + mes + '-' + dia;

        this.state = {
            cajaInicial: 0,
            cajaFinal: 0,
            sumaTarjeta: 0,
            fecha: fechaDia,
        }
    }

    // getFecha() {

    //     let tempDate = new Date();
    //     var ano = tempDate.getFullYear();
    //     var mes = tempDate.getMonth() + 1;
    //     var dia = tempDate.getDate();

    //     if (dia < 10) {
    //         dia = '0' + dia;
    //     }
    //     if (mes < 10) {
    //         mes = '0' + mes;
    //     }

    //     let data = tempDate.getFullYear() + '-' + mes + '-' + dia;
    //     return data;
    // }


    // componentDidMount() {
    // axios.get('http://localhost:3000/api/caja')
    //     .then(response => {
    //         if (response.data.length > 0) {
    //             this.setState({
    //                 categorias: response.data.map(categoria => categoria.nombre),
    //                 categoria: response.data[0].nombre
    //             })
    //         }
    //     })
    //  }

    onChangeCajaInicial(e) {
        this.setState({
            cajaInicial: e.target.value
        });
    }

    onChangeCajaFinal(e) {
        this.setState({
            cajaFinal: e.target.value
        });
    }

    onChangeSumaTarjeta(e) {
        this.setState({
            sumaTarjeta: e.target.value
        });
    }

    onChangeFecha(e) {
        this.setState({
            fecha: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const caja = {
            cajaFinal: this.state.cajaFinal,
            cajaInicial: this.state.cajaInicial,
            sumaTarjeta: this.state.sumaTarjeta,
            fecha: this.state.fecha
        }

        console.log(caja);

        axios.post('http://localhost:3000/api/caja', caja)
            .then(res => console.log(res.data));

        window.location = '/cajas';
    }

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                            Caja
                <small>Añade una Caja</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>
                            <li><i className="fa fa-book" /> Contabilidad</li>
                            <li><a href="/cajas"><i className="fa fa-list" /> Cajas</a></li>
                            <li className="active">Añadir caja</li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="box">
                            <div className="box-body">
                                <div className="row">
                                    <form onSubmit={this.onSubmit} className="mt-3">
                                        <div className="form-group col-xs-6">
                                            <label>Caja Inicial: </label>
                                            <input
                                                required
                                                type="number"
                                                className="form-control"
                                                value={this.state.cajaInicial}
                                                onChange={this.onChangeCajaInicial}
                                            />
                                        </div>
                                        <div className="form-group col-xs-6">
                                            <label>Caja Final: </label>
                                            <input
                                            readOnly
                                                type="text"
                                                className="form-control"
                                                value={this.state.cajaFinal}
                                                onChange={this.onChangeCajaFinal}
                                            />
                                        </div>
                                        <div className="form-group col-xs-6">
                                            <label>Total Tarjeta: </label>
                                            <input
                                            readOnly
                                                type="text"
                                                className="form-control"
                                                value={this.state.sumaTarjeta}
                                                onChange={this.onChangeSumaTarjeta}
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
                                            <input type="submit" value="Crear" className="btn btn-success" />
                                            <a href="http://localhost:3001/cajas" type="button" className="btn btn-danger ml-3">Cancelar</a>
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
