import sqlite3 from 'sqlite3'
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

/**
 * Creamos el conector con la base de datos "base-de-datos.db"
 * Este conector nos permitira "hablar" SQL con la base de datos.
 */
const db = new sqlite3.Database('./base-de-datos.db', (error) => {
    if (error) console.error(error)
    else console.log('Conectada con la base de datos.');
});

/**
 * El método .run del conector permite ejecutar SQL con la base de datos.
 * El string multilinea `` contiene las instrucciones para crear la
 * tabla "tareas" en caso de que esta no exista.
 * Dicha tabla tendrá un campo "id" numérico, un campo "descripcion" tipo
 * string y un campo "completada" booleano.
 */
db.run(`
    CREATE TABLE
        IF NOT EXISTS
        tareas(
            id INTEGER PRIMARY KEY,
            descripcion TEXT NOT NULL,
            rematada BOOLEAN NOT NULL
        )
`);

app.post("/tarefa/", (peticion, respuesta)=>{
    db.run( // Ejemplo de inserción en la base de datos
        `INSERT INTO tareas(id, descripcion, rematada) VALUES (?, ?, ?)`,
        [peticion.body.id, peticion.body.descripcion, peticion.body.rematada],
        (error) => {
            if (error) {
                console.error(error) 
                respuesta.status(500)
                respuesta.send(`Error accediendo a la base de datos.
                Consulta la consola del backend para más información`)
            } else {
                respuesta.status(200)
                respuesta.send("Ok")
            }
        }
    )
})

app.get("/tarefa/", (peticion, respuesta)=>{
    if (peticion.query.id) {
        db.get( // Ejemplo de consulta para obter unha tarefa específica
            `SELECT id, descripcion, rematada FROM tareas WHERE id = ?`,
            [peticion.query.id],
            (error, tarea) => {
                if (error) {
                    console.error(error)
                    respuesta.status(500)
                    respuesta.send(`Error accediendo a la base de datos.
                    Consulta la consola del backend para más información`)
                }
                else {
                    if (tarea) {
                        const JSONtarea = JSON.stringify(tarea)
                        respuesta.status(200)
                        respuesta.send(JSONtarea)
                    } else {
                        respuesta.status(404)
                        respuesta.send(`No se encontró la tarea con id ${peticion.query.id}`)
                    }

                }
            }
        )
    } else {
    if (peticion.query.rematada) {
        db.all( // Ejemplo de consulta para obtener una o unas tareas específicas.
                // En este caso las tareas pendientes (false) o finalizadas (true)
            `SELECT id, descripcion, rematada FROM tareas WHERE rematada = ?`,
            [peticion.query.rematada],
            (error, tarea) => {
                if (error) {
                    console.error(error)
                    respuesta.status(500)
                    respuesta.send(`Error accediendo a la base de datos.
                    Consulta la consola del backend para más información`)
                }
                else {
                    if (tarea.length > 0) {
                        const JSONtarea = JSON.stringify(tarea)
                        respuesta.status(200)
                        respuesta.send(JSONtarea)
                    } else {
                        respuesta.status(404)
                        respuesta.send(`No se encontró niguna tarea con estado ${peticion.query.rematada}`)
                    }

                }
            }
    
        )
        } else  {
            db.all( // Si no se especifica un estado concreto, se entregan todas.
                `SELECT id, descripcion, rematada FROM tareas`,
                (error, tareas) => {
                    if (error) {
                        console.error(error)
                        respuesta.status(500)
                        respuesta.send(`Error accediendo a la base de datos.
                        Consulta la consola del backend para más información`)
                    }
                    else {
                        const JSONdatos = JSON.stringify(tareas)
                        respuesta.status(200)
                        respuesta.send(JSONdatos)
                    }
                }
            )
        }
    }
}
)



/*app.get("/", (_, respuesta)=>{
    respuesta.status(200)
    respuesta.send("¡¡¡Funciono!!!")
})*/

/*app.post("/tarefa/", (peticion, respuesta)=>{
    tarefas.push(peticion.body)
    respuesta.status(200)
    respuesta.send("Ok")
})*/

/*app.get("/tarefa/", (_, respuesta)=>{
    respuesta.status(200)
    respuesta.send(JSON.stringify(tarefas))
})*/

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
