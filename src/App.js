import { useReducer, useEffect } from 'react';
import CreateItem from './components/CreateItem';
import DisplayItem from './components/DisplayItem';
import './css/index.css';
import logo from './img/React-icon.png';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  editingId: null,
  editingText: '',
};

function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'DELETE_TASK':
      return {
        ...state,

        // Filter out tasks with matching ids and delete them.
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    // From undo to complete or from complete to undo
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    // Enter editing interface
    case 'START_EDIT':
      return {
        ...state,
        editingId: action.payload.id,
        editingText: action.payload.text,
      };

    // Save the content after editing is completed
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id && task.completed) {
            return {
              ...task, text: action.payload.text,
                completed: !task.completed,
                date: getFormattedDateTime()
            }
          } else if (task.id === action.payload.id && !task.completed) {
            return {
              ...task, text: action.payload.text,
              date: getFormattedDateTime()
            }
          } else {
            return task;
          }
        }),
        editingId: null,
        editingText: '',
      };

    // Discard edited content
    case 'CANCEL_EDIT':
      return { ...state, editingId: null, editingText: '' };

    // Do not change state in other cases
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Whenever the task list changes, store tasks in the browser's localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <div>
      <main className="container">
        <h1 className="logo">iTask</h1>
        <CreateItem dispatch={dispatch} />
        <DisplayItem state={state} dispatch={dispatch} />
      </main>
      <footer>
        <p>Powered by</p>
        <img src={logo} className="logo-spin" alt="logo" /> 
        <p>React</p>
      </footer>
    </div>
  );
}

export default App;
