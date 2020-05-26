import React from 'react';
import { Button, Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const BotonUsuario = () => {
  const navigation = useNavigation();

  return (
    <Button
      success
      transparent
      active
      onPress={() => navigation.navigate('DetalleUsuario')}
    >
      <Text>
        Mi cuenta{' '}
        <Icon style={{ fontSize: 15, color: 'green' }} active name="person" />
      </Text>
    </Button>
  );
};

export default BotonUsuario;
