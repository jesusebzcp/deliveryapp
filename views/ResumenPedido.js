import React, { useContext, useEffect, useState } from 'react';

import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
  Grid,
  Col,
  Icon,
  Row,
  Card,
} from 'native-base';
import firebase from '../firebase';

import pedidoContext from '../context/pedidos/pedidosContext';

import { useNavigation } from '@react-navigation/native';
import { Alert, View, ScrollView, Text } from 'react-native';

const ResumenPedido = () => {
  const navigation = useNavigation();

  //Context de pedido
  const {
    pedido,
    total,
    mostrarResumen,
    eliminarProducto,
    pedidoRealizado,
  } = useContext(pedidoContext);

  const [telefono, setTelefono] = useState('');
  const [cliente, setCliente] = useState('');
  const [direccion, setDireccion] = useState('');

  function revisaDatos() {
    pedido.forEach(function (datos, i) {
      if (i === 0) {
        const { displayName, telefono, direccion } = datos;
        setTelefono(telefono);
        setCliente(displayName);
        setDireccion(direccion);
      }
    });
  }

  useEffect(() => {
    calcularTotal();
    revisaDatos();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulos) => nuevoTotal + articulos.total,
      0,
    );
    mostrarResumen(nuevoTotal);
  };

  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que revisas tu pedido no podras cambiarlo',
      [
        {
          text: 'Confirmar',
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
                .collection('ordenes')
                .add(pedidoObj);
              pedidoRealizado(pedido.id);
              navigation.navigate('ProgresoPedido');
            } catch (error) {
              console.log(error);
            }
          },
        },
        { text: 'Revisar', style: 'cancel' },
      ],
    );
  };

  const confirmarEliminacion = (id) => {
    Alert.alert('¿Deseas Eliminar este articulo?', 'Una vez eliminado', [
      {
        text: 'Confirmar',
        onPress: () => {
          if (pedido.lenght === 0) {
            navigation.navigate('Menu');
          }
          //Eliminar del state
          eliminarProducto(id);
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };
  return (
    <Container>
      <H1
        style={{
          marginHorizontal: 10,

          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        Todos tus productos
      </H1>
      <Content>
        {pedido.map((producto, i) => {
          const { cantidad, nombre, imagen, id, precio } = producto;

          return (
            <>
              <ScrollView key={id + i}>
                <Card>
                  <View style={{ marginHorizontal: 10, marginHorizontal: 10 }}>
                    <Grid>
                      <Col>
                        <Thumbnail
                          style={{ borderRadius: 10 }}
                          large
                          square
                          source={{ uri: imagen }}
                        />
                      </Col>
                      <Col>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                          }}
                        >
                          {nombre}
                        </Text>
                        <Text style={{ color: 'gray' }}>
                          Cantidad X{cantidad}
                        </Text>

                        <Text style={{ color: 'green' }}>{precio}COP</Text>
                      </Col>
                      <Col>
                        <Button danger full transparent>
                          <Icon
                            onPress={() => confirmarEliminacion(id)}
                            style={{ fontSize: 35 }}
                            name="trash"
                          />
                        </Button>
                      </Col>
                    </Grid>
                  </View>
                </Card>
              </ScrollView>
            </>
          );
        })}
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: 10,
            }}
          >
            Detalle de entrega
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginHorizontal: 15,
            }}
          >
            Preguntar por{' '}
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {cliente}
            </Text>
          </Text>

          <Grid
            style={{
              marginVertical: 20,
            }}
          >
            <Col
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>
                <Icon
                  activate
                  name="call"
                  style={{ fontSize: 20, color: '#c5d250' }}
                />{' '}
                {telefono}
              </Text>
            </Col>

            <Col
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>
                <Icon
                  activate
                  name="pin"
                  style={{ fontSize: 20, color: '#c5d250' }}
                />
                {direccion}
              </Text>
            </Col>
          </Grid>
        </View>
        <View
          style={{
            marginTop: 10,
            borderTopColor: '#454545',
            borderTopWidth: 1,
          }}
        >
          <Grid
            style={{
              marginVertical: 10,
            }}
          >
            <Col
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Row style={{ marginVertical: 10, textAlign: 'left' }}>
                <Text style={{ textAlign: 'left' }}>SubTotal</Text>
              </Row>

              <Row style={{ marginVertical: 10 }}>
                <Text style={{ textAlign: 'left' }}>Domiclio</Text>
              </Row>
              <Row style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  Total
                </Text>
              </Row>
            </Col>

            <Col
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Row style={{ marginVertical: 10 }}>
                <Text>{total}COP</Text>
              </Row>

              <Row style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'green',
                    textAlign: 'left',
                  }}
                >
                  Gratis
                </Text>
              </Row>
              <Row style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  {total}COP
                </Text>
              </Row>
            </Col>
          </Grid>
        </View>
        {/*     <Button onPress={() => navigation.navigate('Menu')}>
          <Text>Seguir pediendo</Text>
        </Button> */}
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
{
  /* <List key={id + i}>
<ListItem thumbnail>
  <Grid>
    <Col>
      <Thumbnail large square source={{ uri: imagen }} />
    </Col>
    <Col>
      <Text>{nombre}</Text>
    </Col>
    <Col>
    
      <Text>Cantidad:{cantidad}</Text>
    </Col>
    <Col>
    
      <Text>Precio{precio}$</Text>
    </Col>
  </Grid>

  <Button onPress={() => confirmarEliminacion(id)} danger full>
    <Text>Eliminar</Text>
  </Button>
</ListItem>
</List> */
}
