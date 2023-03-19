function mensajeActualizaTareas (setter) {
    setter("Aviso: Pulsa el botón 'Actualizar' para ver las nuevas tareas añadidas")
}

function mensajeRevisaDatos (setter) {
    setter("Error: Revisa los datos. Algo no está bien ☹️")
}
function mensajeErrorServidor (setter) {
    setter('ERROR: Upss el servidor está 😴.Inténtalo más tarde o pincha en "Actualizar"')
}

function mensajeErrorActualiza (setter) {
    setter("Uppss algo fue mal pincha de nuevo en 'Actualizar'")
}

function mensajeReset (setter) {
    setter("")
}


export {mensajeActualizaTareas, mensajeRevisaDatos, mensajeErrorServidor, mensajeErrorActualiza, mensajeReset}