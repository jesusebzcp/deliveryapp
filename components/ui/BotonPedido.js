import React, { useContext } from 'react';
import { Button, Text, Icon, Badge } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import PedidoContext from '../../context/pedidos/pedidosContext';

const BotonPedido = () => {
  const navigation = useNavigation();

  //Leer el objecto de pedido
  const { pedido } = useContext(PedidoContext);
  if (pedido.length === 0) return null;
  const pedidoCarrito = pedido.length;
  return (
    <Button
      success
      transparent
      active
      onPress={() => navigation.navigate('ResumenPedido')}
    >
      <Text>
        Ir <Icon style={{ fontSize: 15, color: 'green' }} active name="cart" />
        <Text style={{ fontSize: 15, color: 'red' }}> {pedidoCarrito}</Text>
      </Text>
    </Button>
  );
};

export default BotonPedido;
