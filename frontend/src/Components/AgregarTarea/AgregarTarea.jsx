import { useState } from "react";

function AgregarTarea(props) {

    const [nuevaTarea, setnuevaTarea] = useState ("")

    function manejadorInput (evento){
        setnuevaTarea(evento.target.value)
    }

    function manejadorClick (){
        fetch(
            "http://localhost:8000/tarefa/",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        id: Date.now(),
                        descripcion: nuevaTarea,
                        rematada: false,
                    }
                ),
            }
        ).then(resultadoRespuestaOk)
        .catch(falloRespuesta)
    }

    function resultadoRespuestaOk(respuesta) {
        if (respuesta.ok) {
            setnuevaTarea("")
            props.setaviso("Aviso: Pulsa el botón 'Actualizar' para ver la nueva tarea")
        } else {props.setaviso("Error: Revisa los datos. Algo no está bien ☹️")}
    }

    function falloRespuesta (error) {
        props.setaviso("ERROR: Upss el servidor está 😴")
    }

    return (
      <>
      <input type="text" value={nuevaTarea} onInput={manejadorInput}/>
      <button type="button" onClick={manejadorClick}>Añadir</button>
      <p>{props.aviso}</p>
      </>
    );
  }
  
  export default AgregarTarea;