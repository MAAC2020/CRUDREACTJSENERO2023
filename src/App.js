import React, { useContext } from "react";
//insertar persona
import InsertarPersona from "./components/Persona/InsertarPersona";
//tabla persona
import TablaPersona from "./components/Persona/TablaPersona";
import Footer from "./components/Footer/Footer";
import MenuLateral from "./components/MenuLateral/MenuLateral";
import FormLogin from "./components/Login/FormLogin";
//importacion de Routes
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader/Loader";
import LoginContext, { LoginProvider } from "./contexts/LoginProvider";
import { LoaderProvider } from "./contexts/LoaderProvider";
import LoaderContext from "./contexts/LoaderProvider";
import TablaUsuario from "./components/Usuario/TablaUsuario";
import InsertarUsuario from "./components/Usuario/InsertarUsuario";

const App = () => {
  //contextoGlobal del loader
  const { loader } = useContext(LoaderContext);
  //contexto global del usuario logueado
  const { user } = useContext(LoginContext);

  return (
    <>
      {/* si se loguea muestra el menu lateral con las opciones se envuelve toda la aplicacion con el contexto */}
      <MenuLateral estilo={{ backgroundColor: "#4360EF" }} />
      <Routes>
        {/* ruta del formulario por defecto */}
        {/* SI EL USER ES NULO ENTONCES MOSTRAR LA RUTA POR DEFECTO */}
        {user == null && <Route path="*" element={<FormLogin />} />}
        {/* EN CASO CONTRARIO SI TIENE ALGUN VALOR Y EL ROL ES ADMIN Y ESTADO ES ACTIVO MOSTRAR OTRA RUTA */}
        {user && user[3] == "admin" && user[4] == "activo" && (
          <>
            <Route path="*" element={<InsertarPersona />} />
            <Route path="/persona/" element={<InsertarPersona />} />
            <Route path="/persona/consultar" element={<TablaPersona />} />
            <Route path="/usuario" element={<InsertarUsuario />} />
            <Route path="/usuario/consultar" element={<TablaUsuario />} />
          </>
        )}
      </Routes>
      {/* <InsertPersona /> */}
      {/* <InsertFormPersona /> */}
      {/* <TablaPersona /> */}
      <Footer estilo={{ backgroundColor: "#4360EF" }} />
      {/* {console.log(user)} */}
      {/* SI EL LOADER ES TRUE MOSTRARLO EN CASO CONTRARIO OCULTARLO */}
      {loader && <Loader></Loader>}
    </>
  );
};

export default App;
