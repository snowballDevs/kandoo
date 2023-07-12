import Card from '../components/BoardCard';
import NewCard from '../components/NewBoardCard';

const BoardGrid = ({clickedCardId, setClickedCardId}) => (
    <div className='px-6 max-w-7xl mx-auto'>
        <div className='grid grid-cols-fluid justify-items-center gap-6 '>
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <Card
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
            <NewCard />
        </div>
    </div>
);

export default BoardGrid;
