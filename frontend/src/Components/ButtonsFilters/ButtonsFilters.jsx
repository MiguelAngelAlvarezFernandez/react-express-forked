import {mensajeErrorActualiza, mensajeReset, mensajeErrorServidor, mensajeNoHayTareas} from "../../libMesajes";
import { useContext } from "react";
import {setmensajeContext} from "../../App"
import {solicitudesFetch} from "../../libFetchs"
import styles from "./ButtonsFilters.module.css"



function ButtonsFilters({setTareasFiltradas, idVistaTareas, setidVistaTareas}) {

    const setmensaje = useContext(setmensajeContext)

    function manejadorClickTareas(event){
      mensajeReset(setmensaje)
      solicitudesFetch("", "GET", "", manejadorRespuesta, manejadorError)
      setidVistaTareas(event.target.id)
    }

    function manejadorClickPendentes (event) {
        mensajeReset(setmensaje)
        solicitudesFetch("?rematada=0", "GET","" , manejadorRespuesta, manejadorError)
        setidVistaTareas(event.target.id)
    }

    function manejadorClickRematadas (event) {
        mensajeReset(setmensaje)
        solicitudesFetch("?rematada=1", "GET","" , manejadorRespuesta, manejadorError)
        setidVistaTareas(event.target.id)
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
      <fieldset className={styles.radioFilters}>
        <legend className={styles.legend}>Filtro Tareas</legend>
        <label>
          <input id="tareasTotales" type="radio" name ="filtroTareas" onClick={manejadorClickTareas}/>
          Todas
        </label>
        <label>
          <input id="tareasPendientes" type="radio" name ="filtroTareas" onClick={manejadorClickPendentes}/>
          Pendientes
        </label>
        <label>
          <input id="tareasTerminadas" type="radio" name ="filtroTareas" onClick={manejadorClickRematadas}/>
          Terminadas
        </label>
      </fieldset>
    );
  }
  
  export default ButtonsFilters;