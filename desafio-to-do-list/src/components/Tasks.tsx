import {Task} from './Task';
import styles from './Tasks.module.css';

import { ITask } from '../App';

interface Props {
  tasks: ITask[];
}

export function Tasks({tasks} : Props) {

  const tasksLength = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  
  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tarefas criadas</p>
          <span>{tasksLength}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Concluídas</p>
          <span>{completedTasks} de {tasksLength}</span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task key={task.id} task={task}/>
        ))}
      </div>
    </section>
  )
}