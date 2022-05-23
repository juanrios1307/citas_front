import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Grid,
  Card,
  Container,
  Row,
  Text,
  Divider,
  Col,
} from "@nextui-org/react";
import Header from "../components/header";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Button from "@mui/material/Button";
import router from "next/router";

export default function App() {
  const [citas, setCitas] = useState([]);

  const getCitas = async () => {
    setCitas([]);

    const url = "https://citasback.herokuapp.com/api/cita";
    const config = {
      method: "GET",
      url: url,
    };
    const response = await Axios(config);
    const data = response.data.data;

    await setCitas(data);
    console.log(data);
  };

  const deleteCita = async (id) => {
    const url = `https://citasback.herokuapp.com/api/cita/${id}`;
    const config = {
      method: "DELETE",
      url: url,
    };
    const response = await Axios(config);
    const data = response.data.data;
    console.log(data);

    window.location.reload(false);
  };

  const editCita = async (id) => {
    //const element = <Editar id={id} />;
    router.push({
      pathname: "/editar",
      query: { id: id },
    });
  };

  useEffect(() => {
    getCitas();
  }, []);

  return (
    <Container>
      <Header />

      <Grid.Container gap={2} justify="center" align="center">
        {citas.map((cita) => {
          return (
            <Grid  key={cita._id} xs={12} sm={4} justify="center" align="center">
              <Card css={{ mw: "400px" }}>
                <Card.Header>
                  <Row>
                    <Col>
                      <Text>
                        {cita.paciente.nombre} {cita.paciente.apellido}
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text>{cita.paciente.cedula}</Text>
                    </Col>
                  </Row>
                </Card.Header>
                <Divider />
                <Card.Body>
                  <Grid.Container gap={2} justify="center">
                    <Grid xs={5}>
                      <Row>
                        <Col>
                          <Text>{moment(cita.fecha).format("L")}</Text>
                          <Text>{cita.lugar}</Text>
                          <Text>{cita.tramite}</Text>
                          <Text>{cita.estado}</Text>
                        </Col>
                      </Row>
                    </Grid>

                    <Grid xs={3}>
                      <Row>
                        <Button variant="outlined" color="error">
                          <DisabledByDefaultIcon />
                        </Button>
                      </Row>
                    </Grid>
                    <Grid xs={3}>
                      <Row>
                        <Button variant="outlined" color="success">
                          <ThumbUpAltIcon />
                        </Button>
                      </Row>
                    </Grid>
                  </Grid.Container>
                </Card.Body>
                <Divider />
                <Card.Footer>
                  <Row>
                    <Col>
                      <Text>{cita.notas}</Text>
                      <Text>{moment(cita.fechaEdicion).format("L")}</Text>
                    </Col>
                    <Col>
                      <Row justify="flex-end">
                        <Button
                          variant="outlined"
                          onClick={() => editCita(cita._id)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => deleteCita(cita._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    </Container>
  );
}
