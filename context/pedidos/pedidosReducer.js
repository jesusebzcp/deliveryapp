import {
  SELECCIONAR_PRODUCTO,
  CONFIRMAR_ORDENAR_PRODUCTO,
  MOSTAR_RESUMEN,
} from "../../types";
export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO:
      return { ...state, producto: action.payload };
    case CONFIRMAR_ORDENAR_PRODUCTO:
      return { ...state, pedido: [...state.pedido, action.payload] };
    case MOSTAR_RESUMEN:
      return { ...state, total: action.payload };
    default:
      return state;
  }
};
