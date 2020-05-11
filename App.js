import "react-native-gesture-handler";
import React from "react";

//importanto las pantallas
import NuevaOrden from "./views/NuevaOrden";
import Menu from "./views/Menu";
import DetalleProducto from "./views/DetalleProducto";
import FormularioPedido from "./views/FormularioPedido";
import ResumenPedido from "./views/ResumenPedido";
import ProgresoPedido from "./views/ProgresoPedido";

//Importanto la navegacion state
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Importando state de context
import FirebaseState from "./context/firebase/firebaseState";
import PedidoState from "./context/pedidos/pedidosState";

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            >
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: "NuevaOrden",
                }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: "Menu",
                }}
              />

              <Stack.Screen
                name="DetalleProducto"
                component={DetalleProducto}
                options={{
                  title: "DetalleProducto",
                }}
              />
              <Stack.Screen
                name="FormularioPedido"
                component={FormularioPedido}
                options={{
                  title: "FormularioPedido",
                }}
              />
              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: "ResumenPedido",
                }}
              />
              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: "ProgresoPedido",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
}
