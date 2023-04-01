import styles from "./Tarea.module.css"
import { mensajeRevisaDatos, mensajeErrorServidor, mensajeReset} from "../../libMesajes";
import { useContext } from "react";
import {autoUpdateContext, setmensajeContext} from "../../App"
import { solicitudesFetch } from "../../libFetchs";

function Tarea ({tarea}) {

    const autoUpDate = useContext(autoUpdateContext)
    const setmensaje = useContext(setmensajeContext)
    const datosEnviadosCheck = {
                                id: tarea.id,
                                descripcion: tarea.descripcion,
                                rematada: ! tarea.rematada
                                }

    function manejadorDelete(){
        mensajeReset(setmensaje)
        solicitudesFetch("","DELETE", {id: tarea.id}, manejadorRespuesta, manejadorError)
    }

    function manejadorCheck(){
        mensajeReset(setmensaje)

        solicitudesFetch("","PUT", datosEnviadosCheck, manejadorRespuesta, manejadorError)
    }

    function manejadorRespuesta(respuesta) {
        if (respuesta.ok) {
            autoUpDate()
        } else {mensajeRevisaDatos(setmensaje)}
    }
    
    function manejadorError (error) {
        mensajeErrorServidor(setmensaje)
    }

    return (
        <>
        <li key={tarea.id}> <div className={styles.tarea}> <input onClick={manejadorCheck} type="checkbox" checked={tarea.rematada}/>
        {tarea.descripcion} <span className={tarea.rematada ? styles.Feito : styles.Pendente}>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span>
        <button className={styles.button} onClick={manejadorDelete}>🗑️</button></div></li>
        </>
    )
}

export default Tarea