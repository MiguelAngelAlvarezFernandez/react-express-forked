import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const tarefas = [
    {
        id: 0,
        descripcion: "Unha tarefa de exemplo",
        rematada: true,
    },
    {
        id: 1,
        descripcion: "Outra tarefa de exemplo",
        rematada: false,
    },
]

app.get("/", (_, respuesta)=>{
    respuesta.status(200)
    respuesta.send("¡¡¡Funciono!!!")
})

app.post("/tarefa/", (peticion, respuesta)=>{
    tarefas.push(peticion.body)
    respuesta.status(200)
    respuesta.send("Ok")
})

app.get("/tarefa/", (_, respuesta)=>{
    respuesta.status(200)
    respuesta.send(JSON.stringify(tarefas))
})

app.put("/tarefa/", (peticion, respuesta)=>{
const indice = tarefas.findIndex (
    function (tarefa) {
        return peticion.body.id === tarefa.id
    })
/*devuelve el índice del primer elemento de un array que cumpla 
con la función de prueba proporcionada. 
En caso contrario devuelve -1 */
if (indice===-1){
respuesta.status(404)
respuesta.send("Tarefa not found")
return /* El return "vacio" se pone para que finalice aquí la función 
          sin leer el resto en caso de que se cumpla la condición*/
} else {tarefas.splice(indice, 1, peticion.body)
respuesta.status(200)
respuesta.send("Ok")}
})

app.delete("/tarefa/", (peticion, respuesta)=>{
const indice = tarefas.findIndex (
function (tarefa) {
return peticion.body.id === tarefa.id
})
if (indice===-1){
respuesta.status(404)
respuesta.send("Tarefa not found")
return 
} else {tarefas.splice(indice, 1)
respuesta.status(200)
respuesta.send("Ok")}
})


app.listen( 8000,()=>{
    console.log("Express traballando...");
})
