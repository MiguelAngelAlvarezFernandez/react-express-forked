import { useEffect, useState } from "react";

function Tareas() {
    const [Datos, setDatos] = useState ([])

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
        setDatos(novosDatos)
    }


  return (
    <>
    {Datos.map((tarefa)=>{return(
    <ol start={tarefa.id +1}><li>{tarefa.descripcion} <input type="checkbox" checked={tarefa.rematada}/></li></ol>
    )})}
    </>
  );
}

export default Tareas;