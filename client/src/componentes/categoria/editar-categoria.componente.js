import React, { Component } from 'react';
import axios from 'axios';

export default class EditarCategoria extends Component {
    constructor(props) {
        super(props);

        this.onChangeNombre = this.onChangeNombre.bind(this);        

        this.state = {
            nombre: ''
        }
    }

    componentDidMount() {
      axios.get('http://localhost:3000/api/categoria/'+this.props.match.params.id)
        .then(response => {          
          this.setState({
            nombre: response.data.nombre
          })
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const categoria = {
          nombre: this.state.nombre
        }

        axios.put('http://localhost:3000/api/categoria/'+this.props.match.params.id, categoria)
            .then(res => console.log(res.data));

        window.location = '/categoria';
    }

    render(){
        return(
          <div>
          <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
              <h1>
              Productos
              <small>Editar {this.state.nombre}</small>
              </h1>
              <ol className="breadcrumb">
              <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>   
              <li><i className="fa fa-book" /> Catálogo</li>
              <li><a href="/productos"><i className="fa fa-list" /> Productos</a></li>
              <li className="active">Editar {this.state.nombre}</li>
              </ol>
          </section>
          <section className="content">
          <div className="box">
          <div className="box-body">
            <div className="row">
                <form onSubmit={this.onSubmit} className="mt-3">
                    <div className="form-group col-xs-6">
                        <label>Nombre: </label>
                        <input
                        required
                        type="text"
                        className="form-control"
                        value={this.state.nombre}
                        onChange={this.onChangeNombre}
                        />
                    </div>                    
                    <div className="form-group col-xs-12">
                        <input type="submit" value="Modificar" className="btn btn-success"/>
                        <a href="http://localhost:3001/categorias" type="button" className="btn btn-danger ml-3">Cancelar</a>
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
