import React, { Component } from 'react';

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
        {/* /.content */}
        </div>

        </div>
    )
}
}
