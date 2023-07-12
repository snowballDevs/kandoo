import BoardGrid from './BoardGrid';

const Dashboard = ({ clickedCardId, setClickedCardId }) => (
        <div>
            <div className='p-10'>
                <div className='flex flex-col text-center'>
                    <p className='text-lg'>
                        Welcome back, <span className='font-bold'>USER!</span>{' '}
                    </p>
                    <h1 className='text-4xl font-bold'>Your Projects</h1>
                </div>
            </div>
            <BoardGrid clickedCardId={clickedCardId} setClickedCardId={setClickedCardId} />
        </div>
);

export default Dashboard;