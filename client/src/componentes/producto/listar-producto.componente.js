import React, { Component } from 'react';
import axios from 'axios';

import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

const ProductosLista = props => (
    <tr>
        <td>{props.productos.nombre}   </td>
        <td>{props.productos.precio_llevar}</td>
        <td>{props.productos.precio_barra}</td>
        <td>{props.productos.categoria}</td>
        <td>{props.productos.cocina}</td>
        <td><a className="btn btn-app" title={"Editar "+props.productos.nombre} href={"/editar/producto/"+props.productos._id}><Editar/></a><a href="#" className="btn btn-app" title={"Eliminar "+props.productos.nombre} onClick={()=> {props.deleteProduct(props.productos._id)}}><Eliminar/></a></td>
    </tr>
)

export default class ListarProducto extends Component {
    constructor(props) {
        super(props)

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = { productos: [] }
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = 'js/table.js';
        script.async = true;

        document.body.appendChild(script);
        
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                this.comprobarCocina(response)
                this.setState({ productos: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    comprobarCocina(response) {
      for(var i=0;i<response.data.length;i++) {
        if(response.data[i]['cocina']) {
          response.data[i]['cocina'] = 'Sí';
        } else {
          response.data[i]['cocina'] = 'No';
        }
      }
    }

    deleteProduct(id){
        axios.delete('http://localhost:3000/api/products/' + id)
            .then(res => console.log(res.data));

        this.setState({
            productos: this.state.productos.filter(el => el._id !== id)
        })
    }

    productosList(){
        return this.state.productos.map(currentproductos => {
            return <ProductosLista productos={currentproductos} deleteProduct={this.deleteProduct} key= {currentproductos._id}/>;
        })
    }


    render() {
        return (<div>
          <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
              <h1>
              Productos
              <small>Gestiona los productos de la aplicación</small>
              </h1>
              <ol className="breadcrumb">
              <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>   
              <li><i className="fa fa-book" /> Catálogo</li>
              <li className="active">Productos</li>
              </ol>
          </section>
          {/* Main content */}
          <section className="content">
              <div className="row">
              <div className="col-xs-12">
                  <div className="box">
                  <div className="box-header">
                    <a href="/crear/producto" type="button" className="btn bg-purple">Añadir producto</a>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                      <table id="datatable" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Precio para llevar</th>
                            <th>Precio para barra</th>
                            <th>Categoria</th>
                            <th>Cocina</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                          {this.productosList()}                    
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
