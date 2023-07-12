// import { useState } from 'react';
import Card from '../components/BoardCard';
import NewCard from '../components/NewBoardCard';

const BoardGrid = ({ handleCardClick }) => (
    <div className='px-6 max-w-7xl mx-auto'>
        <div className='grid grid-cols-fluid justify-items-center gap-6 '>
            <Card id={1} handleCardClick={handleCardClick} />   
            <Card id={2} handleCardClick={handleCardClick} />
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
);

export default BoardGrid;
