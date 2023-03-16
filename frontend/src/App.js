import './App.css';
import Tareas from './Components/Tareas/Tareas.jsx';
import AgregarTarea from './Components/AgregarTarea/AgregarTarea';

function App() {
  return (
    <>
    <h1>LISTA DE TAREAS:</h1>
    <AgregarTarea></AgregarTarea>
    <Tareas></Tareas>
    </>
  );
}

export default App;
