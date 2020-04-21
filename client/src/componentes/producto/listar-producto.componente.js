import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//Iconos
import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

const ProductosLista = props => (
    <tr>
        <td>{props.productos.nombre}   </td>
        <td>{props.productos.precio_llevar}</td>
        <td>{props.productos.precio_barra}</td>
        <td>{props.productos.cocina}</td>
        <td><Link id="editar" to={"/editar/producto/"+props.productos._id}><Editar/></Link> | <a href="#" id="eliminar" onClick={()=> {props.deleteProduct(props.productos._id)}}><Eliminar/></a></td>
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
            <div>
                <h1 className="mt-3">Lista de productos</h1>
                <table className="table mt-3">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio para llevar</th>
                            <th>Precio para cocina</th>
                            <th>Cocina</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.productosList()}
                    </tbody>
                </table>
                <a href="http://localhost:3001/crear/producto" type="button" className="btn btn-danger mt-2">Añadir producto</a>
            </div>
        )
    }
}
