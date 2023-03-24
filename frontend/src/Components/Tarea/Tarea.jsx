import styles from "./Tarea.module.css"
import { mensajeActualizaTareas, mensajeRevisaDatos, mensajeErrorServidor, mensajeReset} from "../../libMesajes";

function Tarea ({tarea, setaviso}) {

    function manejadorDelete(){
        mensajeReset(setaviso)
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
        ).then(resultadoRespuestaOk)
        .catch(falloRespuesta)
    }

    function manejadorPut(){
        mensajeReset(setaviso)
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
        ).then(resultadoRespuestaOk)
        .catch(falloRespuesta)
    }

    function resultadoRespuestaOk(respuesta) {
        if (respuesta.ok) {
            mensajeActualizaTareas(setaviso)
        } else {mensajeRevisaDatos(setaviso)}
    }
    
    function falloRespuesta (error) {
        mensajeErrorServidor(setaviso)
    }

    return (
        <>
        <li key={tarea.id}> <div className={styles.tarea}> <input onClick={manejadorPut} type="checkbox" defaultChecked={tarea.rematada}/>
        {tarea.descripcion} <span className={tarea.rematada ? styles.Feito : styles.Pendente}>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span></div>
        <button onClick={manejadorDelete}>delete</button></li>
        </>
    )
}

export default Tarea