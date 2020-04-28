import React, { Component } from 'react';
import axios from 'axios';

import { ReactComponent as Editar } from '../../iconos/edit.svg';
import { ReactComponent as Eliminar } from '../../iconos/trash-2.svg';

import '../../App.css'

const CategoriasLista = props => (
    <tr>
        <td>{props.categorias.nombre}</td>        
        <td className="align-center"><a className="btn btn-app" title={"Editar "+props.categorias.nombre} href={"/editar/categoria/"+props.categorias._id}><Editar/></a><a href="#" className="btn btn-app" title={"Eliminar "+props.categorias.nombre} onClick={()=> {props.deleteCategoria(props.categorias._id)}}><Eliminar/></a></td>
    </tr>
)

export default class ListarCategoria extends Component {
    constructor(props) {
        super(props)

        this.deleteCategoria = this.deleteCategoria.bind(this);

        this.state = { categorias: [] }
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = 'js/table.js';
        script.async = true;

        document.body.appendChild(script);

        axios.get('http://localhost:3000/api/categoria')
            .then(response => {                
                this.setState({ categorias: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCategoria(id){        
        axios.delete('http://localhost:3000/api/categoria/' + id)
            .then(res => console.log(res.data));

        this.setState({
            categorias: this.state.categorias.filter(el => el._id !== id)
        })
    }

    categoriasList(){
        return this.state.categorias.map(currentcategoria => {
            return <CategoriasLista categorias={currentcategoria} deleteCategoria={this.deleteCategoria} key= {currentcategoria._id}/>;
        })
    }


    render() {
        return (
            <div>
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <h1>
                Categorias
                <small>Gestiona las categorias de la aplicación</small>
                </h1>
                <ol className="breadcrumb">
                <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>   
                <li><i className="fa fa-book" /> Catálogo</li>
                <li className="active">Categorias</li>
                </ol>
            </section>
            {/* Main content */}
            <section className="content">
                <div className="row">
                <div className="col-xs-12">
                    <div className="box">
                    <div className="box-header">
                    <a href="/crear/categoria" type="button" className="btn bg-purple">Añadir categoria</a>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                <table id="datatable" className="table table-bordered table-striped">
                  <thead className="thead-dark">
                      <tr>
                          <th>Nombre</th>                          
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.categoriasList()}
                  </tbody>
                </table>
                </div>
                <div className="box-footer">
                  
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
