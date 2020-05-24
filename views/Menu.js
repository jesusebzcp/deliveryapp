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
          })}
        </List>
      </Content>
    </Container>
  );
};

export default Menu;
