import React, { useEffect, useContext, Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text, Grid, Col } from 'native-base';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, View, StyleSheet } from 'react-native';

const Promociones = () => {
  //Context Firebase
  const { promociones, obtenerPromociones } = useContext(FirebaseContext);
  const { selecionarProducto } = useContext(PedidoContext);

  useEffect(() => {
    obtenerPromociones();
  }, []);

  //HOOK para redirecionar a detalle platillo
  const navigation = useNavigation();

  return (
    <View style={styles.contenedor}>
      <ScrollView horizontal renderToHardwareTextureAndroid>
        {promociones.map((promocion) => {
          const { imagen, nombre, id, precio } = promocion;
          return (
            <Fragment key={id}>
              <View
                style={styles.sombra}
                onPress={() => {
                  //Eliminar algunas propiedades del producto
                  const { existencia, ...producto2 } = promocion;
                  selecionarProducto(producto2);
                  navigation.navigate('DetalleProducto');
                }}
              >
                <Image style={styles.imgPromocion} source={{ uri: imagen }} />
                <Grid>
                  <Col>
                    <Text style={styles.nombrePromo}>{nombre}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.precio}>{precio}$</Text>
                  </Col>
                </Grid>
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
  nombrePromo: {
    color: 'gray',
    marginLeft: 10,
  },
  precio: {
    fontWeight: 'bold',
    color: '#c5d250',
    marginLeft: 20,
  },
  imgPromocion: {
    height: 200,
    width: 250,
    borderRadius: 10,
    marginRight: 10,
  },
  sombra: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contenedor: {
    marginHorizontal: 10,
  },
});
