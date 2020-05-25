import React, { useEffect, useContext, Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text, Grid, Col, Icon, Button, Card } from 'native-base';

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
              <Card style={styles.card}>
                <View style={styles.bgPromo}>
                  <Image style={styles.imgPromocion} source={{ uri: imagen }} />

                  <Grid>
                    <Col>
                      <Text style={styles.nombrePromo}>{nombre}</Text>
                      <Button
                        style={styles.btn}
                        onPress={() => {
                          //Eliminar algunas propiedades del producto
                          const { existencia, ...promocion2 } = promocion;
                          console.log('presione');
                          selecionarProducto(promocion2);
                          navigation.navigate('DetalleProducto');
                        }}
                        iconRight
                        success
                        rounded
                        small
                        block
                      >
                        <Text>Ir A PROMO</Text>
                        <Icon name="arrow-forward" />
                      </Button>
                    </Col>

                    <Col>
                      <Text style={styles.precio}>{precio}$</Text>
                    </Col>
                  </Grid>
                </View>
              </Card>
            </Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Promociones;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  contBtn: {
    backgroundColor: 'white',
  },
  btn: {
    marginBottom: 10,
  },
  nombrePromo: {
    color: 'gray',
    marginVertical: 10,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  precio: {
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#c5d250',
    marginLeft: 100,
  },
  imgPromocion: {
    height: 200,
    width: 300,

    borderRadius: 5,
  },

  contenedor: {
    marginHorizontal: 10,
  },
});
