import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import {
  Toast,
  Input,
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  InputGroup,
  Icon,
  List,
  ListItem,
  Text,
  View,
  H1,
} from 'native-base';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Registro = () => {
  const navigation = useNavigation();
  const [nombre, setnombre] = useState('');
  const [correo, setcorreo] = useState('');
  const [password, setpassword] = useState('');

  const [mensaje, setmensaje] = useState(null);

  const crearCuenta = async () => {
    //validar
    if (nombre === '' && correo === '' && password === '') {
      setmensaje('Todos los campos son obligatorios');

      return;
    }
    //password al menos 6 caracteres
    if (password.length < 6) {
      setmensaje('La contraseña debe ser de almenos 6 caracteres');

      return;
    }

    firebase.auth
      .createUserWithEmailAndPassword(correo, password)
      .then((userCredentials) => {
        if (userCredentials.user) {
          userCredentials.user.updateProfile({
            displayName: nombre,
          });
        }
      })
      .catch(function (error) {
        setmensaje(error.message);
      });
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
    <Container>
      {mensaje && mostrarAlerta()}
      <Content>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name="person" style={{ fontSize: 20, color: '#c5d250' }} />
              <Input
                onChangeText={(texto) => setnombre(texto)}
                placeholder="Ingresa tu nombre"
              />
            </InputGroup>
          </ListItem>
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
          <ListItem>
            <InputGroup>
              <Icon name="unlock" style={{ fontSize: 20, color: '#c5d250' }} />
              <Input
                onChangeText={(texto) => setpassword(texto)}
                name={password}
                placeholder="Ingresa tu Contraseña (Debe ser mayor a 6 caracteres)"
                secureTextEntry={true}
              />
            </InputGroup>
          </ListItem>
        </List>
      </Content>

      <Footer>
        <FooterTab>
          <Button success iconRight onPress={() => crearCuenta()}>
            <Text style={{ fontSize: 15, color: 'white' }}>
              Crearme una cuenta {''}
              <Icon
                style={{ fontSize: 18, color: 'white', padding: 60 }}
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
  bgError: {
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  textError: {
    color: 'white',
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

export default Registro;
