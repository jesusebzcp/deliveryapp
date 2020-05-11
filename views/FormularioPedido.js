import React, { useState, useContext, useEffect } from "react";

import {
  Container,
  Icon,
  Input,
  Grid,
  Col,
  Content,
  Button,
  Text,
  H1,
  Form,
} from "native-base";

import pedidoContext from "../context/pedidos/pedidosContext";

const FormularioPedido = () => {
  //Precio para sumar la cantidad total
  const { producto } = useContext(pedidoContext);
  const { precio } = producto;

  //state cantidad
  const [cantidad, setCantidad] = useState(1);
  //StatePrecio
  const [total, setTotal] = useState(0);
  //Almacena cantidad via input

  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setTotal(totalPagar);
  };

  const incrementarUno = () => {
    const NuevaCantidad = parseInt(cantidad) + 1;

    setCantidad(NuevaCantidad);
  };
  const decrementarUno = () => {
    if (cantidad > 1) {
      const NuevaCantidad = parseInt(cantidad) - 1;
      setCantidad(NuevaCantidad);
    }
  };
  useEffect(() => {
    cantidadPagarTotal();
  }, [cantidad]);
  function cantidadPagarTotal() {
    calcularTotal();
  }
  return (
    <Container>
      <Content>
        <Form>
          <H1>cantidad</H1>
          <Grid>
            <Col>
              <Button
                onPress={() => decrementarUno()}
                style={{ justifyContent: "center" }}
              >
                <Icon name="remove" />
              </Button>
            </Col>
            <Col style={{ justifyContent: "center" }}>
              <Input
                keyboardType="numeric"
                style={{ textAlign: "center" }}
                value={cantidad.toString()}
                onChangeText={() => calcularCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button
                onPress={() => incrementarUno()}
                calcularCantidad
                style={{ justifyContent: "center" }}
              >
                <Icon name="add" />
              </Button>
            </Col>
          </Grid>
          <Text>Total:{total}$</Text>
        </Form>
      </Content>
    </Container>
  );
};

export default FormularioPedido;
