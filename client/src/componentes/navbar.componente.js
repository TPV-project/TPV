import React, { Component }from 'react';
//Iconos
import { ReactComponent as Ajustes } from '../iconos/settings.svg';
import { ReactComponent as Dashboard } from '../iconos/dashboard.svg';
import { ReactComponent as Contabilidad } from '../iconos/briefcase.svg';
import { ReactComponent as Catalogo } from '../iconos/book-open.svg';
import { ReactComponent as Perfil } from '../iconos/user.svg';
import { ReactComponent as Usuarios } from '../iconos/users.svg';

export default class Navbar extends Component {
    render(){
        return(
          <Nav>
            <AlignLeft>
              <LeftList>
                <ProfileItem leftIcon={<Perfil />} path="#">
                  Mi Perfil
                </ProfileItem>
              </LeftList>
            </AlignLeft>
            <CenterLogo></CenterLogo>
            <AlignRight>
              <RightList>
                <NavItem icon={<Dashboard />} path="/" title="Panel de control"/>
                <NavItem icon={<Contabilidad />} path="/tickets" title="tickets"/>
                <NavItem icon={<Contabilidad />} path="#" title="Contabilidad"/>
                <NavItem icon={<Catalogo />} path="/producto" title="Catálogo"/>
                <NavItem icon={<Usuarios />} path="/usuario" title="Usuarios"/>
                <NavItem icon={<Ajustes />} path="/caja" title="Caja"/>
                <NavItem icon={<Ajustes />} path="#" title="Ajustes de administrador"/>
              </RightList>
            </AlignRight>
          </Nav>
        )
    }
}

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">{props.children}</nav>
  );
}

function AlignRight(props) {
  return (
    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">{props.children}</div>
  );
}

function AlignLeft(props) {
  return (
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">{props.children}</div>
  );
}

function CenterLogo(props) {
  return (
    <div class="mx-auto order-0">
      <a className="navbar-brand mx-auto" href="/">MikTec</a>
      {props.children}
    </div>
  );
}

function LeftList(props) {
  return (
    <ul className="navbar-nav mr-auto">{props.children}</ul>
  );
}

function RightList(props) {
  return (
    <ul className="navbar-nav ml-auto">{props.children}</ul>
  );
}

function NavItem(props) {
  return (
    <li className="nav-item">
      <a href={props.path} className="icon-button" id="icono" title={props.title}>
        {props.icon}
      </a>
      {props.children}
    </li>
  );
}

function ProfileItem(props) {
  return(
    <a href={props.path} className="menu-item" id="profile">
      <span className="icon-button" id="icono">{props.leftIcon}</span>
        {props.children}
    </a>
  );
}
