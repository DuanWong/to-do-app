import MaintainItem from './MaintainItem';

function TodoList({ state, dispatch }) {
  return (
    <div className="display-item">
      {state.tasks.map(task => (
        <MaintainItem key={task.id} task={task} state={state} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default TodoList;