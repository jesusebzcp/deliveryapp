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
  Toast,
  Item,
  Label,
} from 'native-base';

import pedidoContext from '../context/pedidos/pedidosContext';
import { useNavigation } from '@react-navigation/native';
import { Alert, View, StyleSheet } from 'react-native';
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
  const [mensajeError, setMensajeError] = useState(null);

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
    if (telefono === '' && direccion == '' && comentarios === '') {
      setMensajeError('Todos los campos son necesedarios');
    } else {
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
    }
  };
  const mostrarAlerta = () => {
    Toast.show({
      text: mensajeError,
      buttonText: 'OK',
      duration: 3000,
    });
  };
  return (
    <Container>
      {mensajeError && mostrarAlerta()}
      <Content style={styles.container}>
        <Form>
          <H1 style={styles.titulo}>Ingresa el numero de articulos</H1>
          <Text style={styles.tituloMini}>
            Por favor ingrese todos los campos
          </Text>
          <Grid style={styles.suma}>
            <Col>
              <Button rounded block props dark onPress={() => decrementarUno()}>
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
              <Button rounded block props dark onPress={() => incrementarUno()}>
                <Icon name="add" />
              </Button>
            </Col>
          </Grid>
          <Grid>
            <Col>
              {pedido.length === 0 && (
                <>
                  <View>
                    <Item>
                      <Icon
                        activate
                        name="pin"
                        style={{ fontSize: 20, color: '#c5d250' }}
                      />
                      <Input
                        placeholder="Domicilio"
                        onChangeText={(texto) => setDireccion(texto)}
                      />
                    </Item>
                  </View>
                </>
              )}
            </Col>
          </Grid>
          {pedido.length === 0 && (
            <>
              <Grid>
                <Col>
                  <View style={{ marginTop: 20 }}>
                    <Item>
                      <Icon
                        activate
                        name="call"
                        style={{ fontSize: 20, color: '#c5d250' }}
                      />
                      <Input
                        keyboardType="numeric"
                        placeholder="Numero de celular"
                        onChangeText={(texto) => settelefono(texto)}
                      />
                    </Item>
                  </View>
                </Col>
              </Grid>
            </>
          )}

          <View style={{ marginTop: 20 }}>
            <Textarea
              onChangeText={(texto) => setComentarios(texto)}
              rowSpan={4}
              bordered
              placeholder="Ingresa comentarios aqui....."
            />
          </View>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button success iconRight onPress={() => confirmaOrdne()}>
            <Text style={{ fontSize: 15, color: 'white' }}>
              Agregar {cantidad} articulo al carrito | {total}COP
              <Icon
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'white',
                  padding: 60,
                }}
                name="cart"
              />
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
const styles = StyleSheet.create({
  tituloMini: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'gray',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    marginHorizontal: 20,
  },
  suma: {
    justifyContent: 'center',

    marginTop: 20,
  },
  btn: {
    backgroundColor: 'green',
    borderRadius: 50,
    paddingHorizontal: 40,
  },
});
export default FormularioPedido;
