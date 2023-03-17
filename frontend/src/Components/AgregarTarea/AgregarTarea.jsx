import { useState } from "react";

function AgregarTarea() {

    const [nuevaTarea, setnuevaTarea] = useState ("")
    const [mensaje, setmensaje] = useState("")

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
        } else {setmensaje("Error: Revisa los datos. Algo no está bien ☹️")}
    }

    function falloRespuesta (error) {
        setmensaje("ERROR: Upss el servidor está 😴")
    }

    return (
      <>
      <input type="text" value={nuevaTarea} onInput={manejadorInput}/>
      <button type="button" onClick={manejadorClick}>Añadir</button>
      <p>{mensaje}</p>
      </>
    );
  }
  
  export default AgregarTarea;