import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NuevaOrden = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.textCenter}>
        beba todo es posible con la programacion
      </Text>
      <View style={styles.conBtnPrincipal}>
        <View style={styles.conBtn}>
          <Button
            style={styles.container}
            title="Nueva Pedido"
            color="#f7520c"
            onPress={() => navigation.navigate('Menu')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textCenter: {
    alignItems: 'center',
  },
  conBtn: {
    marginHorizontal: 10,
  },
});
export default NuevaOrden;
