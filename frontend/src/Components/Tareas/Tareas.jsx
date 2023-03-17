import styles from "./Tareas.module.css"

function Tareas({listaTareas}) {



  return (
    <>
    
    <ul className={styles.lista}>
    {listaTareas.map((tarea)=>{return(
    <li key={tarea.id}> <input type="checkbox" checked={tarea.rematada}/>
    {tarea.descripcion} <span>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span>
    </li>
    )})}
    </ul>
    </>
  );
}

export default Tareas;