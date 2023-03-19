import './App.css';
import { useEffect, useState } from "react";
import Tareas from './Components/Tareas/Tareas.jsx';
import AgregarTarea from './Components/AgregarTarea/AgregarTarea';
import {mensajeErrorServidor, mensajeErrorActualiza, mensajeReset} from "./libMesajes";

function App() {

  const [tareas, settareas] = useState ([])
  const [mensaje, setmensaje] = useState("")

  useEffect(
    ()=> {fetch("http://localhost:8000/tarefa/")
    .then(manejadorResposta).catch(manejadorError)},
    []
    )

  function manejadorClick(){
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
    <div className='documento'>
      <header>
        <h1>LISTA DE TAREAS:</h1>
        <div className='botoneseinput'>
          <button className="actualizar" onClick={manejadorClick}>🔄 Actualizar</button>
          <AgregarTarea aviso={mensaje} setaviso={setmensaje} ></AgregarTarea>
        </div>
      </header>
      <main>
        <Tareas listaTareas={tareas}></Tareas>
      </main>
    </div>
  );
}

export default App;
