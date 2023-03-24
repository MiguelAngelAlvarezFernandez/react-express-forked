import { useState } from "react";
import style from "./AgregarTarea.module.css"
import { mensajeActualizaTareas, mensajeRevisaDatos, mensajeErrorServidor, mensajeReset} from "../../libMesajes";

function AgregarTarea({aviso, setaviso}) {

    const [nuevaTarea, setnuevaTarea] = useState ("")

    function manejadorInput (evento){
        setnuevaTarea(evento.target.value)
    }

    function manejadorClick (){
        mensajeReset(setaviso)
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
            mensajeActualizaTareas(setaviso)
        } else {mensajeRevisaDatos(setaviso)}
    }

    function falloRespuesta (error) {
        mensajeErrorServidor(setaviso)
      }

    return (
      <>
        <fieldset className={style.nuevasTareas}> 
            <legend className={style.legend}>¿Alguna otra tarea?</legend>
            <input className={style.input} type="text" value={nuevaTarea} placeholder="Añade una tarea" size="40" maxLength="50" onInput={manejadorInput}/>
            <button className={style.button} type="button" onClick={manejadorClick}>Añadir</button>
        </fieldset>
        {aviso && <p className={style.aviso}>{aviso}</p>}
      </>
    );
  }
  
  export default AgregarTarea;