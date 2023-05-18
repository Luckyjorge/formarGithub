const accion = process.argv[2];
const {
  guardarTarea,
  filtrarPorEstado,
  listarTareas,
  cambiarEstadoTarea
} = require("./funcionesDeTareas");

if (
  (process.argv[2] === "crear" && !process.argv[3]) ||
  (process.argv[2] === "filtrar" && !process.argv[3])
) {
  console.log("Error: Número de argumentos invalido. Intente nuevamente");
} else {
  switch (accion) {
    case "listar":
      listarTareas();
      break;

    case "cambiar":
      const tituloTarea = process.argv[3];
      const nuevoEstado = process.argv[4];
      cambiarEstadoTarea(tituloTarea, nuevoEstado);
      console.log("Estado de la tarea cambiado con éxito");
      break;

    case "crear":
      const titulo = process.argv[3];
      const nuevaTarea = {
        titulo: titulo,
        estado: "pendiente",
      };
      guardarTarea(nuevaTarea);
      console.log("La nueva tarea se ha creado y guardado correctamente.");
      break;

      case "filtrar":
        const estado = process.argv[3];
        const tareasFiltradas = filtrarPorEstado(estado);
        if (tareasFiltradas.length > 0) {
          console.log(`Tareas con estado "${estado}":`);
          tareasFiltradas.forEach((tarea) => {
            console.log(`- ${tarea.titulo} (${tarea.estado})`);
          });
        } else {
          console.log(
            `No se encontraron tareas con estado "${estado}". Los estados válidos son: "en proceso", "completado", "pendiente"`
          );
        }
        break;

    case undefined:
      console.log(`Atención - Tienes que pasar una acción.`);
      break;

    default:
      console.log(`No entiendo qué quieres hacer.`);
  }
}
