import React, { useState } from "react";
import { Container, Card, Row, Col, Spacer } from "@nextui-org/react";
import Header from "../components/header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import router from "next/router";
import Axios from "axios";

export default function Crear() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const submit = async () => {
    const values = {
      nombre,
      apellido,
      cedula,
      correo,
      telefono,
    };

    const url = "https://citasback.herokuapp.com/api/paciente";
    const config = {
      method: "POST",
      url: url,
      data: values,
    };

    const response = await Axios(config);

    const mensaje = response.data.message;
    const status = response.status;

    console.log(mensaje);

    if (status === 200) {
      router.push("/misPacientes");
    }
  };

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleApellido = (event) => {
    setApellido(event.target.value);
  };

  const handleCedula = (event) => {
    setCedula(event.target.value);
  };

  const handleCorreo = (event) => {
    setCorreo(event.target.value);
  };

  const handleTelefono = (event) => {
    setTelefono(event.target.value);
  };

  return (
    <Container gap={10}>
      <Header />
      <Card gap={10}>
        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              required
              id="outlined-required"
              label="Nombre"
              value={nombre}
              onChange={handleNombre}
            />
          </Col>
        </Row>
        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              required
              id="outlined-required"
              label="Apellido"
              value={apellido}
              onChange={handleApellido}
            />
          </Col>
        </Row>
        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              required
              id="outlined-required"
              label="Cedula"
              value={cedula}
              onChange={handleCedula}
            />
          </Col>
        </Row>
        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              required
              id="outlined-required"
              label="Correo"
              value={correo}
              onChange={handleCorreo}
            />
          </Col>
        </Row>

        <Spacer y={1} />
        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              required
              id="outlined-required"
              label="Telefono"
              value={telefono}
              onChange={handleTelefono}
            />
          </Col>
        </Row>

        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <Button variant="outlined" onClick={submit}>
              Guardar
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
