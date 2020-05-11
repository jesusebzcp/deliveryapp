import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  H1,
  Card,
  CardItem,
} from "native-base";

import pedidoContext from "../context/pedidos/pedidosContext";

const DetalleProducto = () => {
  //PedidoContext
  const { producto } = useContext(pedidoContext);
  //Extraer propiedades necesarias
  const { nombre, imagen, descripcion, precio } = producto;
  return (
    <Container>
      <Content>
        <Image style={styles.imagen} source={{ uri: imagen }} />

        <H1 style={styles.titulo}>{nombre}</H1>
        <Text note style={styles.descripcion}>
          {descripcion}
        </Text>
        <Text style={styles.precio}>Precio:{precio}$</Text>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    height: 200,
  },
  precio: {
    margin: 20,
    textAlign: "center",
  },
  descripcion: {
    marginHorizontal: 10,
    marginVertical: 4,
    color: "#969696",
  },
  titulo: {
    textAlign: "center",
  },
});

export default DetalleProducto;
