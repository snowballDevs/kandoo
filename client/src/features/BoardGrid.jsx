import Card from '../components/BoardCard';
import NewCard from '../components/NewBoardCard';
import {useState} from 'react'

// const handleCards = () => {
  //   setCards(oldCards => (
    //     ...oldCards,
    
    //   ))
    // }
    
    const BoardGrid = () => {
    const [cards, setCards] = useState([])

    return (
    <div className='px-6 max-w-7xl mx-auto'>
        <div className='grid grid-cols-fluid justify-items-center gap-6 '>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <NewCard />
        </div>
    </div>
    )
};

export default BoardGrid;
