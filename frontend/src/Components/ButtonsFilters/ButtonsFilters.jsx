import {mensajeErrorActualiza, mensajeReset, mensajeErrorServidor, mensajeNoHayTareas} from "../../libMesajes";
import { useContext } from "react";
import {setmensajeContext} from "../../App"



function ButtonsFilters({setTareasFiltradas}) {

    const setmensaje = useContext(setmensajeContext)

    function manejadorClickPendentes () {
        mensajeReset(setmensaje)
        fetch("http://localhost:8000/tarefa/?rematada=0")
        .then(manejadorRespuesta)
        .catch(manejadorError)
    }

    function manejadorClickRematadas () {
        mensajeReset(setmensaje)
        fetch("http://localhost:8000/tarefa/?rematada=1")
        .then(manejadorRespuesta)
        .catch(manejadorError)
    }

    function manejadorRespuesta (respuesta) {
        if (respuesta.ok) {const promesaDatos = respuesta.json()
        promesaDatos.then(manejadorDatos)} else {mensajeErrorActualiza(setmensaje)}
    }
  
    function manejadorDatos (nuevosDatos) {
        if (nuevosDatos.length >0) 
        {mensajeReset(setmensaje)}
        else {mensajeNoHayTareas(setmensaje)}
        setTareasFiltradas (nuevosDatos)
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