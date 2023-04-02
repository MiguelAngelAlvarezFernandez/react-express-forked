import './App.css';
import { useEffect, useState, createContext } from "react";
import Tareas from './Components/Tareas/Tareas.jsx';
import AgregarTarea from './Components/AgregarTarea/AgregarTarea';
import ButtonsFilters from './Components/ButtonsFilters/ButtonsFilters';
import {mensajeErrorServidor, mensajeErrorActualiza, mensajeReset} from "./libMesajes";
import {solicitudesFetch} from "./libFetchs"

export const autoUpdateContext = createContext()
export const setmensajeContext = createContext()

function App() {

  const [tareas, settareas] = useState ([])
  const [mensaje, setmensaje] = useState("")
  const [idVistaTareas, setidVistaTareas] = useState("")

  useEffect(
    ()=> {
      solicitudesFetch("", "GET", "", manejadorRespuesta, manejadorError)
    },
    []
    )

  function autoUpdate(){
    if (idVistaTareas==="tareasTotales"){
      mensajeReset(setmensaje)
      solicitudesFetch("", "GET", "", manejadorRespuesta, manejadorError)
    }
  
    if (idVistaTareas==="tareasPendientes"){
      mensajeReset(setmensaje)
      solicitudesFetch("?rematada=0", "GET","" , manejadorRespuesta, manejadorError)
    }

    if (idVistaTareas==="tareasTerminadas"){
      mensajeReset(setmensaje)
      solicitudesFetch("?rematada=1", "GET","" , manejadorRespuesta, manejadorError)
    }
}
  
  function manejadorRespuesta (respuesta) {
      if (respuesta.ok) {const promesaDatos = respuesta.json()
      promesaDatos.then(manejadorDatos)} else {mensajeErrorActualiza(setmensaje)}
  }

  function manejadorDatos (nuevosDatos) {
      settareas(nuevosDatos)
      mensajeReset(setmensaje)
  }

  function manejadorError (error) {
    mensajeErrorServidor(setmensaje)
  }

  return (
    <autoUpdateContext.Provider value={autoUpdate}>
    <setmensajeContext.Provider value={setmensaje}>
    <div className='documento'>
      <header>
        <h1>LISTA DE TAREAS:</h1>
        <div className='botoneseinput'>
          <AgregarTarea aviso={mensaje}></AgregarTarea>
          <ButtonsFilters setTareasFiltradas={settareas} idVistaTareas={idVistaTareas} setidVistaTareas = {setidVistaTareas}/>
        </div>
      </header>
      <main>
        <Tareas listaTareas={tareas}></Tareas>
      </main>
    </div>
    </setmensajeContext.Provider>
    </autoUpdateContext.Provider>
  );
}

export default App;
