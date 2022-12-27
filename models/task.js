// import { customAlphabet } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

// const nanoid = customAlphabet('ABCDEF1234567890', 12);

class Task {
  id = '';
  description = '';
  completedOn = null;

  constructor(description) {
    this.id = uuidv4();
    // this.id = nanoid();
    this.description = description;
    this.completedOn = null;
  }
}

export default Task;
