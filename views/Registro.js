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
} from 'native-base';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Registro = () => {
  const navigation = useNavigation();
  const [nombre, setnombre] = useState('');
  const [correo, setcorreo] = useState('');
  const [password, setpassword] = useState('');
  const [telefono, settelefono] = useState('');
  const [mensaje, setmensaje] = useState(null);
  console.log(typeof telefono);

  const crearCuenta = async () => {
    //validar
    if (nombre === '' && correo === '' && password === '' && telefono === '') {
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
        navigation.navigate('Login');
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
    });
  };

  return (
    <Container>
      {mensaje && mostrarAlerta()}
      <Content>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name="person" style={{ fontSize: 20, color: 'black' }} />
              <Input
                onChangeText={(texto) => setnombre(texto)}
                placeholder="Nombre"
              />
            </InputGroup>
          </ListItem>
          <ListItem>
            <InputGroup>
              <Icon name="mail" style={{ fontSize: 20, color: 'black' }} />
              <Input
                onChangeText={(texto) => setcorreo(texto)}
                name={correo}
                placeholder="Correo@correo"
              />
            </InputGroup>
          </ListItem>
          <ListItem>
            <InputGroup>
              <Icon name="unlock" style={{ fontSize: 20, color: 'black' }} />
              <Input
                onChangeText={(texto) => setpassword(texto)}
                name={password}
                placeholder="Contraseña"
                secureTextEntry={true}
              />
            </InputGroup>
          </ListItem>
          <ListItem>
            <InputGroup>
              <Icon name="call" style={{ fontSize: 20, color: 'black' }} />
              <Input
                keyboardType="numeric"
                onChangeText={(texto) => settelefono(texto)}
                name={telefono}
                placeholder="+57 300 1234567"
              />
            </InputGroup>
          </ListItem>
        </List>
      </Content>

      <Footer>
        <FooterTab>
          <Button success iconRight onPress={() => crearCuenta()}>
            <Text style={{ fontSize: 15, color: 'black' }}>
              Registrarme {''}
              <Icon
                style={{ fontSize: 18, color: 'black', padding: 60 }}
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
