import React, { useEffect, useContext, Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Thumbnail,
} from 'native-base';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import Promociones from './Promociones';
import { StyleSheet } from 'react-native';
const Menu = () => {
  //Context Firebase
  const { menu, obtenerProductos } = useContext(FirebaseContext);
  const { selecionarProducto } = useContext(PedidoContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  //HOOK para redirecionar a detalle platillo
  const navigation = useNavigation();

  const mostrarHeading = (categoria) => {
    //Mostrar categorias separadas

    return (
      <Separator>
        <Text>{categoria}</Text>
      </Separator>
    );
  };
  return (
    <Container>
      <Content>
        <Promociones />
        <Text style={styles.titulo}>Nuestros productos</Text>
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
                  {mostrarHeading(categoria, i)}
                  <ListItem
                    onPress={() => {
                      //Eliminar algunas propiedades del producto
                      const { existencia, ...producto2 } = producto;
                      selecionarProducto(producto2);
                      navigation.navigate('DetalleProducto');
                    }}
                  >
                    <Thumbnail square large source={{ uri: imagen }} />
                    <Body>
                      <Text>{nombre}</Text>
                      <Text note numberOfLines={2}>
                        {descripcion}
                      </Text>
                      <Text>Precio: {precio}$</Text>
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
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20,
    marginLeft: 10,
  },
  contenedor: {
    marginHorizontal: 10,
  },
});

export default Menu;
