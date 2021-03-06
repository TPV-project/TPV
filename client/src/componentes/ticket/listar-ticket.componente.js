import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; //Import CSS

import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

import '../../App.css'

const TicketsLista = props => (
    <tr>
        <td>{props.tickets.ticketProductos[0]}</td>
        <td>{props.tickets.total}</td>
        <td>{props.tickets.fecha}</td>
        <td>{props.tickets.efectivo}</td>
        <td>{props.tickets.cambio}</td>
        <td>{props.tickets.barra}</td>
        <td><a href="#" className="btn btn-app" title={"Eliminar " + props.tickets.id} onClick={() => { props.deleteTicket(props.tickets._id) }}><Eliminar /></a></td>
    </tr>
)

export default class ListarTicket extends Component {
    constructor(props) {
        super(props)

        this.deleteTicket = this.deleteTicket.bind(this);

        this.state = { tickets: [] }
    }
    componentDidMount() {
        const script = document.createElement("script");

        script.src = 'js/table.js';
        script.async = true;

        document.body.appendChild(script);
        axios.get('http://localhost:3000/api/tickets')
            .then(response => {
                this.comprobarBarra(response)
                this.comprobarEfectivo(response)
                this.comprobarFecha(response)
                this.comprobarProductos(response)

                this.setState({ tickets: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    comprobarProductos(response) {
        for (var i = 0; i < response.data.length; i++) {
            for (let j = 0; j < response.data[i].ticketProductos.length; j++) {

                var aux = response.data[i].ticketProductos[j].nombre;
                //console.log(aux);
                if (j == response.data[i].ticketProductos.length - 1) {
                    var modFecha = modFecha + aux;
                    response.data[i].ticketProductos[0] = modFecha;
                } else if(j == 0){
                    var modFecha = aux + ', ';
                    console.log(aux);
                    response.data[i].ticketProductos[0] = modFecha;
                }else{
                    var modFecha = modFecha + aux + ', ';
                    console.log(aux);
                    response.data[i].ticketProductos[0] = modFecha;
                }
            }


        }
    }
    comprobarFecha(response) {
        for (var i = 0; i < response.data.length; i++) {
            var aux = response.data[i].fecha;
            var modFecha = aux.slice(0, 10);
            response.data[i].fecha = modFecha;
        }
    }
    comprobarEfectivo(response) {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i]['efectivo']) {
                response.data[i]['efectivo'] = 'Sí';
            } else {
                response.data[i]['efectivo'] = 'No';
            }
        }
    }
    comprobarBarra(response) {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i]['barra']) {
                response.data[i]['barra'] = 'Sí';
            } else {
                response.data[i]['barra'] = 'No';
            }
        }
    }
    // componentDidMount() {
    //     const script = document.createElement("script");

    //     script.src = 'js/table.js';
    //     script.async = true;

    //     document.body.appendChild(script);

    //     axios.get('http://localhost:3000/api/tickets')
    //         .then(response => {
    //             this.comprobarBarra(response)
    //             this.comprobarEfectivo(response)
    //             this.comprobarFecha(response)
    //             this.setState({ tickets: response.data })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    deleteTicket(id) {

        try {
            const options = {
                childrenElement: () => <div />,
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Seguro que quieres eliminar?</h1>
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    axios.delete('http://localhost:3000/api/tickets/' + id)
                                        .then(res => console.log(res.data));
                                    this.setState({
                                        tickets: this.state.tickets.filter(el => el._id !== id)
                                    })
                                    onClose();
                                }}
                            >
                                Si
                        </button>
                        </div>
                    );
                },
                closeOnEscape: true,
                closeOnClickOutside: true,
                willUnmount: () => { },
                afterClose: () => { },
                onClickOutside: () => { },
                onKeypressEscape: () => { }
            };
            var alert = confirmAlert(options);

        } catch (e) {
            console.log(e, 'cancel')
        }

    }

    ticketsList() {
        return this.state.tickets.map(currenttickets => {
            return <TicketsLista tickets={currenttickets} deleteTicket={this.deleteTicket} key={currenttickets._id} />;
        })
    }


    render() {
        return (<div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                        Productos
              <small>Gestiona los tickets de la aplicación</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>
                        <li><i className="fa fa-book" /> Contabilidad</li>
                        <li className="active">Tickets</li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <a href="/crear/ticket" type="button" className="btn bg-purple">Añadir Ticket</a>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body">
                                    <table id="datatable" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Lista Productos</th>
                                                <th>Total</th>
                                                <th>Fecha</th>
                                                <th>Efectivo</th>
                                                <th>Cambio</th>
                                                <th>Barra</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.ticketsList()}
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.box-body */}
                            </div>
                            {/* /.box */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </section>
                {/* /.content */}
            </div>

        </div>
        )
    }
}
