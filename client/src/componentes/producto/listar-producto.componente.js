import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Error } from 'mongoose';

const ProductosLista = props => (

    <tr>
        <td>{props.productos.nombre}   </td>
        <td>{props.productos.precio_llevar}</td>
        <td>{props.productos.precio_barra}</td>
        <td>{props.productos.cocina}</td>
        <td><Link to={"/editar/producto/"+props.productos._id}>editar</Link> | <a href="#" onClick={()=> {props.deleteProduct(props.productos._id)}}>borrar</a></td>
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
                <h1>ListarProducto</h1>
                <a href="http://localhost:3001/crear/producto" type="button" className="btn btn-primary">Create</a>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio llevar</th>
                            <th>Precio cocina</th>
                            <th>Cocina</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.productosList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
