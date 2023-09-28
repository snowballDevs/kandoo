import ColumnHeader from './ColumnHeader';

import AddTask from '../Task/AddTask';

const Column = ({
    column,
    items,
    children,
    addTask,
    containerId,
    removeColumn,
    updateColumn,
}) => (
    <div className='bg-primaryLight w-[350px] h-full max-h-full rounded-md flex flex-col flex-grow  shadow-lg overflow-y-auto'>
        <ColumnHeader
            column={column}
            items={items}
            removeColumn={removeColumn}
            updateColumn={updateColumn}
            containerId={containerId}
        />

        {/* Container for all sortable tasks */}
        <ul className='flex flex-col flex-grow gap-2 p-2 overflow-x-hidden min-h-[500px] overflow-y-auto '>
            {children}
        </ul>

        <AddTask addTask={addTask} column={column} containerId={containerId} />
    </div>
);

export default Column;
