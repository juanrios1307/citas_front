import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spacer } from "@nextui-org/react";
import Header from "../components/header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select  from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import router from "next/router";
import Axios from "axios";

export default function Crear() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState("");
  const [tramite, setTramite] = useState("");
  const [fecha, setFecha] = React.useState(null);
  const [lugar, setLugar] = useState("");
  const [notas, setNotas] = useState("");
  const [estado, setEstado] = useState("");

  const getPacientes = async () => {
    setPacientes([]);

    const url = "https://citasback.herokuapp.com/api/paciente";
    const config = {
      method: "GET",
      url: url,
    };
    const response = await Axios(config);
    const data = response.data.data;

    await setPacientes(data);
    console.log(data);
  };

  useEffect(() => {
    getPacientes();
  }, []);

  const submit = async () => {
    const values = {
      paciente: paciente,
      tramite: tramite,
      fecha: fecha,
      lugar: lugar,
      notas: notas,
      estado: estado,
    };

    const url = "https://citasback.herokuapp.com/api/cita";
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
      router.push("/misCitas");
    }
  };

  const handleTramite = (event) => {
    setTramite(event.target.value);
  };

  const handlePaciente = (event) => {
    setPaciente(event.target.value);
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
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel id="demo-simple-select-label">Paciente</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paciente}
                label="Paciente"
                onChange={handlePaciente}
              >
                {pacientes.map((paciente) => (
                  <MenuItem key={paciente._id} value={paciente._id}>{paciente.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
        </Row>

        <Spacer y={1} />

        <Row justify="center" align="center">
          <Col justify="center" align="center">
            <TextField
              required
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
              required
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
            <Button variant="outlined" onClick={submit}>
              Guardar
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
