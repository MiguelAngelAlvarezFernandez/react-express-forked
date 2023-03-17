import './App.css';
import { useEffect, useState } from "react";
import Tareas from './Components/Tareas/Tareas.jsx';
import AgregarTarea from './Components/AgregarTarea/AgregarTarea';

function App() {

  const [tareas, settareas] = useState ([])
  const [mensaje, setmensaje] = useState("")

  function manejadorClick(){
    fetch("http://localhost:8000/tarefa/")
    .then(manejadorResposta).catch(manejadorError)}

  useEffect(
  ()=> {fetch("http://localhost:8000/tarefa/")
  .then(manejadorResposta).catch(manejadorError)},
  []
  )
  
  function manejadorResposta (respuesta) {
      if (respuesta.ok) {const promesaDatos = respuesta.json()
      promesaDatos.then(manexadorDatos)} else {setmensaje('Uppss algo fue mal pincha de nuevo en "Actualizar"')}
  }

  function manexadorDatos (nuevosDatos) {
      settareas(nuevosDatos)
      setmensaje("")
  }

  function manejadorError(error) {
    setmensaje("ERROR: Upss el servidor está 😴")
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
    <Tareas listaTareas={tareas}></Tareas>
    </div>
  );
}

export default App;
