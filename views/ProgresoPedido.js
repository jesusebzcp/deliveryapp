import React, { useContext, useEffect, useState } from 'react';

import { Container, Text, H1, Button } from 'native-base';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';
import { useNavigation } from '@react-navigation/native';

const ProgresoPedido = () => {
  const navigation = useNavigation();
  const { idPedido } = useContext(PedidoContext);
  const [tiempo, setTiempo] = useState(0);
  const [completado, setCompletado] = useState(false);
  useEffect(() => {
    obtenerPorducto();
  }, []);

  const obtenerPorducto = async () => {
    await firebase.db
      .collection('ordenes')
      .doc(idPedido)
      .onSnapshot(function (doc) {
        setTiempo(doc.data().tiempoEntrega);
        setCompletado(doc.data().completado);
      });
  };

  const renderer = ({ minutes, seconds }) => {
    return (
      <Text>
        {minutes}:{seconds}
      </Text>
    );
  };
  return (
    <Container>
      {tiempo === 0 && (
        <>
          <Text>Hermos recibido tu orden...</Text>
          <Text>Calculando el tiempo de entrega</Text>
        </>
      )}
      {!completado && tiempo > 0 && (
        <>
          <Text>Su orden estara lista en : </Text>
          <Text>
            <Countdown date={Date.now() + tiempo * 60000} renderer={renderer} />
          </Text>
        </>
      )}
      {completado && (
        <>
          <H1>Orden lista </H1>
          <H1>la beba va en camino ezperanzita maldita criada</H1>

          <Button onPress={() => navigation.navigate('Menu')} rounded block>
            <Text>Comenzar nueva orden</Text>
          </Button>
        </>
      )}
    </Container>
  );
};

export default ProgresoPedido;
