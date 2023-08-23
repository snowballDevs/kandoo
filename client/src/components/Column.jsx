// import { SortableContext, useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { useMemo, useState } from "react";
import {HiPlusCircle, HiOutlineTrash} from 'react-icons/hi';
import dataService from '../services/dataService';
import Task from './Task';

// Create new Task

// import Task from './Task';

// const Column = ({columnName, columnTasks}) => {
//     return (
//         <div className='bg-gray-200 rounded p-4 shadow'>
//             <h2 className='text-xl font-bold text-black'>{columnName}</h2>
//             {columnTasks.map((task) => (
//                 <Task
//                     key={task._id}
//                     taskName={task.taskName}
//                     taskComments={task.comments}
//                 />
//             ))}
//         </div>
//     );                                                                                                                      
// };

// export default Column;


const Column = ({columnName, columnTasks}) => {

    function createTask(columnName) {
        const newTask = {
            taskName: '',
            _id: generateId(),
            columnname: columnName,
            content: `Task ${columnTasks.length + 1}`,
        };
    
        columnTasks.push(newTask)
        console.log(columnTasks)
    }

    function generateId() {
        return Math.floor(Math.random() * 10001);
    }


    const me = 'test me'
    // const [editMode, setEditMode] = useState(false);
    // const [taskData, setTaskData] = useState({
    //     taskName: '',
    //     description: '',
    //     columnName: {columnName},
    // });

//     return (
//         <div className='bg-gray-200 rounded p-4 shadow'>
//             <h2 className='text-xl font-bold text-black'>{columnName}</h2>
//             {columnTasks.map((task) => (
//                 <Task
//                     key={task._id}
//                     taskName={task.taskName}
//                     taskComments={task.comments}
//                 />
//             ))}
//         </div>
//     );
// };

return (
    <div
    //   ref={setNodeRef}
    //   style={style}
      className="bg-primaryLight w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col shadow-lg "
    >
      {/* Column title */}
      <div
        // {...attributes}
        // {...listeners}
        // onClick={() => {
        //   setEditMode(true);
        // }}
        className="bg-primaryLight text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-primaryLight border-4 flex items-center justify-between "
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-infoLight py-0 px-6 text-sm rounded-full ring-2 ">
            {columnTasks.length}
          </div>
          {/* {!editMode && ( */}
            <div className="hover:ring-secondaryLight rounded px-1 py-2 hover:ring-2">
            {columnName}
            </div>
            
          {/* )} */}
          {/* {editMode && (
            <input
              className="bg-primaryLight focus:border-redLight border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )} */}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:stroke-white hover:bg-dangerLight
          rounded px-1 py-2"
        >
          <HiOutlineTrash />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {/* <SortableContext items={tasksIds}> */}
          {columnTasks.map((task) => (
            <Task
                key={task._id}
                taskName={task.taskName}
                taskDetail={task.taskDetail}
                taskComments={task.comments}
                tags={task.tags}
                assignedUserIds={task.assignedUserIds}
                columnName={columnName}
                createdAt={task.created_at}
            />
          ))}
        {/* </SortableContext> */}
      </div>
      {/* Column footer */}
      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:bg-warningLight"
        onClick={() => {
          createTask(columnName.id);
        }}
      >
        <HiPlusCircle />
        Add task
      </button>
    </div>
  );
}

export default Column;