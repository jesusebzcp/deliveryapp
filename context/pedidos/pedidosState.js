import React, { useReducer } from "react";

import PedidosReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import SELECCIONAR_PRODUCTO from "../../types";

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

  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        producto: state.producto,
        selecionarProducto,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};
export default PedidoState;
