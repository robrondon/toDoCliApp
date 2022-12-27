import colors from 'colors';
import { saveDB, readDB } from './helpers/dbInteractions.js';
import {
  confirmation,
  inquirerMenu,
  pause,
  readInput,
  showTasksChecklist,
  tasksToDeleteList,
} from './helpers/inquirer.js';
import Tasks from './models/tasks.js';

const main = async () => {
  let opt = '';
  const tasks = new Tasks();
  const tasksDB = readDB();

  if (tasksDB) {
    // Establecer las tareas
    tasks.uploadTaskFromArr(tasksDB);
  }

  do {
    // Imprimir el menu y almacena la respuesta
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // Crear tarea
        const desc = await readInput('Descripción:');
        tasks.createTask(desc);
        break;
      case '2':
        // Listar tareas
        tasks.listTasks();
        break;
      case '3':
        // Listar tareas completadas
        tasks.listTasksByState(true);
        break;
      case '4':
        // Listar tareas pendientes
        tasks.listTasksByState(false);
        break;
      case '5':
        // Completado o Pendiente
        const ids = await showTasksChecklist(tasks.arrList);
        tasks.toggleCompleted(ids);
        break;
      case '6':
        // Eliminar una tarea
        const id = await tasksToDeleteList(tasks.arrList);
        if (id !== '0') {
          const ok = await confirmation('¿Estás segur@?');
          if (ok) {
            tasks.deleteTask(id);
            console.log();
            console.log('Tarea borrada');
          }
        }
        break;
    }

    saveDB(tasks.arrList);

    await pause();
  } while (opt !== '0');
};

main();
