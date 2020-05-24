import React, { useReducer } from 'react';
//Importamos index.js de firebase
import firebase from '../../firebase';
import FireabseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
//Importando lodash
import _ from 'lodash';

//Important Types
import { OBTENER_PRODUCTOS_EXITO } from '../../types';
import useAutenticacion from '../../Hooks/useAutenticacion';

const FirebaseState = (props) => {
  const usuario = useAutenticacion();
  console.log(usuario);
  //Creando state inicial
  const initialState = {
    menu: [],
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
  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos,
        usuario,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
