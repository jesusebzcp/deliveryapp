import React, { useReducer } from "react";

import PedidosReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PRODUCTO,
  MOSTAR_RESUMEN,
} from "../../types";

const PedidoState = (props) => {
  //State inicial
  const initialState = {
    pedido: [],
    producto: null,
    total: 0,
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

  //Muestra el total a pagar en resumen
  const mostrarResumen = (total) => {
    dispatch({
      type: MOSTAR_RESUMEN,
      payload: total,
    });
  };
  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        producto: state.producto,
        total: state.total,
        selecionarProducto,
        guardarPedido,
        mostrarResumen,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};
export default PedidoState;
