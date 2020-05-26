import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

//Importando state de context
import FirebaseState from './context/firebase/firebaseState';
import PedidoState from './context/pedidos/pedidosState';
//Boton del pedido

import { Root } from 'native-base';
import useAutenticacion from './Hooks/useAutenticacion';

import Navegacion from './Navegacion';

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

  return (
    <>
      <Root>
        <FirebaseState>
          <PedidoState>
            <Navegacion />
          </PedidoState>
        </FirebaseState>
      </Root>
    </>
  );
}
