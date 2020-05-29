import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import {
  Input,
  Container,
  Toast,
  Footer,
  FooterTab,
  Button,
  InputGroup,
  Icon,
  List,
  ListItem,
  Text,
  View,
  Item,
} from 'native-base';

import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [correo, setcorreo] = useState('');
  const [password, setpassword] = useState('');

  const [mensaje, setmensaje] = useState(null);
  const [verPassword, setVerPassword] = useState(true);
  const [icon, setIcon] = useState('eye-off');

  const cambiarIcon = (e) => {
    if (icon === 'eye-off') {
      setIcon('eye');
      setVerPassword(false);
    } else {
      setIcon('eye-off');
      setVerPassword(true);
    }
  };
  const iniciarSesion = async () => {
    //validar
    if (correo === '' && password === '') {
      setmensaje('Todos los campos son obligatorios');

      return;
    }
    //password al menos 6 caracteres
    if (password.length < 6) {
      setmensaje('La contraseña debe ser de almenos 6 caracteres');

      return;
    }
    //Iniciar sesion
    try {
      await firebase.auth.signInWithEmailAndPassword(correo, password);
    } catch (error) {
      setmensaje(error.message);
    }
  };

  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 3000,

      type: 'danger',
      position: 'top',
    });
  };
  return (
    <>
      {mensaje && mostrarAlerta()}

      <Container style={styles.loginContainer}>
        <View stryle={styles.login}>
          <Image style={styles.logo} source={require('../assets/splash.png')} />
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="mail" style={{ fontSize: 20, color: '#c5d250' }} />
                <Input
                  onChangeText={(texto) => setcorreo(texto)}
                  name={correo}
                  placeholder="Ingresa tu correo"
                />
              </InputGroup>
            </ListItem>
            <Item style={{ marginLeft: 15 }} floatingLabel>
              <Icon style={{ fontSize: 20, color: '#c5d250' }} name="lock" />

              <Input
                onChangeText={(texto) => setpassword(texto)}
                placeholder="Ingresa tu nueva contraseña"
                secureTextEntry={verPassword}
              />
              <Icon
                style={{ fontSize: 20 }}
                name={icon}
                onPress={(e) => cambiarIcon(e)}
              />
            </Item>
          </List>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.registrate}>
              ¿Eres nuevo por aqui? Registrate
            </Text>
          </TouchableOpacity>
        </View>
      </Container>

      <Footer>
        <FooterTab>
          <Button success iconRight onPress={() => iniciarSesion()}>
            <Text style={{ fontSize: 15, color: 'white' }}>
              Iniciar sesion {''}
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
    </>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: '90%',
    height: 200,
    justifyContent: 'center',
    marginHorizontal: '2.5%',
  },
  loginContainer: {
    paddingTop: 20,
    flex: 1,
  },
  login: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '2.5%',
  },
  registrate: {
    margin: 10,
    color: 'green',
  },
  precio: {
    margin: 20,
    textAlign: 'center',
  },
  descripcion: {
    marginHorizontal: 10,
    marginVertical: 4,
    color: '#969696',
  },
  titulo: {
    textAlign: 'center',
  },
});

export default Login;
