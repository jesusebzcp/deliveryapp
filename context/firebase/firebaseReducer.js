//Important Types
import {
  OBTENER_PRODUCTOS_EXITO,
  OBTENER_PROMOCIONES_EXITO,
  LOGIN_CORRECTO,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case OBTENER_PRODUCTOS_EXITO:
      return {
        ...state,
        menu: action.payload,
      };
    case OBTENER_PROMOCIONES_EXITO:
      return {
        ...state,
        promociones: action.payload,
      };
    case LOGIN_CORRECTO:
      return {
        ...state,
        usuario: action.payload,
      };
    default:
      return state;
  }
};
