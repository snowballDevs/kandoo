import React from 'react';

const Task = ({ task }) => {
  const { title, priority, description } = task;

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h3 className="task-title">{title}</h3>
      <p className="task-priority">Priority: {priority}</p>
      <p className="task-description">{description}</p>
    </div>
  );
};

export default Task;
