import React, { Component } from 'react';
import axios from 'axios';
import { Content, Row, Box, Col } from 'adminlte-2-react';
import '../../App.css'
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';
export default class CrearTicket extends Component {
    constructor(props) {
        super(props);

        this.onChangeTicketProductos = this.onChangeTicketProductos.bind(this);
        this.onChangeTotal = this.onChangeTotal.bind(this);
        this.onChangeFecha = this.onChangeFecha.bind(this);
        this.onChangeEfectivo = this.onChangeEfectivo.bind(this);
        this.onChangeCambio = this.onChangeCambio.bind(this);
        this.onChangeCantidad = this.onChangeCantidad.bind(this);

        this.onChangeBarra = this.onChangeBarra.bind(this);
        this.anadirProductoATicket = this.anadirProductoATicket.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //Fecha Actual con formato para el value del input Date
        let tempDate = new Date();
        var mes = tempDate.getMonth() + 1;
        var dia = tempDate.getDate();
        if (dia < 10) {
            dia = '0' + dia;
        }
        if (mes < 10) {
            mes = '0' + mes;
        }
        let fechaDia = tempDate.getFullYear() + '-' + mes + '-' + dia;

        this.state = {
            listaProductos: [],
            ticketProductos: [],
            total: 0,
            fecha: fechaDia,
            efectivo: false,
            cantidad: 0,
            cambio: 0,
            barra: false

        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                if (response.data.length > 0) {
                    console.log(response.data);
                    this.setState({
                        listaProductos: response.data,
                    })
                }
            })
        document.getElementById("efectivo").style.visibility = "hidden";
    }

    onChangeTicketProductos() {
        this.setState({
            ticketProductos: this.state.ticketProductos
        });
    }

    onChangeTotal(euros, operacion) {
        if (this.state.total != 'undefined' || this.state.total != null) {
            if (operacion == '+') {
                this.setState({
                    total: euros + this.state.total
                });
            } else {
                this.setState({
                    total: this.state.total - euros
                });
            }

        } else {
            this.setState({
                total: euros
            });
        }

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
        var x = document.getElementById('efectivo');
        if (x.style.visibility === 'hidden') {
            x.style.visibility = 'visible';
        } else {
            x.style.visibility = 'hidden';
        }

    }

    onChangeCambio(e) {
        console.log(this.state.cantidad)
        console.log(this.state.total)
        this.setState({
            cambio: (this.state.cantidad - this.state.total)
        });
    }
    onChangeCantidad(e) {
        this.setState({
            cantidad: e.target.value
        });
    }

    onChangeBarra(e) {
        this.setState({
            barra: e.target.checked
        });
    }
    onSubmit(e) {
        e.preventDefault();
        // for (let i = 0; i < this.state.ticketProductos.length; i++) {
        //     this.state.ticketProductos[i] = this.state.ticketProductos[i]._id;
        // }
        const ticket = {
            ticketProductos: this.state.ticketProductos,
            total: this.state.total,
            fecha: this.state.fecha,
            efectivo: this.state.efectivo,
            cantidad: this.state.cantidad,
            cambio: this.state.cambio,
            barra: this.state.barra
        }
        axios.post('http://localhost:3000/api/tickets', ticket)
            .then(res => console.log(res.data));

        this.setState({
            ticketProductos: [],
            total: 0,
            fecha: '',
            efectivo: false,
            cambio: 0,
            cantidad: 0,
            barra: false
        });
    }

    anadirProductoATicket(producto) {
        console.log('Se hizo click');

        if (this.state.ticketProductos != 'undefined' || this.state.ticketProductos != null) {
            this.state.ticketProductos.push(producto);
        } else {
            this.state.ticketProductos = producto;
        }
        this.onChangeTicketProductos();
        this.onChangeTotal(producto.precio_barra, '+');
        console.log(this.state.ticketProductos);
    }


    deleteProductoDeTicket(poducto) {
        console.log(poducto._id);
        var productos = this.state.ticketProductos;
        
        console.log('DELETE');
        console.log(productos);
        var pos;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i]._id == poducto._id) {
                pos = i;

            }
        }
        console.log('POS');
        console.log(pos);
        this.onChangeTotal(poducto.precio_barra, '-');
        productos.splice(pos, 1);

        this.setState({
            ticketProductos: productos
        })
    }

    render() {
        return (
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
                            <li><i className="fa fa-book" /> Contabilidad</li>
                            <li><a href="/tickets"><i className="fa fa-list" /> Tickets</a></li>
                            <li className="active">Añadir ticket</li>
                        </ol>
                    </section>

                    <section className="content">
                        <div className="box">
                            <div className="flex-container">
                                {
                                    this.state.listaProductos.map(currentproducto => {
                                        return <div key={currentproducto._id} onClick={() => this.anadirProductoATicket(currentproducto)}>
                                            <h3>{currentproducto.nombre}</h3>
                                            <p>IMAGEN?</p>
                                            {/* <img src="img_nature.jpg" alt="Nature" onclick="myFunction(this);"></img> */}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section>

                    <section className="content">

                        <div className="box">
                            <div className="box-body">
                                <div className="row">
                                    <form onSubmit={this.onSubmit} className="mt-3">

                                        <div className="box">
                                            <div className="box-header">
                                                <h3 className="box-title">Lista Productos</h3>
                                            </div>
                                            <div className="box-body no-padding">
                                                <table className="table table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <th>Nombre</th>
                                                            <th>Cantidad</th>
                                                        </tr>
                                                        {
                                                            this.state.ticketProductos.map(currentproducto => {
                                                                return <tr>
                                                                    <td>{currentproducto.nombre}</td>
                                                                    <td>{currentproducto.nombre}</td>
                                                                    <td><a href="#" className="btn btn-app" title={"Eliminar " + currentproducto.nombre} onClick={() => { this.deleteProductoDeTicket(currentproducto) }}><Eliminar /></a></td>
                                                                </tr>

                                                            })
                                                        }
                                                    </tbody></table>
                                            </div>
                                        </div>

                                        <div className="form-group col-xs-6">
                                            <label>Total: </label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                value={this.state.total}
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
                                        <div id="efectivo">
                                            <div className="form-group col-xs-6">
                                                <label>Cantidad: </label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.cantidad}
                                                    onChange={this.onChangeCantidad}
                                                    onBlur={this.onChangeCambio}
                                                />
                                            </div>
                                            <div className="form-group col-xs-6">
                                                <label>Cambio: </label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.cambio}
                                                    onChange={this.onChangeCambio}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col-xs-12">
                                            <input type="submit" value="Crear" className="btn btn-success" />
                                            <a href="http://localhost:3001/tickets" type="button" className="btn btn-danger ml-3">Volver</a>
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
