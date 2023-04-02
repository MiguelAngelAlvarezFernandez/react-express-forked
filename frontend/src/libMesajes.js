function mensajeActualizaTareas (setter) {
    setter("Aviso: Pulsa el botón 'Actualizar' para ver las nuevas tareas añadidas")
}

function mensajeRevisaDatos (setter) {
    setter("Error: Revisa los datos. Algo no está bien ☹️")
}
function mensajeErrorServidor (setter) {
    setter('ERROR: Upss el servidor está 😴.')
}

function mensajeErrorActualiza (setter) {
    setter("Uppss algo fue mal pincha de nuevo en 'Actualizar'")
}

function mensajeNoHayTareas (setter) {
    setter("Aviso: No hay ninguna tarea que mostrar")
}

function mensajeReset (setter) {
    setter("")
}


export {mensajeActualizaTareas, mensajeRevisaDatos, mensajeErrorServidor, mensajeErrorActualiza, mensajeNoHayTareas, mensajeReset}