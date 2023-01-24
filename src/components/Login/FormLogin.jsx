import React, { useContext } from "react";
//importacion de componentes de bootstap
import Boton from "../Button/Boton";
//importacion de useForm para formularios
import { useForm } from "react-hook-form";
//importacion de la alertas
import sweetAlert from "../../helpers/sweetalert/sweetAlert";
//importacion de estilos de bootstrap
import { Container, Row, Col, Form } from "react-bootstrap";
import Boton from "../Button/Boton";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion de la funcion para loguearse
import loguearse from "../../helpers/loguerase/loguearse";
//importacion del contexto del Login
import LoginContext from "../../contexts/LoginProvider";

const FormLogin = () => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  //contexto global del login
  const { login, logout } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  //funcion cuando se sube el formulario
  const onSubmit = async (datos) => {
    mostrarLoader();
    let tabla = "Usuario";
    //se llama la funcion para insertar a la persona
    //@param {Array} datos: son los datos en objeto del formulario
    //@param {String} tabla: es el nombre de la tabla
    let get = await loguearse(datos, tabla);

    //si la respuesta es un arreglo
    //de lo contrario mostrar alerta de error
    //@param {String} icon: es el icono
    //@param {String} title: es el titulo de la alerta
    //@param {String} text: es el texto de la alerta
    get
      ? sweetAlert("success", "Bienvenido!", "Inicio Correcto")
      : sweetAlert(
          "error",
          "Usuario o Contraseña Incorrectos!",
          "Ups lo sentimos hubo un error intenta mas tarde!"
        );
    //pasar al metodo del contexto la respuesta obtenida del login
    //si la respuesta es null, entonces pasar al login un arreglo , en caso contrario pasar el registro del logueo
    get == null ? login(null) : login(get);

    // console.log(get);
    //se ejecuta la funcion para ocultar el loader
    ocultarLoader();

    // console.log(data);
    //limpiar el formulario
    reset();
  };
  return (
    <>
      {/* FORMULARIO LOGIN */}
      <Container>
        <Row className={"justify-content-center"}>
          <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            {/* FORMULARIO */}
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded"
            >
              <Form.Group className="text-center mb-4">
                <h1>Login</h1>
              </Form.Group>
              <Row>
                <Col xs={12}>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="campo1" className="text-muted fw-bold">
                      <i className="bi bi-person-circle"> </i>Usuario
                    </Form.Label>
                    <Form.Control
                      {...register("user", { required: true })}
                      placeholder="usuario"
                      id="campo1"
                      className="rounded-4 pt-2 pb-2"
                    ></Form.Control>
                    {errors.user && (
                      <span className="text-danger d-block">
                        Este campo es requerido
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="campo2" className="text-muted fw-bold">
                      <i className="bi bi-eye-fill"> </i>Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      {...register("pass", { required: true })}
                      placeholder="contraseña"
                      id="campo2"
                      className="rounded-4 pt-2 pb-2"
                    ></Form.Control>
                    {errors.pass && (
                      <span className="text-danger d-block">
                        Este campo es requerido
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="d-flex justify-content-center">
                    <hr className="w-100 mx-4"></hr>
                  </Form.Group>
                  <Form.Group className="text-center mb-4">
                    <Boton
                      variant="primary"
                      className="rounded-pill w-100 pt-2 pb-2"
                      text={"Iniciar Sesion"}
                      type="submit"
                      size="md"
                      icon={"bi bi-box-arrow-in-right"}
                    ></Boton>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            {/* FIN FORMULARIO */}
          </Col>
        </Row>
      </Container>
      {/* FIN FORMULARIO LOGIN */}
    </>
  );
};

export default FormLogin;
