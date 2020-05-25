import React, { useEffect, useContext, Fragment, useState } from 'react';
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
  H1,
} from 'native-base';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, View, StyleSheet } from 'react-native';
const Promociones = () => {
  //Context Firebase
  const { menu, obtenerProductos, usuario } = useContext(FirebaseContext);
  const { selecionarProducto } = useContext(PedidoContext);

  useEffect(() => {
    obtenerProductos();
  }, []);

  //HOOK para redirecionar a detalle platillo
  const navigation = useNavigation();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Nuestras promociones</Text>
      <ScrollView horizontal>
        {menu.map((producto) => {
          const {
            imagen,

            id,
          } = producto;
          return (
            <Fragment key={id}>
              <View
                onPress={() => {
                  //Eliminar algunas propiedades del producto
                  const { existencia, ...producto2 } = producto;
                  selecionarProducto(producto2);
                  navigation.navigate('DetalleProducto');
                }}
              >
                <Image style={styles.imgPromocion} source={{ uri: imagen }} />
              </View>
            </Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Promociones;

const styles = StyleSheet.create({
  imgPromocion: {
    height: 200,
    width: 250,
    borderRadius: 10,
    marginRight: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20,
  },
  contenedor: {
    marginHorizontal: 10,
  },
});
