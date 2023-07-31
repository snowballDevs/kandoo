import {useState} from 'react';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';

const Card = ({key, name, desc}) => {
    const [cardId, setCardId] = useState(null);
    const {setCurrentPage} = useRoutingContext();

    function handleCardClick() {
        setClickedCardId(cardId);
        setCurrentPage('kanbanBoard');
    }

    // Generate a unique ID for each card, remove after testing
    useState(() => {
        setCardId(Math.floor(Math.random() * 10000));
    }, []);

    return (
        <div
            className=' rounded-xl p-6 bg-white border-2 border-gray-300 w-full'
            onClick={handleCardClick}
            role='button'
            tabIndex={0}
            onKeyDown={handleCardClick}
        >
            <div className='flex flex-col gap-4'>
                <h3 className='font-bold text-xl truncate leading-tight'>
                    {name}
                </h3>
                <p className='text-s truncate'>{desc}</p>
            </div>
        </div>
    );
};
export default Card;
