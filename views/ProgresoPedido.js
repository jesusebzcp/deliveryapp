import React, { useContext, useEffect, useState } from 'react';

import { Container, Text, Button, Icon } from 'native-base';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image } from 'react-native';

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
      <Text style={{ fontSize: 30 }}>
        {minutes}:{seconds}
      </Text>
    );
  };
  return (
    <Container>
      {tiempo === 0 && (
        <>
          <View style={styles.animationContainer}>
            <Text>Hermos recibido tu orden...</Text>
            <Text>Calculando el tiempo de entrega</Text>
            <Image
              style={styles.image}
              source={require('../assets/espera.png')}
            />
          </View>
        </>
      )}
      {!completado && tiempo > 0 && (
        <>
          <View style={styles.animationContainer}>
            <Text>Preparando todo </Text>
            <Text style={{ fontWeight: 'bold' }}>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
            <Image
              style={styles.image}
              source={require('../assets/tiempo.png')}
            />
          </View>
        </>
      )}
      {completado && (
        <>
          <View style={styles.animationContainer}>
            <Text>Orden lista</Text>
            <Text>Su delivery va en camino</Text>
            <Button
              success
              transparent
              onPress={() => navigation.navigate('Menu')}
            >
              <Text>
                Seguir pidiendo{' '}
                <Icon
                  style={{ fontSize: 18, color: 'green' }}
                  name="arrow-forward"
                />
              </Text>
            </Button>
            <Image
              style={styles.image}
              source={require('../assets/delivery.png')}
            />
            <Text>Gracias por preferirnos</Text>
          </View>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default ProgresoPedido;
