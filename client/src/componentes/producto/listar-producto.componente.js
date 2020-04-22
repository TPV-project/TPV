import React, { Component } from 'react';
import { Content, Row, Box, Col } from 'adminlte-2-react';
import axios from 'axios';

import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

import '../../App.css'

const ProductosLista = props => (
    <tr>
        <td>{props.productos.nombre}   </td>
        <td>{props.productos.precio_llevar}</td>
        <td>{props.productos.precio_barra}</td>
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
        return (
    <Content title="Catálogo" subTitle="Gestiona los productos de la aplicación" browserTitle="Usuarios">
      <Row>
        <Col xs={12}>
          <Box>
            <div class="box-header"></div>
            <div class="box-body">
              <div class="row">
                <table className="table table-hover table mt-3">
                  <thead className="thead-dark">
                      <tr>
                          <th>Nombre</th>
                          <th>Precio para llevar</th>
                          <th>Precio para barra</th>
                          <th>Cocina</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.productosList()}
                  </tbody>
                </table>
              </div>
            </div>
          </Box>
          <a href="/crear/producto" type="button" className="btn bg-purple">Añadir producto</a>
        </Col>
      </Row>
    </Content>
        )
    }
}
