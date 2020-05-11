import SELECCIONAR_PRODUCTO from "../../types";
export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO:
      return { ...state, producto: action.payload };
    default:
      return state;
  }
};