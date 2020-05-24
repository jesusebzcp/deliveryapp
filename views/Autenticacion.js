import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Autenticacion = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textCenter}>
        beba todo es posible con la programacion
      </Text>
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
export default Autenticacion;
