import React, { useState, useContext, useEffect } from 'react';

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
  Textarea,
} from 'native-base';

import pedidoContext from '../context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';
import { Alert, View } from 'react-native';

const DetalleEntrega = () => {
  //Redirecionar
  const navigation = useNavigation();

  const [direccion, setDireccion] = useState('');
  const [comentarios, setComentarios] = useState('');

  //extraer el precio del context
  const { producto, guardarPedido } = useContext(pedidoContext);

  //Confirma  si la orden es correcta

  const confirmaOrdne = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido?',
      'Una vez confirmes tu pedido, no lo podras modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Almacenar pedido al pedido principal
            const pedido = {
              ...producto,
              direccion,
              comentarios,
            };
            console.log(pedido);
            guardarPedido(pedido);
            //Navegar hacia el resumen

            navigation.navigate('ResumenPedido');
          },
        },
        {
          text: ' Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container>
      <Content>
        <Form>
          <H1>sumar</H1>
          <View>
            <Input
              onChangeText={(texto) => setDireccion(texto)}
              bordered
              placeholder="Direccion"
            />
          </View>

          <View>
            <Textarea
              onChangeText={(texto) => setComentarios(texto)}
              rowSpan={3}
              bordered
              placeholder="Comentarios"
            />
          </View>
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

export default DetalleEntrega;
