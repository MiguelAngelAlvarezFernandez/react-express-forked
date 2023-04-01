import {mensajeErrorActualiza, mensajeReset, mensajeErrorServidor, mensajeNoHayTareas} from "../../libMesajes";
import { useContext } from "react";
import {setmensajeContext} from "../../App"
import {solicitudesFetch} from "../../libFetchs"



function ButtonsFilters({setTareasFiltradas}) {

    const setmensaje = useContext(setmensajeContext)

    function manejadorClickPendentes () {
        mensajeReset(setmensaje)
        solicitudesFetch("?rematada=0", "GET","" , manejadorRespuesta, manejadorError)
    }

    function manejadorClickRematadas () {
        mensajeReset(setmensaje)
        solicitudesFetch("?rematada=1", "GET","" , manejadorRespuesta, manejadorError)
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