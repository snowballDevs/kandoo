import React from 'react';
import Task from './Task';

const Column = ({ column }) => {
  return (
    <div className="bg-gray-200 rounded p-4 shadow">
      <h2 className="text-xl font-bold text-black">{column.title}</h2>
      <div className="mt-4 space-y-4">
        {column.tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Column;
