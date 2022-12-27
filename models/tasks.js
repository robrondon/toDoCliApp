import Task from './task.js';
import colors from 'colors';

/**
 * _listado:
 *      {'uuid-12334254-234342-543': { id:12, description: 'ashfjafasjd', completedOn: '2020-12-01 00:12:22' }}
 */

class Tasks {
  _list = {}; // No hace falta tenerlo fuera del constructor pero ayuda a verse mejor

  get arrList() {
    const listArr = [];
    Object.keys(this._list).forEach((key) => listArr.push(this._list[key]));
    return listArr;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  uploadTaskFromArr(tasks = []) {
    tasks.forEach((task) => (this._list[task.id] = task));
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listTasks() {
    this.arrList.forEach(({ description, completedOn }, i) => {
      const index = `${(i + 1 + '.').cyan}`;
      const state = completedOn ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${index} ${description} :: ${state}`);
    });
  }

  listTasksByState(completed = true) {
    console.log();
    this.arrList
      .filter(({ completedOn }) => completed === Boolean(completedOn))
      .forEach(({ description, completedOn }, i) => {
        const index = `${(i + 1 + '.').cyan}`;
        const state = completedOn ? completedOn.green : 'Pendiente'.red;
        console.log(`${index} ${description} :: ${state}`);
      });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedOn) {
        task.completedOn = new Date().toISOString();
      }
    });

    this.arrList.forEach((task) => {
      if (!ids.includes(task.id)) {
        const updatedTask = this._list[task.id];
        updatedTask.completedOn = null;
        // this._list[task.id].completedOn = null
      }
    });
  }
}

export default Tasks;
