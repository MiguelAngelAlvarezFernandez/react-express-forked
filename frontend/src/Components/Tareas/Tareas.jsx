import { useEffect, useState } from "react";



function Tareas() {
    const [Tareas, setTareas] = useState ([])

    function manejadorClick(){
      fetch("http://localhost:8000/tarefa/")
      .then(manexadorResposta)}

    useEffect(
    ()=> {fetch("http://localhost:8000/tarefa/")
    .then(manexadorResposta)},
    []
    )
    
    function manexadorResposta (resposta) {
        const promesaDatos = resposta.json()
        promesaDatos.then(manexadorDatos)
    }

    function manexadorDatos (novosDatos) {
        setTareas(novosDatos)
    }


  return (
    <>
    <button onClick={manejadorClick}>Actualizar tareas</button>
    <ol>
    {Tareas.map((tarea)=>{return(
    <li key={tarea.id}>{tarea.descripcion} 
    <span>{tarea.rematada ? " 😎 Feito" : " 😫 Pendente"} </span>
    </li>
    )})}
    </ol>
    </>
  );
}

export default Tareas;