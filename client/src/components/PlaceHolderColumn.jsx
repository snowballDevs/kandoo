import {HiPlus} from 'react-icons/hi';
const PlaceholderColumn = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className='
  h-[60px]
  min-w-[300px]
  cursor-pointer
  rounded-lg
  bg-mainBackgroundColor
  border-2
  border-columnBackgroundColor
  p-4
  ring-rose-500
  hover:ring-2
  flex
  items-center
  gap-2
  '
        >
            <HiPlus />
            <p>Add Column</p>
        </button>
    );
};

export default PlaceholderColumn;
