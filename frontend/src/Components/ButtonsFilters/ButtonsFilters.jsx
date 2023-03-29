import {mensajeErrorActualiza, mensajeReset, mensajeErrorServidor} from "../../libMesajes";
import { useContext } from "react";
import {setmensajeContext} from "../../App"



function ButtonsFilters({setTareasFiltradas}) {

    const setmensaje = useContext(setmensajeContext)

    function manejadorClick () {
        mensajeReset(setmensaje)
        fetch("http://localhost:8000/tarefa/?rematada=0")
        .then(manejadorResposta)
        .catch(manejadorError)
    }

    function manejadorResposta (respuesta) {
        if (respuesta.ok) {const promesaDatos = respuesta.json()
        promesaDatos.then(manexadorDatos)} else {mensajeErrorActualiza(setmensaje)}
    }
  
    function manexadorDatos (nuevosDatos) {
        setTareasFiltradas (nuevosDatos)
        mensajeReset(setmensaje)
    }
  
    function manejadorError (error) {
      mensajeErrorServidor(setmensaje)
    }

    return (
      <>
        <button type="button" onClick={manejadorClick}>Tareas Pendientes</button>
      </>
    );
  }
  
  export default ButtonsFilters;