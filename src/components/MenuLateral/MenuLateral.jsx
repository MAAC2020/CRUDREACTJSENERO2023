import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
//obtener el contexto del usuario
import LoginContext from "../../contexts/LoginProvider";

//@param {Object} estilo: son los estilos del color de fondo del menu
const MenuLateral = ({ estilo }) => {
  //contexto global del usuario logueado
  const { user, login, logout } = useContext(LoginContext);
  return (
    <>
      {/* <!--NAVBAR--> */}
      <nav className="navbar navbar-dark" style={estilo}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menu"
            aria-controls="menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="text-rigth">
            <a className="navbar-brand">{user && user[1]}</a>
            <img
              src="https://e7.pngegg.com/pngimages/852/365/png-clipart-chanel-no-5-logo-fashion-chanel-logo-text-perfume.png"
              width={70}
            ></img>
          </div>
        </div>
      </nav>
      {/* <!--FIN NAVBAR--> */}

      {/* <!--SIDEBAR--> */}
      <div
        className="offcanvas offcanvas-start text-white"
        style={estilo}
        tabIndex="-1"
        id="menu"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menú
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <hr />
        <div className="offcanvas-body">
          {/* <!--NAV VERTICAL--> */}
          <ul className="nav flex-column nav-pills mb-auto">
            {/* <li className="nav-item">
              <NavLink
                to="persona/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link text-white"
                }
                aria-current="page"
              >
                <i className="bi bi-house-door-fill"></i> Inicio
              </NavLink>
            </li> */}
            <li className="nav-item dropdown">
              <NavLink
                to="persona/"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link dropdown-toggle text-white active"
                    : "nav-link dropdown-toggle text-white text-white"
                }
              >
                <i className="bi bi-list-ul"></i> Persona
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="persona/">
                    Registrar
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                  <NavLink className="dropdown-item" to="persona/consultar">
                    Consultar
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* ADMINISTRACION */}
            <li className="nav-item dropdown">
              <NavLink
                to="usuario/"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="false"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link dropdown-toggle text-white active"
                    : "nav-link dropdown-toggle text-white text-white"
                }
              >
                <i className="bi bi-list-ul"></i> Administración
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="usuario/">
                    Registrar Usuario
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                  <NavLink className="dropdown-item" to="usuario/consultar">
                    Consultar Usuario
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* FIN ADMINISTRACION */}
            <li className="nav-item">
              {/* <NavLink
                to="componentes/1"
                className="nav-link text-white"
                href="#"
              >
                <i className="bi bi-list-ul"></i> Menu Lateral
              </NavLink> */}
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                <i className="bi bi-list-ul"></i> Roles
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link disabled">
                <i className="bi bi-list-ul"></i> Disabled
              </a>
            </li>
          </ul>
          {/* <!-- FIN NAV VERTICAL--> */}
          <hr />
        </div>
        {/* <!--CERRAR SESION--> */}
        <ul className="nav flex-column nav-pills mt-auto">
          <li className="nav-item">
            {/* BOTON PARA CERRAR LA SESION */}
            <button className="nav-link text-white" onClick={() => logout()}>
              <i className="bi bi-box-arrow-left"></i> Cerrar Sesión
            </button>
          </li>
        </ul>
        {/* <!--FIN CERRAR SESION--> */}
      </div>
      {/* <!--FIN SIDEBAR--> */}
    </>
  );
};

export default MenuLateral;
