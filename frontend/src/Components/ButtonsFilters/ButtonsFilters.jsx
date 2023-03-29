import {mensajeErrorActualiza, mensajeReset, mensajeErrorServidor} from "../../libMesajes";
import { useContext } from "react";
import {setmensajeContext} from "../../App"



function ButtonsFilters({setTareasFiltradas}) {

    const setmensaje = useContext(setmensajeContext)

    function manejadorClickPendentes () {
        mensajeReset(setmensaje)
        fetch("http://localhost:8000/tarefa/?rematada=0")
        .then(manejadorResposta)
        .catch(manejadorError)
    }

    function manejadorClickRematadas () {
        mensajeReset(setmensaje)
        fetch("http://localhost:8000/tarefa/?rematada=1")
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
        <button type="button" onClick={manejadorClickPendentes}>Tareas Pendientes</button>
        <button type="button" onClick={manejadorClickRematadas}>Tareas Rematadas</button>
      </>
    );
  }
  
  export default ButtonsFilters;