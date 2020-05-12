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
  Footer,
  FooterTab,
} from "native-base";

import pedidoContext from "../context/pedidos/pedidosContext";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const FormularioPedido = () => {
  //Redirecionar
  const navigation = useNavigation();
  const [cantidad, setcantidad] = useState(1);
  const [total, setotal] = useState(0);
  console.log(total);

  //extraer el precio del context
  const { producto } = useContext(pedidoContext);
  const { precio } = producto;

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  //calcular
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    setotal(totalPagar);
  };

  //Decrementar
  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      setcantidad(nuevaCantidad);
    }
  };
  //Incrementar
  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    setcantidad(nuevaCantidad);
  };
  //Confirma  si la orden es correcta

  const confirmaOrdne = () => {
    Alert.alert(
      "¿Deseas confirmar tu pedido?",
      "Una vez confirmes tu pedidos, no lo podras modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            //Almacenar pedido al pedido principal
            const pedido = {
              ...producto,
              cantidad,
              total,
            };
            console.log(pedido);
            //Navegar hacia el resumen
          },
        },
        {
          text: " Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <Container>
      <Content>
        <Form>
          <H1>sumar</H1>
          <Grid>
            <Col>
              <Button props dark onPress={() => decrementarUno()}>
                <Icon name="remove" />
              </Button>
            </Col>

            <Col>
              <Input
                keyboardType="numeric"
                value={cantidad.toString()}
                style={{ textAlign: "center", fontSize: 20 }}
                onChangeText={(cantidad) => setcantidad(cantidad)}
              />
            </Col>

            <Col>
              <Button props dark onPress={() => incrementarUno()}>
                <Icon name="add" />
              </Button>
            </Col>
          </Grid>

          <Text>Total{total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => confirmaOrdne()}>
            <Text>Agregar al pedido </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormularioPedido;
