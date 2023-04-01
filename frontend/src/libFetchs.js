function solicitudesFetch(method, datosEnviados, manejadorRespuesta, manejadorError){

    return(
        fetch(
            `http://localhost:8000/tarefa/`,
            method !=="GET" ? {
              method: method,
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(datosEnviados)
            } : null
        )
        .then(manejadorRespuesta)
        .catch(manejadorError)
    );

    
};

export {solicitudesFetch}