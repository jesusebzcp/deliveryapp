import React from 'react';
import {
  Content,
  Container,
  Text,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const DetalleUsuario = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Content>
        <Text>Aqui va usuario</Text>
      </Content>
    </Container>
  );
};

export default DetalleUsuario;
