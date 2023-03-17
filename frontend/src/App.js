import './App.css';
import { useEffect, useState } from "react";
import Tareas from './Components/Tareas/Tareas.jsx';
import AgregarTarea from './Components/AgregarTarea/AgregarTarea';

function App() {

  const [tareas, settareas] = useState ([])
  const [mensaje, setmensaje] = useState("")

  function manejadorClick(){
    fetch("http://localhost:8000/tarefa/")
    .then(manexadorResposta)}

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
      settareas(novosDatos)
      setmensaje("")
  }

  return (
    <div className='documento'>
      <header>
    <h1>LISTA DE TAREAS:</h1>
    <div className='botoneseinput'>
    <button onClick={manejadorClick}>🔄 Actualizar</button>
    <AgregarTarea aviso={mensaje} setaviso={setmensaje} ></AgregarTarea>
    </div>
      </header>
    <Tareas listaTareas={tareas}></Tareas>
    </div>
  );
}

export default App;
