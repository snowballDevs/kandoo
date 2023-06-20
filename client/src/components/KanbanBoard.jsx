import React from 'react';
import Column from './Column';

const KanbanBoard = () => {
    const columns = [
        {
            title: "BackLog",
            tasks: [
              { title: "Task 1", priority: "High", description: "Do task 1" },
              { title: "Task 2", priority: "Medium", description: "Do task 2" },


            ],
          },
            {
              title: "To Do",
              tasks: [
                { title: "Task 1", priority: "High", description: "Do task 1" },
                { title: "Task 2", priority: "Medium", description: "Do task 2" },
                { title: "Task 3", priority: "Medium", description: "Do task 3" },

                { title: "Task 4", priority: "Medium", description: "Do task 3" },

              ],
            },
            {
              title: "In Progress",
              tasks: [{ title: "Task 3", priority: "Low", description: "Do task 3" }],
            },
            {
              title: "Done",
              tasks: [{ title: "Task 4", priority: "Low", description: "Do task 4" }],
            },
          ];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-4 text-black">
        {columns.map(column => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;

