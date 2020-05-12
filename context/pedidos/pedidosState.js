import React, { useReducer } from "react";

import PedidosReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PRODUCTO } from "../../types";

const PedidoState = (props) => {
  //State inicial
  const initialState = {
    pedido: [],
    producto: null,
  };
  const [state, dispatch] = useReducer(PedidosReducer, initialState);
  //Selecciona el producto que el usuario desea ordenar
  const selecionarProducto = (producto) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,

      payload: producto,
    });
  };
  //CUANDO EL USUARIO CONFIRME UN PRODUCTO
  const guardarPedido = (pedido) => {
    dispatch({
      type: CONFIRMAR_ORDENAR_PRODUCTO,
      payload: pedido,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        producto: state.producto,
        selecionarProducto,
        guardarPedido,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};
export default PedidoState;
