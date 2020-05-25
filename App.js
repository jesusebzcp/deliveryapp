import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

//importanto las pantallas

import Login from './views/Login';
import Menu from './views/Menu';
import DetalleProducto from './views/DetalleProducto';
import FormularioPedido from './views/FormularioPedido';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

//Importanto la navegacion state
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importando state de context
import FirebaseState from './context/firebase/firebaseState';
import PedidoState from './context/pedidos/pedidosState';
//Boton del pedido
import BotonPedido from './components/ui/BotonPedido';
import Registro from './views/Registro';
import { Root } from 'native-base';
import useAutenticacion from './Hooks/useAutenticacion';
import { ActivityIndicator, View } from 'react-native';

//Boton del pedido

const Stack = createStackNavigator();

export default function App() {
  const usuario = useAutenticacion();

  const [isReady, setisReady] = useState(false);

  //Soluciona el problema de fuentes de natibase y expo
  useEffect(() => {
    font();
  }, []);

  async function font() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setisReady(true);
  }

  if (!isReady) {
    return <AppLoading />;
  }
  if (!usuario) {
    setTimeout(() => {
      return (
        <View style={{ marginTop: '100%' }}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }, 3000);
  } else {
    setTimeout(() => {
      return (
        <View style={{ marginTop: '100%' }}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }, 3000);
  }

  return (
    <>
      <Root>
        <FirebaseState>
          <PedidoState>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: 'white',
                  },
                }}
              >
                {!usuario && (
                  <>
                    <Stack.Screen
                      name="Login"
                      component={Login}
                      options={{
                        title: 'Login',
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Registro"
                      component={Registro}
                      options={{
                        title: 'Ingresa tus datos',
                      }}
                    />
                  </>
                )}
                {usuario && (
                  <>
                    <Stack.Screen
                      name="Menu"
                      component={Menu}
                      options={{
                        title: 'Nuestros Productos',
                        headerRight: (props) => <BotonPedido />,
                      }}
                    />

                    <Stack.Screen
                      name="DetalleProducto"
                      component={DetalleProducto}
                      options={{
                        title: 'Detalle Producto',
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="FormularioPedido"
                      component={FormularioPedido}
                      options={{
                        title: ' Detalles de la orden',
                      }}
                    />

                    <Stack.Screen
                      name="ResumenPedido"
                      component={ResumenPedido}
                      options={{
                        title: 'Resumen Pedido',
                      }}
                    />
                    <Stack.Screen
                      name="ProgresoPedido"
                      component={ProgresoPedido}
                      options={{
                        title: 'Progreso Pedido',
                      }}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </PedidoState>
        </FirebaseState>
      </Root>
    </>
  );
}
