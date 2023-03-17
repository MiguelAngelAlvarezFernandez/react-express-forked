


function Tareas({listaTareas}) {



  return (
    <>
    
    <ol>
    {listaTareas.map((tarea)=>{return(
    <li key={tarea.id}>{tarea.descripcion} 
    <span>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span>
    </li>
    )})}
    </ol>
    </>
  );
}

export default Tareas;