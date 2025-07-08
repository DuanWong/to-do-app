import { useForm } from 'react-hook-form';

function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

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
        date: getFormattedDateTime()
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
