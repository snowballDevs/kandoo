import {useState, useEffect} from 'react';
import Header from '../components/Header';
import dataService from '../services/dataService';
import BoardGrid from './BoardGrid';
import {useAuthContext} from '../contexts/AuthContext/authContext';

const Dashboard = ({clickedCardId, setClickedCardId}) => {
    const [user, setUser] = useState(null);
    const {isAuthenticated} = useAuthContext();

  


    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await dataService.getUser();
                if (response.status >= 200 && response.status < 300) {
                    setUser(response.data.user.firstName);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [isAuthenticated]);

    return (
        <div>
            <Header />
            <div className='p-10'>
                <div className='flex flex-col text-center text-secondaryLight'>
                    <p className='text-3xl'>
                        Welcome back,{' '}
                        <span className='font-bold text-3xl'>{user}</span>{' '}
                    </p>
                    <h1 className='text-4xl font-bold'>Your Projects</h1>
                </div>
            </div>
            <BoardGrid
                clickedCardId={clickedCardId}
                setClickedCardId={setClickedCardId}
            />
           
        </div>
    );
};
export default Dashboard;
