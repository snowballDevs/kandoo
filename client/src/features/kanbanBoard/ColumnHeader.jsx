import {useState} from 'react';
import {HiOutlineTrash} from 'react-icons/hi';

const ColumnHeader = ({column, items, removeColumn, containerId}) => {
    const [editMode, setEditMode] = useState(false);
    const [mouseIsOver, setMouseIsOver] = useState(false);

    return (
        <div
            className='bg-primaryLight text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-primaryLight border-4 flex items-center justify-between'
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <div className='flex items-center  gap-2'>
                <div className=' h-6 w-6 flex items-center justify-center p-4 bg-infoLight  text-md rounded-full ring-2 '>
                    {items.length}
                </div>

                {!editMode && (
                    <div
                        className='hover:ring-secondaryLight rounded px-1 py-2 hover:ring-2'
                        onClick={() => {
                            setEditMode(true);
                        }}
                    >
                        {column.title}
                    </div>
                )}

                {editMode && (
                    <input
                        className='bg-primaryLight focus:border-redLight border rounded outline-none px-2 max-w-[200px]'
                        value={column.title}
                        onChange={(e) =>
                            updateColumn(column.id, e.target.value)
                        }
                        onBlur={() => {
                            setEditMode(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter') return;
                            setEditMode(false);
                        }}
                    />
                )}
            </div>
            {mouseIsOver && (
                <button
                    onClick={() => removeColumn(column._id)}
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
