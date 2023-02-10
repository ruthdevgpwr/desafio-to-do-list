import {Task} from './Task';
import styles from './Tasks.module.css';

import { ITask } from '../App';
import {ClipboardText} from 'phosphor-react';

interface Props {
  tasks: ITask[];
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function Tasks({tasks, onDelete, onComplete} : Props) {

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
          <Task key={task.id} task={task} onDelete={onDelete} onComplete={onComplete}/>
        ))}

        {tasks.length <= 0 && (
          <section className={styles.empty}>
            <ClipboardText size={50} color="#fafafa" weight="light" />
            <div>
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas que organize seus itens a fazer</span>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}