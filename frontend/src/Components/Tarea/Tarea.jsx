import styles from "./Tarea.module.css"
import { mensajeRevisaDatos, mensajeErrorServidor, mensajeReset} from "../../libMesajes";
import { useContext } from "react";
import {autoUpdateContext, setmensajeContext} from "../../App"

function Tarea ({tarea}) {

    const autoUpDate = useContext(autoUpdateContext)
    const setmensaje = useContext(setmensajeContext)

    function manejadorDelete(){
        mensajeReset(setmensaje)
        fetch(
            "http://localhost:8000/tarefa/",
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        id: tarea.id,
                    }
                ),
            }
        ).then(manejadorRespuesta)
        .catch(manejadorError)
    }

    function manejadorPut(){
        mensajeReset(setmensaje)
        fetch(
            "http://localhost:8000/tarefa/",
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        id: tarea.id,
                        descripcion: tarea.descripcion,
                        rematada: ! tarea.rematada
                    }
                ),
            }
        ).then(manejadorRespuesta)
        .catch(manejadorError)
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
        <li key={tarea.id}> <div className={styles.tarea}> <input onClick={manejadorPut} type="checkbox" checked={tarea.rematada}/>
        {tarea.descripcion} <span className={tarea.rematada ? styles.Feito : styles.Pendente}>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span>
        <button className={styles.button} onClick={manejadorDelete}>🗑️</button></div></li>
        </>
    )
}

export default Tarea