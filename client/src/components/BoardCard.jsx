import { useState } from 'react';

const Card = ( {setClickedCardId} ) => {

    const [cardId, setCardId] = useState(null);

    function handleCardClick() {
        setClickedCardId(cardId);
    }
    
    // Generate a unique ID for each card, remove after testing
    useState(() => {
    setCardId(Math.floor(Math.random() * 10000));
    }, []);


    return(
        <div className=' rounded-xl p-6 bg-white border-2 border-gray-300 w-full' 
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleCardClick}>

            <div className='flex flex-col gap-4'>
                <h3 className='font-bold text-xl truncate leading-tight'>Board</h3>
                <p className='text-s truncate'>Work in progress</p>
            </div>
        </div>
    );
    };
export default Card;
