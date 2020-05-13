import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Text, H1, H3, Button } from "native-base";
import PedidoContext from "../context/pedidos/pedidosContext";

const ProgresoPedido = () => {
  const { idPedido } = useContext(PedidoContext);
  return <Text>{idPedido}</Text>;
};

export default ProgresoPedido;
