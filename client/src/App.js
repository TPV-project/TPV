import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



import EditarProducto from "./componentes/editar-producto.componente";
import CrearProducto from "./componentes/crear-producto.componente";
import EliminarProducto from "./componentes/eliminar-producto.componente";
import Base from "./componentes/home.componente"


function App() {
  return (
    <Router>
      <div className="container">
        Hello World!
      </div>
      <div className="container">
      <Route path="/" exact component={Base} />
      <Route path="/editar:id" exact component={EditarProducto} />
      <Route path="/crear" exact component={CrearProducto} />
      <Route path="/eliminar" exact component={EliminarProducto} />
      </div>
    </Router>
  );
}

export default App;
