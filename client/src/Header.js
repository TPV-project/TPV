import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div>
            <header className="main-header">
            {/* Logo */}
            <a href="/" className="logo">
                {/* mini logo for sidebar mini 50x50 pixels */}
                <span className="logo-mini"><b>M</b>T</span>
                {/* logo for regular state and mobile devices */}
                <span className="logo-lg"><b>Mik</b>Teck</span>
            </a>
            {/* Header Navbar: style can be found in header.less */}
            <nav className="navbar navbar-static-top">
                {/* Sidebar toggle button*/}
                <a href="fake_url" className="sidebar-toggle" data-toggle="push-menu" role="button">
                <span className="sr-only">Toggle navigation</span>
                </a>
                {/* Navbar Right Menu */}
                <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    {/* User Account: style can be found in dropdown.less */}
                    <li className="dropdown user user-menu">
                    <a href="fake_url" className="dropdown-toggle" data-toggle="dropdown">
                        <img src="dist/img/avatar5.png" className="user-image" alt="User" />
                        <span className="hidden-xs">Rafa Serrano</span>
                    </a>
                    <ul className="dropdown-menu">
                        {/* User image */}
                        <li className="user-header">
                        <img src="dist/img/avatar5.png" className="img-circle" alt="User" />
                        <p>
                        Rafa Serrano
                        </p>
                        </li>                                                
                        <li className="user-footer">
                        <div className="pull-left">
                            <a href="fake_url" className="btn btn-default btn-flat">Perfil</a>
                        </div>
                        <div className="pull-right">
                            <a href="fake_url" className="btn btn-default btn-flat">Cerrar sesión</a>
                        </div>
                        </li>
                    </ul>
                    </li>
                    {/* Control Sidebar Toggle Button */}
                </ul>
                </div>
            </nav>
            </header>

            </div>
        )
    }
}
