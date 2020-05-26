import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

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

//Boton del pedido
import BotonPedido from './components/ui/BotonPedido';
import BotonAgregar from './components/ui/BotonAgregar';
import Registro from './views/Registro';

import useAutenticacion from './Hooks/useAutenticacion';

//Boton del pedido

const Stack = createStackNavigator();

const Navegacion = () => {
  const usuario = useAutenticacion();

  return (
    <>
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
                  title: 'Pagar',
                  headerRight: (props) => <BotonAgregar />,
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
    </>
  );
};
export default Navegacion;
