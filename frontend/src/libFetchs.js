function solicitudesFetch(query,method, datosEnviados, manejadorRespuesta, manejadorError){

        fetch(
            `http://localhost:8000/tarefa/${query}`,
            method !=="GET" ? {
              method: method,
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(datosEnviados)
            } : null
        )
        .then(manejadorRespuesta)
        .catch(manejadorError)
    ;
};

export {solicitudesFetch}