import Card from '../components/BoardCard';

const BoardGrid = () => (
    <div className='p-6 max-w-6xl mx-auto'>
        <div className='grid grid-cols-fluid justify-items-center gap-4 '>
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
            <Card />
        </div>
    </div>
);

export default BoardGrid;
