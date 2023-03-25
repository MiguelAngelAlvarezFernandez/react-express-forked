import styles from "./Tareas.module.css"
import  Tarea from "../Tarea/Tarea.jsx";
function Tareas({listaTareas, setaviso, autoUpdate1}) {

  return (
    <ul className={styles.lista}>
      {listaTareas.map((tarea)=>{return(<Tarea tarea={tarea} setaviso={setaviso} autoUpdate2={autoUpdate1}/>)})}
    </ul>
  );
}

export default Tareas;