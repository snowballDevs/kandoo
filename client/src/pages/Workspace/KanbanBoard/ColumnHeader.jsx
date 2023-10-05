import {useState} from 'react';
import {HiOutlineTrash, HiCheck} from 'react-icons/hi';

const ColumnHeader = ({
    column,
    items,
    containerId,
    removeColumn,
    updateColumn,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [columnName, setColumnName] = useState(column?.title || '');

    function handleColumnTitle(e) {
        const {value} = e.target;
        setColumnName(value);
    }

    return (
        <div
            className='bg-primaryLight text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold  border-4 flex items-center justify-between'
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <div className='flex items-center   gap-2'>
                <div className=' h-5 w-5 flex items-center justify-center p-4  text-md rounded-full ring-2 ring-gray-900 '>
                    {items.length}
                </div>

                {!editMode && (
                    <p
                        className='hover:ring-secondaryLight rounded px-1 py-2 hover:ring-2'
                        onClick={() => {
                            setEditMode(true);
                        }}
                    >
                        {columnName}
                    </p>
                )}

                {editMode && (
                    <div className='flex items-center gap-2 '>
                        <input
                            className='bg-primaryLight border rounded outline-none  px-2 max-w-[200px]  '
                            value={columnName}
                            autoFocus
                            required
                            onChange={handleColumnTitle}
                            onBlur={() => {
                                setEditMode(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== 'Enter') {
                                    return;
                                }
                                setEditMode(false);
                            }}
                        />

                        <button
                            className='stroke-gray-500 hover:stroke-white hover:bg-successLight
            rounded px-1 py-2 '
                            type='button'
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                updateColumn(column._id, columnName);
                            }}
                        >
                            <span className='sr-only'>Save Column</span>
                            <HiCheck className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                )}
            </div>
            {mouseIsOver && !editMode && (
                <button
                    onClick={() => removeColumn(column._id, containerId)}
                    className='stroke-gray-500 hover:stroke-white hover:bg-dangerLight
              rounded px-1 py-2 '
                    type='button'
                >
                    <HiOutlineTrash className='text-2xl' />
                </button>
            )}
        </div>
    );
};

export default ColumnHeader;
