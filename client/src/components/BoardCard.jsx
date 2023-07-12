const Card = ({ id, handleCardClick }) => (
        <div className=' rounded-xl p-6 bg-white border-2 border-gray-300 w-full' 
            id={1} 
            onClick={() => handleCardClick(id)} >

            <div className='flex flex-col gap-4'>
                <h3 className='font-bold text-xl truncate leading-tight'>Board</h3>
                <p className='text-s truncate'>Work in progress</p>
            </div>
        </div>
    );

export default Card;
