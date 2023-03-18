import { useState } from "react";
import style from "./AgregarTarea.module.css"
import { mensajeActualizaTareas, mensajeRevisaDatos, mensajeErrorServidor} from "../../libMesajes";

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
            mensajeActualizaTareas(props.setaviso)
        } else {mensajeRevisaDatos(props.setaviso)}
    }

    function falloRespuesta (error) {
        mensajeErrorServidor(props.setaviso)
      }

    return (
      <>
      <fieldset className={style.nuevasTareas}> 
        <legend className={style.legend}>¿Alguna otra tarea?</legend>
      <input className={style.input} type="text" value={nuevaTarea} placeholder="Añade una tarea" size="40" maxlength="40" onInput={manejadorInput}/>
      <button className={style.button} type="button" onClick={manejadorClick}>Añadir</button>
      </fieldset>
      {props.aviso && <p className={style.aviso}>{props.aviso}</p>}
      </>
    );
  }
  
  export default AgregarTarea;