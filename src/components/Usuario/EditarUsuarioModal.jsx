import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//importacion de react hook forms
import { useForm } from "react-hook-form";
//importacion de moment js para fechas
import moment from "moment";
//importacion de la funcion asincrona para actualizar
import actualizar from "../../helpers/update/actualizar";
//importacion de sweet alert
import sweetAlert from "../../helpers/sweetalert/sweetAlert";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion de estilos de bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//importacion Boton
import Boton from "../Button/Boton";

const EditarUsuarioModal = ({
  elementoEditar,
  show,
  setShow,
  handleClose,
  handleShow,
  obtenerRegistrosTabla,
}) => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  //cargar 1 sola vez cada vez que se llama el componente
  useEffect(() => {
    console.log("USE EFECT");
  }, []);
  //inicializar los valores por defecto del objeto que se le pasa al dar click
  //desestructuracion para modificar la propiedad de la fecha_nacimiento
  //formato de fechas año-mes-dia
  //YYYY-MM-DD
  //cualquier valor del formulario es necesario modificarlo aqui
  //estado para valores por defecto del formulario
  const [defaultValues, setDefaultValues] = useState({
    ...elementoEditar,
  });

  //estado de mostrar bloquear el formulario de editar
  const [disabledForm, setDisabledForm] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    //se le pasa el valor del estado
    defaultValues: defaultValues,
  });

  const onSubmit = async (datosForm) => {
    //mostrar loader
    mostrarLoader();
    //modificar el estado de la data
    let tabla = "Usuario";
    //se llama la funcion para insertar a la persona
    //@param {Array} datos: son los datos en objeto del formulario
    //@param {String} tabla: es el nombre de la tabla
    let update = await actualizar(datosForm, tabla);
    //ocultar loader
    ocultarLoader();
    //si la respuesta es success mostrar alerta de success
    //de lo contrario mostrar alerta de error
    //@param {String} icon: es el icono
    //@param {String} title: es el titulo de la alerta
    //@param {String} text: es el texto de la alerta
    update == "success"
      ? sweetAlert("success", "Actualizado!", "Actualizado Correctamente")
      : sweetAlert(
          "error",
          "Error!",
          "Ups lo sentimos hubo un error intenta mas tarde!"
        );

    //cerrar el formulario
    handleClose();

    //recargar la tabla
    obtenerRegistrosTabla();

    //limpiar el formulario
    //reset();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset disabled={disabledForm}>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 rounded border border-2"
            >
              {/* FORMULARIO */}
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Usuario
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    type="email"
                    {...register("user", { required: true })}
                  />
                  {errors.user && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    {...register("pass", { required: true })}
                  />
                  {errors.pass && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">rol</Form.Label>
                  <Form.Select {...register("rol", { required: true })}>
                    <option value="">Seleccione</option>
                    <option value="admin">admin</option>
                    <option value="tecnico">tecnico</option>
                  </Form.Select>
                  {errors.rol && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                {/* SECCION ESTADO */}

                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">estado</Form.Label>
                  <Form.Select {...register("estado", { required: true })}>
                    <option value="">Seleccione</option>
                    <option value="activo">activo</option>
                    <option value="inactivo">inactivo</option>
                  </Form.Select>
                  {errors.estado && (
                    <span className="text-danger d-block">
                      Este campo es requerido
                    </span>
                  )}
                </Col>
                {/* FIN SECCION ESTADO */}
              </Row>
              <Row className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Boton
                    variant="primary-jelpit"
                    text={"Guardar"}
                    type="submit"
                    icon={"bi bi-cloud-arrow-up-fill"}
                  ></Boton>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* PASAR LO CONTRARIO DE LO QUE TIENE DISABLED FORM PARA PODER EDITAR ELFORM */}
          <Button
            variant="warning"
            onClick={() => setDisabledForm(!disabledForm)}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarUsuarioModal;
