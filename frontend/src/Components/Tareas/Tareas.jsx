import styles from "./Tareas.module.css"

function Tareas({listaTareas}) {



  return (
    <ul className={styles.lista}>
      {listaTareas.map((tarea)=>{return(
      <li key={tarea.id}> <div className={styles.tarea}> <input type="checkbox" checked={tarea.rematada}/>
      {tarea.descripcion} <span className={styles.rematadaOno}>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span></div>
      </li>
      )})}
    </ul>
  );
}

export default Tareas;