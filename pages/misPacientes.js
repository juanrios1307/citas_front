import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Grid, Card, Container, Row, Text, Divider } from "@nextui-org/react";
import Header from "../components/header";
export default function App() {
  const [pacientes, setPacientes] = useState([]);

  const getPacientes = async () => {
    setPacientes([]);

    const url = "http://localhost:5000/api/paciente";
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

  return (
    <Container>
      <Header />

      <Grid.Container gap={2} justify="center" align="center">
        {pacientes.map((paciente) => {
          return (
            <Row  key={paciente._id} justify="center" align="center">
              <Grid xs={12} sm={4} justify="center" align="center">
                <Card css={{ mw: "400px" }}>
                  <Card.Header>
                    <Text>
                      {paciente.nombre} {paciente.apellido}
                    </Text>
                  </Card.Header>
                  <Divider />
                  <Card.Body>
                    <Text>{paciente.correo}</Text>
                    <Text>{paciente.telefono}</Text>
                  </Card.Body>
                  <Divider />
                  <Card.Footer>
                    <Text>{paciente.cedula}</Text>
                  </Card.Footer>
                </Card>
              </Grid>
            </Row>
          );
        })}
      </Grid.Container>
    </Container>
  );
}
