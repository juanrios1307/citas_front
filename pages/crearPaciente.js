import { Form } from "antd";
import { Container, Card, Row, Input, Button } from "@nextui-org/react";

import Axios from "axios";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} es requerido!",
  types: {
    email: "${label} no es un correo valido!",
  },
};
/* eslint-enable no-template-curly-in-string */

export default function crearPaciente() {
  const onFinish = async (values) => {
    console.log(values);

    const url = "http://localhost:5000/api/paciente";
    const config = {
      method: "POST",
      url: url,
      data: values.user,
    };

    const response = await Axios(config);

    const mensaje = response.data.message;
    const status = response.status;

    console.log(mensaje);
  };

  return (
    <Container>
      <Card>
        <Row justify="center" align="center">
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "nombre"]}
              label="Nombre"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "apellido"]}
              label="Apellido"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "cedula"]}
              label="Cedula"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "correo"]}
              label="Correo"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "telefono"]}
              label="Telefono"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Card>
    </Container>
  );
}
