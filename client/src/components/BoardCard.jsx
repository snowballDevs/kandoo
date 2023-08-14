import {useEffect, useState} from 'react';
import {useRoutingContext} from '../contexts/RoutingContext/routingContext';
import dataService from '../services/dataService';

const Card = ({name, desc, id, onDelete, onClick}) => {
    const [cardId, setCardId] = useState(null);
    const {setCurrentPage} = useRoutingContext();

    // Generate a unique ID for each card, remove after testing

    return (
        <div
            className=' rounded-xl px-6 py-4 bg-white border-2 border-gray-300 w-full relative text-secondaryLight'
            role='button'
            tabIndex={0}
            onClick={(e) => onClick(e)}
            id={id}
        >
            <button
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                type='button'
                onClick={(e) => onDelete(e, id)}
            >
                x
            </button>
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
