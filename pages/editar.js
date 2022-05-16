import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spacer } from "@nextui-org/react";
import Header from "../components/header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useRouter } from "next/router";
import router from "next/router";
import Axios from "axios";

export default function Editar(props) {
  const { query } = useRouter();

  const [paciente, setPaciente] = useState("");
  const [tramite, setTramite] = useState("");
  const [fecha, setFecha] = React.useState(null);
  const [lugar, setLugar] = useState("");
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState("");

  const getCita = async () => {
    console.log(query.id);

    const url = `http://localhost:5000/api/cita/${query.id}`;
    const config = {
      method: "GET",
      url: url,
    };
    const response = await Axios(config);
    const data = response.data.data;

    console.log(data);

    setPaciente(data.paciente.nombre + " " + data.paciente.apellido);
    setTramite(data.tramite);
    setFecha(data.fecha);
    setLugar(data.lugar);
    setNotas(data.notas);
    setEstado(data.estado);
  };

  useEffect(() => {
    getCita();
  }, []);

  const editCita = async () => {
    const values = {
      tramite: tramite,
      fecha: fecha,
      lugar: lugar,
      notas: notas,
      estado: estado,
    };

    const url = `http://localhost:5000/api/cita/${query.id}`;
    const config = {
      method: "PUT",
      url: url,
      data: values,
    };

    const response = await Axios(config);

    const mensaje = response.data.message;
    const status = response.status;
    console.log(mensaje);

    if (status == 200) {
      router.push("/misCitas");
    }
  };

  const handleTramite = (event) => {
    setTramite(event.target.value);
  };

  const handleLugar = (event) => {
    setLugar(event.target.value);
  };

  const handleNotas = (event) => {
    setNotas(event.target.value);
  };

  const handleEstado = (event) => {
    setEstado(event.target.value);
  };

  return (
    <Container gap={10}>
      <Header />
      <Card gap={10}>
        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              disabled
              id="outlined-required"
              label="Paciente"
              value={paciente}
            />
          </Col>
        </Row>

        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              id="outlined-required"
              label="Tramite"
              value={tramite}
              onChange={handleTramite}
            />
          </Col>
        </Row>
        <Spacer y={1} />
        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Fecha"
                value={fecha}
                onChange={(newValue) => {
                  setFecha(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                minDateTime={new Date()}
              />
            </LocalizationProvider>
          </Col>
        </Row>
        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              id="outlined-required"
              label="Lugar"
              value={lugar}
              onChange={handleLugar}
            />
          </Col>
        </Row>
        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              id="outlined-required"
              label="Notas"
              value={notas}
              onChange={handleNotas}
            />
          </Col>
        </Row>
        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              id="outlined-required"
              label="Estado"
              value={estado}
              onChange={handleEstado}
            />
          </Col>
        </Row>

        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <Button variant="outlined" onClick={editCita}>
              Editar
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
