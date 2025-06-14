import { useForm } from 'react-hook-form';

function CreateItem({ dispatch }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch({ 
      type: 'ADD_TASK', 

      // Attached data 
      payload: {
        id: Date.now(),
        text: data.taskText,
        completed: false,
        date: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
      }
    });

    // clear form content
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-item">
      <input
        type="text"
        placeholder="New task"
        {...register('taskText', { required: true })}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateItem;
