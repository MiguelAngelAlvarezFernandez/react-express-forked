import { useState, useContext } from "react";
import style from "./AgregarTarea.module.css"
import { mensajeRevisaDatos, mensajeErrorServidor, mensajeReset} from "../../libMesajes";
import {autoUpdateContext, setmensajeContext} from "../../App"
import {solicitudesFetch} from "../../libFetchs"

function AgregarTarea({aviso}) {

    const autoUpDate = useContext(autoUpdateContext)
    const setmensaje = useContext(setmensajeContext)
    const [nuevaTarea, setnuevaTarea] = useState ("")
    const datosEnviados ={
                            descripcion: nuevaTarea,
                            rematada: false,
                         }
    

    function manejadorInput (evento){
        setnuevaTarea(evento.target.value)
    }

    function manejadorClick (){
        mensajeReset(setmensaje)
        solicitudesFetch("", "POST", datosEnviados, manejadorRespuesta, manejadorError)
    }

    function manejadorRespuesta(respuesta) {
        if (respuesta.ok) {
            setnuevaTarea("")
            autoUpDate()
        } else {mensajeRevisaDatos(setmensaje)}
    }

    function manejadorError (error) {
        mensajeErrorServidor(setmensaje)
      }

    return (
      <>
        <fieldset className={style.nuevasTareas}> 
            <legend className={style.legend}>¿Alguna otra tarea?</legend>
            <input className={style.input} type="text" value={nuevaTarea} placeholder="Añade una tarea" size="40" maxLength="50" onInput={manejadorInput}/>
            <button className={style.button} type="button" onClick={manejadorClick}>Añadir</button>
        </fieldset>
        {aviso && <p className={style.aviso}>{aviso}</p>}
      </>
    );
  }
  
  export default AgregarTarea;