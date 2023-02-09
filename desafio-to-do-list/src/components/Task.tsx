import {Trash} from 'phosphor-react';
import {ITask} from '../App';
import styles from './Task.module.css';

interface Props {
  task: ITask;
}

export function Task({task} : Props) {
  return (
    <div className={styles.task}>
      <button className={styles.checkContainer}><div /></button>
      <p>
        {task.title}
      </p>

      <button className={styles.deleteButton}>
        <Trash size={20} />
      </button>
    </div>
  )
}
