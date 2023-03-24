import styles from "./Tareas.module.css"
import { mensajeActualizaTareas, mensajeRevisaDatos, mensajeErrorServidor, mensajeReset} from "../../libMesajes";

function Tareas(props) {

function manejadorDelete(){
  mensajeReset(props.setaviso)
  fetch(
      "http://localhost:8000/tarefa/",
      {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
              {
                  id: 0,
              }
          ),
      }
  ).then(resultadoRespuestaOk)
  .catch(falloRespuesta)
}

function resultadoRespuestaOk(respuesta) {
  if (respuesta.ok) {
      mensajeActualizaTareas(props.setaviso)
  } else {mensajeRevisaDatos(props.setaviso)}
}

function falloRespuesta (error) {
  mensajeErrorServidor(props.setaviso)
}

  return (
    <ul className={styles.lista}>
      {props.listaTareas.map((tarea)=>{return(
      <li key={tarea.id}> <div className={styles.tarea}> <input type="checkbox" defaultChecked={tarea.rematada}/>
      {tarea.descripcion} {tarea.id}<span className={tarea.rematada ? styles.Feito : styles.Pendente}>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span></div>
      <button onClick={manejadorDelete}>delete</button></li>
      )})}
    </ul>
  );
}

export default Tareas;