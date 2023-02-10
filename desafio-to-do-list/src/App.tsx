import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Header} from './components/Header';
import styles from './App.module.css';
import {PlusCircle} from 'phosphor-react';
import './global.css';
import {Tasks} from './components/Tasks';

const LOCAL_STORAGE_KEY = "todo:savedTasks";
export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {

  const [tasks, setTasks] = useState<ITask[]>([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  const [title, setTitle] = useState("");

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onAddTask(title);
    setTitle('');
  }

  function onAddTask(taskTitle: string) {
    setTasksAndSave([
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
    setTasksAndSave(newsTasksWithoutDeleted);
  }

  function toggleTaskCompletedById(taskId: string) {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
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

      <Tasks tasks={tasks} onDelete={deleteTaskById} onComplete={toggleTaskCompletedById}/>
    
    </>
  )
}
