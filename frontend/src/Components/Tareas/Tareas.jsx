import styles from "./Tareas.module.css";
import  Tarea from "../Tarea/Tarea.jsx";

function Tareas({listaTareas}) {

  return (
    <>
    {listaTareas.length > 0 ?
      (    <ul className={styles.lista}>
        {listaTareas.map((tarea)=>{return(<Tarea tarea={tarea}/>)})}
      </ul>
      ) : ( 
        <p>Nada que ver...</p>
      )
    }

    </>
  );
}

export default Tareas;