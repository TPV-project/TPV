import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
    componentDidMount() {
        const script = document.createElement("script");

        script.src = 'js/table.js';
        script.async = true;

        document.body.appendChild(script);
    }

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                            Panel de control
                            <small>Gestiona tu aplicación</small>
                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="/"><i className="fa fa-dashboard" />Panel de control</a></li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section>
                        <div className="col-md-4">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Productos Añadidos Recientemente</h3>

                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                        </button>
                                        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div class="box-body">
                                    <ul class="products-list product-list-in-box">
                                        <li class="item">
                                            <div class="product-img">
                                                <img src="dist/img/default-50x50.gif" alt="Product Image" />
                                            </div>
                                            <div class="product-info">
                                                <a href="javascript:void(0)" class="product-title">Bocata Pollo<span class="label label-warning pull-right">4€</span></a>
                                                <span class="product-description">
                                                    Bocadillo completo de pollo.
                        </span>
                                            </div>
                                        </li>
                                        <li class="item">
                                            <div class="product-img">
                                                <img src="dist/img/default-50x50.gif" alt="Product Image" />
                                            </div>
                                            <div class="product-info">
                                                <a href="javascript:void(0)" class="product-title">Nestea
                      <span class="label label-info pull-right">2€</span></a>
                                                <span class="product-description">
                                                    Refrigerio de te.
                        </span>
                                            </div>
                                        </li>
                                        <li class="item">
                                            <div class="product-img">
                                                <img src="dist/img/default-50x50.gif" alt="Product Image" />
                                            </div>
                                            <div class="product-info">
                                                <a href="javascript:void(0)" class="product-title">Pinchos <span class="label label-danger pull-right">3€</span></a>
                                                <span class="product-description">
                                                    Tapa de pinchos
                        </span>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>
                                <div class="box-footer text-center">
                                    <a href="javascript:void(0)" class="uppercase">Ver todos los Productos</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div class="box box-primary">
                                <div class="box-header ui-sortable-handle">
                                    <i class="ion ion-clipboard"></i>

                                    <h3 class="box-title">To Do List</h3>

                                    <div class="box-tools pull-right">
                                        <ul class="pagination pagination-sm inline">
                                            <li><a href="#">«</a></li>
                                            <li><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">»</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="box-body">
                                    <ul class="todo-list ui-sortable">
                                        <li>
                                            <span class="handle ui-sortable-handle">
                                                <i class="fa fa-ellipsis-v"></i>
                                                <i class="fa fa-ellipsis-v"></i>
                                            </span>
                                            <input type="checkbox" value="" />
                                            <span class="text">Llamar proveedor de carne</span>
                                            <small class="label label-danger"><i class="fa fa-clock-o"></i></small>
                                            <div class="tools">
                                                <i class="fa fa-edit"></i>
                                                <i class="fa fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle ui-sortable-handle">
                                                <i class="fa fa-ellipsis-v"></i>
                                                <i class="fa fa-ellipsis-v"></i>
                                            </span>
                                            <input type="checkbox" value="" />
                                            <span class="text">Limpieza de cocina completa</span>
                                            <small class="label label-info"><i class="fa fa-clock-o"></i> 4 horas</small>
                                            <div class="tools">
                                                <i class="fa fa-edit"></i>
                                                <i class="fa fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle ui-sortable-handle">
                                                <i class="fa fa-ellipsis-v"></i>
                                                <i class="fa fa-ellipsis-v"></i>
                                            </span>
                                            <input type="checkbox" value="" />
                                            <span class="text">Ampliar terraza (papeles ayuntamiento)</span>
                                            <small class="label label-warning"><i class="fa fa-clock-o"></i> 1 hora</small>
                                            <div class="tools">
                                                <i class="fa fa-edit"></i>
                                                <i class="fa fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle ui-sortable-handle">
                                                <i class="fa fa-ellipsis-v"></i>
                                                <i class="fa fa-ellipsis-v"></i>
                                            </span>
                                            <input type="checkbox" value="" />
                                            <span class="text">Organizar horarios camareros</span>
                                            <small class="label label-success"><i class="fa fa-clock-o"></i> 30 minutos</small>
                                            <div class="tools">
                                                <i class="fa fa-edit"></i>
                                                <i class="fa fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle ui-sortable-handle">
                                                <i class="fa fa-ellipsis-v"></i>
                                                <i class="fa fa-ellipsis-v"></i>
                                            </span>
                                            <input type="checkbox" value="" />
                                            <span class="text">Revisar e-mail</span>
                                            <small class="label label-primary"><i class="fa fa-clock-o"></i></small>
                                            <div class="tools">
                                                <i class="fa fa-edit"></i>
                                                <i class="fa fa-trash-o"></i>
                                            </div>
                                        </li>
                                        <li>
                                            <span class="handle ui-sortable-handle">
                                                <i class="fa fa-ellipsis-v"></i>
                                                <i class="fa fa-ellipsis-v"></i>
                                            </span>
                                            <input type="checkbox" value="" />
                                            <span class="text">Arreglar Fogon cocina</span>
                                            <small class="label label-default"><i class="fa fa-clock-o"></i> 1 hora</small>
                                            <div class="tools">
                                                <i class="fa fa-edit"></i>
                                                <i class="fa fa-trash-o"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="box-footer clearfix no-border">
                                    <button type="button" class="btn btn-default pull-right"><i class="fa fa-plus"></i> Añadir Tarea</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* /.content */}
                </div>

            </div>
        )
    }
}
