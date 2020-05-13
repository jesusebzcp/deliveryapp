import React, { useReducer } from "react";

import PedidosReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PRODUCTO,
  MOSTAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
} from "../../types";

const PedidoState = (props) => {
  //State inicial
  const initialState = {
    pedido: [],
    producto: null,
    total: 0,
    idPedido: "",
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
  const eliminarProducto = (id) => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
    });
  };
  const pedidoRealizado = () => {
    dispatch({
      type: PEDIDO_ORDENADO,
      payload: id,
    });
  };
  return (
    <PedidoContext.Provider
      value={{
        pedido: state.pedido,
        producto: state.producto,
        total: state.total,
        idPedido: state.idPedido,
        selecionarProducto,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoRealizado,
      }}
    >
      {props.children}
    </PedidoContext.Provider>
  );
};
export default PedidoState;
