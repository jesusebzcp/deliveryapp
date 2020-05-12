import React, { useContext, useEffect } from "react";

import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from "native-base";

import pedidoContext from "../context/pedidos/pedidosContext";

import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const ResumenPedido = () => {
  const navigation = useNavigation();
  //Context de pedido
  const { pedido, total, mostrarResumen } = useContext(pedidoContext);
  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulos) => nuevoTotal + articulos.total,
      0
    );
    mostrarResumen(nuevoTotal);
  };

  const progresoPedido = () => {
    navigation.navigate("ProgresoPedido");
    Alert.alert(
      "Revisa tu pedido",
      "Una vez que revisas tu pedido no podras cambiarlo",
      [
        {
          text: "Confirmar",
          onPress: () => {
            navigation.navigate("ProgresoPedido");
          },
        },
        { text: "Revisar", style: "cancel" },
      ]
    );
  };
  return (
    <Container>
      <Content>
        <H1>Resumen de pedido</H1>

        {pedido.map((producto, i) => {
          const { cantidad, nombre, imagen, id, precio } = producto;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{ uri: imagen }} />
                </Left>
                <Body>
                  <Text>{nombre}</Text>
                  <Text>Cantidad:{cantidad}</Text>
                  <Text>Precio{precio}$</Text>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <H1>Total a pagar:{total}$</H1>

        <Button onPress={() => navigation.navigate("Menu")}>
          <Text>Seguir pediendo</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => ProgresoPedido}>
            <Text>Ordenar Pedido </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResumenPedido;
