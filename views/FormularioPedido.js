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
import FirebaseContext from '../context/firebase/firebaseContext';

const FormularioPedido = () => {
  const { usuario } = useContext(FirebaseContext);

  const { uid, displayName } = usuario;

  //Redirecionar
  const navigation = useNavigation();
  const [cantidad, setcantidad] = useState(1);

  const [total, setotal] = useState(0);
  const [comentarios, setComentarios] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, settelefono] = useState('');

  //extraer el precio del context
  const { producto, guardarPedido, pedido } = useContext(pedidoContext);
  console.log(' aqui va el', pedido);
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
      '¿Deseas confirmar tu pedido?',
      'Una vez confirmes tu pedido, no lo podras modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Almacenar pedido al pedido principal
            const pedido = {
              ...producto,
              cantidad,
              total,
              comentarios,
              direccion,
              uid,
              displayName,
              telefono,
            };

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
                style={{ textAlign: 'center', fontSize: 20 }}
                onChangeText={(cantidad) => setcantidad(cantidad)}
              />
            </Col>

            <Col>
              <Button props dark onPress={() => incrementarUno()}>
                <Icon name="add" />
              </Button>
            </Col>
          </Grid>
          {pedido.length === 0 && (
            <>
              <Grid>
                <Col>
                  <View>
                    <Input
                      bordered
                      onChangeText={(texto) => setDireccion(texto)}
                      bordered
                      placeholder="Direccion de entrega"
                    />
                  </View>
                </Col>

                <Col>
                  <View>
                    <Input
                      bordered
                      keyboardType="numeric"
                      onChangeText={(texto) => settelefono(texto)}
                      name={telefono}
                      placeholder="Numero por si las dudas"
                    />
                  </View>
                </Col>
              </Grid>
            </>
          )}
          <View>
            <Textarea
              onChangeText={(texto) => setComentarios(texto)}
              rowSpan={3}
              bordered
              placeholder="Comentarios"
            />
          </View>
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
