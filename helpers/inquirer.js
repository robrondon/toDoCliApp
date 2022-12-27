import inquirer from 'inquirer';
import colors from 'colors';

const inquirerMenu = async () => {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: '¿Qué deseas hacer?',
      choices: [
        {
          value: '1',
          name: `${'1.'.cyan} Crear Tarea`,
        },
        {
          value: '2',
          name: `${'2.'.cyan} Listar Tareas`,
        },
        {
          value: '3',
          name: `${'3.'.cyan} Listar Tareas Completadas`,
        },
        {
          value: '4',
          name: `${'4.'.cyan} Listar Tareas Pendientes`,
        },
        {
          value: '5',
          name: `${'5.'.cyan} Completar Tarea(s)`,
        },
        {
          value: '6',
          name: `${'6.'.cyan} Borrar Tarea`,
        },
        {
          value: '0',
          name: `${'0.'.cyan} Salir \n`,
        },
      ],
    },
  ];
  console.clear();
  console.log('==========================='.cyan);
  console.log('   Seleccione una opción'.white);
  console.log('===========================\n'.cyan);
  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  console.log('\n');
  await inquirer.prompt([
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.cyan} para continuar`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const tasksToDeleteList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${(i + 1 + '.').cyan}`;
    return {
      value: task.id,
      name: `${index} ${task.description}`,
    };
  });

  choices.unshift({
    value: '0',
    name: `${'0.'.cyan} Cancelar`,
  });

  const options = [
    {
      type: 'list',
      name: 'id',
      message: '¿Qué tarea deseas borrar?',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(options);
  return id;
};

const confirmation = async (message = '') => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showTasksChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${(i + 1 + '.').cyan}`;

    return {
      value: task.id,
      name: `${index} ${task.description}`,
      checked: task.completedOn ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

export {
  inquirerMenu,
  pause,
  readInput,
  tasksToDeleteList,
  confirmation,
  showTasksChecklist,
};
