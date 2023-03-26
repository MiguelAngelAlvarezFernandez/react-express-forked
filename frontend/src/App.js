import './App.css';
import { useEffect, useState, createContext } from "react";
import Tareas from './Components/Tareas/Tareas.jsx';
import AgregarTarea from './Components/AgregarTarea/AgregarTarea';
import {mensajeErrorServidor, mensajeErrorActualiza, mensajeReset} from "./libMesajes";

export const autoUpdateContext = createContext()

function App() {

  const [tareas, settareas] = useState ([])
  const [mensaje, setmensaje] = useState("")

  useEffect(
    ()=> {fetch("http://localhost:8000/tarefa/")
    .then(manejadorResposta).catch(manejadorError)},
    []
    )

  function manejadorClick(){
    mensajeReset(setmensaje)
    fetch("http://localhost:8000/tarefa/")
    .then(manejadorResposta).catch(manejadorError)}

    function autoUpdate(){
      mensajeReset(setmensaje)
      fetch("http://localhost:8000/tarefa/")
      .then(manejadorResposta).catch(manejadorError)}
  
  function manejadorResposta (respuesta) {
      if (respuesta.ok) {const promesaDatos = respuesta.json()
      promesaDatos.then(manexadorDatos)} else {mensajeErrorActualiza(setmensaje)}
  }

  function manexadorDatos (nuevosDatos) {
      settareas(nuevosDatos)
      mensajeReset(setmensaje)
  }

  function manejadorError (error) {
    mensajeErrorServidor(setmensaje)
  }

  return (
    <autoUpdateContext.Provider value={autoUpdate}>
    <div className='documento'>
      <header>
        <h1>LISTA DE TAREAS:</h1>
        <div className='botoneseinput'>
          <button className="actualizar" onClick={manejadorClick}>🔄 Actualizar</button>
          <AgregarTarea aviso={mensaje} setaviso={setmensaje}></AgregarTarea>
        </div>
      </header>
      <main>
        <Tareas listaTareas={tareas} setaviso={setmensaje} /*autoUpdate1={autoUpdate}*/></Tareas>
      </main>
    </div>
    </autoUpdateContext.Provider>
  );
}

export default App;
