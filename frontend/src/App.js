import './App.css';
import { useEffect, useState, createContext } from "react";
import Tareas from './Components/Tareas/Tareas.jsx';
import AgregarTarea from './Components/AgregarTarea/AgregarTarea';
import ButtonsFilters from './Components/ButtonsFilters/ButtonsFilters';
import {mensajeErrorServidor, mensajeErrorActualiza, mensajeReset} from "./libMesajes";

export const autoUpdateContext = createContext()
export const setmensajeContext = createContext()

function App() {

  const [tareas, settareas] = useState ([])
  const [mensaje, setmensaje] = useState("")

  useEffect(
    ()=> {fetch("http://localhost:8000/tarefa/")
    .then(manejadorRespuesta).catch(manejadorError)},
    []
    )

  function manejadorClick(){
    mensajeReset(setmensaje)
    fetch("http://localhost:8000/tarefa/")
    .then(manejadorRespuesta).catch(manejadorError)}

    function autoUpdate(){
      mensajeReset(setmensaje)
      fetch("http://localhost:8000/tarefa/")
      .then(manejadorRespuesta).catch(manejadorError)}
  
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
          <button className="actualizar" onClick={manejadorClick}>🔄 Actualizar</button>
          <AgregarTarea aviso={mensaje}></AgregarTarea>
          <ButtonsFilters setTareasFiltradas={settareas}/>
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
