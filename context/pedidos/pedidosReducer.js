import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PRODUCTO,
  MOSTAR_RESUMEN,
  ELIMINAR_PRODUCTO,
  PEDIDO_ORDENADO,
} from '../../types';
export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO:
      return { ...state, producto: action.payload, producto: action.payload };
    case CONFIRMAR_ORDENAR_PRODUCTO:
      return { ...state, pedido: [...state.pedido, action.payload] };
    case MOSTAR_RESUMEN:
      return { ...state, total: action.payload };
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        pedido: state.pedido.filter(
          (articulo) => articulo.id !== action.payload,
        ),
      };
    case PEDIDO_ORDENADO:
      return { ...state, pedido: [], total: 0, idPedido: action.payload };
    default:
      return state;
  }
};
