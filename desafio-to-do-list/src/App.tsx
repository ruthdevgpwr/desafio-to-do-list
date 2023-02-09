import {ChangeEvent, FormEvent, useState} from 'react';
import {Header} from './components/Header';
import styles from './App.module.css';
import {PlusCircle} from 'phosphor-react';
import './global.css';
import {Tasks} from './components/Tasks';

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {

  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 'teste',
      title: 'texto de teste',
      isCompleted: true
    },
  ]);

  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onAddTask(title);
    setTitle('');
  }

  function onAddTask(taskTitle: string) {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
      }
    ]);
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  
  function deleteTaskById(taskId: string) {
    const newsTasksWithoutDeleted = tasks.filter((task) => task.id !== taskId);
    setTasks(newsTasksWithoutDeleted);
  }

  return (
    <>
      <Header />

      <div className={styles.containerFormTask}>
        <form className={styles.formTask} onSubmit={handleSubmit}>
          <input 
            className={styles.inputTask} 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            onChange={onChangeTitle}
            value={title}
          />

          <button type='submit'>
             Criar 
            <PlusCircle size={20} color='white' weight='bold' />
          </button>
        </form>
      </div>

      <Tasks tasks={tasks} onDelete={deleteTaskById}/>
    
    </>
  )
}
