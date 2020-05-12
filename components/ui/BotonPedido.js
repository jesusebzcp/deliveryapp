import React, { useContext } from "react";
import { Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

import PedidoContext from "../../context/pedidos/pedidosContext";

const BotonPedido = () => {
  const navigation = useNavigation();

  //Leer el objecto de pedido
  const { pedido } = useContext(PedidoContext);
  if (pedido.length) return null;

  return (
    <Button onPress={() => navigation.navigate("ResumenPedido")}>
      <Text>ir al carrito</Text>
    </Button>
  );
};

export default BotonPedido;
