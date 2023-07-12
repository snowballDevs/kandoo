import './App.css';
import {useEffect, useState} from 'react';
import {useAuthContext} from './contexts/AuthContext/authContext';
import {useRoutingContext} from './contexts/RoutingContext/routingContext';
import LandingPage from './features/LandingPage';
import Footer from './components/Footer';
import Header from './components/Header';
import Form from './components/Form';
import KanbanBoard from './components/KanbanBoard';
import Dashboard from './features/Dashboard';

const App = () => {
    const {isAuthenticated} = useAuthContext();
    const {currentPage, setCurrentPage} = useRoutingContext();
    const [clickedCardId, setClickedCardId] = useState(null); // State for card ID

    // UseEffect wil only change if values inside UseEffect changes

    useEffect(() => {
        if (!isAuthenticated) {
            setCurrentPage('landingPage');
        } else if (isAuthenticated && currentPage === 'landingPage') {
            setCurrentPage('dashboard');
        } else if (
            isAuthenticated &&
            currentPage === 'dashboard' &&
            clickedCardId
        ) {
            setCurrentPage('kanbanBoard');
        }
    }, [isAuthenticated, currentPage, setCurrentPage, clickedCardId]);

    return (
        <div>
            <Header />
            {currentPage === 'landingPage' && <LandingPage />}
            {currentPage === 'dashboard' && (
                <Dashboard
                    clickedCardId={clickedCardId}
                    setClickedCardId={setClickedCardId}
                />
            )}
            {currentPage === 'kanbanBoard' && <KanbanBoard />}
            <div className='container mx-auto mt-8 mb-16'>
                <h1 className='text-2xl text-center font-bold mb-4'>
                    Form Example
                </h1>
                <Form />
            </div>
            <Footer />
        </div>
    );
};

export default App;
