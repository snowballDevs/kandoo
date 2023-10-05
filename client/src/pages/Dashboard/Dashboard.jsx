import Header from '../../components/Header';
import BoardGrid from './BoardGrid';
import {useAuthContext} from '../../contexts/AuthContext/authContext';

const Dashboard = () => {
    const {
        user: {firstName},
    } = useAuthContext();

    return (
        <div>
            <Header />
            <div className='p-10'>
                <div className='flex flex-col text-center text-secondaryLight'>
                    <p className='text-3xl'>
                        Welcome back,{' '}
                        <span className='font-bold text-3xl'>{firstName}</span>{' '}
                    </p>
                    <h1 className='text-4xl font-bold'>Your Projects</h1>
                </div>
            </div>
            <BoardGrid />
        </div>
    );
};
export default Dashboard;
