import React, { useReducer } from 'react';
//Importamos index.js de firebase
import firebase from '../../firebase';
import FireabseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
//Importando lodash
import _ from 'lodash';

//Important Types
import {
  OBTENER_PRODUCTOS_EXITO,
  OBTENER_PROMOCIONES_EXITO,
} from '../../types';
import useAutenticacion from '../../Hooks/useAutenticacion';

const FirebaseState = (props) => {
  const usuario = useAutenticacion();

  //Creando state inicial
  const initialState = {
    menu: [],
    promociones: [],
  };

  //useREDUCER
  //dispatch sirve para llamar Funciones
  const [state, dispatch] = useReducer(FireabseReducer, initialState);

  //FUNCION QUE SE EJCUTA PARA TRAER PRODUCTOS
  const obtenerProductos = () => {
    //Consultar firebase
    firebase.db
      .collection('productos')
      .where('existencia', '==', true) //Mjuestra los producto que solo tenga la extintecia como True
      .onSnapshot(manejarSnapchot);
    function manejarSnapchot(snapshot) {
      let productos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      //Ordenar por categoria usando lodash
      productos = _.sortBy(productos, 'categoria');

      //Resultados de la base de datos
      dispatch({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: productos,
      });
    }
  };

  const obtenerPromociones = () => {
    //Consultar firebase
    firebase.db
      .collection('productos')
      .where('categoria', '==', 'Promocion') //Mjuestra los producto que solo tenga la extintecia como True
      .onSnapshot(manejarSnapchot);
    function manejarSnapchot(snapshot) {
      let promocion = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      //Resultados de la base de datos
      dispatch({
        type: OBTENER_PROMOCIONES_EXITO,

        payload: promocion,
      });
    }
  };
  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        promociones: state.promociones,
        firebase,
        obtenerProductos,
        obtenerPromociones,
        usuario,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
