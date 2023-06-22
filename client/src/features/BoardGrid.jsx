import Card from '../components/BoardCard';
import NewCard from '../components/NewBoardCard';

const BoardGrid = () => (
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
);

export default BoardGrid;
