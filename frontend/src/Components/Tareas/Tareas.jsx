import styles from "./Tareas.module.css";
import  Tarea from "../Tarea/Tarea.jsx";

function Tareas({listaTareas}) {

  return (
    <ul className={styles.lista}>
      {listaTareas.map((tarea)=>{return(<Tarea tarea={tarea}/>)})}
    </ul>
  );
}

export default Tareas;