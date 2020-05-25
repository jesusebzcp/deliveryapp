import React, { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  H1,
  Col,
  Grid,
} from 'native-base';

import pedidoContext from '../context/pedidos/pedidosContext';

import { useNavigation } from '@react-navigation/native';

const DetalleProducto = () => {
  //Redirecionar
  const navigation = useNavigation();
  //PedidoContext
  const { producto } = useContext(pedidoContext);
  //Extraer propiedades necesarias
  const { nombre, imagen, descripcion, precio } = producto;
  return (
    <Container>
      <Content>
        <Image style={styles.imagen} source={{ uri: imagen }} />
        <Grid>
          <Col>
            <H1 style={styles.titulo}>{nombre}</H1>
          </Col>
          <Col>
            <Text style={styles.precio}>{precio}COP</Text>
          </Col>
        </Grid>

        <H1 style={styles.tituloDescripcion}>Descripcion</H1>
        <Text note style={styles.descripcion}>
          {descripcion}
        </Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            success
            iconRight
            onPress={() => navigation.navigate('FormularioPedido')}
          >
            <Text style={{ fontSize: 15, color: 'white' }}>
              Siguiente{' '}
              <Icon
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'white',
                  padding: 60,
                }}
                name="arrow-forward"
              />
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
const styles = StyleSheet.create({
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
  },
  tituloDescripcion: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    fontSize: 20,
  },
  imagen: {
    width: '100%',
    height: 400,
  },
  precio: {
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  descripcion: {
    marginHorizontal: 10,
    marginVertical: 4,
    color: '#969696',
  },
  titulo: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default DetalleProducto;
