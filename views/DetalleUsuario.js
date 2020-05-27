import React, { useEffect, useContext, useState } from 'react';
import { Content, Container, Text, Button, Icon } from 'native-base';
import firebase from '../firebase';
import { StyleSheet, View, Image } from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';

const DetalleUsuario = () => {
  const { usuario } = useContext(FirebaseContext);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    llamarUsuario();
  }, []);

  const llamarUsuario = () => {
    const { displayName, email } = usuario;
    setNombre(displayName);
    setCorreo(email);
  };
  const cerrarSesion = async () => {
    try {
      await firebase.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Button danger transparent onPress={() => cerrarSesion()}>
        <Text>
          Cerrar sesion{' '}
          <Icon style={{ fontSize: 18, color: 'red' }} name="exit" />
        </Text>
      </Button>
      <Content>
        <View style={styles.animationContainer}>
          <Text style={styles.nombre}> Hola, {nombre} </Text>

          <Image
            style={styles.image}
            source={require('../assets/avatar.png')}
          />
          <Text> Tu correo: {correo} </Text>

          <Button success transparent onPress={() => actualizarPassword()}>
            <Text>
              Actualizar contraseña{' '}
              <Icon style={{ fontSize: 18, color: 'green' }} name="repeat" />
            </Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    height: 200,
    width: 200,
  },
  nombre: {
    marginTop: 20,
  },
});

export default DetalleUsuario;
