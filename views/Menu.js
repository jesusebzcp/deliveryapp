import React, { useEffect, useContext, Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Thumbnail,
  Icon,
  Grid,
  Col,
  Footer,
  FooterTab,
  Button,
} from 'native-base';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import Promociones from './Promociones';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import BotonUsuario from '../components/ui/BotonUsuario';
import Categorias from './Categorias';

const Menu = () => {
  //Context Firebase
  const { menu, obtenerProductos } = useContext(FirebaseContext);
  const { selecionarProducto } = useContext(PedidoContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  //HOOK para redirecionar a detalle platillo
  const navigation = useNavigation();
  if (menu.length === 0)
    return (
      <View style={{ marginTop: '100%' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  return (
    <Container>
      <Content>
        <BotonUsuario />
        <View>
          <Text style={styles.titulo}>Promociones </Text>
          <Promociones />
        </View>
        <View>
          <Text style={styles.titulo}>Categorias </Text>
          <Text style={styles.tituloMini}>Busca por categorias </Text>
          <Categorias />
        </View>

        <Text style={styles.titulo}>Popular</Text>
        <Text style={styles.tituloMini}>Domicilio gratis</Text>

        <List>
          {menu.map((producto, i) => {
            const {
              imagen,
              nombre,
              descripcion,
              precio,
              categoria,
              id,
            } = producto;

            if (categoria === 'Promocion') {
              return null;
            } else if (categoria != 'Promocion') {
              return (
                <Fragment key={id}>
                  <ListItem
                    onPress={() => {
                      //Eliminar algunas propiedades del producto
                      const { existencia, ...producto2 } = producto;
                      selecionarProducto(producto2);
                      navigation.navigate('DetalleProducto');
                    }}
                  >
                    <Thumbnail
                      style={styles.img}
                      large
                      square
                      source={{ uri: imagen }}
                    />
                    <Body>
                      <Text style={styles.nombre}>{nombre}</Text>
                      <Text note numberOfLines={2}>
                        {descripcion}
                      </Text>

                      <Grid>
                        <Col>
                          <Text style={styles.precio}>{precio}COP</Text>
                        </Col>
                        <Col>
                          <Text style={styles.categoria}> {categoria}</Text>
                        </Col>
                      </Grid>
                    </Body>
                  </ListItem>
                </Fragment>
              );
            }
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  nombre: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  precio: {
    color: 'green',
    fontSize: 15,
    fontWeight: 'bold',
  },
  categoria: {
    color: 'orange',
    fontSize: 15,
    fontWeight: 'bold',
  },
  img: { borderRadius: 10 },
  tituloMini: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
    marginBottom: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 10,
  },
  contenedor: {
    marginHorizontal: 10,
  },
});

export default Menu;
