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
import firebase from "../firebase";

import pedidoContext from "../context/pedidos/pedidosContext";

import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
const ResumenPedido = () => {
  const navigation = useNavigation();
  //Context de pedido
  const { pedido, total, mostrarResumen, eliminarProducto } = useContext(
    pedidoContext
  );
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
    Alert.alert(
      "Revisa tu pedido",
      "Una vez que revisas tu pedido no podras cambiarlo",
      [
        {
          text: "Confirmar",
          onPress: async () => {
            //Escribir en firebase
            //Crear un objecto con toda la infromacion que requerimos
            const pedidoObj = {
              tiempoEntrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido, //Array
              creado: Date.now(),
            };
            try {
              const pedido = await firebase.db
                .collection("ordenes")
                .add(pedidoObj);
              pedidoRealizado(pedido.id);
              navigation.navigate("ProgresoPedido");
            } catch (error) {
              console.log(error);
            }
          },
        },
        { text: "Revisar", style: "cancel" },
      ]
    );
  };

  const confirmarEliminacion = (id) => {
    Alert.alert("¿Deseas Eliminar este articulo?", "Una vez eliminado", [
      {
        text: "Confirmar",
        onPress: () => {
          //Eliminar del state
          eliminarProducto(id);
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
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
                  <Button onPress={() => confirmarEliminacion(id)} danger full>
                    <Text>Eliminar</Text>
                  </Button>
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
          <Button onPress={() => progresoPedido()}>
            <Text>Ordenar Pedido </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResumenPedido;
