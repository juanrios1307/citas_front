import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import Link from "next/link";

export default function Header() {
  return (
    <Container gap={0}>
      <Spacer y={1} />
      <Row gap={1} wrap>
        <Col>
          <Card hoverable clickable css={{ mw: "300px" }}>
            <Link href="/misCitas">
              <Text h6 size={15} css={{ m: 0 }}>
                Mis Citas
              </Text>
            </Link>
          </Card>
        </Col>
        <Col>
          <Card hoverable clickable css={{ mw: "300px" }}>
            <Link href="/crear">
              <Text h6 size={15} css={{ m: 0 }}>
                Crear Cita
              </Text>
            </Link>
          </Card>
        </Col>
        <Col>
          <Card hoverable clickable css={{ mw: "300px" }}>
            <Link href="/misPacientes">
              <Text h6 size={15} css={{ m: 0 }}>
                Mis Pacientes
              </Text>
            </Link>
          </Card>
        </Col>
        <Col>
          <Card hoverable clickable css={{ mw: "300px" }}>
            <Link href="/crearPaciente">
              <Text h6 size={15} css={{ m: 0 }}>
                Crear Paciente
              </Text>
            </Link>
          </Card>
        </Col>
      </Row>
      <Spacer y={2} />
    </Container>
  );
}
