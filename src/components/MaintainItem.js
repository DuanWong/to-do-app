import { useForm } from 'react-hook-form';
import { FaCheck, FaEdit, FaTrash, FaUndo } from 'react-icons/fa';

function MaintainItem({ task, state, dispatch }) {

  // Render two interfaces according to the isEditing state
  const isEditing = state.editingId === task.id;

  const { register, handleSubmit } = useForm({

    // When editing, the original task content is displayed
    defaultValues: { text: task.text }
  });

  const onSubmit = (data) => {
    dispatch({
      type: 'UPDATE_TASK',

      // Attached data 
      payload: { id: task.id, text: data.text }
    });
  };

  const handleCancel = () => {
    dispatch({ type: 'CANCEL_EDIT' });
  };

  return (
    <div className={`maintain-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form className="editing" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register('text', { required: true })} />
          <div className="editing-btn-group">
            <button className="btn-save" type="submit">Save</button>
            <button className="btn-cancel" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-text"><h3>{task.text}</h3></div>
          <div className="date-btn">
            <p>{task.date}</p>
            <div className="button-group">
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}
                title={task.completed ? 'Mark as Incomplete' : 'Mark as complete'}
              >
                {task.completed ? <FaUndo /> : <FaCheck />}
              </button>
              <button title="Edit" onClick={() => dispatch({ type: 'START_EDIT', payload: task })}>
                <FaEdit />
              </button>
              <button title="Delete" onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
                <FaTrash />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MaintainItem;
