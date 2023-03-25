import styles from "./Tarea.module.css"
import { mensajeRevisaDatos, mensajeErrorServidor, mensajeReset} from "../../libMesajes";

function Tarea ({tarea, setaviso, autoUpdate2}) {

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
            autoUpdate2()
        } else {mensajeRevisaDatos(setaviso)}
    }
    
    function falloRespuesta (error) {
        mensajeErrorServidor(setaviso)
    }

    return (
        <>
        <li key={tarea.id}> <div className={styles.tarea}> <input onClick={manejadorPut} type="checkbox" defaultChecked={tarea.rematada}/>
        {tarea.descripcion} <span className={tarea.rematada ? styles.Feito : styles.Pendente}>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span>
        <button className={styles.button} onClick={manejadorDelete}>🗑️</button></div></li>
        </>
    )
}

export default Tarea