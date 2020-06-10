import React, { Component } from 'react';
import axios from 'axios';

import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

const CajasLista = props => (
    <tr>
        <td>{props.cajas.cajaInicial}</td>
        <td>{props.cajas.cajaFinal}</td>
        <td>{props.cajas.sumaTarjeta}</td>
        <td>{props.cajas.fecha}</td>
        <td><a href="#" className="btn btn-app" title={"Eliminar "+props.cajas.id} onClick={()=> {props.deleteCaja(props.cajas._id)}}><Eliminar/></a></td>
    </tr>
)

export default class ListarCaja extends Component {
    constructor(props) {
        super(props)

        this.deleteCaja = this.deleteCaja.bind(this);

        this.state = { cajas: [] }
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = 'js/table.js';
        script.async = true;

        document.body.appendChild(script);
        
        axios.get('http://localhost:3000/api/caja')
            .then(response => {
                this.comprobarFecha(response)
                console.log(response.data);
                this.setState({ cajas: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    comprobarFecha(response) {
        for (var i = 0; i < response.data.length; i++) {
            var aux = response.data[i].fecha;
            var modFecha = aux.slice(0, 10);
            response.data[i].fecha = modFecha;
        }
    }

    deleteCaja(id){
        axios.delete('http://localhost:3000/api/caja/' + id)
            .then(res => console.log(res.data));

        this.setState({
            cajas: this.state.cajas.filter(el => el._id !== id)
        })
    }

    cajasList(){
        return this.state.cajas.map(currentcajas => {
            return <CajasLista cajas={currentcajas} deleteCaja={this.deleteCaja} key= {currentcajas._id}/>;
        })
    }


    render() {
        return (<div>
          <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
              <h1>
              Cajas
              <small>Gestiona los cajas de la aplicación</small>
              </h1>
              <ol className="breadcrumb">
              <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>   
              <li><i className="fa fa-book" /> Contabilidad</li>
              <li className="active">cajas</li>
              </ol>
          </section>
          {/* Main content */}
          <section className="content">
              <div className="row">
              <div className="col-xs-12">
                  <div className="box">
                  <div className="box-header">
                    <a href="/crear/caja" type="button" className="btn bg-purple">Añadir caja</a>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                      <table id="datatable" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>Caja Inicial</th>
                            <th>Caja Final</th>
                            <th>Suma Tarjeta</th>
                            <th>Fecha</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                          {this.cajasList()}                    
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
