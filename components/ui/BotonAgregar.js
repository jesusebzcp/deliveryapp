import React from 'react';
import { Button, Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const BotonAgregar = () => {
  const navigation = useNavigation();

  return (
    <Button success transparent onPress={() => navigation.navigate('Menu')}>
      <Text>
        Añadir <Icon style={{ fontSize: 18, color: 'green' }} name="add" />
      </Text>
    </Button>
  );
};

export default BotonAgregar;
