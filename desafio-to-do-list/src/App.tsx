import {Header} from './components/Header';
import styles from './App.module.css';
import {PlusCircle} from 'phosphor-react';
import './global.css';

export function App() {

  return (
    <>
      <Header />

      <form className={styles.formTask}>
        <input className={styles.inputTask} type="text" placeholder='Adicione uma nova tarefa' />

        <button className={styles.buttonTask} type='submit'>
            Criar
          <span className={styles.iconButton}>
            <PlusCircle />
          </span>
        </button>
      </form>
    </>
  )
}
