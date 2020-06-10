import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
                <div>
                <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">
                    {/* sidebar menu: : style can be found in sidebar.less */}
                    <ul className="sidebar-menu" data-widget="tree">
                    <li className="header">MENU DE NAVEGACIÓN</li>
                    <li><a href="/"><i className="fa fa-tachometer" /> <span>Panel de control</span></a></li>
                    <li className="treeview">
                        <a href="fake_url">
                            <i className="fa fa-book" /> <span>Catálogo</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right" />
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="/productos"><i className="fa fa-list" />Productos</a></li>
                            <li><a href="/categorias"><i className="fa fa-tag" />Categorias</a></li>
                        </ul>
                    </li>
                    <li className="treeview">
                        <a href="fake_url">
                            <i className="fa fa-book" /> <span>Contabilidad</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right" />
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a href="/tickets"><i className="fa fa-list" />Tickets</a></li>
                            <li><a href="/cajas"><i className="fa fa-tag" />Caja</a></li>
                        </ul>
                    </li>
                    <li><a href="/usuarios"><i className="fa fa-user" /> <span>Usuarios</span></a></li>
                    <li><a href="fake_url"><i className="fa fa-cogs" /> <span>Ajustes</span></a></li>
                    </ul>
                </section>
                {/* /.sidebar */}
                </aside>
                </div>
        )
    }
}
