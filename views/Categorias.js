import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Grid, Col, Container, Content, Row } from 'native-base';

const Categorias = () => {
  return (
    <Container>
      <Content>
        <Grid>
          <Row>
            <Col style={styles.container}>
              <View style={styles.contCategoria}>
                <Image
                  style={styles.img}
                  source={require('../assets/categoria1.png')}
                />
              </View>
              <Text style={styles.titulo}>Viveres</Text>
            </Col>
            <Col style={styles.container}>
              <View style={styles.contCategoria2}>
                <Image
                  style={styles.img}
                  source={require('../assets/categoria2.png')}
                />
              </View>
              <Text style={styles.titulo}>Licores</Text>
            </Col>
          </Row>
          <Row>
            <Col style={styles.container}>
              <View style={styles.contCategoria3}>
                <Image
                  style={styles.img}
                  source={require('../assets/clean.png')}
                />
              </View>
              <Text style={styles.titulo}>Articulos de limpieza</Text>
            </Col>
            <Col style={styles.container}>
              <View style={styles.contCategoria4}>
                <Image
                  style={styles.img}
                  source={require('../assets/vegetable.png')}
                />
              </View>
              <Text style={styles.titulo}>Frutas y Hortalizas</Text>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contCategoria: {
    backgroundColor: '#9B51E0',
    padding: 20,
    borderRadius: 5,
  },
  contCategoria2: {
    backgroundColor: '#F2994A',
    padding: 20,
    borderRadius: 5,
  },
  contCategoria3: {
    backgroundColor: '#2E86C1',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  contCategoria4: {
    backgroundColor: '#229954',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  img: {
    height: 100,
    width: 100,
  },
  titulo: {
    fontWeight: 'bold',
  },
});

export default Categorias;
