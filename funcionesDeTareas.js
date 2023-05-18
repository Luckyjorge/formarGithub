const fs = require("fs");

function leerArchivo() {
  try {
    const data = fs.readFileSync("tareas.json", "utf8");
    let dataParseada = JSON.parse(data);
    return dataParseada
  } catch (error) {
    console.error("Error al leer el archivo tareas.json:", error);
    return [];
  }
}

function escribirJSON(tareas) {
  var jsonString = JSON.stringify(tareas, null, 3);

  try {
    fs.writeFileSync("tareas.json", jsonString);
    console.log("El archivo tareas.json se ha guardado correctamente.");
  } catch (error) {
    console.error("Error al guardar el archivo tareas.json:", error);
  }
}

function guardarTarea(tarea) {
  var tareasExistentes = leerArchivo();
  tareasExistentes.push(tarea);
  escribirJSON(tareasExistentes);
}
function filtrarPorEstado(estado) {
  const tareas = leerArchivo();
  const tareasFiltradas = tareas.filter((tarea) => tarea.estado === estado);
  return tareasFiltradas;
}
function listarTareas() {
  const tareas = leerArchivo();

  console.log("Lista de tareas:");
  tareas.forEach((tarea, indice) => {
    console.log(`${indice + 1} - ${tarea.titulo} (${tarea.estado})`);
  });
}

const cambiarEstadoTarea = (titulo, nuevoEstado) => {
    const tareas = leerArchivo(); // Obtener todas las tareas
    const tareaEncontrada = tareas.find((tarea) => tarea.titulo === titulo);
    
    if (tareaEncontrada) {
        tareaEncontrada.estado = nuevoEstado; // Actualizar el estado de la tarea
        escribirJSON(tareas); // Guardar el array de tareas actualizado
      } else {
        console.log('No se encontró la tarea');
      }
    }

module.exports = {
    cambiarEstadoTarea,
  listarTareas,
  filtrarPorEstado,
  escribirJSON,
  leerArchivo,
  guardarTarea,
};
